package com.locosoft.yon.util;

import com.locosoft.yon.model.SceneContentMgr;

import android.webkit.JavascriptInterface;

public class WebViewInterface {
	@JavascriptInterface
	public void setContent(String key, String value, String type)
	{
		SceneContentMgr.getInstance().setContentValue(key, value, type);
	}
	
	@JavascriptInterface
	public String getValue(String key)
	{
		return SceneContentMgr.getInstance().getContentValue(key);
	}
	
	@JavascriptInterface
	public String getType(String key)
	{
		return SceneContentMgr.getInstance().getContentType(key);
	}
}
