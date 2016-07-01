package com.apnut.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.apnut.dao.UserDao;
import com.apnut.entity.Client;

public class LoginServlet extends HttpServlet {

	/**
	 * Constructor of the object.
	 */
	public LoginServlet() {
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
		
		String information="";

		UserDao userDao=new UserDao();
		//����û���������
		String uname=request.getParameter("uname");
		String upass=request.getParameter("password");
		System.out.println(uname);
		
		//��¼��֤(ҵ��)
		Client client=userDao.queryUser(uname);
		if(null!=client&&upass.equals(client.getPassword())){
			
			HttpSession session = request.getSession();
			session.setAttribute("uid", client.getUid());
			session.setAttribute("uname", client.getUserName());
			
			response.sendRedirect(request.getContextPath()+"/index.jsp");
			//response.getWriter().print("1");
		}else{
//			session.setAttribute("message", "用户名或密码不匹配。");
//		    response.sendRedirect("fail.jsp") ;
			information="您输入的用户名或密码错误！";
			request.setAttribute("information", information);
			request.getRequestDispatcher("login.jsp").forward(request, response);
			//response.getWriter().println("0");
		}
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
