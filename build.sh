rm -rf ./dist
vite build
# Following two lines are for adding hls locally, instead of CDN:
# cp /Users/mostafa/source/prj/other/hls.min.js /Users/mostafa/source/prj/front/dist/
# find ./dist -iname 'FilePlayer*' -exec sed -i '' 's/https:\/\/cdn\.jsdelivr\.net\/npm\/hls\.js@VERSION\/dist\/hls\.min\.js/\/assets\/hls\.min\.js/g' {} \;

rm ./front*.zip
cd ./dist
zip -r "../front-v$1.zip" ./* -x "*.DS_Store" -x "dist"
cd ..
