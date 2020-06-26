const { Storage } = require('@google-cloud/storage'); 
const GOOGLE_CLOUD_PROJECT_ID = 'eternal-delight-248616';
const GOOGLE_CLOUD_KEYFILE = './core/eternal-delight-248616-afc4d218d8ac.json';
const storage = new Storage({
    projectId: GOOGLE_CLOUD_PROJECT_ID,
    keyFilename: GOOGLE_CLOUD_KEYFILE,
});

module.exports = storage;
