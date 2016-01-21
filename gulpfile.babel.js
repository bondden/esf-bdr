/**
 * Created by Denis Bondarenko <bond.den@gmail.com> on 08.05.2015.
 */
'use strict';

const
  gulp      =require('gulp-help')(require('gulp')),
  requireDir=require('require-dir')
  ;

const
  tsk=requireDir('./tsk',{
    recurse:true/*,
    camelcase:true,
    duplicates:true*/
  })
  ;

gulp.task('default',()=>{
  console.log(JSON.stringify(tsk,null,'  '));
});

/*

 atf(a-cfg,cfg.json)
 atf(a-rme,tpl/rme.md.mustache)
 atf(a-rme-jsn,<color:DarkGrey>.tmp/rme.jsn.mustache)

 var(cfg)
 var(cfg-pth)
 var(cfg-tdo)
 cfg *-- "cfg-tdo"
 cfg *-- "cfg-pth"

 fnc(loadCfg)
 loadCfg .u..> "a-cfg"
 loadCfg .u.> "fs-extra"
 loadCfg --> cfg

 tsk(abr)
 tsk(cng)
 tsk(uml)
 tsk(jsdoc)
 tsk(lsc)
 tsk(ctb)
 tsk(dat)
 tsk(pkg)
 tsk(rme)
 rme .u.> dat
 rme .u.> "mustache"
 rme .u.> "gulp-doctoc"
 rme .u.> "tidy-markdown"
 rme .u..> "a-rme"
 rme .u..> "a-rme-jsn"
 tsk(kb)

 tsk(doc) {
 process req.uc.doc
 }

 abr   <.. doc
 cng   <.. doc
 uml   <.. doc
 jsdoc <.. doc
 lsc   <.. doc
 ctb   <.. doc
 pkg   <.. doc
 rme   <.. doc
 kb    <.. doc

 tsk(ops-bu)
 tsk(ops-ci)
 tsk(ops-mod)
 tsk(ops-pm)
 tsk(ops-qa)
 tsk(ops-upd)
 tsk(ops)

 "ops-bu"  <.. ops
 "ops-ci"  <.. ops
 "ops-mod" <.. ops
 "ops-pm"  <.. ops
 "ops-qa"  <.. ops
 "ops-upd" <.. ops

 tsk(be-ast)
 tsk(be-es)
 tsk(be-nm)
 tsk(be-tpl)
 tsk(bld-be)

 "be-ast"  <.. "bld-be"
 "be-es"   <.. "bld-be"
 "be-nm"   <.. "bld-be"
 "be-tpl"  <.. "bld-be"

 tsk(fe-ng)
 tsk(fe-js)
 tsk(fe-css)
 tsk(fe-ast)
 tsk(fe-html)
 tsk(fe-lr)
 tsk(bld-fe)

 "fe-ng"   <.. "bld-fe"
 "fe-js"   <.. "bld-fe"
 "fe-css"  <.. "bld-fe"
 "fe-ast"  <.. "bld-fe"
 "fe-html" <.. "bld-fe"
 "fe-lr"   <.. "bld-fe"

 tsk(bld)

 "bld-be" <.. bld
 "bld-fe" <.. bld

 lzp(nfr-cpl)
 lzp(nfr-cps)
 lzp(nfr-dbg)
 lzp(nfr-cpy)
 lzp(nfr)

 "nfr-cpl" <.. nfr
 "nfr-cps" <.. nfr
 "nfr-dbg" <.. nfr
 "nfr-cpy" <.. nfr

 tsk(wch)
 ops <.. wch
 bld <.. wch
 doc <.. wch
 nfr <.. wch

 */

