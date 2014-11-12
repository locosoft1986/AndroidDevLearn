package com.locosoft.yon.ui;

import java.util.HashMap;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.View.OnClickListener;
import android.widget.CheckBox;
import android.widget.CompoundButton;
import android.widget.EditText;

import com.locosoft.yon.R;
import com.locosoft.yon.base.BaseAuth;
import com.locosoft.yon.base.BaseMessage;
import com.locosoft.yon.base.BaseService;
import com.locosoft.yon.base.BaseUi;
import com.locosoft.yon.base.C;
import com.locosoft.yon.model.Customer;
//import com.locosoft.yon.service.NoticeService;

public class UiLogin extends BaseUi {

	private EditText mEditName;
	private EditText mEditPass;
	private CheckBox mCheckBox;
	private SharedPreferences settings;
	
	@Override
	public View onCreateView(LayoutInflater inflater, 
			ViewGroup container, Bundle savedInstanceState)
	{	
	
		View view = inflater.inflate(R.layout.ui_login, null);
		
		// remember password
		mEditName = (EditText) view.findViewById(R.id.app_login_edit_name);
		mEditPass = (EditText) view.findViewById(R.id.app_login_edit_pass);
		mCheckBox = (CheckBox) view.findViewById(R.id.app_login_check_remember);
		settings = this.getActivity().getPreferences(Context.MODE_PRIVATE);
		if (settings.getBoolean("remember", false)) {
			mCheckBox.setChecked(true);
			mEditName.setText(settings.getString("username", ""));
			mEditPass.setText(settings.getString("password", ""));
		}
		
		// remember checkbox
		mCheckBox.setOnCheckedChangeListener(new CheckBox.OnCheckedChangeListener(){
			@Override
			public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
				SharedPreferences.Editor editor = settings.edit();
				if (mCheckBox.isChecked()) {
					editor.putBoolean("remember", true);
					editor.putString("username", mEditName.getText().toString());
					editor.putString("password", mEditPass.getText().toString());
				} else {
					editor.putBoolean("remember", false);
					editor.putString("username", "");
					editor.putString("password", "");
				}
				editor.commit();
			}
		});
		
		// login submit
		OnClickListener mOnClickListener = new OnClickListener() {
			@Override
			public void onClick(View v) {
				switch (v.getId()) {
					case R.id.app_login_btn_submit : 
						doTaskLogin();
						break;
				}
			}
		};
		view.findViewById(R.id.app_login_btn_submit).setOnClickListener(mOnClickListener);
		
		return view;
	}
	
	private void doTaskLogin() {
		app.setLong(System.currentTimeMillis());
		if (mEditName.length() > 0 && mEditPass.length() > 0) {
			HashMap<String, String> urlParams = new HashMap<String, String>();
			urlParams.put("name", mEditName.getText().toString());
			urlParams.put("pass", mEditPass.getText().toString());
			try {
				this.doTaskAsync(C.task.login, C.api.login, urlParams);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
	
	////////////////////////////////////////////////////////////////////////////////////////////////
	// async task callback methods
	
	@Override
	public void onTaskComplete(int taskId, BaseMessage message) {
		super.onTaskComplete(taskId, message);
		switch (taskId) {
			case C.task.login:
				Customer customer = null;
				// login logic
				try {
					customer = (Customer) message.getResult("Customer");
					// login success
					if (customer.getName() != null) {
						BaseAuth.setCustomer(customer);
						BaseAuth.setLogin(true);
					// login fail
					} /*else {
						BaseAuth.setCustomer(customer); // set sid
						BaseAuth.setLogin(false);
						toast(this.getString(R.string.msg_loginfail));
					}*/
				} catch (Exception e) {
					//e.printStackTrace();
					BaseAuth.setLogin(false);
					toast(this.getString(R.string.msg_loginfail));
				}
				// login complete
				long startTime = app.getLong();
				long loginTime = System.currentTimeMillis() - startTime;
				Log.w("LoginTime", Long.toString(loginTime));
				// turn to main activity
				//if (BaseAuth.isLogin()) {
					// start service
					//BaseService.start(this, NoticeService.class);
					// turn to index
					doFinish ();
				//}
				break;
		}
	}
	
	@Override
	public void onNetworkError (int taskId) {
		super.onNetworkError(taskId);
	}
	

	
}