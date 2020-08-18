const { server } = require("../jsconfig.json");
const path = require('path');

global['__host'] = server.host;
global['__port'] = server.port;
global['__root'] = path.dirname(process.mainModule.filename).replace(/\\/g,"/");
global['__images'] = path.join(__root, "images");
global['__data'] = path.join(__root, "data");
