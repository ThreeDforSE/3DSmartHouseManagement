function check(uid){
        var r=/^[0-9]+.?[0-9]*$/;
        if(!r.test(uid)){ //isNaN也行的,正则可以随意扩展
            alert('只能输入数字');
        }
    }