
public abstract class MyProduct extends Product {
	private int uid;
	private int pid;
	
	public int getUid() {
		return uid;
	}
	
	public int getPid() {
		return pid;
	}
	
	public void setUid(int uid) {
		this.uid = uid;
	}

	public void setPid(int pid) {
		this.pid = pid;
	}

	private String binding_date;
	
	
	public String getBinding_date() {
		return binding_date;
	}
	
	public void setBinding_date(String binding_date) {
		this.binding_date = binding_date;
	}
	
	public abstract void Add(MyProduct p);
	public abstract void Remove(MyProduct p);
	public abstract void Display(double x, double y);
}
