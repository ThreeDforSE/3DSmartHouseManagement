
public class Client extends User {
	
	private String reg_Date;
	private boolean state;

	public Client(String telNumber) {
		super(telNumber);
		//可以加数字的限制和手机号码位数的限制，可以重写getUserName函数，加上设置条件
	}
	
	public String getReg_Date() {
		return reg_Date;
	}

	public void setReg_Date(String reg_Date) {
		this.reg_Date = reg_Date;
	}

	public boolean isState() {
		return state;
	}

	public void setState(boolean state) {
		this.state = state;
	}
	
}
