const ImageKit = require('imagekit');
require('dotenv').config();
const image=new ImageKit({
    publicKey:process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint:process.env.IMAGEKIT_URL_ENDPOINT
});
async function uploadFile(fileBuffer,fileName,folder="videos"){
    try{
        if(!fileName){
            fileName="default-" + Date.now() + ".mp4";
        }
        const result=await image.upload({
            file:fileBuffer,
            fileName:fileName,
            folder:folder
        });
        return result;
    }catch(err){
        throw err;
    }
}
module.exports={uploadFile}