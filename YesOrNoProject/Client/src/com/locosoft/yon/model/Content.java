package com.locosoft.yon.model;

import com.locosoft.yon.base.BaseModel;

public class Content extends BaseModel {

	// model columns
	public final static String COL_ID = "id";
	public final static String COL_SCENEID = "sceneid";
	public final static String COL_PAGENUM = "pagenum";
	public final static String COL_TYPE = "type";
	public final static String COL_KEY = "key";
	public final static String COL_VALUE = "value";
	
	private String id;
	private String sceneid;
	private String pagenum;
	private String type;
	private String key;
	private String value;
	
	public Content () {}
	
	public String getId () {
		return this.id;
	}
	
	public void setId (String id) {
		this.id = id;
	}
	
	
	public String getSceneId() {
		return sceneid;
	}

	public void setSceneId(String sceneid) {
		this.sceneid = sceneid;
	}

	public String getPageNum() {
		return pagenum;
	}

	public void setPageNum(String pagenum) {
		this.pagenum = pagenum;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

}