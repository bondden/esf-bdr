/**
 * Created by Denis Bondarenko <bond.den@gmail.com> on 15.08.2015.
 */
'use strict';

var
	assert   = require('chai').assert,
	cc  		 = require('cli-color'),
	path	 	 = require('path'),
	fs 	 	   = require('fs-extra'),

	app      =require('../mkrpos.js')
;

var d={
	srcDir:'/web/itms/dmn/itms/ci/rpo/tsk/lib/tst/d/esf-dft/',
	dstDirEx:'/web/itms/dmn/itms/ci/rpo/tsk/lib/tst/d/esf-existent/',
	dstDirNew:'/web/itms/dmn/itms/ci/rpo/tsk/lib/tst/d/esf-new/',
	"modData":{
		"ex":{
			"name":"esf-existent",
			"className":"Existent",
			"keywords":[
				"esf",
				"existent"
			]
		},
		"new":{
			"name":"esf-new",
			"className":"New",
			"keywords":[
				"esf",
				"new"
			]
		}
	},
	"cfg":{
		"rmt":{
			"urlBase":"https://api.bitbucket.org/2.0/repositories/bondden/",
			"cloneUrl":"https://bondden:uUkqA70joxu4WsXRrrVj@bitbucket.org/bondden/",
			"user":"bondden",
			"pass":"uUkqA70joxu4WsXRrrVj",
			"typeHeader":"application/json; charset=UTF-8",
			"set":{
				"scm" : "git",
				"is_private" : "true",
				"fork_policy" : "no_public_forks",
				"language" : "nodejs"
			}
		},
		"loc":{
			"nmDir":"/web/itms/dmn/itms/ci/rpo/tsk/lib/tst/d/"
		}
	}
};

describe('mkrpos',function(){

	describe('mkClassName',function(){

		it('It should generate a class name from the module name',function(){

			var d=[
				{
					"inp":"mod",
					"out":"Mod",
					"dsc":"simple mod"
				},
				{
					"inp":"mod-sub",
					"out":"ModSub",
					"dsc":"simple sub-mod"
				},
				{
					"inp":"any-mod-sub",
					"out":"AnyModSub",
					"dsc":"any sub-mod"
				},
				{
					"inp":"any-mod-sub_sub1_Sub2",
					"out":"AnyModSub_sub1_Sub2",
					"dsc":"any with chars"
				},
				{
					"inp":"itms-mod",
					"out":"Mod",
					"dsc":"prj libs mod"
				},
				{
					"inp":"esf-mod",
					"out":"Mod",
					"dsc":"prj libs mod"
				},
				{
					"inp":"itms-mod-sub",
					"out":"ModSub",
					"dsc":"prj libs sub-mod"
				},
				{
					"inp":"esf-mod-sub",
					"out":"ModSub",
					"dsc":"prj libs sub-mod"
				}
			];

			d.forEach(function(c){
				assert.equal(app.mkClassName(c.inp),c.out,c.dsc);
			});

		});

	});

	/*describe('findTpls',function(){

		it('It should find 3 *.mustache files from nested dirs',function(done){
			this.timeout(4000);

			app.findTpls(d.srcDir).then(function(r){

				console.log(cc.cyanBright('\n\nR:'));
				console.log(r);

				assert.equal(r.length,3,'should find 3 files');

				done();
			}).catch(function(e){
				done(e);
			});

		});

	});*/

	/*describe('mkGitSubmoduleWithOrigin',function(){

		it('It should run shell and detect parent dir',function(done){
			this.timeout(60000);

			app.mkGitSubmoduleWithOrigin(d.dstDirNew,d.modData.new,d.cfg).then(function(r){

				console.log(cc.cyanBright('\n\nR:'));
				console.log(r);

				//assert.equal(r,'/web/itms/dmn/itms/ci/rpo/tsk/lib/tst/d','should detect parent dir');

				assert.equal(r,'git submodule '+d.modData.new.name+' added','should add git submodule');

				done();
			}).catch(function(e){
				done(e);
			});

		});

	});*/

	/*describe('addFiles',function(){

		it('It should correctly copy and rename files',function(done){
			var
				dstDir=d.dstDirNew,
				modData=d.modData.new
			;
			app.addFiles(
				d.srcDir,
				dstDir,
				modData
			).then(function(r){

				console.log(cc.cyanBright('\n\nR:'));
				console.log(r);

				fs.readdir(dstDir,function(e1,r1){

					if(e1){
						done(e1);
						return e1;
					}

					assert.equal(r1.length,11,'it should find 11 files and dirs to root');

					fs.readdir(path.resolve(dstDir+'/'+src),function(e2,r2){

						if(e2){
							done(e2);
							return e2;
						}

						assert.equal(r2.length,2,'it should find 2 files and dirs to root');
						done();

					});

				});

			}).catch(function(e){
				console.log(cc.redBright('\n\nE:'));
				done(e);
			});
		});

	});*/

	/*describe('commitAndPush',function(){

		it('It should commit and push the repo',function(done){
			this.timeout(60000);

			app.commitAndPush(d.dstDirNew,d.modData.new,d.cfg).then(function(r){

				console.log(cc.cyanBright('\n\nR:'));
				console.log(r);

				//assert.equal(r,'/web/itms/dmn/itms/ci/rpo/tsk/lib/tst/d','should detect parent dir');

				assert.equal(r,d.modData.new.name+' pushed','should commit and push git submodule');

				done();
			}).catch(function(e){
				done(e);
			});

		});

	});*/

	/*describe('cplTpls',function(){

		it('It should correctly copy and rename files',function(done){

			app.cplTpls(
				[
					'/web/itms/dmn/node_modules/esf-dft/README.md.mustache',
					'/web/itms/dmn/node_modules/esf-dft/package.json.mustache',
					'/web/itms/dmn/node_modules/esf-dft/src/index.es7.js.mustache'
				],
				'/web/itms/dmn/node_modules/esf-dft/',
				'/web/itms/dmn/node_modules/esf-mod/',
				{
					"name":"itms-mod",
					"keywords":[
						"itms",
						"mod"
					]
				}
			).then(function(r){
				console.log(cc.cyanBright('\n\nR:'));
				console.log(r);
					assert(1,1,'tmp placeholder');
				done();
			}).catch(function(e){
				done(e);
			});

		});

	});*/

});