const { dir } = require('console');
const Ftpsrv = require('ftp-srv');
const p = require('path');
require('dotenv').config();

const dirPath = p.resolve(__dirname, 'ftproot');
console.log(dirPath)

const ftpserver = new Ftpsrv({
    url: "ftp://" + process.env.IP + ":" + process.env.PORT,
    anonymous: true
});

ftpserver.on('login', ({ connection, username, password }, resolve, reject) => {
    if (username === process.env.USER && password === process.env.PASSWD) {
        return resolve({ root: `${dirPath}` });
    }
    return reject(new error.GeneralError('Invalid username and/or password'));
});

ftpserver.listen().then(() => {
    console.log('ftp server is running at: ' + process.env.IP + ':' + process.env.PORT);
});