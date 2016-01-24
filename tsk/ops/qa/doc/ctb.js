/**
 * Created by Denis Bondarenko <bond.den@gmail.com> on 1/21/16.
 */
"use strict";

const
  gulp=require('gulp-help')(require('gulp'))
  ;

export var ctb=gulp
  .task(
    "ctb",
    "",
    [],
    ()=>{
      console.log('running task ctb');
    },
    {}
  );
