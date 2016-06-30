package com.apnut.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.registry.infomodel.User;

import com.apnut.dao.UserDao;
import com.apnut.entity.Client;
import com.apnut.util.SendMsgUtil;

public class UserInfoServlet extends HttpServlet {
	private int method;
	private Client client=null;
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
		method=Integer.parseInt(request.getParameter("method"));
		if(method==1){
			this.findPwd1(request, response);
		}
		if(method==2){
			this.findPwd2(request, response);
		}
	}
	private void findPwd1(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		
		UserDao userDao = new UserDao();
		String uname=request.getParameter("uname");
		client = userDao.queryUser(uname);
		if(null != client){
			request.setAttribute("client", client);
			
		}else{
			request.setAttribute("information", "您输入的用户不存在！");
			
		}
		request.getRequestDispatcher("login.html").forward(request, response);
	}
	
	private void findPwd2(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		UserDao userDao = new UserDao();
		String uname=request.getParameter("uname");
		client = userDao.queryUser(uname);
		String code=SendMsgUtil.createRandomVcode();
		String jresult=SendMsgUtil.sendMsg(uname, code);
		String recode= request.getParameter("verify_code");
		if(recode.equals(code)){
			String new_password=request.getParameter("new_password");
			client.setPassword(new_password);
			int ret=userDao.updatePwd(client);
			response.getWriter().print(ret);
		}else{
			request.setAttribute("information", "您输入的验证码不正确！");
		}
		request.getRequestDispatcher("login.html").forward(request, response);
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
