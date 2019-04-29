# 确保脚本抛出遇到的错误
set -e

git add .
git commit -m '更新内容'
git push -f git@github.com:ynzy/yufanBlog.git master

cd -