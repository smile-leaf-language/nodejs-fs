/**
 * Created by yujuan on 2016/5/13.
 */

function rec(x){
    if(x!==1){
        console.log(x)
        rec(x-1)
        console.log(1,x)
    }
}
rec(5) //输出为5 4 3 2 2 3 4 5