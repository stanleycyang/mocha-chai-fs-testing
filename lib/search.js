var fs = require('fs');
exports.scan = function(dir, depth, done){
    depth--;
    var results = [];
    fs.readdir(dir, function(error, list){
        if(error) return done(error);
        var i = 0;
        (function next(){
            var file = list[i++];
            if(!file) return done(null, results);
            file = dir + '/' + file;
            fs.stat(file, function(error, stat){
                if(stat && stat.isDirectory()){
                    if(depth !== 0){
                        var ndepth = (depth > 1) ? depth-1 : 1;
                        exports.scan(file, ndepth, function(error, response){
                            results = results.concat(response);
                            next();
                        });
                    }else{
                        next();
                    }
                }else{
                    results.push(file);
                    next();
                }
            });
        })();
    });
};
