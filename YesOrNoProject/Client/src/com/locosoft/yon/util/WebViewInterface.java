package com.locosoft.yon.util;

import com.locosoft.yon.model.SceneContentMgr;

import android.webkit.JavascriptInterface;

public class WebViewInterface {
	
	private WebViewUIInterface mWebViewUIInterface;
	
	public interface WebViewUIInterface
	{
		public abstract void showTextEditor(String key);
		
	}
	
	
	
	public WebViewInterface(WebViewUIInterface uiInterface)
	{
		mWebViewUIInterface = uiInterface;
	}
	
	@JavascriptInterface
	public void showTextEditDialog(String key)
	{
		if(mWebViewUIInterface != null)
		{
			mWebViewUIInterface.showTextEditor(key);
		}
	}
	
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
