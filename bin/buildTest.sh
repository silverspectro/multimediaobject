#!/bin/bash
for file in src/lib/*
do
  rollup -c rollup.config.test.js -i ${file} -o build/${file#src/}
done
