/**
 * Created by Denis Bondarenko <bond.den@gmail.com> on 1/21/16.
 */
"use strict";

const
  gulp=require('gulp-help')(require('gulp'))
  ;

export var pub=gulp
  .task(
    "pub",
    "",
    [],
    ()=>{
      console.log('running task pub');
    },
    {}
  );
