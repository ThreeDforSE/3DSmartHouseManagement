
import java.util.ArrayList;
import java.util.List;


public class HouseProduct extends MyProduct {
	
	private List<MyProduct> myProducts = new ArrayList<MyProduct>();
	
	@Override
	public void Add(MyProduct p) {
	
		myProducts.add(p);
	}

	@Override
	public void Remove(MyProduct p) {
		
		myProducts.remove(p);
	}

	@Override
	public void Display(double x, double y) {
		for(int i=0; i<myProducts.size(); i++){   
		       MyProduct p =  myProducts.get(i);   
		       p.Display(x, y);  
		}  
	}
	
}
