cd client
npm run build
cd ../
rm -f server/src/public
mv client/dist/client server/src/public