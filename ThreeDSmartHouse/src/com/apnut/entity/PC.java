package com.apnut.entity;
//mysql> create table tb_pc_info(
//    -> pcid int auto_increment primary key,
//    -> pid int not null,
//    -> pc_type varchar(10),
//    -> pc_os varchar(20),
//    -> pc_graphics varchar(20),
//    -> pc_sound varchar(20),
//    -> pc_network varchar(20),
//    -> pc_cpu varchar(20),
//    -> pc_memory varchar(5),
//    -> pc_hard_disk varchar(10),
//    -> foreign key(pid) references tb_product_list(pid))default charset utf8;
//Query OK, 0 rows affected (0.05 sec)
public class PC extends MyProduct{

	private int pid;
	private String pc_type;
	private String pc_os;
	private String pc_graphics;
	private String pc_sound;
	private String pc_network;
	private String pc_cpu;
	private String pc_memory;
	private String pc_hard_disk;
	
	public int getPid() {
		return pid;
	}

	public void setPid(int pid) {
		this.pid = pid;
	}

	public String getPc_type() {
		return pc_type;
	}

	public void setPc_type(String pc_type) {
		this.pc_type = pc_type;
	}

	public String getPc_os() {
		return pc_os;
	}

	public void setPc_os(String pc_os) {
		this.pc_os = pc_os;
	}

	public String getPc_graphics() {
		return pc_graphics;
	}

	public void setPc_graphics(String pc_graphics) {
		this.pc_graphics = pc_graphics;
	}

	public String getPc_sound() {
		return pc_sound;
	}

	public void setPc_sound(String pc_sound) {
		this.pc_sound = pc_sound;
	}

	public String getPc_network() {
		return pc_network;
	}

	public void setPc_network(String pc_network) {
		this.pc_network = pc_network;
	}

	public String getPc_cpu() {
		return pc_cpu;
	}

	public void setPc_cpu(String pc_cpu) {
		this.pc_cpu = pc_cpu;
	}

	public String getPc_memory() {
		return pc_memory;
	}

	public void setPc_memory(String pc_memory) {
		this.pc_memory = pc_memory;
	}

	public String getPc_hard_disk() {
		return pc_hard_disk;
	}

	public void setPc_hard_disk(String pc_hard_disk) {
		this.pc_hard_disk = pc_hard_disk;
	}

	@Override
	public void Add(MyProduct p) {
		
		
	}

	@Override
	public void Remove(MyProduct p) {
		
		
	}

	@Override
	public void Display(double x, double y) {
		
		
	}

}
