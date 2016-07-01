package com.apnut.entity;

public class User {
	private int uid;
	private String UserName;
	private String password;
	
	public User(String userName) {
		UserName = userName;
	}

	public int getId() {
		return uid;
	}

	public String getUserName() {
		return UserName;
	}

	public int getUid() {
		return uid;
	}

	public void setUid(int uid) {
		this.uid = uid;
	}

	public void setUserName(String userName) {
		UserName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
 