const Busboy = require('busboy');
const { join, dirname, extname } = require('path');
const { existsSync, mkdirSync, createWriteStream } = require('fs');
const mkdir = path => {
  if (existsSync(path)){
    return true;
  } else {
    if (mkdir(dirname(path))){
      mkdirSync(path);
      return true;
    }
  }
};
const uploadFile = ctx => {
  const { req, req: { headers }, res } = ctx;
  const busboy = new Busboy({ headers });
  const serverFilePath = join(__dirname, '../static/image');
  const mkdirResult = mkdir(serverFilePath);

  return new Promise((resolve, reject) => {
    console.log('loadding...');

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      const fileName = Math.random().toString(16).substr(2) + '.' + extname(filename);
      const saveTo = join(serverFilePath, fileName);
      console.log(saveTo)
      file.pipe(createWriteStream(saveTo));
      file.on('end', () => {
        console.log('upload success');
        resolve({
          success: true,
          message: 'upload success',
          data: {
            pictureUrl: `//${ctx.host}/image/${fileName}`
          }
        });
      });
    });
    busboy.on('finish', () => {
      console.log('upload finish');
      resolve(1);
    });
    busboy.on('error', err => {
      console.log('upload error');
      reject(2);
    });
    req.pipe(busboy);
  });
};

module.exports = uploadFile;