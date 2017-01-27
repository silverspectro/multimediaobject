#!/bin/bash
srcFolder="src"
distFolder="test/dist"

rm -rf $distFolder
mkdir $distFolder

files="src/*.js"
for file in $files
do
  length=${#file}
  fileName=${file:0:$length-3}
  echo $file ${fileName/$srcFolder/$distFolder}.js
  webpack --config webpack.test.js $file ${fileName/$srcFolder/$distFolder}.js
done

files="src/**/*.js"
for file in $files
do
  length=${#file}
  fileName=${file:0:$length-3}
  echo $file ${fileName/$srcFolder/$distFolder}.js
  webpack --config webpack.test.js $file ${fileName/$srcFolder/$distFolder}.js
done
