/**
 * Created by Denis Bondarenko <bond.den@gmail.com> on 1/21/16.
 */
"use strict";

const
  gulp=require('gulp-help')(require('gulp'))
  ;

export var qa=gulp
  .task(
    "qa",
    "",
    [],
    ()=>{
      console.log('running task qa');
    },
    {}
  );
