@echo off
REM | Move Current Distribution to archive
echo 'Archiving current Distribution'
py __Scripts/archive.py

REM | Empty Distribtion Folder
echo 'Emptying current distribution folder'
py __Scripts/emptyDistribution.py

REM | Copy source to distribution
echo 'Copying src to dist'
xcopy /s src dist

REM | Replace Credentials GitIgnore
del /Q /F "dist\Credentials\.gitignore"
copy "__Src\.gitignore" "dist\Credentials\.gitignore"

REM | Push to git repo
cd dist
git add -A
git commit -m "Pushhhhhh"
git push heroku master