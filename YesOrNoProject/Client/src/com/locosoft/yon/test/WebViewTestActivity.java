package com.locosoft.yon.test;

import com.locosoft.yon.R;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebView;

public class WebViewTestActivity extends Activity {
	
	@Override
	protected void onCreate(Bundle savedStateInstance)
	{
		super.onCreate(savedStateInstance);
		setContentView(R.layout.webviewtest);
		
		WebView v = (WebView) findViewById(R.id.webTestView);
		v.getSettings().setJavaScriptEnabled(true);
		v.getSettings().setDefaultTextEncodingName("utf-8");
		v.addJavascriptInterface(new AndroidJavaInterface(), "AndroidJava");
		v.loadUrl("file:///android_asset/www/main.html");
	}
}
