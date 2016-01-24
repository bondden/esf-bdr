/**
 * Created by Denis Bondarenko <bond.den@gmail.com> on 1/21/16.
 */
"use strict";

const
  gulp=require('gulp-help')(require('gulp')),
  todo=require('gulp-todo')
  ;

export const dftOpt={
  pth:{
    bse:'',
    src:'',
    dst:''
  },
  gtr:{
    absolute:        true,
    transformComment:function(file,line,text,kind){
      return ['| '+file.replace(__dirname,'')+' | '+line+' | '+kind+' | '+text];
    }
  },
  rpr:{
    type:"json",
    opt: {
      fileName:  'todo.json',
      customTags:[
        'abr',
        'tdo',
        'knw',
        'nte',
        'todo',
        'fixme'
      ]
    }
  }
};

if(!o){
  var o=dftOpt;
}

export var abr=gulp
  .task(
    "abr",
    "Gathers ESF abr from src-files",
    [],
    ()=>{
      gulp
        .src(o.src)
        .pipe(todo(o.gtr))
        .pipe(todo.reporter(
          o.rpr.type,
          o.rpr.opt
        ))
        .pipe(gulp.dest(o.dst));
    },
    {}
  );
