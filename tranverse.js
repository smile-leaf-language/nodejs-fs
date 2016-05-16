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

// 广度优先遍历  二叉树

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