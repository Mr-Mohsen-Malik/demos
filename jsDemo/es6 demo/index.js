import dir from 'node-dir';
import del  from 'delete';
let dirname = '/home/wittybrains/Documents/mohsen malik/es6 demo/filter/';

dir.readFiles(
    dirname,
    {
        exclude: /.css$/,
    },
     (err, content, next) =>{
        if (err) throw err;
        next();
    },
     (err, files) =>{
        if (err) throw err;
        del(files, err => {
            if (err) {
                console.log(err);
            } else {
                console.log('Done!');
            }
        });
         console.log('finished reading files:', files);
    });