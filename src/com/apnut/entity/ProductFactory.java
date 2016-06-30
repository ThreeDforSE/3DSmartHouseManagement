package com.apnut.entity;


import com.apnut.dao.ProductDao;


public class ProductFactory {
	public static MyProduct createProduct(String type)
	{
		ProductDao productDao = new ProductDao();
		MyProduct pro =null;
		switch (type)
		{
			case "平板电视":
				pro=productDao.getDPC(type);
				break;
			case "双门冰箱":
				pro=productDao.getDFridge(type);
				break;
			case "台式电脑":
				pro=productDao.getDPC(type);
				break;
		}
		return pro;
		
	}
}
