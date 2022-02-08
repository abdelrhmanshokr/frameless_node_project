if(!process.env.PORT) require('dotenv').config();

const { createServer } = require('http');
const serveStaticFiles = require('../lib/responder');

const { PORT, APP_NAME } = process.env;


module.exports = () => {
    const server = createServer(async({ url }, res) => {
        const urlToken = url.split(' ');
        const extension = urlToken.length > 1 ? `${urlToken[urlToken.length - 1].toLocaleLowerCase().trim()}` : false;
        const isRoot = ['', '/'].indexOf(url) > -1;
        const path = isRoot ? '/index.html' : url 

        try{
            return await serveStaticFiles({file: path, extension: isRoot ? 'html' : extension}, res);
        }catch(error){
            console.error(error);
            return await serveStaticFiles({
                file: '/error.html',
                extension: 'html',
                statusCode: 500
            }, res);
        }
    });

    server.on('request', ({ method, url }) => {
        const now = new Date();
        console.info(`=> ${now.toUTCString()} - ${method} ${url}`);
    });

    server.listen(PORT, () => {
        console.log(`=> ${APP_NAME} running on port ${PORT}`);
    });
}