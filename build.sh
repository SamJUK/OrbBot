
# Move Current Distribution to archive
echo 'Archiving current Distribution'
py __Scripts/archive.py

# Empty Distribtion Folder
echo 'Emptying current distribution folder'
py __Scripts/emptyDistribution.py

# Copy source to distribution
echo 'Copying src to dist'
cp -r src/* dist

# Replace Credentials GitIgnore
rm "dist\Credentials\.gitignore"
cp "__Src\.gitignore" "dist\Credentials\.gitignore"

# Replace Dev discord token with production
del "dist\Credentials\discord_bot.token"
cp "__Src\discord_bot.production.token" "dist\Credentials\discord_bot.token"

# Push to git repo
cd dist
git add -A
git commit -m "Pushhhhhh"
git push heroku master

# Wait to be closed
echo "Discord Bot Deployed!"
