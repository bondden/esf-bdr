/**
 * Created by Denis Bondarenko <bond.den@gmail.com> on 16.08.2015.
 */

//todo: implement moduleData.ignore

var
	cc      =require('cli-color'),
	fs      =require('fs-extra'),
	path    =require('path'),
	restler =require('restler'),
	mustache=require('mustache'),
	exec    = require('child_process').exec,

	l=console.log
;

var
	d={}
;

process.on('unhandledRejection', function(reason, p) {
	l('\nUnhandled Rejection at: Promise ', p, ' reason: ', reason,'\n');
	console.trace(p);
});

function red(v){
	l(cc.red(v));
}

function bb(v){
	l(cc.blueBright(JSON.stringify(v)));
}

function mkClassName(name){
	var a=name.replace(/^(itms-|esf-)/ig,'').split('-');
	a.forEach(function(v,i,a){
		a[i]=v.charAt(0).toUpperCase()+v.slice(1);
	});
	return a.join('');
}

function mkKeywords(keywordsList){
	var keywords=keywordsList.map(function(v){
		return '"'+v+'"';
	});
	return keywords.join(',');
}

function mkRepo(rpoData,cfg){
	return new Promise(function(rs,rj){

		restler.post(
			cfg.urlBase+rpoData.name,
			{
				"username": cfg.user,
				"password": cfg.pass,
				"data":cfg.set,
				"headers":{
					"Accept": '*/*',
					"User-Agent": 'ESF Bdr',
					"Content-type":'application/json'
				}
			}
		).on("complete",function(r){
				if(r instanceof Error){
					red('mkRepo.0: '+r);
					rj(r);
				}else{
					rs(r);
				}
			});

	});
}

function findTpls(src){

	return new Promise(function(rs,rj){

		var setTpls=function(dtpls,subTpls,res){

			dtpls=dtpls.concat(subTpls);
			dtpls=[].concat.apply([],dtpls);
			dtpls=[].concat.apply([],dtpls);

			res(dtpls);

		};

		var waiters=[];

		fs.readdir(src,function(e,r){

			if(e){
				red('findTpls.0: '+e);
				rj(e);
				return e;
			}

			r.forEach(function(p,i){

				var pp=path.resolve(src+'/'+p);

				waiters.push(new Promise(function(rsw,rjw){
					fs.stat(pp,function(e1,s){

						if(e1){
							red('findTpls.1: '+e1);
							rj(e1);
							return e1;
						}

						var dtpls=[];

						if(s.isDirectory()){
							findTpls(pp).then(function(r2){
								dtpls.push(r2);
								rsw(dtpls);
							}).catch(function(e2){
								red('findTpls.2: '+e2);
								rj(e2);
								return e2;
							});
						}else if(s.isFile() && path.extname(p)==='.mustache'){
							dtpls.push(pp);
							rsw(dtpls);
						}else{
							rsw([]);
						}

					});
				}));

			});

			if(waiters.length>0){

				Promise.all(waiters).then(function(subTpls){
					setTpls([],subTpls,rs);

				}).catch(function(e){
					red('findTpls.100: '+e);
					rj(e);
				});

			}else{

				setTpls([],[],rs);

			}

		});

	});
}

function cplTpl(src,dst,moduleData){
	return new Promise(function(rs,rj){
		fs.readFile(src,{"encoding":"utf8"},function(e,r){

			if(e){
				red('cplTpl.0: '+e);
				rj(e);
				return e;
			}

			try{
				var s=mustache.render(r,moduleData);
			}catch(e2){
				red('cplTpl.2: '+e2);
				rj(e2);
				return e2;
			}

			fs.ensureDir(path.dirname(dst),function(e3){
				if(e3){
					red('cplTpl.3: '+e3);
					rj(e3);
					return e3;
				}

				fs.writeFile(dst,s,{"mode":438},function(e1){
					if(e1){
						red('cplTpl.1: '+e1);
						rj(e1);
						return e1;
					}
					rs(true);
				});

			});

		});
	});
}

