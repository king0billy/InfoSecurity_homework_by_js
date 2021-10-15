/* DES加密/解密
* @Copyright Copyright (c) 2006
* @author Guapo
* @see DESCore
*
* @comment  中文注释有 cshao@gdut.edu.cn 增加，目的是帮助学生理解该算法实现原理。
*/

/*
* encrypt the string to string made up of hex
* return the encrypted string
*/

/*
*  使用三个密钥对输入数据 data 进行加密。如果三个密钥都存在，则用三个密钥连续加密三次。如果只存在两个密钥则连续加密两次。
*
*/
function strEnc(data,firstKey,secondKey,thirdKey){

    var leng = data.length;
    var encData = "";
    var firstKeyBt,secondKeyBt,thirdKeyBt,firstLength,secondLength,thirdLength;
    if(firstKey != null && firstKey != ""){
      firstKeyBt = getKeyBytes(firstKey);
      firstLength = firstKeyBt.length;
    }
    if(secondKey != null && secondKey != ""){
      secondKeyBt = getKeyBytes(secondKey);
      secondLength = secondKeyBt.length;
    }
    if(thirdKey != null && thirdKey != ""){
      thirdKeyBt = getKeyBytes(thirdKey);
      thirdLength = thirdKeyBt.length;
    }

   // 输入数据非空则加密
    if(leng > 0){
		// 如果明文信息小于4个字符（小于一个分块，一个js字符占用两个字节），则直接加密
      if(leng < 4){
        var bt = strToBt(data);
        var encByte ;
		// 下面按照三个密钥都存在情况进行加密，
        if(firstKey != null && firstKey !="" && secondKey != null && secondKey != "" && thirdKey != null && thirdKey != ""){
          var tempBt;
          var x,y,z;
          tempBt = bt;
          for(x = 0;x < firstLength ;x ++){
            tempBt = enc(tempBt,firstKeyBt[x]);
          }
          for(y = 0;y < secondLength ;y ++){
            tempBt = enc(tempBt,secondKeyBt[y]);
          }
          for(z = 0;z < thirdLength ;z ++){
            tempBt = enc(tempBt,thirdKeyBt[z]);
          }
          encByte = tempBt;
        }else{
			// 按照前两个密钥存在情况加密，注意如果第一个和第三个密钥存在，但第二个密钥不存在时不再这种类型中。
          if(firstKey != null && firstKey !="" && secondKey != null && secondKey != ""){
            var tempBt;
            var x,y;
            tempBt = bt;
            for(x = 0;x < firstLength ;x ++){
              tempBt = enc(tempBt,firstKeyBt[x]);
            }
            for(y = 0;y < secondLength ;y ++){
              tempBt = enc(tempBt,secondKeyBt[y]);
            }
            encByte = tempBt;
          }else{
			  // 只有一个密钥的情况，
            if(firstKey != null && firstKey !=""){
              var tempBt;
              var x = 0;
              tempBt = bt;
              for(x = 0;x < firstLength ;x ++){
                tempBt = enc(tempBt,firstKeyBt[x]);
              }
              encByte = tempBt;
            }
          }
        }
        encData = bt64ToHex(encByte);
      }else{
		  // 明文长度大于一个分块，则进行迭代
        var iterator = parseInt(leng/4);  // 迭代次数
        var remainder = leng%4;  // 最后一个分块长度
        var i=0;

		// 对于整块的进行迭代
        for(i = 0;i < iterator;i++){
          var tempData = data.substring(i*4+0,i*4+4);
          var tempByte = strToBt(tempData);
          var encByte ;
          if(firstKey != null && firstKey !="" && secondKey != null && secondKey != "" && thirdKey != null && thirdKey != ""){
            var tempBt;
            var x,y,z;
            tempBt = tempByte;
            for(x = 0;x < firstLength ;x ++){
              tempBt = enc(tempBt,firstKeyBt[x]);
            }
            for(y = 0;y < secondLength ;y ++){
              tempBt = enc(tempBt,secondKeyBt[y]);
            }
            for(z = 0;z < thirdLength ;z ++){
              tempBt = enc(tempBt,thirdKeyBt[z]);
            }
            encByte = tempBt;
          }else{
            if(firstKey != null && firstKey !="" && secondKey != null && secondKey != ""){
              var tempBt;
              var x,y;
              tempBt = tempByte;
              for(x = 0;x < firstLength ;x ++){
                tempBt = enc(tempBt,firstKeyBt[x]);
              }
              for(y = 0;y < secondLength ;y ++){
                tempBt = enc(tempBt,secondKeyBt[y]);
              }
              encByte = tempBt;
            }else{
              if(firstKey != null && firstKey !=""){
                var tempBt;
                var x;
                tempBt = tempByte;
                for(x = 0;x < firstLength ;x ++){
                  tempBt = enc(tempBt,firstKeyBt[x]);
                }
                encByte = tempBt;
              }
            }
          }
          encData += bt64ToHex(encByte);
        }

		// 如果剩余短块，加密短块
        if(remainder > 0){
          var remainderData = data.substring(iterator*4+0,leng);
          var tempByte = strToBt(remainderData);
          var encByte ;
          if(firstKey != null && firstKey !="" && secondKey != null && secondKey != "" && thirdKey != null && thirdKey != ""){
            var tempBt;
            var x,y,z;
            tempBt = tempByte;
            for(x = 0;x < firstLength ;x ++){
              tempBt = enc(tempBt,firstKeyBt[x]);
            }
            for(y = 0;y < secondLength ;y ++){
              tempBt = enc(tempBt,secondKeyBt[y]);
            }
            for(z = 0;z < thirdLength ;z ++){
              tempBt = enc(tempBt,thirdKeyBt[z]);
            }
            encByte = tempBt;
          }else{
            if(firstKey != null && firstKey !="" && secondKey != null && secondKey != ""){
              var tempBt;
              var x,y;
              tempBt = tempByte;
              for(x = 0;x < firstLength ;x ++){
                tempBt = enc(tempBt,firstKeyBt[x]);
              }
              for(y = 0;y < secondLength ;y ++){
                tempBt = enc(tempBt,secondKeyBt[y]);
              }
              encByte = tempBt;
            }else{
              if(firstKey != null && firstKey !=""){
                var tempBt;
                var x;
                tempBt = tempByte;
                for(x = 0;x < firstLength ;x ++){
                  tempBt = enc(tempBt,firstKeyBt[x]);
                }
                encByte = tempBt;
              }
            }
          }
          encData += bt64ToHex(encByte);
        }
      }
    }
    return encData;
   }

   /*
   * decrypt the encrypted string to the original string
   *
   * return  the original string
   */

   // 解密操作，类似加密
   function strDec(data,firstKey,secondKey,thirdKey){
    var leng = data.length;
    var decStr = "";
    var firstKeyBt,secondKeyBt,thirdKeyBt,firstLength,secondLength,thirdLength;
    if(firstKey != null && firstKey != ""){
      firstKeyBt = getKeyBytes(firstKey);
      firstLength = firstKeyBt.length;
    }
    if(secondKey != null && secondKey != ""){
      secondKeyBt = getKeyBytes(secondKey);
      secondLength = secondKeyBt.length;
    }
    if(thirdKey != null && thirdKey != ""){
      thirdKeyBt = getKeyBytes(thirdKey);
      thirdLength = thirdKeyBt.length;
    }

    var iterator = parseInt(leng/16);
    var i=0;
    for(i = 0;i < iterator;i++){
      var tempData = data.substring(i*16+0,i*16+16);
      var strByte = hexToBt64(tempData);
      var intByte = new Array(64);
      var j = 0;
      for(j = 0;j < 64; j++){
        intByte[j] = parseInt(strByte.substring(j,j+1));
      }
      var decByte;
      if(firstKey != null && firstKey !="" && secondKey != null && secondKey != "" && thirdKey != null && thirdKey != ""){
        var tempBt;
        var x,y,z;
        tempBt = intByte;
        for(x = thirdLength - 1;x >= 0;x --){
          tempBt = dec(tempBt,thirdKeyBt[x]);
        }
        for(y = secondLength - 1;y >= 0;y --){
          tempBt = dec(tempBt,secondKeyBt[y]);
        }
        for(z = firstLength - 1;z >= 0 ;z --){
          tempBt = dec(tempBt,firstKeyBt[z]);
        }
        decByte = tempBt;
      }else{
        if(firstKey != null && firstKey !="" && secondKey != null && secondKey != ""){
          var tempBt;
          var x,y,z;
          tempBt = intByte;
          for(x = secondLength - 1;x >= 0 ;x --){
            tempBt = dec(tempBt,secondKeyBt[x]);
          }
          for(y = firstLength - 1;y >= 0 ;y --){
            tempBt = dec(tempBt,firstKeyBt[y]);
          }
          decByte = tempBt;
        }else{
          if(firstKey != null && firstKey !=""){
            var tempBt;
            var x,y,z;
            tempBt = intByte;
            for(x = firstLength - 1;x >= 0 ;x --){
              tempBt = dec(tempBt,firstKeyBt[x]);
            }
            decByte = tempBt;
          }
        }
      }
      decStr += byteToString(decByte);
    }
    return decStr;
   }
   /*
   * chang the string into the bit array
   *
   * return bit array(it's length % 64 = 0)
   */
   //
   function getKeyBytes(key){
    var keyBytes = new Array();
    var leng = key.length;
    var iterator = parseInt(leng/4);
    var remainder = leng%4;
    var i = 0;
    for(i = 0;i < iterator; i ++){
      keyBytes[i] = strToBt(key.substring(i*4+0,i*4+4));
    }
    if(remainder > 0){
      keyBytes[i] = strToBt(key.substring(i*4+0,leng));
    }
    return keyBytes;
   }

   /*
   * chang the string(it's length <= 4) into the bit array
   *
   * return bit array(it's length = 64)
   */

   // 将一个长度小于4字符的字符串转换为64位的位串
   function strToBt(str){
    var leng = str.length;
    var bt = new Array(64);
    if(leng < 4){
      var i=0,j=0,p=0,q=0;
      for(i = 0;i<leng;i++){
        var k = str.charCodeAt(i);
        for(j=0;j<16;j++){
          var pow=1,m=0;
          for(m=15;m>j;m--){
            pow *= 2;
          }
          bt[16*i+j]=parseInt(k/pow)%2;
        }
      }
      for(p = leng;p<4;p++){
        var k = 0;
        for(q=0;q<16;q++){
          var pow=1,m=0;
          for(m=15;m>q;m--){
            pow *= 2;
          }
          bt[16*p+q]=parseInt(k/pow)%2;
        }
      }
    }else{
      for(i = 0;i<4;i++){
        var k = str.charCodeAt(i);
        for(j=0;j<16;j++){
          var pow=1;
          for(m=15;m>j;m--){
            pow *= 2;
          }
          bt[16*i+j]=parseInt(k/pow)%2;
        }
      }
    }
    return bt;
   }

   /*
   * chang the bit(it's length = 4) into the hex
   *
   * return hex
   */

   // 将4位的位串字符串转换位它的16进制形式
   function bt4ToHex(binary) {
    var hex;
    switch (binary) {
      case "0000" : hex = "0"; break;
      case "0001" : hex = "1"; break;
      case "0010" : hex = "2"; break;
      case "0011" : hex = "3"; break;
      case "0100" : hex = "4"; break;
      case "0101" : hex = "5"; break;
      case "0110" : hex = "6"; break;
      case "0111" : hex = "7"; break;
      case "1000" : hex = "8"; break;
      case "1001" : hex = "9"; break;
      case "1010" : hex = "A"; break;
      case "1011" : hex = "B"; break;
      case "1100" : hex = "C"; break;
      case "1101" : hex = "D"; break;
      case "1110" : hex = "E"; break;
      case "1111" : hex = "F"; break;
    }
    return hex;
   }

   /*
   * chang the hex into the bit(it's length = 4)
   *
   * return the bit(it's length = 4)
   */

   // 将一位16进制数字转换为它的二进制字符串形式
   function hexToBt4(hex) {
    var binary;
    switch (hex) {
      case "0" : binary = "0000"; break;
      case "1" : binary = "0001"; break;
      case "2" : binary = "0010"; break;
      case "3" : binary = "0011"; break;
      case "4" : binary = "0100"; break;
      case "5" : binary = "0101"; break;
      case "6" : binary = "0110"; break;
      case "7" : binary = "0111"; break;
      case "8" : binary = "1000"; break;
      case "9" : binary = "1001"; break;
      case "A" : binary = "1010"; break;
      case "B" : binary = "1011"; break;
      case "C" : binary = "1100"; break;
      case "D" : binary = "1101"; break;
      case "E" : binary = "1110"; break;
      case "F" : binary = "1111"; break;
    }
    return binary;
   }

   /*
   * chang the bit(it's length = 64) into the string
   *
   * return string
   */
   function byteToString(byteData){
    var str="";
    for(i = 0;i<4;i++){
      var count=0;
      for(j=0;j<16;j++){
        var pow=1;
        for(m=15;m>j;m--){
          pow*=2;
        }
        count+=byteData[16*i+j]*pow;
      }
      if(count != 0){
        str+=String.fromCharCode(count);
      }
    }
    return str;
   }

   // 将64位的位串转换位它的16进制形式供16个字符（4位二进制对应一个16进制字符），主要是为了显示分组数据
   function bt64ToHex(byteData){
    var hex = "";
    for(i = 0;i<16;i++){
      var bt = "";
      for(j=0;j<4;j++){
        bt += byteData[i*4+j];
      }
      hex+=bt4ToHex(bt);
    }
    return hex;
   }

   // 16个16进制数据转换为64位二进制形式
   function hexToBt64(hex){
    var binary = "";
    for(i = 0;i<16;i++){
      binary+=hexToBt4(hex.substring(i,i+1));
    }
    return binary;
   }

   /*
   * the 64 bit des core arithmetic
   */

   // des 加密算法。
   // dataByte是明文数据
   // keyByte是密钥数据
   function enc(dataByte,keyByte){
    var keys = generateKeys(keyByte);     // 密钥扩展
    var ipByte   = initPermute(dataByte);  // 初始值换
    var ipLeft   = new Array(32);			// 左半部分输入
    var ipRight  = new Array(32);			// 右半部分输入
    var tempLeft = new Array(32);
    var i = 0,j = 0,k = 0,m = 0, n = 0;

	// 将初始置换后的输入数据分为左右两半
    for(k = 0;k < 32;k ++){
      ipLeft[k] = ipByte[k];
      ipRight[k] = ipByte[32+k];
    }

	// 进行16次迭代
    for(i = 0;i < 16;i ++){

		// 交换左右数据
      for(j = 0;j < 32;j ++){
        tempLeft[j] = ipLeft[j];
        ipLeft[j] = ipRight[j];
      }

	  //  得到轮密钥
      var key = new Array(48);
      for(m = 0;m < 48;m ++){
        key[m] = keys[i][m];
      }

	  // 对右半部分加密（参看教材P53 图3-1, Xor 内部第一个参数是 f 函数）
	  // f 函数包含 扩展置换，密钥异或，Sbox替代和P置换
      var  tempRight = xor(pPermute(sBoxPermute(xor(expandPermute(ipRight),key))), tempLeft);
      for(n = 0;n < 32;n ++){
        ipRight[n] = tempRight[n];
      }

    }

   // 得到最后加密数据
    var finalData =new Array(64);
    for(i = 0;i < 32;i ++){
      finalData[i] = ipRight[i];
      finalData[32+i] = ipLeft[i];
    }
    return finallyPermute(finalData);
   }

   // DES 解密
   function dec(dataByte,keyByte){
    var keys = generateKeys(keyByte);
    var ipByte   = initPermute(dataByte);
    var ipLeft   = new Array(32);
    var ipRight  = new Array(32);
    var tempLeft = new Array(32);
    var i = 0,j = 0,k = 0,m = 0, n = 0;
    for(k = 0;k < 32;k ++){
      ipLeft[k] = ipByte[k];
      ipRight[k] = ipByte[32+k];
    }
    for(i = 15;i >= 0;i --){
      for(j = 0;j < 32;j ++){
        tempLeft[j] = ipLeft[j];
        ipLeft[j] = ipRight[j];
      }
      var key = new Array(48);
      for(m = 0;m < 48;m ++){
        key[m] = keys[i][m];
      }

      var  tempRight = xor(pPermute(sBoxPermute(xor(expandPermute(ipRight),key))), tempLeft);
      for(n = 0;n < 32;n ++){
        ipRight[n] = tempRight[n];
      }
    }


    var finalData =new Array(64);
    for(i = 0;i < 32;i ++){
      finalData[i] = ipRight[i];
      finalData[32+i] = ipLeft[i];
    }
    return finallyPermute(finalData);
   }

   // 初始置换 教材 P54 图 3-5 ，表中规律是：左边部分（上面4行）是偶数位，右半部分是原始数据的奇数位
   // 注意观察规律，表格竖着每一列是一个字节的数据，横着看，每一行的数据是由高字节到低字节。
   function initPermute(originalData){
    var ipByte = new Array(64);
	// 左右部分各有四行，所以迭代变量 i 是0~4。m，n记录奇数位和偶数位，所以增加量是2
    for (i = 0, m = 1, n = 0; i < 4; i++, m += 2, n += 2) {
		// 由高字节到低字节所以 j 从7~0，k记录输出位置
      for (j = 7, k = 0; j >= 0; j--, k++) {
		  // 左半部分（上面4行）
        ipByte[i * 8 + k] = originalData[j * 8 + m];
        ipByte[i * 8 + k + 32] = originalData[j * 8 + n];
      }
    }
    return ipByte;
   }

   // 扩展置换
   function expandPermute(rightData){
    var epByte = new Array(48);
    for (i = 0; i < 8; i++) {
		// 借用左边的一位
      if (i == 0) {
        epByte[i * 6 + 0] = rightData[31];
      } else {
        epByte[i * 6 + 0] = rightData[i * 4 - 1];
      }
	  // 中间四位不变
      epByte[i * 6 + 1] = rightData[i * 4 + 0];
      epByte[i * 6 + 2] = rightData[i * 4 + 1];
      epByte[i * 6 + 3] = rightData[i * 4 + 2];
      epByte[i * 6 + 4] = rightData[i * 4 + 3];

	  // 借用右边的一位
      if (i == 7) {
        epByte[i * 6 + 5] = rightData[0];
      } else {
        epByte[i * 6 + 5] = rightData[i * 4 + 4];
      }
    }
    return epByte;
   }

   function xor(byteOne,byteTwo){
    var xorByte = new Array(byteOne.length);
    for(i = 0;i < byteOne.length; i ++){
      xorByte[i] = byteOne[i] ^ byteTwo[i];
    }
    return xorByte;
   }

   // Sbox 替代
   function sBoxPermute(expandByte){

      var sBoxByte = new Array(32);
      var binary = "";
      var s1 = [
          [14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7],
          [0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8],
          [4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0],
          [15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13 ]];

          /* Table - s2 */
      var s2 = [
          [15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10],
          [3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5],
          [0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15],
          [13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9 ]];

          /* Table - s3 */
      var s3= [
          [10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8],
          [13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1],
          [13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7],
          [1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12 ]];
          /* Table - s4 */
      var s4 = [
          [7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15],
          [13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9],
          [10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4],
          [3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14 ]];

          /* Table - s5 */
      var s5 = [
          [2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9],
          [14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6],
          [4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14],
          [11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3 ]];

          /* Table - s6 */
      var s6 = [
          [12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11],
          [10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8],
          [9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6],
          [4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13 ]];

          /* Table - s7 */
      var s7 = [
          [4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1],
          [13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6],
          [1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2],
          [6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12]];

          /* Table - s8 */
      var s8 = [
          [13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7],
          [1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2],
          [7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8],
          [2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11]];

      for(m=0;m<8;m++){
		  // i,j 分别记录每个Sbox 的行列值

      var i=0,j=0;
      i = expandByte[m*6+0]*2+expandByte[m*6+5];  // 首位两位组成行坐标，
      j = expandByte[m * 6 + 1] * 2 * 2 * 2     // 中间四位组成类坐标，
        + expandByte[m * 6 + 2] * 2* 2
        + expandByte[m * 6 + 3] * 2
        + expandByte[m * 6 + 4];
      switch (m) {
        case 0 :
          binary = getBoxBinary(s1[i][j]);
          break;
        case 1 :
          binary = getBoxBinary(s2[i][j]);
          break;
        case 2 :
          binary = getBoxBinary(s3[i][j]);
          break;
        case 3 :
          binary = getBoxBinary(s4[i][j]);
          break;
        case 4 :
          binary = getBoxBinary(s5[i][j]);
          break;
        case 5 :
          binary = getBoxBinary(s6[i][j]);
          break;
        case 6 :
          binary = getBoxBinary(s7[i][j]);
          break;
        case 7 :
          binary = getBoxBinary(s8[i][j]);
          break;
      }

	  // 将0~16 的整数解析位它的2进制数据
	  // 先用getBoxBinary（）将数字变为二进制串binary
	  // 再取处串的每一位字符，binary.substring
	  // 再解析处数据 parseInt
      sBoxByte[m*4+0] = parseInt(binary.substring(0,1));  //
      sBoxByte[m*4+1] = parseInt(binary.substring(1,2));
      sBoxByte[m*4+2] = parseInt(binary.substring(2,3));
      sBoxByte[m*4+3] = parseInt(binary.substring(3,4));
    }
    return sBoxByte;
   }

   function pPermute(sBoxByte){
    var pBoxPermute = new Array(32);
    pBoxPermute[ 0] = sBoxByte[15];
    pBoxPermute[ 1] = sBoxByte[ 6];
    pBoxPermute[ 2] = sBoxByte[19];
    pBoxPermute[ 3] = sBoxByte[20];
    pBoxPermute[ 4] = sBoxByte[28];
    pBoxPermute[ 5] = sBoxByte[11];
    pBoxPermute[ 6] = sBoxByte[27];
    pBoxPermute[ 7] = sBoxByte[16];
    pBoxPermute[ 8] = sBoxByte[ 0];
    pBoxPermute[ 9] = sBoxByte[14];
    pBoxPermute[10] = sBoxByte[22];
    pBoxPermute[11] = sBoxByte[25];
    pBoxPermute[12] = sBoxByte[ 4];
    pBoxPermute[13] = sBoxByte[17];
    pBoxPermute[14] = sBoxByte[30];
    pBoxPermute[15] = sBoxByte[ 9];
    pBoxPermute[16] = sBoxByte[ 1];
    pBoxPermute[17] = sBoxByte[ 7];
    pBoxPermute[18] = sBoxByte[23];
    pBoxPermute[19] = sBoxByte[13];
    pBoxPermute[20] = sBoxByte[31];
    pBoxPermute[21] = sBoxByte[26];
    pBoxPermute[22] = sBoxByte[ 2];
    pBoxPermute[23] = sBoxByte[ 8];
    pBoxPermute[24] = sBoxByte[18];
    pBoxPermute[25] = sBoxByte[12];
    pBoxPermute[26] = sBoxByte[29];
    pBoxPermute[27] = sBoxByte[ 5];
    pBoxPermute[28] = sBoxByte[21];
    pBoxPermute[29] = sBoxByte[10];
    pBoxPermute[30] = sBoxByte[ 3];
    pBoxPermute[31] = sBoxByte[24];
    return pBoxPermute;
   }

   function finallyPermute(endByte){
    var fpByte = new Array(64);
    fpByte[ 0] = endByte[39];
    fpByte[ 1] = endByte[ 7];
    fpByte[ 2] = endByte[47];
    fpByte[ 3] = endByte[15];
    fpByte[ 4] = endByte[55];
    fpByte[ 5] = endByte[23];
    fpByte[ 6] = endByte[63];
    fpByte[ 7] = endByte[31];
    fpByte[ 8] = endByte[38];
    fpByte[ 9] = endByte[ 6];
    fpByte[10] = endByte[46];
    fpByte[11] = endByte[14];
    fpByte[12] = endByte[54];
    fpByte[13] = endByte[22];
    fpByte[14] = endByte[62];
    fpByte[15] = endByte[30];
    fpByte[16] = endByte[37];
    fpByte[17] = endByte[ 5];
    fpByte[18] = endByte[45];
    fpByte[19] = endByte[13];
    fpByte[20] = endByte[53];
    fpByte[21] = endByte[21];
    fpByte[22] = endByte[61];
    fpByte[23] = endByte[29];
    fpByte[24] = endByte[36];
    fpByte[25] = endByte[ 4];
    fpByte[26] = endByte[44];
    fpByte[27] = endByte[12];
    fpByte[28] = endByte[52];
    fpByte[29] = endByte[20];
    fpByte[30] = endByte[60];
    fpByte[31] = endByte[28];
    fpByte[32] = endByte[35];
    fpByte[33] = endByte[ 3];
    fpByte[34] = endByte[43];
    fpByte[35] = endByte[11];
    fpByte[36] = endByte[51];
    fpByte[37] = endByte[19];
    fpByte[38] = endByte[59];
    fpByte[39] = endByte[27];
    fpByte[40] = endByte[34];
    fpByte[41] = endByte[ 2];
    fpByte[42] = endByte[42];
    fpByte[43] = endByte[10];
    fpByte[44] = endByte[50];
    fpByte[45] = endByte[18];
    fpByte[46] = endByte[58];
    fpByte[47] = endByte[26];
    fpByte[48] = endByte[33];
    fpByte[49] = endByte[ 1];
    fpByte[50] = endByte[41];
    fpByte[51] = endByte[ 9];
    fpByte[52] = endByte[49];
    fpByte[53] = endByte[17];
    fpByte[54] = endByte[57];
    fpByte[55] = endByte[25];
    fpByte[56] = endByte[32];
    fpByte[57] = endByte[ 0];
    fpByte[58] = endByte[40];
    fpByte[59] = endByte[ 8];
    fpByte[60] = endByte[48];
    fpByte[61] = endByte[16];
    fpByte[62] = endByte[56];
    fpByte[63] = endByte[24];
    return fpByte;
   }

   // 将数字变为二进制字符串
   function getBoxBinary(i) {
    var binary = "";
    switch (i) {
      case 0 :binary = "0000";break;
      case 1 :binary = "0001";break;
      case 2 :binary = "0010";break;
      case 3 :binary = "0011";break;
      case 4 :binary = "0100";break;
      case 5 :binary = "0101";break;
      case 6 :binary = "0110";break;
      case 7 :binary = "0111";break;
      case 8 :binary = "1000";break;
      case 9 :binary = "1001";break;
      case 10 :binary = "1010";break;
      case 11 :binary = "1011";break;
      case 12 :binary = "1100";break;
      case 13 :binary = "1101";break;
      case 14 :binary = "1110";break;
      case 15 :binary = "1111";break;
    }
    return binary;
   }
   /*
   * generate 16 keys for xor
   *
   */
   function generateKeys(keyByte){
    var key   = new Array(56);
    var keys = new Array();

    keys[ 0] = new Array();
    keys[ 1] = new Array();
    keys[ 2] = new Array();
    keys[ 3] = new Array();
    keys[ 4] = new Array();
    keys[ 5] = new Array();
    keys[ 6] = new Array();
    keys[ 7] = new Array();
    keys[ 8] = new Array();
    keys[ 9] = new Array();
    keys[10] = new Array();
    keys[11] = new Array();
    keys[12] = new Array();
    keys[13] = new Array();
    keys[14] = new Array();
    keys[15] = new Array();
    var loop = [1,1,2,2,2,2,2,2,1,2,2,2,2,2,2,1];

    for(i=0;i<7;i++){
      for(j=0,k=7;j<8;j++,k--){
        key[i*8+j]=keyByte[8*k+i];
      }
    }

    var i = 0;
    for(i = 0;i < 16;i ++){
      var tempLeft=0;
      var tempRight=0;
      for(j = 0; j < loop[i];j ++){
        tempLeft = key[0];
        tempRight = key[28];
        for(k = 0;k < 27 ;k ++){
          key[k] = key[k+1];
          key[28+k] = key[29+k];
        }
        key[27]=tempLeft;
        key[55]=tempRight;
      }
      var tempKey = new Array(48);
      tempKey[ 0] = key[13];
      tempKey[ 1] = key[16];
      tempKey[ 2] = key[10];
      tempKey[ 3] = key[23];
      tempKey[ 4] = key[ 0];
      tempKey[ 5] = key[ 4];
      tempKey[ 6] = key[ 2];
      tempKey[ 7] = key[27];
      tempKey[ 8] = key[14];
      tempKey[ 9] = key[ 5];
      tempKey[10] = key[20];
      tempKey[11] = key[ 9];
      tempKey[12] = key[22];
      tempKey[13] = key[18];
      tempKey[14] = key[11];
      tempKey[15] = key[ 3];
      tempKey[16] = key[25];
      tempKey[17] = key[ 7];
      tempKey[18] = key[15];
      tempKey[19] = key[ 6];
      tempKey[20] = key[26];
      tempKey[21] = key[19];
      tempKey[22] = key[12];
      tempKey[23] = key[ 1];
      tempKey[24] = key[40];
      tempKey[25] = key[51];
      tempKey[26] = key[30];
      tempKey[27] = key[36];
      tempKey[28] = key[46];
      tempKey[29] = key[54];
      tempKey[30] = key[29];
      tempKey[31] = key[39];
      tempKey[32] = key[50];
      tempKey[33] = key[44];
      tempKey[34] = key[32];
      tempKey[35] = key[47];
      tempKey[36] = key[43];
      tempKey[37] = key[48];
      tempKey[38] = key[38];
      tempKey[39] = key[55];
      tempKey[40] = key[33];
      tempKey[41] = key[52];
      tempKey[42] = key[45];
      tempKey[43] = key[41];
      tempKey[44] = key[49];
      tempKey[45] = key[35];
      tempKey[46] = key[28];
      tempKey[47] = key[31];
      switch(i){
        case 0: for(m=0;m < 48 ;m++){ keys[ 0][m] = tempKey[m]; } break;
        case 1: for(m=0;m < 48 ;m++){ keys[ 1][m] = tempKey[m]; } break;
        case 2: for(m=0;m < 48 ;m++){ keys[ 2][m] = tempKey[m]; } break;
        case 3: for(m=0;m < 48 ;m++){ keys[ 3][m] = tempKey[m]; } break;
        case 4: for(m=0;m < 48 ;m++){ keys[ 4][m] = tempKey[m]; } break;
        case 5: for(m=0;m < 48 ;m++){ keys[ 5][m] = tempKey[m]; } break;
        case 6: for(m=0;m < 48 ;m++){ keys[ 6][m] = tempKey[m]; } break;
        case 7: for(m=0;m < 48 ;m++){ keys[ 7][m] = tempKey[m]; } break;
        case 8: for(m=0;m < 48 ;m++){ keys[ 8][m] = tempKey[m]; } break;
        case 9: for(m=0;m < 48 ;m++){ keys[ 9][m] = tempKey[m]; } break;
        case 10: for(m=0;m < 48 ;m++){ keys[10][m] = tempKey[m]; } break;
        case 11: for(m=0;m < 48 ;m++){ keys[11][m] = tempKey[m]; } break;
        case 12: for(m=0;m < 48 ;m++){ keys[12][m] = tempKey[m]; } break;
        case 13: for(m=0;m < 48 ;m++){ keys[13][m] = tempKey[m]; } break;
        case 14: for(m=0;m < 48 ;m++){ keys[14][m] = tempKey[m]; } break;
        case 15: for(m=0;m < 48 ;m++){ keys[15][m] = tempKey[m]; } break;
      }
    }
    return keys;
   }
   //end-------------------------------------------------------------------------------------------------------------
    let bit64= new Array(64)//顺序可用链表摘取好一点,但是js的数组可以很灵活了属于是
    for(let i=0;i<64;i++){
        bit64[i]=i
    }
    let changeKey2Show=new Array(65).fill(0)
    let changeMessage2Show=new Array(65).fill(0)
    function changeBit(arr,count){
        //异或1实现转换,都是对字符数组进行操作
        //进行最多64次
        //0位不同和64位不同都只有一种解法，0到64=65，new 【65】
        //用随机数？两次调用changeBit结果可能会重复？map存已经改变的位，随机之道count位不同
        let copy = [...arr]
        let [...bit64Copy]=bit64
        for(let i=0,temp=0;i<count;i++){
            temp=Math.floor(Math.random()*bit64Copy.length)//Math.floor=new Integer
            copy[bit64Copy[temp]]^=1
            bit64Copy.splice(temp,1)
            // bit64Copy.splice(bit64Copy.indexOf(temp),1)
        }
        // const mySet = new Set();
        // for(let i=0,temp=0;i<count;i++){
        //     do{//这种解法会大量冲突in后面
        //         temp=Math.floor(Math.random()*64)
        //     }
        //     while(mySet.has(temp))
        //     mySet.add(temp)
        //     copy[temp]^=1
        // }
        return copy
    }
    function compareBit(oldOne,newOne){
        //o(n),都是对字符数组进行操作
        let sum=0
        if(oldOne.length!=newOne.length)return -1
        for(let i=0;i<oldOne.length;i++){
            if(oldOne[i]^newOne[i]===1)sum++
        }
        return sum
    }
    // function packTest(messageArray,keyArray){//这里出错，为什么换了密钥结果还是一样？肯定啊,要比较密文
    //     let encryptByte = enc(messageArray,keyArray);
    //     let encryptHex  = bt64ToHex(encryptByte);
    //     // endata.value=enchex;
    //     let encryptString = hexToBt64(encryptHex);
    //     let hex2Byte = new Array();
    //     for(let m=0;m<encryptString.length;m++){
    //         hex2Byte [m] = parseInt(encryptString.substring(m,m+1));
    //     }
    //     return dec(hex2Byte ,keyArray)
    // }
    function myTest(myMessage,myKey,myCount) {

        // var msg = "abcdefgh";
        var msg = myMessage;
        var bt = strToBt(msg);
        console.log("strToBt(msg)="+strToBt(msg))//只要这个
        // var key = "12345678";
        var key = myKey;
        var keyB = strToBt(key);
        console.log("strToBt(key)="+strToBt(key))//只要这个
        //密文改变并统计
        var encByte = enc(bt,keyB);
        console.log("enc(bt,keyB)="+enc(bt,keyB))
        var enchex  = bt64ToHex(encByte);
        console.log("bt64ToHex(encByte)="+bt64ToHex(encByte))
        // endata.value=enchex;

        var encStr = hexToBt64(enchex);
        // alert("encStr="+encStr);
        console.log("encStr=hexToBt64(enchex)="+encStr);
        var eByte = new Array();
        for(m=0;m<encStr.length;m++){
          eByte[m] = parseInt(encStr.substring(m,m+1));
        }
        var decbyte= dec(eByte,keyB)
        var decmsg= byteToString(decbyte);
        // alert("decbyte="+decbyte);
        console.log("decbyte=dec(eByte,keyB)="+decbyte);//只要这个
        // alert("decmsg="+decmsg);
        console.log("decmsg=byteToString(decbyte)="+decmsg);

        let keyB2,bt2
        for(let i=0,j=0;i<=64;i++){
            for(j=0;j<myCount;j++){
                keyB2=changeBit(keyB,i)
                bt2=changeBit(bt,i)
                // console.log("keyB2="+changeBit(keyB,i))
                changeKey2Show[i]+=compareBit(enc(bt,keyB2),encByte)
                changeMessage2Show[i]+=compareBit(enc(bt2,keyB),encByte)
                // console.log(" packTest(bt,keyB2)="+packTest(bt,keyB2))
                // console.log("keyB"+keyB+" keyB2="+keyB2+" packTest(bt,keyB2)="+packTest(bt,keyB2))
                // console.log("compareBit(packTest(bt,keyB2),decbyte)="+compareBit(packTest(bt,keyB2),decbyte))
            }
            changeKey2Show[i]/=myCount
            changeMessage2Show[i]/=myCount
        }
        document.getElementById('result').append("+changeKey2Show");
        // document.getElementById('result').appendChild(<br>)
        document.getElementById('result').appendChild(document.createElement("br"))
        console.log("+changeKey2Show")
        document.getElementById('result').append("更改的bit个数"+"\t密文平均改变的bit数");
        document.getElementById('result').appendChild(document.createElement("br"))
        console.log("更改的bit个数"+"\t密文平均改变的bit数")
        for(let i=0;i<=64;i++){
            document.getElementById('result').append(i+"\t\t\t\t"+changeKey2Show[i]);
            document.getElementById('result').appendChild(document.createElement("br"))
            console.log(i+"\t\t\t\t"+changeKey2Show[i])
        }
        document.getElementById('result').append("+changeMessage2Show");
        document.getElementById('result').appendChild(document.createElement("br"))
        console.log("+changeMessage2Show")
        document.getElementById('result').append("更改的bit个数"+"\t密文平均改变的bit数");
        document.getElementById('result').appendChild(document.createElement("br"))
        console.log("更改的bit个数"+"\t密文平均改变的bit数")
        for(let i=0;i<=64;i++){
            document.getElementById('result').append(i+"\t\t\t\t"+changeMessage2Show[i]);
            document.getElementById('result').appendChild(document.createElement("br"))
            console.log(i+"\t\t\t\t"+changeMessage2Show[i])
        }
    }
