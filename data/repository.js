const fs = require('fs');

const ENCODING = 'utf8';
const USERS_FILE_PATH = './data/users.json';
const WALLETS_FILE_PATH = './data/wallets.json';
const TRANSFERS_FILE_PATH = './data/transfers.json';


exports.users = {
    getAll: (callback) => {
        fs.readFile(USERS_FILE_PATH, ENCODING, callback);
    },
    get: (callback) => {
        fs.readFile(USERS_FILE_PATH, ENCODING, callback);
    }
}

exports.wallets = {
    getAll: (callback) => {
        fs.readFile(WALLETS_FILE_PATH, ENCODING, callback);
    },
    get: (callback) => {
        fs.readFile(WALLETS_FILE_PATH, ENCODING, callback);
    },
    update: (data, callback) => {
        fs.writeFile(WALLETS_FILE_PATH, data, callback);
    }
}

exports.transfers = {
    getAll: (callback) => {
        fs.readFile(TRANSFERS_FILE_PATH, ENCODING, callback);
    },
    update: (data, callback) => {
        fs.writeFile(TRANSFERS_FILE_PATH, data, callback);
    }
}