function cplTpls(srcList,srcDir,dstDir,moduleData){
	return new Promise(function(rs,rj){

		var waiters=[];

		srcList.forEach(function(v){

			var fileName=path.basename(v,'.mustache');
			var locDir=path.dirname(v.replace(srcDir,''));
			var dst=path.resolve(dstDir+'/'+locDir+'/'+fileName);

			waiters.push(cplTpl(v,dst,moduleData));
		});

		Promise.all(waiters).then(function(r){
			rs(r);
		}).catch(function(e){
			red('cplTpls.0: '+e);
			rj(e);
		});

	});
}

function copyFiles(src,dst){
	return new Promise(function(rs,rj){
		var filter='.mustache';
		var waiters=[];
		fs.readdir(src,function(e,r){
			if(e){
				red('copyFiles.0: '+e);
				rj(e);
				return e;
			}
			r.forEach(function(p,i){
				var ps=path.resolve(src+'/'+p);
				var pd=path.resolve(dst+'/'+p);
				fs.stat(ps,function(e1,s){
					if(e1){
						red('copyFiles.1: '+e1);
						rj(e1);
						return e1;
					}
					if(s.isDirectory()){
						waiters.push(copyFiles(ps,pd));
					}else if(s.isFile() && path.extname(p)!==filter){
						waiters.push(new Promise(function(rs1,rj1){
							fs.copy(ps,pd,function(e3){
								if(e3){
									red('copyFiles.3: '+e3);
									rj1(e3);
									return e3;
								}
								rs1('copied '+ps+' to '+pd);
							});
						}));
					}
					if(i===r.length-1){
						Promise.all(waiters).then(function(r2){
							rs(r2);
						}).catch(function(e2){
							red('copyFiles.2: '+e2);
							rj(e2);
						});
					}
				});
			});
		});
	});
}

function addFiles(src,dst,moduleData){
	return new Promise(function(rs,rj){
		findTpls(src).then(function(tplList){

			Promise.all([
				copyFiles(src,dst),
				cplTpls(tplList,src,dst,moduleData)
			]).then(function(r){
				rs(r);
			}).catch(function(e1){
				red('addFiles.1: '+e1);
				rj(e1);
			});

		}).catch(function(e){
			red('addFiles.0: '+e);
			rj(e);
		});
	});
}

function shellExe(q){
	return new Promise(function(rs,rj){

		require('shelljs/global');

		exec(q,{async:true},function(code,output){

			l(cc.blue('code = '+code));
			l(cc.cyan(output));

			if(code){
				var msg='msg: \`'+q+'\` failed';
				red('shellExe: '+msg);
				exit(1);
				var e=new Error(msg);
				rj(e);
				return e;
			}

			//exit(0);
			rs({
				"code":code,
				"output":output
			});

		});

	});
}

function mkGitSubmoduleWithOrigin(modDir,moduleData,cfg){
	return new Promise(function(rs,rj){

		require('shelljs/global');

		if(!which('git')){
			var msg='msg: sorry, this script requires git';
			red('mkGitSubmoduleWithOrigin.0: '+msg);
			exit(1);
			var e=new Error(msg);
			rj(e);
			return e;
		}

		var parentDir=path.dirname(modDir);

		cd(parentDir);

		var msg1='';
		var q='git submodule add -f '+cfg.rmt.cloneUrl+moduleData.name+'.git '+moduleData.name;

		exec(q,{async:true},function(code,output){

			l(cc.blue('code = '+code));
			l(cc.cyan(output));

			if(code !== 0){

				if((''+code).indexOf('warning: You appear to have cloned an empty repository.')!==-1){

					msg1='msg: git submodule '+moduleData.name+' added';
					l(cc.greenBright(msg1));
					//exit(0);
					rs(msg1);

				}else{

					msg1='msg: git submodule '+moduleData.name+' addition failed:\n'+q;
					red('mkGitSubmoduleWithOrigin.1: '+msg1);
					exit(1);
					var e1=new Error(msg1);
					rj(e1);
					return e1;

				}

			}else{
				msg1='msg: git submodule '+moduleData.name+' added';
				l(cc.greenBright(msg1));
				//exit(0);
				rs(msg1);
			}

		});

	});
}

