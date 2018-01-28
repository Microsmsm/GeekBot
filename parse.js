const yaml = require('js-yaml')
const fs = require('fs')

function doMagic() {
    const result = [];
    fs.readdir('./posts', (err, filenames) => {
        if (err) {
            console.log(err);
            return;
        }
        filenames.forEach(function (filename) {
            const res = yaml.safeLoad(fs.readFileSync('posts/' + filename, 'utf8'))
            result.push(res)
        });
        const content = JSON.stringify(result,null,4);
    fs.writeFile('posts.json', content, 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    })
    });

    

}


doMagic();
