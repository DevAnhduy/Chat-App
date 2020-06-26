const fs = require('fs');
const path = require('path');

module.exports = async (app) => {
    fs.readdir(path.resolve(root_path,'./src/routes'), (err, routes) => {
        if (err) console.log(err);
        else {
            routes.forEach(async route => {
                const require_route = await require(root_path + `/src/routes/${route}`);
                app.use(require_route);
            })
        }
    })
}