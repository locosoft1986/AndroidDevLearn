package com.locosoft.yon.activity;

import com.locosoft.yon.R;
import com.locosoft.yon.base.BaseUi;
import com.locosoft.yon.ui.UiForgotPass;

import android.app.Activity;
import android.app.FragmentManager;
import android.app.FragmentTransaction;
import android.content.Intent;
import android.os.Bundle;

public class ForgotPassActivity extends Activity {
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.forgotpass_activity);
		
		FragmentManager fm = this.getFragmentManager();
		
		Intent intent = this.getIntent();
		boolean isResetForm = false;
		Bundle extrasBundle = intent.getExtras();
		isResetForm = extrasBundle.getBoolean("resetForm");
		BaseUi forgotFragment =
				(BaseUi)fm.findFragmentById(R.id.app_forgotpass_container);
		if(forgotFragment == null)
		{
			FragmentTransaction ft = fm.beginTransaction();	
			UiForgotPass forgotPassUi = new UiForgotPass();
			Bundle b = new Bundle();
			//Send the argument "reset" to fragment to clear the forms.
			b.putBoolean("reset", isResetForm);
			forgotPassUi.setArguments(b);
			ft.add(R.id.app_forgotpass_container, forgotPassUi);
			
			ft.commit();
		}
		

	}
}
