package com.locosoft.yon.test;

import com.locosoft.yon.R;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class WebViewTestActivity extends Activity {
	
	@Override
	protected void onCreate(Bundle savedStateInstance)
	{
		super.onCreate(savedStateInstance);
		setContentView(R.layout.webviewtest);
		
		WebView v = (WebView) findViewById(R.id.webTestView);
		
		v.setWebViewClient(new WebViewClient() {
			@Override
			public boolean shouldOverrideUrlLoading(WebView view, String url) {
				view.loadUrl(url);
				return true;
			}
		});
		
		v.getSettings().setJavaScriptEnabled(true);
		v.getSettings().setDefaultTextEncodingName("utf-8");
		//v.addJavascriptInterface(new AndroidJavaInterface(), "AndroidJava");
		//v.loadUrl("file:///android_asset/www/main.html");
		v.loadUrl("http://115.29.8.71/N_and_S_wedding_party/app");
	}
}
