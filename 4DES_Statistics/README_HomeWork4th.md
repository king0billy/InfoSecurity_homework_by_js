# ***用js实现的DES统计分析器***
### 1. 可行性分析:
1. 技术可行性:1天之内搞定
2. 社会,法律可行性:本地应用仅供学习
### 2. 需求分析:
1. 利用DES源代码实现下面功能：
   1. 统计DES算法在密钥固定情况，输入明文改变1位、2位，。。。64位时。输出密文位数改变情况。
   2. 统计DES算法在明文固定情况，输入密钥改变1位、2位，。。。64位时。输出密文位数改变情况。
      为了具有客观性，各小题需要对多次进行统计，并计算其平均值。
2. 界面需求:具有较友好的用户界面，建议使用图形界面。
3. 开放性,可拓展性需求:不作要求故不考虑
4. 其他需求:选用自己熟悉的语言实现上述要求。上交内容包括程序源代码和一份简单的实验报告（电子版本）
### 3. 概要设计:
1. 由于课题简单,故采取前端驱动设计,完全没有后端
2. 在郝老师提供的js文件基础上直接修改,在第三次作业的htm文件和简单文档上稍作修改
### 4. 详细设计:
1. 使用html5和原生js
2. 看不太明白郝老师提供的des算法为什么解密后的明文只有64位，长度是加密前的一半
3. 关键代码:
   1. blob通过模拟点击url下载
   ```javaScript 
   downloadFileByBase64(new Blob([new Int8Array(myResult).buffer]), '', file1.files[0].name.match(/^(\S*)\./)[1]+
   Math.round(Math.random()*100)+'.'+file1.files[0].name.match(/\.(\S*)$/)[1]);
   ```
   2. 改变count位
   ```javaScript    
      function changeBit(arr,count){
      let copy = [...arr]
      let [...bit64Copy]=bit64
      for(let i=0,temp=0;i<count;i++){
      temp=Math.floor(Math.random()*bit64Copy.length)//Math.floor=new Integer
      copy[bit64Copy[temp]]^=1
      bit64Copy.splice(temp,1)
      }
      return copy
      }
   ```
   3. 根据异或比较两个64个index的int数组有几个index不同
   ```javaScript  
    function compareBit(oldOne,newOne){//o(n),都是对字符数组进行操作
        let sum=0
        if(oldOne.length!=newOne.length)return -1
        for(let i=0;i<oldOne.length;i++){
            if(oldOne[i]^newOne[i]===1)sum++
        }
        return sum
    }
   ```
   4. “全局“变量 和 点击“des加密”的“主”函数事件
   ```javaScript 
   document.getElementById("des_encrypt").onclick=function(){
       document.getElementById('result').innerHTML=' '
       myTest(document.getElementById("myMessage").value,document.getElementById("myKey").value,document.getElementById("myCount").value);
   }
   
    let bit64= new Array(64)//顺序可用链表摘取好一点,但是js的数组可以很灵活了属于是
    for(let i=0;i<64;i++){
        bit64[i]=i
    }
    let changeKey2Show=new Array(65).fill(0)
    let changeMessage2Show=new Array(65).fill(0)
        let keyB2,bt2
        for(let i=0,j=0;i<=64;i++){
            for(j=0;j<myCount;j++){
                keyB2=changeBit(keyB,i)
                bt2=changeBit(bt,i)
                changeKey2Show[i]+=compareBit(enc(bt,keyB2),encByte)
                changeMessage2Show[i]+=compareBit(enc(bt2,keyB),encByte)
            }
            changeKey2Show[i]/=myCount
            changeMessage2Show[i]/=myCount
        }
   ```
### 5. 测试计划:
1. 只在本地浏览器 edge 94.0.992.31 (官方内部版本) (64 位)上测试过
### 6. 总结与展望:
1. 兼容性尚未测试,只在本地edge浏览器测试过
