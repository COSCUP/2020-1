#!/usr/bin env
set -e

git clone https://$MAIN_REPO main-repo
cd main-repo
git remote set-url origin https://$GITHUB_TOKEN@$MAIN_REPO
git config --global user.name "Deployment Bot (from Travis CI)"
git config --global user.email "deploy@travis-ci.org"
git submodule update --init
git submodule foreach --recursive git fetch --all
git submodule foreach --recursive git reset --hard origin/master
git add .

if [[ $(git commit -m "Update submodules" | grep 'nothing to commit') ]]; then
  exit 0
fi

git push