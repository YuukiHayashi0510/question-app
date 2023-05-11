#!/bin/bash

# -e Exit immediately when a command returns a non-zero status
# -x Print commands before they are executed
set -ex

# 最新の日付のフォルダを見つける
latest_dir=$(ls -td ./seed/* | head -n 1)
echo $latest_dir

data="./data"

# /data/が存在する場合、削除する
if [ -d $data ]; then
  rm -rf $data
fi

# フォルダをdataとしてコピー
cp -r $latest_dir $data