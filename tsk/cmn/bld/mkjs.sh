#!/usr/bin/env bash

for i in js css html ng fe-ast
do
	touch fe/$i.js
done

for i in be-ast tpl nm es
do
	touch be/$i.js
done
