package com.locosoft.yon.test;

import com.locosoft.yon.R;

import android.os.Bundle;
import android.app.Activity;
import android.view.Menu;

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

}
