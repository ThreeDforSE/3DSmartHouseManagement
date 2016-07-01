package com.apnut.dao;



import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class BaseDao {
	
	private Connection conn=null;
	private PreparedStatement pstm=null;
	private ResultSet rs=null;
	private final static String URL="jdbc:mysql://121.42.33.120:3306/db4se?useUnicode=true&characterEncoding=utf-8";
	private final static String DRIVER="com.mysql.jdbc.Driver";
	private final static String USER="root";
	private final static String PWD="db4se";
	static {
		try {
			Class.forName(DRIVER);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
	}
	/**
	 * JDBC����
	 * 1����������
	 * 	a�������
	 *  b�������ַ�
	 *  c���û��������
	 *  
	 * @return
	 */
	public Connection getConnection() {
		try {
			conn=DriverManager.getConnection(URL,USER,PWD);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return conn;
	}
	/**
	 * 2��ִ������ɾ����
	 * @param sql
	 * @param paramValue
	 * @return
	 */
	public int executeUpdate(String sql,Object paramValue){
		Object[] paramValues=null;
		if(paramValue!=null){
			paramValues=new Object[1];
			paramValues[0]=paramValue;
		}
		return executeUpdate(sql,paramValues);
	}
	public int executeUpdate(String sql,Object[] paramValues){
		conn=this.getConnection();
		int ret=0;
		try {
			pstm=conn.prepareStatement(sql);
			if(paramValues!=null){
				for(int i=0;i<paramValues.length;i++){
					pstm.setObject(i+1, paramValues[i]);
				}
			}
			ret=pstm.executeUpdate();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			ret=-1;
		}finally{
			closeStatement();
		}
		return ret;
	}
	
	public int executeUpdate(String sql){
		return this.executeUpdate(sql, null);	 
	}
	public ResultSet executeQuery(String sql){
		
		return executeQuery(sql,null);
	}
	/**
	 * 3��ִ�в�ѯ,���ز�ѯ���
	 * @param sql
	 * @param paramValues
	 * @return
	 */
	public ResultSet executeQuery(String sql,Object[] paramValues){
		conn=this.getConnection();
		try {
			pstm=conn.prepareStatement(sql);
			if(paramValues!=null){
				for(int i=0;i<paramValues.length;i++){
					pstm.setObject(i+1,paramValues[i]);
				}
			}
			rs=pstm.executeQuery();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}		
		return rs;
	}
	public void closeStatement(){
		try {
			if(pstm!=null)pstm.close();
			if(conn!=null)conn.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	public void closeAll(){
		
		try {
			if(rs!=null)rs.close();
			if(pstm!=null)pstm.close();
			if(conn!=null)conn.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	
	 
}
