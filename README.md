# nodejs递归创建多层目录

在nodejs官方API中只提供了最基本的方法，只能创建单级目录，如果要创建一个多级的目录（./aaa/bbb/ccc）就只能一级一级的创建，
感觉不是很方便，因此简单写了两个支持多级目录创建的方法。nodejs递归创建目录，同步和异步方法。 

#### Javascript代码

```javascript

/**
 * Created by yujuan on 2016/5/13.
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

//递归创建文件夹（挂在到fs下面）  同步方法
fs.mkdirpSync = function (dir) {
    //把路径分割成数组
    var args = dir.split(path.sep);
    for (var i = 0; i < args.length; i++) {
        //把数组拼接成路径
        var dirname = args.slice(0, i + 1).join(path.sep);
        var exists = fs.existsSync(dirname);
        if (exists) {
            var stat = fs.statSync(dirname);
            if (stat.isDirectory()) {
                continue;
            } else {
                throw Error("父目录不能是文件");
            }
        } else {
            fs.mkdirSync(dirname);
        }
    }
};


module.exports.mkdirs = mkdirs;

module.exports.mkdirsSync = mkdirsSync;

//调用
mkdirsSync("./aa/bb/cc", null);
mkdirs("./aa/bb/cc", function (ee) {
    console.log(ee)
});
fs.mkdirpSync(path.join('a', 'b', 'c'));  

```

# nodejs二叉树遍历(深度优先和广度优先)

/*   二叉树样子示例：
   d
 /    \
l      r
/      / 
 g       h
 * */
 
## 深度优先遍历

#### javascript 代码

```javascript

//深度优先遍历   二叉树

function tranverse(dir) {
    console.log(dir);
    //同步读取文件夹下面的文件
    var files = fs.readdirSync(dir);
    //循环遍历每个子文件夹
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

//调用
tranverse("d");
//输出d、d/l 、d/l/g、d/r、d/r/h
```


## 广度优先遍历

```javascript

/*   二叉树样子示例：
   d
 /    \
o      n
 /  \    / \
 g   r   u   i
 /\  /\   /\  /\
 n a n 2  0  16  n
 /
 o
 /
 d
 /
 e
 * */
var tree= {
    value: 'd',
    left: {
        value: 'o',
        left: {
            value: 'g',
            left: {
                value: 'n',
                left: {
                    value: 'o',
                    left: {
                        value: 'd',
                        left: {value: 'e'}
                    },
                },
            },
            right: {value: 'a'}
        },
        right: {
            value: 'r',
            left: {value: 'n'},
            right: {value: '2'}
        }
    },
    right: {
        value: 'n',
        left: {
            value: 'u',
            left: {value: '0'},
            right: {
                value: '1'
            }
        },
        right: {
            value: 'i',
            left: {value: '6'},
            right: {
                value: 'n'
            }
        }
    }
};

//广度优先遍历
function levelOrderTraversal(node){
    //判断是不是一个空树
    if(!node){
        return console.log('该树是一个空树');
    };
    var TempAry=[],ary=[];
    //把树推入数组
    TempAry.push(node);
    //数组不为空
    while(TempAry.length!==0){
        //得到数组第一项
        node = TempAry.shift();
        //得到数组第一项的value值，推入新数组ary
        ary.push(node.value);
        //判断数组第一项是否存在左树和右树，如果存在递归调用
        if(node.left){TempAry.push(node.left)}
        if(node.right){TempAry.push(node.right)}
    }
    console.log('广度优先遍历：'+ary.join(''));
}
levelOrderTraversal(tree);


//先序遍历(dlr)
var dlrAry=[];
function dlr(node){
    if(node){
        dlrAry.push(node.value);
        dlr(node.left);
        dlr(node.right);
    }
}
dlr(tree);
console.log('先序遍历：'+dlrAry.join(''));

//中序遍历(ldr)
var ldrAry=[];
function ldr(node){
    if(node){
        ldr(node.left);
        ldrAry.push(node.value);
        ldr(node.right);
    }
}
ldr(tree);
console.log('中序遍历：'+ldrAry.join(''));

//后序遍历(lrd)
var lrdAry=[];
function lrd(node){
    if(node){
        lrd(node.left);
        lrd(node.right);
        lrdAry.push(node.value);
    }
}
lrd(tree);
console.log('后序遍历：'+lrdAry.join(''));

```
