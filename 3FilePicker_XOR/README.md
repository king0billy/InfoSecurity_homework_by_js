# ***用js实现的文件异或器***
### 1. 可行性分析:
   1. 技术可行性:1个星期内搞定
   2. 社会,法律可行性:本地应用仅供学习
### 2. 需求分析:
   1. 功能需求:选择文件,对文件二进制流进行异或运算
   2. 界面需求:具有较友好的用户界面，建议使用图形界面。
   3. 开放性,可拓展性需求:不作要求故不考虑
   4. 其他需求:
      1. 撰写简单的软件设计说明书
      2. 使用git进行管理
      3. 继续熟悉Git操作
### 3. 概要设计:
   1. 由于课题简单,故采取前端驱动设计,完全没有后端
   2. 文件全部转成byte数组再进行异或,这样文件在磁盘上的粒度和数组的粒度一致,无需进行额外处理直接异或
### 4. 详细设计:
   1. 使用html5和原生js
   2. 文件是一次性全部读入内存操作
   3. 关键代码:
      1. blob通过模拟点击url下载
         ```javaScript 
         downloadFileByBase64(new Blob([new Int8Array(myResult).buffer]), '', file1.files[0].name.match(/^(\S*)\./)[1]+
         Math.round(Math.random()*100)+'.'+file1.files[0].name.match(/\.(\S*)$/)[1]);
         ```
      2. 加密
         ```javaScript    
         for(let i=0,j=0;i<file2Memory.length;){
            for(j=0;j<secretKey.length&&i+j<file2Memory.length;j++){
            myResult.push(secretKey[j]^file2Memory[i+j]);
            }
            i+=j;
         }
         ```
      3. file(blob子类)->arrayBuffer->int8Array1
         ```javaScript  
            var reader = new FileReader();
            var file2Memory;
            var secretKey;
            var myResult=[];
            var myResult2=[];
            var file1 = document.getElementById('fileId');
            file1.onchange = function () {
            var file = file1.files[0];
            //读取为二进制
            reader.readAsArrayBuffer(file);
            //显示进度
            var pro = document.getElementById('pro');
            pro.max = file.size;
            pro.value = 0;
            reader.onprogress = function (e) {
            pro.value = e.loaded;
            }
            reader.onload = function () {
            file2Memory = new Int8Array(reader.result);
            }
            }
         ```
      4. string->blob->arrayBuffer->int8Array
         ```javaScript 
            var reader2=new FileReader() var b = new Blob([document.getElementById("myKey").value]);
            reader2.readAsArrayBuffer(b);
            reader2.onload = function () {
            secretKey=new Int8Array(reader2.result)}
         ```
### 5. 测试计划:
   1. 只在本地浏览器 edge 94.0.992.31 (官方内部版本) (64 位)上测试过
   2. 选择了一个1k的txt,一个15k的xlsx文件和一个30M的msi文件,结果正常,由于异或的过程没有进度条30m的文件只能干等
### 6. 总结与展望:
   1. 兼容性尚未测试,只在本地edge浏览器测试过
   2. 文件是一次性全部读入内存操作,因此大文件必定卡顿,甚至发生内存溢出
