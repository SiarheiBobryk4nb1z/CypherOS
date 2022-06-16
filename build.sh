#!/bin/bash

cd "$(dirname $0)"
tsc
rollup -c
