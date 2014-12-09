package com.locosoft.yon.util;

import com.locosoft.yon.model.SceneContentMgr;

import android.webkit.JavascriptInterface;

public class WebViewInterface {
	
	private WebViewUIInterface mWebViewUIInterface;
	
	public interface WebViewUIInterface
	{
		//Show the text content editor when user double click the text type element of the template in the WebView
		public abstract void showTextEditor(String key);
		//When user click the HTML element in the webview indicate that this element is selected
		public abstract void onElementSelected(String key);
		//Save entire HTML for the template
		public abstract void saveHTML(String strHtml);
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
	public void onElementSelected(String key)
	{
		if(mWebViewUIInterface != null)
		{
			mWebViewUIInterface.onElementSelected(key);
		}
	}
	
	@JavascriptInterface
	public void saveHTML(String strHtml)
	{
		if(mWebViewUIInterface != null)
		{
			mWebViewUIInterface.saveHTML(strHtml);
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
	public void setType(String key, String type)
	{
		SceneContentMgr.getInstance().setContentType(key, type);
	}

	@JavascriptInterface
	public String getType(String key)
	{
		return SceneContentMgr.getInstance().getContentType(key);
	}
}
