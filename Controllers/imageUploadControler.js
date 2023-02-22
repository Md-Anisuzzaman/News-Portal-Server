
const fs = require('fs-extra')
const path = require('path');

const uploadFile = (file, directory = 'uploads') => {
    let image_name = file.name.split('.')[0];
    let image_extension = file.name.split('.')[1];
    file_name = directory + '/' + image_name + '-' + parseInt(Math.random() * 100000) + Date.now() + '.' + image_extension;
    const target_path = path.join(__dirname, '../') + "/" + file_name;
    try {
        fs.move(file.path, target_path, (err) => {
            console.log(err);
        });
        return file_name;
    } catch (error) {
        return '';
    }
}

exports.uploadFile = uploadFile;