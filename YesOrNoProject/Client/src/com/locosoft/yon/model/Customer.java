package com.locosoft.yon.model;

import com.locosoft.yon.base.BaseModel;

public class Customer extends BaseModel {
	
	// model columns
	public final static String COL_ID = "id";
	public final static String COL_NAME = "name";
	public final static String COL_NICK = "nickname";
	public final static String COL_FACE = "headface";
	public final static String COL_AGE = "age";
	public final static String COL_HOBBIES = "hobbies";
	public final static String COL_PLACE = "place";
	public final static String COL_COMMENTS = "comments";
	public final static String COL_CTIME = "ctime";//create time of the user account
	public final static String COL_BRAND = "brand";//phone brand
	public final static String COL_PASS = "pass";
	public final static String COL_GENDOR = "gendor";	
	public final static String COL_UTYPE = "utype"; //user's type(0: common users, 1: admin)

	
	private String id;
	private String name;
	private String nickname;
	private String headface;
	private String age;
	private String hobbies;
	private String place;
	private String comments;
	private String ctime;
	private String brand;
	private String pass;
	private String gendor;
	private String utype;

	
	// default is no login
	private boolean isLogin = false;
	
	// single instance for login
	static private Customer customer = null;
	
	static public Customer getInstance () {
		if (Customer.customer == null) {
			Customer.customer = new Customer();
		}
		return Customer.customer;
	}
	
	public Customer () {}
	
	public String getId () {
		return this.id;
	}
	
	public void setId (String strId) {
		this.id = strId;
	}
	
	public String getName () {
		return this.name;
	}
	
	public void setName (String strName) {
		this.name = strName;
	}
	
	public String getNickname () {
		return this.nickname;
	}
	
	public void setNickname (String strNikName) {
		this.nickname = strNikName;
	}
	
	public String getHeadface () {
		return this.headface;
	}
	
	public void setHeadface (String strFaceUrl) {
		this.headface = strFaceUrl;
	}
	
	public String getAge () {
		return this.age;
	}
	
	public void setAge (String strAge) {
		this.age = strAge;
	}
	
	
	public String getHobbies () {
		return this.hobbies;
	}
	
	public void setHobbies (String strHobbies) {
		this.hobbies = strHobbies;
	}
	
	public String getPlace () {
		return this.place;
	}
	
	public void setPlace (String strPlace) {
		this.place = strPlace;
	}
	
	public String getComments () {
		return this.comments;
	}
	
	public void setComments (String strComments) {
		this.comments = strComments;
	}
	
	public String getCtime () {
		return this.ctime;
	}
	
	public void setCtime (String strCtime) {
		this.ctime = strCtime;
	}
	
	public String getBrand () {
		return this.brand;
	}
	
	public void setBrand (String strBrand) {
		this.brand = strBrand;
	}
	
	public String getPass () {
		return this.pass;
	}
	
	public void setPass (String strPass) {
		this.pass = strPass;
	}
	
	public String getGendor () {
		return this.gendor;
	}
	
	public void setGendor (String strGendor) {
		this.gendor = strGendor;
	}
	
	public String getUtype () {
		return this.utype;
	}
	
	public void setUtype (String strUType) {
		this.utype = strUType;
	}

	public Boolean getLogin () {
		return this.isLogin;
	}
	
	public void setLogin (boolean isLogin) {
		this.isLogin = isLogin;
	}
}