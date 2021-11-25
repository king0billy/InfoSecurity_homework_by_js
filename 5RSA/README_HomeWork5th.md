# ***#第五次信息安全概论 RSA 公钥算法作业:用js实现的RSA模拟器***
### 1. 可行性分析:
1. 技术可行性:2天之内搞定
2. 社会,法律可行性:本地应用仅供学习
### 2. 需求分析:
2021/11/25
1. 编代码实现：
- 求两个数的最大公约数。 int gcd(int a, int b)
- 判断一个数是否为素数。 bool isPrime(int a) 可以利用试除法
- 实现扩展欧几里得算法，可以计算模逆 int InvMod(int a, int m)， 该算法实现 r*a = 1 (mod m)，
- 实现函数 int ExpMod(int a, int n, int m)， 该算法实现 = a^n (mod m)
  利用上述函数，实现RSA算法，
  具有较友好的用户界面，建议使用图形界面。
  撰写简单的软件设计说明书（包括实现效果，使用md格式）
  所有数据范围在编程语言的整数范围即可。
- 手工计算 “在RSA系统中，一个给定用户的公开密钥是e=17，n=437，计算该用户的私钥，并对明文45加密。” 要求：将计算详细过程写在纸上，拍照（照片小于 500K），上传到服务器。
2. 界面需求:具有较友好的用户界面，建议使用图形界面。
3. 开放性,可拓展性需求:不作要求故不考虑
4. 其他需求:选用自己熟悉的语言实现上述要求。上交内容包括程序源代码和一份简单的实验报告（电子版本）
### 3. 概要设计:
1. 由于课题简单,故采取前端驱动设计,完全没有后端
2. 在第四次作业的htm文件和简单文档上稍作修改
### 4. 详细设计:
1. 使用html5和原生js
2. 输入以一个生成素数的范围,生成一个素数表,随机选择素数p,q和e.
3. 使用es6新增的BigInt数据类型
4. UI方面操作dom动态布局按键
5. 关键代码:
   1. 求两个数的最大公约数
   ```javaScript 
    function gcd(a, b) {
        return b == 0 ? a : gcd(b, a % b);
    }
   ```
   2. 判断一个数是否为素数
   ```javaScript    
        var PrimeArray=[2];
        let count=BigInt(document.getElementById("myCount").value);
        for(let i=2;i<count;i++){
            let j;let tag=0;
            for(j=0;j<PrimeArray.length&&PrimeArray[j]<Math.sqrt(i)+1;j++){
                if(i%PrimeArray[j]==0){tag=1;break;}
            }
            if(tag==0){PrimeArray.push(i);}
        }
        document.getElementById('result0').append("p=\t"+PrimeArray);
   ```
   3. 实现扩展欧几里得算法
   ```javaScript  
    function all(e, n) {
        var e, n, j, x, y;
        var arr = [];

        function eGcd(a, b, x, y) {
            if (b == 0n) {
                x = 1n;
                y = 0n;
                arr = [x, y]
                return arr;
            }
            var ret = eGcd(b, a % b, x, y);
            var t = ret[0n]
            x = ret[1n];
            y = t - BigInt(parseInt(a / b)) * x;
            ret = [x, y]

            return ret;
        }

        return eGcd(e, n, x, y);
    }
   ```
   4. 实现函数 int ExpMod(int a, int n, int m)， 该算法实现 = a^n (mod m)
   ```javaScript 
    function expMod(a, n, b) {
        var t

        if (n == 0n) return 1n % b;
        if (n == 1n) return a % b;

        t = expMod(a, n / 2n, b);
        t = t * t % b;

        //如果n是奇数，需要多乘一次a
        if ((n & 1n) == 1n) t = t * a % b;
        return t;

    }
   ```
### 5. 测试计划:
1. 只在本地浏览器 edge 94.0.992.31 (官方内部版本) (64 位)上测试过
### 6. 总结与展望:
1. 兼容性尚未测试,只在本地edge浏览器测试过
