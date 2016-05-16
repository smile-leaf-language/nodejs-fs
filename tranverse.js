/**
 * Created by yujuan on 2016/5/16.
 */
var fs = require("fs");
var path = require("path");

//深度优先遍历   二叉树
function tranverse(dir) {
    console.log(dir);
    var files = fs.readdirSync(dir);
    files.forEach(function (file) {
        var pathname = path.join(dir,file);
        var stat = fs.statSync(pathname);
        if(stat.isDirectory()){
            tranverse(pathname);
        }else{
            console.log(pathname);
        }
    });
};

tranverse("a");