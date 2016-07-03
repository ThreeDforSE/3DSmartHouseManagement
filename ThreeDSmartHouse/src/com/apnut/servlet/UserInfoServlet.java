package com.apnut.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
//import javax.xml.registry.infomodel.User;

import com.apnut.dao.UserDao;
import com.apnut.entity.Client;
import com.apnut.util.SendMsgUtil;

import net.sf.json.JSONObject;

public class UserInfoServlet extends HttpServlet {
	private int method;
	private Client client=null;
	String code;
	String information="";

	
	//String uname;
	/**
	 * Constructor of the object.
	 */
	public UserInfoServlet() {
		super();
	}

	/**
	 * Destruction of the servlet. <br>
	 */
	public void destroy() {
		super.destroy(); // Just puts "destroy" string in log
		// Put your code here
	}

	/**
	 * The doGet method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to get.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		this.doPost(request, response);
	}

	/**
	 * The doPost method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to post.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		response.setCharacterEncoding("utf-8");
		method=Integer.parseInt(request.getParameter("method"));
		if(method==1){
			this.findPwd1(request, response);
		}
		if(method==2){
			this.sendMsg(request, response);
		}
		if(method==3){
			this.findPwd2(request, response);
		}
		if(method==4){
			this.valiUser(request, response);
		}
		if(method==5){
			this.testInfo(request, response);
		}
		if(method==6){
			this.validateCode(request, response);
		}
	}
	/*
	 * 忘记密码1-》2-》6》3
	 * 输入用户名时检查是否存在
	 */
	private void findPwd1(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
//		response.setCharacterEncoding("UTF-8");
//		response.setContentType("application/json; charset=utf-8");
//		String jsonStr = "{\"valid\":\"true\"}";
		JSONObject json = new JSONObject();
		UserDao userDao = new UserDao();
		response.setContentType("application/json; charset=utf-8");
		PrintWriter out = response.getWriter();
		String uname=request.getParameter("uname2");
		client = userDao.queryUser(uname);
		if(null != client){
			json.put("valid",true);
		}else{
			response.setContentType("application/json");
			json.put("valid",false);					
		}
		out.print(json);
		System.out.println("用户名校验-请求用户"+uname+"验证结果："+json);
//		request.getRequestDispatcher("login.jsp").forward(request, response);
	}
	
	/*
	 * 点击发送验证码
	 */
	
	private void sendMsg(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		String uname=request.getParameter("uname2");
		System.out.println(uname);
		code=SendMsgUtil.createRandomVcode();
//		String jresult=SendMsgUtil.sendMsg(uname, code);
		//String recode= request.getParameter("verify_code");
//		if(null!=jresult){
			//response.getWriter().println(jresult);
			request.getSession().setAttribute("vcode", code);
			PrintWriter out = response.getWriter();  
			 out.print(code);
			System.out.println(code);
//		}
	}
	
	/*
	 * 提交忘记密码表单
	 * 
	 */
	private void findPwd2(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		UserDao userDao = new UserDao();
		String uname=request.getParameter("uname2");
		client = userDao.queryUser(uname);
		String new_password=request.getParameter("new_password");
		client.setPassword(new_password);
		int ret=userDao.updatePwd(client);
		if(ret>0){
			request.setAttribute("information", "密码修改成功!");
		}
		else{
			request.setAttribute("information", "密码修改失败!请稍后重试!");
		}
			//response.getWriter().print(ret);
		request.getRequestDispatcher("redirectPage.jsp").forward(request, response);
	}
	
	/*
	 * 提交账户信息设置表单
	 * 
	 */
	private void updateInfo(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		int ret=0;
		UserDao userDao = new UserDao();
		HttpSession session=request.getSession();
		String oldName=(String) session.getAttribute("uname");
		int uid=(int) session.getAttribute("uid");
		String uname=request.getParameter("uname");
		String new_password=request.getParameter("new_password");
		String confirm_password=request.getParameter("confirm_password");
		
		if(null!=uname){		
			 ret=userDao.updateUname(oldName,uname);
		}
		if(null!=new_password&&null!=confirm_password){
			ret=userDao.updatePwd(uid, new_password);
		}
		if(ret>0){			
			information="账户信息修改成功!";
			request.setAttribute("information", information);
			//response.getWriter().print("1");
			//response.sendRedirect(request.getContextPath()+"/login.jsp");
			request.getRequestDispatcher("redirectPage.jsp").forward(request, response);
		}else{
			//response.getWriter().print("0");
			information="账户信息修改失败，请重新操作!";
			request.setAttribute("information", information);
			request.getRequestDispatcher("redirectPage.jsp").forward(request, response);
		}		
	}
	
	/*
	 * 测试方法
	 */
	private void testInfo(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		String uname=request.getParameter("username");
		System.out.println(uname);
			PrintWriter out = response.getWriter();  
			request.getSession().setAttribute("ifor", uname);
			 out.print("welcome: "+uname);
			System.out.println("welcome: "+uname);
	}
	
	/*
	 * 验证用户输入验证码
	 */
	private void validateCode(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
//		response.setCharacterEncoding("UTF-8");
//		response.setContentType("application/json; charset=utf-8");
//		String jsonStr = "{\"valid\":\"true\"}";
		JSONObject json = new JSONObject();
		UserDao userDao = new UserDao();
		String vcode=request.getParameter("verify_code");
		response.setContentType("application/json; charset=utf-8");
		PrintWriter out = response.getWriter();
		if(vcode.equals(code)){
			json.put("valid",true);
		}else{
			response.setContentType("application/json");
			json.put("valid",false);					
		}
		out.print(json);
		System.out.println("验证码校验-用户输入"+vcode+"验证结果："+json);
	}
	private void valiUser(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
//		response.setCharacterEncoding("UTF-8");
//		response.setContentType("application/json; charset=utf-8");
//		String jsonStr = "{\"valid\":\"true\"}";
		JSONObject json = new JSONObject();
		UserDao userDao = new UserDao();
		response.setContentType("application/json; charset=utf-8");
		PrintWriter out = response.getWriter();
		String uname=request.getParameter("uname7");
		client = userDao.queryUser(uname);
		if(null != client){
			json.put("valid",true);
		}else{
			response.setContentType("application/json");
			json.put("valid",false);					
		}
		out.print(json);
		System.out.println("用户名校验-请求用户"+uname+"验证结果："+json);
//		request.getRequestDispatcher("login.jsp").forward(request, response);
	}

	/**
	 * Initialization of the servlet. <br>
	 *
	 * @throws ServletException if an error occurs
	 */
	public void init() throws ServletException {
		// Put your code here
	}

}