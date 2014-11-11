package com.locosoft.yon.model;

import com.locosoft.yon.base.BaseModel;

public class Notice extends BaseModel {
	
	// model columns
	public final static String COL_ID = "id";
	public final static String COL_MESSAGE = "message";
	
	private String id;
	private String message;
	
	public Notice () {}
	
	public String getId () {
		return this.id;
	}
	
	public void setId (String id) {
		this.id = id;
	}
	
	public String getMessage () {
		return this.message;
	}
	
	public void setMessage (String message) {
		this.message = message;
	}
}