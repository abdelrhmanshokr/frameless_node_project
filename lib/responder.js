const { open } = require(fs).promises;
const { STATIC_EXTENSIONS } = require('../congif/constatns');


const serveStaticFiles = async({file, extension, statusCode }, res) => {
    // file is the path to the file 
    // extension is the extension of that file 
    // and status code is a way to overright the status code 
    if(STATIC_EXTENSIONS.indexOf(extension) === -1) throw new Error('not found !!')

    let fileHandle;

    try{
        fileHandle = await open(`./public/${file}`, 'r');
        const staticFile = await fileHandle.readFile();

        return res.end(staticFile);
    }catch(error){
        console.error(error);
        throw new Error('not found!!');
    }finally{
        if(fileHandle) fileHandle.close;
    }
};

module.exports = serveStaticFiles;