package com.apnut.dao;

import java.sql.ResultSet;
import java.sql.SQLException;


import com.apnut.entity.Client;
import com.apnut.entity.User;




/**
 * ʵ�ֶ�sys_user����в���
 * @author Administrator
 *
 */
public class UserDao extends BaseDao {

	/**
	 * ����û����������֤�û���Ϣ	
	 * @param uname
	 * @param upwd
	 * @return true ��¼�ɹ� false ��¼ʧ��
	 */
//	public boolean login(String uname,String upwd){
//		
//		boolean ret=false;
//		String sql="select * from tb_user_list where " +
//				"tel='"+uname+"' and pwd='"+upwd+"'";
//		ResultSet rs=super.executeQuery(sql);
//		try {
//			if(rs.next()){
//				ret=true;
////				 String tel = rs.getString("tel");  
////	                String pwd = rs.getString("pwd");  
////	                System.out.println("tel:"+tel+" pwd:"+pwd);
//			}
//		} catch (SQLException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//		return ret;
//	}
	
	/*
	 * 更改手机号
	 */
	public int updateUname(String oldTel, String newTel){
		String sql = " update tb_user_list " +
			     	 "    set tel        = ?"+
			     	"  where tel         = ? ";
		Object[] parm = new Object[2];
		parm[0] = newTel;
		parm[1] = oldTel;

		return super.executeUpdate(sql, parm);
	}
	
	/*
	 * 更改密码
	 */
	public int updatePwd(User user){
		String sql = " update tb_user_list " +
			     	 "    set pwd        = ?"+
			     	"  where tel         = ? ";
		Object[] parm = new Object[2];
		parm[0] = user.getPassword();
		parm[1] = user.getUserName();

		return super.executeUpdate(sql, parm);
	}
	
	public int updatePwd(int uid, String newPwd){
		String sql = " update tb_user_list " +
			     	 "    set pwd        = ?"+
			     	"  where uid         = ? ";
		Object[] parm = new Object[2];
		parm[0] = newPwd;
		parm[1] = uid;

		return super.executeUpdate(sql, parm);
	}
	
	public Client queryUser(String uname)
	{
		Client client = null;
		String sql="select * from tb_user_list where " +
				"tel='"+uname+"'";
		ResultSet rs=super.executeQuery(sql);
		try {
			while(rs.next()){
				client = new Client(uname);
				client.setUid(rs.getInt("uid"));
				client.setPassword(rs.getString("pwd"));
			}
		} catch (SQLException e) {
			
			e.printStackTrace();
		}
		return client;
	}
	

//	public static void main(String[] args) throws SQLException{
//		UserDao userDao=new UserDao();
//		boolean ret=userDao.login("13105278845", "admin");
//		if(ret){
//			System.out.println("yes!");
//		}else{
//			System.out.println("no!");
//		}
//		
//	}
//	
	
}
