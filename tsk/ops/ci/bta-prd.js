/**
 * Created by Denis Bondarenko <bond.den@gmail.com> on 1/21/16.
 */
"use strict";

const
  gulp=require('gulp-help')(require('gulp'))
  ;

export var btaPrd=gulp
  .task(
    "bta-prd",
    "",
    [],
    ()=>{
      console.log('running task bta-prd');
    },
    {}
  );
