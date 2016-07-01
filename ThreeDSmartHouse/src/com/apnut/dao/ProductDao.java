package com.apnut.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.apnut.entity.DeskPC;
import com.apnut.entity.DoubleFridge;
import com.apnut.entity.Flat_TV;
import com.apnut.entity.MyProduct;
import com.apnut.entity.ProductFactory;


public class ProductDao extends BaseDao {
	public List<MyProduct> searchProducts(int uid){
		List<MyProduct>  productsList=new ArrayList<MyProduct>();
		String sql="select tb_user_product.pid,pversion,pname,announced_date,binding_date from tb_user_product,tb_product_list where uid= '"+uid+"'and tb_user_product.pid=tb_product_list.pid order by pid ";
		ResultSet rs=super.executeQuery(sql);
		try {
			while(rs.next()){
				int pid    =rs.getInt("pid");
				String pversion  =rs.getString("pversion");
				String pname      =rs.getString("pname");
				String binding_date   =rs.getString("binding_date");
				String announced_date   =rs.getString("announced_date");
				
				MyProduct mypro = ProductFactory.createProduct(pname);
				mypro.setPid(pid);
				mypro.setName(pname);
				mypro.setAnnounced_date(announced_date);
				mypro.setVersion(pversion);
				mypro.setBinding_date(binding_date);
				
				productsList.add(mypro);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally{
			super.closeAll();
		}
		return productsList;
	}	
	public Flat_TV getFTV(String type){
		Flat_TV ftv = new Flat_TV();
		String sql="select *  from tb_tv_info where tv_type= '"+type+"'";
		ResultSet rs=super.executeQuery(sql);
		try {
			while(rs.next()){
				String tv_resolution_radio    =rs.getString("tv_resolution_radio");
				String tv_screen_size  =rs.getString("tv_screen_size");
				String tv_aspect_ratio      =rs.getString("tv_aspect_ratio");
				String tv_voltage   =rs.getString("tv_voltage");
				String tv_power   =rs.getString("tv_power");
				
				ftv.setTv_type(type);
				ftv.setTv_resolution_radio(tv_resolution_radio);
				ftv.setTv_screen_size(tv_screen_size);
				ftv.setTv_aspect_ratio(tv_aspect_ratio);
				ftv.setTv_voltage(tv_voltage);
				ftv.setTv_power(tv_power);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally{
			super.closeAll();
		}
		return ftv;
	}	
	public DeskPC getDPC(String type){
		DeskPC dpc = new DeskPC();
		String sql="select *  from tb_pc_info where pc_type= '"+type+"'";
		ResultSet rs=super.executeQuery(sql);
		try {
			while(rs.next()){
				String pc_os    =rs.getString("pc_os");
				String pc_graphics  =rs.getString("pc_graphics");
				String pc_sound      =rs.getString("pc_sound");
				String pc_network   =rs.getString("pc_network");
				String pc_cpu    =rs.getString("pc_cpu");
				String pc_memory    =rs.getString("pc_memory");
				String pc_hard_disk    =rs.getString("pc_hard_disk");
				
				dpc.setPc_type(type);
				dpc.setPc_os(pc_os);
				dpc.setPc_graphics(pc_graphics);
				dpc.setPc_sound(pc_sound);
				dpc.setPc_network(pc_network);
				dpc.setPc_cpu(pc_cpu);
				dpc.setPc_memory(pc_memory);
				dpc.setPc_hard_disk(pc_hard_disk);
				
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally{
			super.closeAll();
		}
		return dpc;
	}
	
	public DoubleFridge getDFridge(String type){
		DoubleFridge df = new DoubleFridge();
		String sql="select *  from tb_fridge_info where f_type= '"+type+"'";
		ResultSet rs=super.executeQuery(sql);
		try {
			while(rs.next()){
				String f_door    =rs.getString("f_door");
				String f_climate   =rs.getString("f_climate ");
				String f_rf_method      =rs.getString("f_rf_method");
				String f_control_mode    =rs.getString("f_control_mode ");
				String f_volume    =rs.getString("f_volume");
				int  f_energy_efficiency_rate    =rs.getInt("f_energy_efficiency_rate");
				String f_voltage    =rs.getString("f_voltage");
				String f_power    =rs.getString("f_power");
				
				df.setF_type(type);
				df.setF_door(f_door);
				df.setF_climate(f_climate);
				df.setF_rf_method(f_rf_method);
				df.setF_control_mode(f_control_mode);
				df.setF_volume(f_volume);
				df.setF_energy_efficiency_rate(f_energy_efficiency_rate);
				df.setF_voltage(f_voltage);
				df.setF_power(f_power);
				
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally{
			super.closeAll();
		}
		return df;
	}
}
