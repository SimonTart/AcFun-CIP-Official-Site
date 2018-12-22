rm -rf client/dist
cd client
npm run build

cd ../
rm -rf server/src/public
mv client/dist/client server/src/public

rm -f AcFun-CIP-OS.zip
cd server
zip -r ../AcFun-CIP-OS.zip . --exclude=.git 1>/dev/null
cd ../

scp AcFun-CIP-OS.zip me_tencent:~/

ssh me_tencent 'rm -rf ~/AcFun-CIP-OS && unzip AcFun-CIP-OS.zip -d AcFun-CIP-OS 1>/dev/nul'
ssh me_tencent 'export PATH=$PATH:/root/.nvm/versions/node/v10.14.2/bin && pm2 stop AcFun-CIP-Official-Site && cd AcFun-CIP-OS && knex migrate:latest && pm2 start AcFun-CIP-Official-Site'
