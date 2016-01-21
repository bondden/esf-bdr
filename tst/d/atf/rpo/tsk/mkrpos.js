/**
 * Created by Denis Bondarenko <bond.den@gmail.com> on 15.08.2015.
 */
"use strict";

//todo: add logger to simple task manager
//todo: create node module for the 'Make Repositories' task

console.log('\n\n========\nMake Repositories task called\n========\n');

var
	cc  =require('cli-color'),
	mod =require('./lib/mkrpos'),

	l=console.log
;

process.on('unhandledRejection', function(reason, p) {
	l('\nUnhandled Rejection at: Promise ', p, ' reason: ', reason,'\n');
	console.trace(p);
});

var out='';
mod.mkModules().catch(function(e){

	l(cc.redBright('\nEr'));
	l(e);
	l(out);
	l('\n\n');
	process.exit(1);

}).then(function(r){

	out=r;

	l(cc.greenBright('\nOk'));
	l(r);
	l('\n');
	//process.exit(0);

});
