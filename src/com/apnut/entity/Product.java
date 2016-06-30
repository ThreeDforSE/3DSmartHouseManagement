package com.apnut.entity;

public class Product {
	private int pid;
	private String version;
	private String name;
	private String announced_date;
	
	public int getPid() {
		return pid;
	}
	
	public void setPid(int pid) {
		this.pid = pid;
	}

	public String getVersion() {
		return version;
	}
	
	public void setVersion(String version) {
		this.version = version;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String getAnnounced_date() {
		return announced_date;
	}
	
	public void setAnnounced_date(String announced_date) {
		this.announced_date = announced_date;
	}
	
}
