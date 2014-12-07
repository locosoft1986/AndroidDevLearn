package com.locosoft.yon.ui;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import com.locosoft.yon.R;
import com.locosoft.yon.base.BaseUi;

public class UiEditPage extends BaseUi {
	public WebView mMainWebView;
	
	@Override
	public View onCreateView(LayoutInflater inflater, 
			ViewGroup container, Bundle savedInstanceState)
	{	
	
		rootView = inflater.inflate(R.layout.ui_editpage, null);
		mMainWebView = (WebView) rootView.findViewById(R.id.mainWebView);
		
		mMainWebView.setWebViewClient(new WebViewClient() {
			@Override
			public boolean shouldOverrideUrlLoading(WebView view, String url) {
				view.loadUrl(url);
				return true;
			}
		});
		mMainWebView.getSettings().setJavaScriptEnabled(true);
		mMainWebView.getSettings().setDefaultTextEncodingName("utf-8");
		//mMainWebView.addJavascriptInterface(new AndroidJavaInterface(), "AndroidJava");
		//mMainWebView.loadUrl("file:///android_asset/www/main.html");
		mMainWebView.loadUrl("http://115.29.8.71/N_and_S_wedding_party/app");
		
		return rootView;
	}
}
