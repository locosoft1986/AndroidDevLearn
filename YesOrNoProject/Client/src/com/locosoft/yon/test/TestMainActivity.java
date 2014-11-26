package com.locosoft.yon.test;

import com.locosoft.yon.activity.*;
import com.locosoft.yon.R;

import android.os.Bundle;
import android.app.Activity;
import android.content.Intent;
import android.util.Log;
import android.view.Menu;
import android.view.View;
import android.widget.TextView;

import com.locosoft.yon.base.BaseAuth;

public class TestMainActivity extends Activity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.test_main);
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.test_main, menu);
		return true;
	}
	
	@Override
	public void onResume()
	{
		super.onResume();
		TextView curUserText = (TextView) findViewById(R.id.testCurrentUser);
		if(BaseAuth.isLogin())
		{
			curUserText.setText("User " + BaseAuth.getCustomer().getNickname() +
					" Login Sucess!");
		}
		else
		{
			curUserText.setText("");
		}
	}
	
    public void onMenuClicked(View sourceView)
    {
    	if (sourceView == null) return;
    	
    	int id = sourceView.getId();
    	switch(id)
    	{
    	case R.id.startLoginTest:
    		{
    			Intent intent = new Intent(this, LoginActivity.class);
    			startActivity(intent);
    			break;
    		}
    	case R.id.webViewTest:
		{

			break;
		}
    		
    	case R.id.exitTestApp:
    		{
    			finish();
    			break;
    		}
    	}
    }
}