function commitAndPush(modDir,moduleData,cfg){
	return new Promise(function(rs,rj){

		require('shelljs/global');

		if(!which('git')){
			var msg='msg: sorry, this script requires git';
			red('commitAndPush.msg.0: '+msg);
			exit(1);
			var e=new Error(msg);
			rj(e);
			return e;
		}

		cd(modDir);

		var q='git add . ';
		shellExe(q).catch(function(e){
			red('commitAndPush.0: '+e0);
			rj(e);
		}).then(function(r){

			q='git commit -m \'initial\'';
			shellExe(q).catch(function(e1){
				red('commitAndPush.1: '+e1);
				rj(e1);
			}).then(function(r1){

				q='git push --all --repo='+cfg.rmt.cloneUrl+moduleData.name+'.git';
				shellExe(q).catch(function(e2){
					red('commitAndPush.2: '+e2);
					rj(e2);
				}).then(function(r2){
					rs(moduleData.name+' pushed');
				});

			});

		});

	});
}

function mkModule(moduleData,cfg){
	return new Promise(function(rs,rj){

		var modDir=cfg.loc.nmDir+moduleData.name;

		mkRepo(moduleData,cfg.rmt).then(function(r){

			bb(r);

			mkGitSubmoduleWithOrigin(modDir,moduleData,cfg).then(function(r2){

				bb(r2);

				addFiles(path.resolve(cfg.loc.nmDir+'/esf-dft/'),modDir,moduleData).then(function(r3){

					bb(r3);

					commitAndPush(modDir,moduleData,cfg).then(function(r4){

						bb(r4);

						rs([r,r2,r3,r4]);

					}).catch(function(e4){
						red('mkModule.4: '+e4);
						rj(e4);
					});

				}).catch(function(e3){
					red('mkModule.3: '+e3);
					rj(e3);
				});

			}).catch(function(e2){
				red('mkModule.2: '+e2);
				rj(e2);
			});

		}).catch(function(e){
			red('mkModule.0: '+e);
			rj(e);
		});

	});
}

function mkModules(){
	return new Promise(function(rs,rj){
		fs.readFile(path.resolve(__dirname+'/../dat/mkrepos.json'),function(e,r){
			if(e){
				red('mkModules.0: '+e);
				rj(e);
			}

			try{
				d=JSON.parse(r);
			}catch(e1){
				red('mkModules.1: '+e1);
				rj(e1);
			}

			//prepare data
			d.mod=d.mod.map(function(v){
				v.keywords=mkKeywords(v.keywords);
				v.className=mkClassName(v.name);
				return v;
			});
			//

			var waiters=[];
			d.mod.forEach(function(moduleData){
				if(moduleData.hasOwnProperty("ignore") && moduleData.ignore)return;
				waiters.push(mkModule(moduleData,d.cfg));
			});
			Promise.all(waiters).then(function(r1){
				l(cc.green(r1));
				rs(r1);
			}).catch(function(e2){
				red('mkModules.2: '+e2);
				rj(e2);
			});

		});
	});
}

module.exports={
	"mkClassName":mkClassName,
	"mkRepo":mkRepo,
	"findTpls":findTpls,
	"cplTpl":cplTpl,
	"cplTpls":cplTpls,
	"addFiles":addFiles,
	"mkGitSubmoduleWithOrigin":mkGitSubmoduleWithOrigin,
	"commitAndPush":commitAndPush,
	"mkModule":mkModule,
	"mkModules":mkModules
};
