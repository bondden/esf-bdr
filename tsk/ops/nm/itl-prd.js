/**
 * Created by Denis Bondarenko <bond.den@gmail.com> on 1/21/16.
 */
"use strict";

const
  gulp=require('gulp-help')(require('gulp'))
  ;

export var itlPrd=gulp
  .task(
    "itl-prd",
    "",
    [],
    ()=>{
      console.log('running task itl-prd');
    },
    {}
  );
