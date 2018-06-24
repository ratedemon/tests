const folders = require('./folders');

// do your stuff

const fs = require('fs');
const path = require('path');

const DEFAULT_FOLDER = 'MMMMM';

console.log('Parse has started...');

const new_folders = folders.sort((a,b) => {
    return ('' + a.name).localeCompare(b.name);
}).map(el => {
    el.temp_path = el.name.split('');

    el.path = el.temp_path.reduce((obj, item) => {

        if(obj[obj.length - 1] == '/' && item == '/'){
            obj.push(DEFAULT_FOLDER);
        }else{
            obj.push(item);
        }

        return obj;
    }, []).join('');

    el.temp_path = el.path.concat('/www');
    return el;
});

new_folders.forEach((el, i) => {
    let directory = path.parse(path.dirname(el.temp_path));

    let index = new_folders.findIndex(el => el.path === directory.dir);

    if(index != -1){
        new_folders[index].sub_folders.push(directory.name);
    }

    ensureDirectoryExistence(el.temp_path);

    // fs.mkdir(el.path, (err)=>{
    //     console.log(el.path, err);
    // })

    // el.temp_path.forEach((item, i, arr) => {
    //     let str = arr.splice(0, i+1);
    //     // console.log(str, item, i);
    //     // console.log(arr, i);
    //
    //     if(!fs.existsSync(item)){
    //
    //     }
    // });
});

const objects = new_folders.map(el => {
    delete el.path;
    delete el.temp_path;

    return el;
});

const json = JSON.stringify(objects);

fs.writeFile('sorted-folders.json', json, 'utf8');

function ensureDirectoryExistence(filePath) {
    var dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
}

