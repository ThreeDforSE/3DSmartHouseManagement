package com.apnut.util;

public class SendMsgUtil {
	 public static String sendMsg(String phones,String code){
		 String httpUrl = "http://apis.baidu.com/kingtto_media/106sms/106sms";
		 String content ="【ApNut】您的验证码是" + code + "，有效时间5分钟，请不要告诉其他人";
		 String httpArg = "mobile="+phones+"&content="+toChineseHex(content);
		 String jsonResult = HttpRequestUtil.request(httpUrl, httpArg);
		 System.out.println(jsonResult);
		 return jsonResult;
	 }	 
	  public static String createRandomVcode(){
	        //验证码
	        String vcode = "";
	        for (int i = 0; i < 6; i++) {
	            vcode = vcode + (int)(Math.random() * 9);
	        }
	        return vcode;
	    }
	  public static String toChineseHex(String content)
	  {
	          
	          byte[] bt = content.getBytes();
	          String hexmsg = "";
	          for (int i = 0; i < bt.length; i++)
	          {
	              String tempStr = Integer.toHexString(bt[i]);
	              if (tempStr.length() > 2)
	                  tempStr = tempStr.substring(tempStr.length() - 2);
	              hexmsg +=  "%" + tempStr;
	          }
	          return hexmsg.toUpperCase();
	  }
}
