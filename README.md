# nodejs递归创建多层目录

在nodejs官方API中只提供了最基本的方法，只能创建单级目录，如果要创建一个多级的目录（./aaa/bbb/ccc）就只能一级一级的创建，
感觉不是很方便，因此简单写了两个支持多级目录创建的方法。nodejs递归创建目录，同步和异步方法。 

#### Javascript代码

```javascript

/** 
 * Created byyujuan on 16/5/13. 
 * 创建多层文件夹
 */  
  
var fs = require("fs");  
var path = require("path");  
  
//递归创建目录 异步方法  
function mkdirs(dirname, callback) {  
    fs.exists(dirname, function (exists) {  
        if (exists) {  
            callback();  
        } else {  
            //console.log(path.dirname(dirname));  
            mkdirs(path.dirname(dirname), function () {  
                fs.mkdir(dirname, callback);  
            });  
        }  
    });  
}  
  
//递归创建目录 同步方法  
function mkdirsSync(dirname) {  
    //console.log(dirname);  
    if (fs.existsSync(dirname)) {  
        return true;  
    } else {  
        if (mkdirsSync(path.dirname(dirname))) {  
            fs.mkdirSync(dirname);  
            return true;  
        }  
    }  
}  
  
module.exports.mkdirs = mkdirs;  
  
module.exports.mkdirsSync= mkdirsSync;  
  
//调用  
mkdirsSync("./aa/bb/cc" , null);  
mkdirs("./aa/bb/cc", function (ee) {  
    console.log(ee)  
});  

```
