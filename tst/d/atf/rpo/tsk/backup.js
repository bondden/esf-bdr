/**
 * Created by Denis Bondarenko <bond.den@gmail.com> on 02.08.2015.
 */

"use strict";

console.log('\n\n========\nBack-up task called\n========\n');

var
	c  =require('cli-color'),
	but=require('esf-but'),

	l=console.log
;

process.on('unhandledRejection', function(reason, p) {
	l('\nUnhandled Rejection at: Promise ', p, ' reason: ', reason,'\n');
	console.trace(p);
});

var out='';
but.backup().catch(function(e){

	l(c.redBright('\nEr'));
	l(e);
	l(out);
	l('\n\n');
	process.exit(1);

}).then(function(r){

	out=r;

	l(c.greenBright('\nOk'));
	l(r);
	l('\n');
	//process.exit(0);

});




