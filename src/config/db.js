const mongoose = require('mongoose');
const connection = mongoose.connect('mongodb+srv://dadhichvikram9_db_user:6L1rZZQL5WIXSPYX@cluster0.4x8xosx.mongodb.net/guru?appName=Cluster0').then((value) => {
    console.log('Db is Connected!!');
});

module.exports = connection;
