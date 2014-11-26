package com.locosoft.yon.ui;

import java.util.HashMap;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.os.Bundle;
import android.text.InputType;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.EditText;

import com.locosoft.yon.R;
import com.locosoft.yon.base.BaseAuth;
import com.locosoft.yon.base.BaseMessage;
import com.locosoft.yon.base.BaseUi;
import com.locosoft.yon.base.C;
import com.locosoft.yon.util.CustomerTextFieldFocusListener;
import com.locosoft.yon.util.CustomerTextFilter;
import com.locosoft.yon.util.OnTextLengthChangedListener;

public class UiResetPass extends BaseUi {
	private EditText mEditOldPass;
	private CustomerTextFilter mTextFilter;
	private EditText mEditPass;
	private EditText mEditConfirmPass;
	private AlertDialog.Builder mResetOkAlertBuilder;
	private AlertDialog mResetOkAlert;

	
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
	
		rootView = inflater.inflate(R.layout.ui_resetpass, null);
		
		// remember password
		mEditOldPass = (EditText) rootView.findViewById(R.id.app_reset_edit_oldpass);
		
		if (BaseAuth.isLogin())
		{
			mEditOldPass.setVisibility(View.VISIBLE);
		}
		else
		{
			mEditOldPass.setVisibility(View.GONE);
		}
		
		
		mEditPass = (EditText) rootView.findViewById(R.id.app_reset_edit_pass);
		mEditConfirmPass = (EditText) rootView.findViewById(R.id.app_reset_edit_confirm_pass);

		final Button submitBtn = (Button) rootView.findViewById(R.id.app_reset_btn_submit);
		submitBtn.setEnabled(false);
		
		final EditText oldpass = mEditOldPass;
		final EditText signupPass = mEditPass;
		final EditText confirmPass = mEditConfirmPass;
		
		final OnTextLengthChangedListener textLengthChangedListener 
			= new  OnTextLengthChangedListener()
			{
				@Override
				public void onTextLengthChanged()
				{
					if( (oldpass.length() >= C.custmerVail.password_min || !BaseAuth.isLogin())
							&& signupPass.length() >= C.custmerVail.password_min
							&& confirmPass.length() >= C.custmerVail.password_min)
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
		
		mEditOldPass.addTextChangedListener(mTextFilter);
		mEditPass.addTextChangedListener(mTextFilter);
		mEditConfirmPass.addTextChangedListener(mTextFilter);
		
	
		
		// signup submit
		OnClickListener mOnClickListener = new OnClickListener() {
			@Override
			public void onClick(View v) {
				switch (v.getId()) {
					case R.id.app_reset_btn_submit : 
						doTaskResetPass();
						break;

				}
			}
		};
		rootView.findViewById(R.id.app_reset_btn_submit).setOnClickListener(mOnClickListener);
		


		
		mEditOldPass.setOnFocusChangeListener(new CustomerTextFieldFocusListener(
					this.getContext(),
					R.string.reset_oldpass,
					InputType.TYPE_CLASS_TEXT,
					mTextFilter
				));
		mEditPass.setOnFocusChangeListener(new CustomerTextFieldFocusListener(
				this.getContext(),
				R.string.reset_newpass,
				InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_PASSWORD,
				mTextFilter
			));
		mEditConfirmPass.setOnFocusChangeListener(new CustomerTextFieldFocusListener(
				this.getContext(),
				R.string.reset_newpassconfirm,
				InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_PASSWORD,
				mTextFilter
			));

		
		
		mResetOkAlertBuilder = new AlertDialog.Builder(this.getContext());
		mResetOkAlertBuilder.setCancelable(false);
		mResetOkAlertBuilder.setMessage(
				this.getContext()
				.getResources()
				.getString(R.string.msg_resetpassok));
        
		mResetOkAlertBuilder.setPositiveButton(
				this.getContext()
					.getResources()
					.getString(R.string.btn_confirm)
				, new DialogInterface.OnClickListener() {
			
					@Override
					public void onClick(DialogInterface dialog, int id) {

						submitBtn.setEnabled(false);
						dialog.dismiss();
						doFinish();
					}
				}
        		
        );
        
        
		return rootView;
	}
	

	
	private void doTaskResetPass() {
		//if the user has already logged in, 
		//check the old pass and the pass in customer object are equal.
		if(BaseAuth.isLogin() 
				&& !mEditOldPass.getText().toString()
					.equals(BaseAuth.getCustomer().getPass()))
		{
			//if not warn user
			String eString = 
					this.getString(R.string.msg_resetoldpasserror);
			
			displayEditTextError(mEditConfirmPass, eString);
			return;
		}
		

		if (mEditPass.getText().toString().equals(mEditConfirmPass.getText().toString())) {
			app.setLong(System.currentTimeMillis());
			HashMap<String, String> urlParams = new HashMap<String, String>();
			urlParams.put("phone", BaseAuth.getCustomer().getPhoneNum());
			urlParams.put("pass", mEditPass.getText().toString());			
			try {
				this.doTaskAsync(C.task.resetPass, C.api.resetPass, urlParams);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		else
		{
			String eString = 
					this.getString(R.string.msg_resetpassfail);
			
			toast(eString);

		}
	}
	
	

	////////////////////////////////////////////////////////////////////////////////////////////////
	// async task callback methods
	
	@Override
	public void onTaskComplete(int taskId, BaseMessage message) {
		super.onTaskComplete(taskId, message);
		switch (taskId) {
			case C.task.register:
				if(C.retCode.retDone.equalsIgnoreCase(
						message.getCode()))
				{
					mResetOkAlert = mResetOkAlertBuilder.create();
					mResetOkAlert.show();
					
				}
				else 
				{
					toast(this.getString(R.string.msg_networkerror));
				}
					

				break;
		}
	}
	
	@Override
	public void onNetworkError (int taskId) {
		super.onNetworkError(taskId);
	}
	
}
