package com.locosoft.testapp;

import android.os.Bundle;
import android.app.Activity;
import android.content.Intent;
import android.util.Log;
import android.view.*;


public class MainLauncher extends Activity {

	private final String dbgTag = "[TestApp]";
	
	@Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.mainlauncher);
        
        Log.d(dbgTag, "---- MainLauncher::onCreate() ----");
    }
	
	@Override
	public void onStart()
	{
		super.onStart();
		Log.d(dbgTag, "---- MainLauncher::onStart() ----");
	}
	
	@Override
	public void onRestart()
	{
		super.onRestart();
		Log.d(dbgTag, "---- MainLauncher::onRestart() ----");
	}
	
	@Override
	public void onPause()
	{
		super.onPause();
		Log.d(dbgTag, "---- MainLauncher::onPause() ----");
	}
	
	@Override
	public void onResume()
	{
		super.onResume();
		Log.d(dbgTag, "---- MainLauncher::onResume() ----");
	}
	
	@Override
	public void onStop()
	{
		super.onStop();
		Log.d(dbgTag, "---- MainLauncher::onStop() ----");
	}
	
	@Override
	public void onDestroy()
	{
		super.onDestroy();
		Log.d(dbgTag, "---- MainLauncher::onDestroy() ----");
	}
    
    public void onMenuClicked(View sourceView)
    {
    	if (sourceView == null) return;
    	
    	int id = sourceView.getId();
    	switch(id)
    	{
    	case R.id.startSwitcherTest:
    		{
    			Intent intent = new Intent(MainLauncher.this, ViewSwitcherTest.class);
    			startActivity(intent);
    			break;
    		}
    	case R.id.fragmentPagerTest:
	    	{
    			Intent intent = new Intent(MainLauncher.this, FragmentPagerTest.class);
    			startActivity(intent);
    			break;
	    	}
    		
    	case R.id.exitApp:
    		{
    			finish();
    			break;
    		}
    	}
    }
    
}
