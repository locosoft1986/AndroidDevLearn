package com.locosoft.yon.base;

import com.locosoft.yon.model.Customer;

public class BaseAuth {
	
	static public boolean isLogin () {
		Customer customer = Customer.getInstance();
		return customer.getLogin();
	}
	
	static public void setLogin (Boolean status) {
		Customer customer = Customer.getInstance();
		customer.setLogin(status);
	}
	
	static public void setCustomer (Customer mc) {
		Customer customer = Customer.getInstance();
		customer.setId(mc.getId());
		customer.setName(mc.getName());
		customer.setNickname(mc.getNickname());
		customer.setHeadface(mc.getHeadface());
		customer.setAge(mc.getAge());
		customer.setHobbies(mc.getHobbies());
		customer.setPlace(mc.getPlace());
		customer.setComments(mc.getComments());
		customer.setCTime(mc.getCTime());
		customer.setBrand(mc.getBrand());
		customer.setPass(mc.getPass());
		customer.setGendor(mc.getGendor());
		customer.setPhoneNum(mc.getPhoneNum());
		customer.setUType(mc.getUType());
	}
	
	static public Customer getCustomer () {
		return Customer.getInstance();
	}
}