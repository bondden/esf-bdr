#!/usr/bin/env bash

alias md=mkdir

#mkdir ops 
#mkdir ops/bu ops/ci ops/nm ops/pm ops/qa ops/upd

cd ops

cd upd
touch njs.js sw.js dep.js
cd ../

cd ci
touch src-bld.js bld-bta.js bta-prd.js
cd ../

cd nm
touch itl-prd.js itl-dev.js pub.js new.js
cd ../

cd pm
touch cov.js est.js pln.js
cd ../

cd ../