/*

 :git:
 :nvm:
 ':npm:
 :bitbucket.org:
 :npmjs.com:

 usecase (src _a bld \n _l(bld,)) as bld <<ci>>
 usecase (bld _a bta \n _l(bta,)) as bta <<ci>>
 usecase (bta _a prd \n _l(prd,)) as prd <<ci>>

 usecase (doc \n \n _l(doc,)) as doc <<qa>>

 usecase (ast) as be_ass <<cnt>>
 usecase (tpl) as be_tpl <<cnt>>
 usecase (nm)  as be_nm  <<cnt>>
 usecase (ast) as fe_ass <<cnt>>

 :bdr:        -_P-   (ops\nmpl) <<mpl>>
 :bdr:        --     (ops\ncls) <<ops>>
 :bdr:        -_N-   (bld\ncnt) <<cnt>>
 :bdr:        -_L-   (nf\nreq)  <<l>>

 (ops\nmpl)   -_P-   (bch\nops) <<mpl>>
 (ops\nmpl)   -_P-   (sgl\nops) <<mpl>>

 (bld\ncnt)   -_N-   (be) <<cnt>>
 (be) -_N- (es)         <<cnt>>
 (be) -_N- be_ass
 (be) -_N- be_tpl
 (be) -_N- be_nm
 (bld\ncnt)   -_N-   (fe) <<cnt>>
 (fe) -_N- (js)     <<cnt>>
 (fe) -_N- (css)    <<cnt>>
 (fe) -_N- (html)   <<cnt>>
 (fe) -_N- (ng)     <<cnt>>
 (fe) -_N- fe_ass

 (nf\nreq)   -_L-   (cpl) <<l>>
 (nf\nreq)   -_L-   (cps) <<l>>
 (nf\nreq)   -_L-   (dbg) <<l>>
 (nf\nreq)   -_L-   (cpy) <<l>>

 (ops\ncls)   -_U-   (upd)       <<upd>>
 (ops\ncls)   -_M-   (mod\nops)  <<mod>>
 (ops\ncls)   -_C-   (ci\nops)   <<ci>>
 (ops\ncls)   -_Q-   (qa\nops)   <<qa>>
 (ops\ncls)   --     (bu)
 (ops\ncls)   -_J-   (pm)        <<pm>>

 (upd)        <|-_U- (upd\nnode) <<upd>>
 (upd)        <|-_U- (upd\ndeps) <<upd>>
 (upd)        <|-_U- (upd\nsw)   <<upd>>
 (upd\nsw)    o-_U-  (bu\nsw)  <<upd>>

 (mod\nops)   <|-_M- (itl)      <<mod>>
 (mod\nops)   <|-_M- (new)      <<mod>>
 (mod\nops)   <|-_M- (itl\ndev) <<mod>>
 (mod\nops)   <|-_M- (pub)      <<mod>>
 (pub) o--_M--  (ut)
 (pub) o-_M-    doc

 (ci\nops)    <|-_C- bld
 (ci\nops)    <|-_C- bta
 (ci\nops)    <|-_C- prd

 (qa\nops)    <|-_T- (tst)      <<tst>>
 (tst)        o-_T-  (ut) <<tst>>
 (tst)        o-_T-  (it) <<tst>>
 (tst)        o-_T-  (at) <<tst>>
 (tst)        o-_T-  (lt) <<tst>>
 (tst)        o-_T-  (pt) <<tst>>
 (qa\nops)    <|-_Q- doc <<qa>>

 bld o-_C-  (ut)
 bta o-_C-  (ut)
 bta o-_C-  (it)
 bta o-_C-  (at)
 bta o-_C-  (lt)
 bta o-_C-  (pt)
 prd o-_C-  (at)

 (pm)         o-_J-    (est) <<pm>>
 (pm)         o-_J-    (tdo) <<pm>>
 (pm)         o-_J-    (cov) <<pm>>

 doc   o--[CLR_Q]u- (tdo) <<pm>>
 doc   o-_Q-    (cng)      <<qa>>
 doc   o-_Q-    (cmp\numl) <<qa>>
 doc   o-_Q-    (cmp\nmd)  <<qa>>
 doc   o-_Q-    (cmp\nrme) <<qa>>
 doc   o-_Q-    (lsc)      <<qa>>
 doc   o-_Q-    (ctb)      <<qa>>
 doc   o-_Q-    (abr)      <<qa>>
 doc   o-_Q-    (knw)      <<qa>>
 doc   o-_Q-    (jsdoc)    <<qa>>
 doc   o-_Q-    (pkg)      <<qa>>
 (pkg)
 note bottom
 package.json
 travis.yml
 etc.
 end note

 (cmp\nmd) o-_Q- (tidy\nmd) <<qa>> 

 (pub)        -_M-   :cvcs:
 (pub)        -_M-   :npmjs.com:
 (itl)        -_M-   :npmjs.com:
 (new)        -_M-   :cvcs:
 (new)        -_M-   :git:
 (itl\ndev)   -_M-   :git:
 (itl\ndev)   -_M-   :npmjs.com:

 (upd\ndeps)  -_U-   :npmjs.com:
 (upd\nnode)  -_U-   :nvm:

 (cvcs)       <|-_M- :bitbucket.org:
 (cvcs)       <|-_M- :github.com:
 (cvcs)       <|-_M- :gitlab.com:

 */
