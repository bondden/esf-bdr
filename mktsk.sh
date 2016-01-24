#!/usr/bin/env bash

echo -e "\033[33m
WARNING: This will overwrite all task files!
\033[0m"
echo 'Are you sure to continue? Yes/No'
select yn in "Yes" "No"; do
	case $yn in
		Yes ) break;;
		No ) 	exit;;
		* )  	exit;;
	esac
done

source "/mcs/lib/utl.sh"

#ls -RN1 tsk | grep -Po "[^ ]+\.js"
for i in $(tree -fNi tsk | grep -P "\.js")
do

	b=$(basename $i)

	f="${b%.*}"
	if [ $f == 'idx' ]; then
		f=$(dirname $(echo $i | grep -Po "([^\/]+)\/([^\/]+)\.js"))
	fi
	
	v=$(camelify "$f")
	
	c=$(sed "s/TSK_NAME/$f/" ./tpl/dft.tsk.js | sed "s/TSK_VAR/$v/")
	echo "$c" > $i

	#echo '"use strict";' > $i
	#echo "module.exports=\"$f\";" >> $i

done
