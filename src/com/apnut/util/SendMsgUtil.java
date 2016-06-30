package com.apnut.util;

public class SendMsgUtil {
	 public static String sendMsg(String phones,String content){
		 String httpUrl = "http://apis.baidu.com/kingtto_media/106sms/106sms";
		 String httpArg = "mobile="+phones+"&content="+content;
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
}
