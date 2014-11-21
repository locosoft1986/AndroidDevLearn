package com.locosoft.yon.ui;

import java.util.HashMap;

import android.app.Activity;
import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.text.InputType;
import android.util.Log;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.View.OnClickListener;
import android.widget.Button;
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
import com.locosoft.yon.util.CustomerTextFieldFocusListener;
import com.locosoft.yon.util.CustomerTextFilter;
import com.locosoft.yon.util.OnTextLengthChangedListener;
import com.locosoft.yon.activity.ForgotPassActivity;
import com.locosoft.yon.activity.SignupActivity;
//import com.locosoft.yon.service.NoticeService;

public class UiLogin extends BaseUi {

	private EditText mEditName;
	private CustomerTextFilter mTextFilter;
	private EditText mEditPass;
	private CheckBox mCheckBox;
	private SharedPreferences settings;
	
	
	@Override
	public void onAttach(Activity activity) 
	{
		super.onAttach(activity);	
		mTextFilter = new CustomerTextFilter();

	}
	
	@Override
	public View onCreateView(LayoutInflater inflater, 
			ViewGroup container, Bundle savedInstanceState)
	{	
	
		rootView = inflater.inflate(R.layout.ui_login, null);
		
		BaseAuth.setLogin(false);
		// remember password
		mEditName = (EditText) rootView.findViewById(R.id.app_login_edit_name);
		mEditPass = (EditText) rootView.findViewById(R.id.app_login_edit_pass);
		final Button submitBtn = (Button) rootView.findViewById(R.id.app_login_btn_submit);
		submitBtn.setEnabled(false);
		
		final EditText loginName = mEditName;
		final EditText loginPass = mEditPass;
		
		final OnTextLengthChangedListener textLengthChangedListener 
			= new  OnTextLengthChangedListener()
			{
				@Override
				public void onTextLengthChanged()
				{
					if(loginName.length() >= C.custmerVail.username_min
							&& loginPass.length() >= C.custmerVail.password_min)
					{
						submitBtn.setEnabled(true);
						
					}
					else
					{
						submitBtn.setEnabled(false);
					}
				}
			};	

		mTextFilter.setTextLengthChangedListener(textLengthChangedListener);
		
		mEditName.addTextChangedListener(mTextFilter);
		mEditPass.addTextChangedListener(mTextFilter);
		
		mCheckBox = (CheckBox) rootView.findViewById(R.id.app_login_check_remember);
		
		
		settings = this.getActivity().getPreferences(Context.MODE_PRIVATE);
		if (settings.getBoolean("remember", false)) {
			mCheckBox.setChecked(true);
			mEditName.setText(settings.getString("username", ""));
			mEditName.setGravity(Gravity.LEFT);	
			mEditName.setTextColor(this.getContext().getResources().getColor(R.color.black));
			
			mEditPass.setText(settings.getString("password", ""));
			mEditPass.setInputType(InputType.TYPE_CLASS_TEXT 
					| InputType.TYPE_TEXT_VARIATION_PASSWORD);
			mEditPass.setGravity(Gravity.LEFT);
			mEditPass.setTextColor(this.getContext().getResources().getColor(R.color.black));
			
			if(mEditName.length() >= C.custmerVail.username_min
					&& mEditPass.length() >= C.custmerVail.password_min)
			{
				submitBtn.setEnabled(true);
			}
		}
		else
		{
			mEditName.setText(
					getContext().getResources().getString(R.string.login_username));			
			mEditName.setGravity(Gravity.CENTER);
			mEditName.setTextColor(this.getContext().getResources().getColor(R.color.dark_gray));
			
			mEditPass.setText(
					getContext().getResources().getString(R.string.login_password));
			
			mEditPass.setInputType(InputType.TYPE_CLASS_TEXT);
			mEditPass.setGravity(Gravity.CENTER);
			mEditPass.setTextColor(this.getContext().getResources().getColor(R.color.dark_gray));

			submitBtn.setEnabled(false);
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
					case R.id.app_login_btn_signup:
						overlay(SignupActivity.class);
						break;
					case R.id.app_login_btn_forgot:
					{
						//It is triggered by login UI, so inform the Forgot Password UI to clear the form
						//and the sms code that was previously received
						Bundle b = new Bundle();
						b.putBoolean("resetForm", true);
						overlay(ForgotPassActivity.class, b);
						break;
					}
				}
			}
		};
		rootView.findViewById(R.id.app_login_btn_submit).setOnClickListener(mOnClickListener);
		rootView.findViewById(R.id.app_login_btn_signup).setOnClickListener(mOnClickListener);
		rootView.findViewById(R.id.app_login_btn_forgot).setOnClickListener(mOnClickListener);
		


		
		mEditName.setOnFocusChangeListener(new CustomerTextFieldFocusListener(
					this.getContext(),
					R.string.login_username,
					InputType.TYPE_CLASS_TEXT,
					mTextFilter
				));
		mEditPass.setOnFocusChangeListener(new CustomerTextFieldFocusListener(
				this.getContext(),
				R.string.login_password,
				InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_PASSWORD,
				mTextFilter
			));
		
		return rootView;
	}
	
	private void doTaskLogin() {
		
		if (mEditName.length() > 0 && mEditPass.length() > 0) {
			app.setLong(System.currentTimeMillis());
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
	
	
	@Override
	public void onPause() {
		super.onPause();
		if (mCheckBox.isChecked())
		{
			SharedPreferences.Editor editor = settings.edit();
			editor.putString("username", mEditName.getText().toString());
			editor.putString("password", mEditPass.getText().toString());
			editor.commit();
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
					// login fail logic in the case that we might use MVC server framework
					// such as zend framework for php	
					} else {
						BaseAuth.setCustomer(customer); 
						BaseAuth.setLogin(false);
						toast(this.getString(R.string.msg_loginfail));
					}
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