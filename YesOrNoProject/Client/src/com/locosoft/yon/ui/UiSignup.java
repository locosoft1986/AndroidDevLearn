package com.locosoft.yon.ui;

import java.util.HashMap;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.os.Bundle;
import android.text.InputType;
import android.text.SpannableStringBuilder;
import android.text.style.ForegroundColorSpan;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.EditText;

import com.locosoft.yon.R;
import com.locosoft.yon.base.BaseMessage;
import com.locosoft.yon.base.BaseUi;
import com.locosoft.yon.base.C;
import com.locosoft.yon.util.CustomerTextFieldFocusListener;
import com.locosoft.yon.util.CustomerTextFilter;
import com.locosoft.yon.util.OnTextLengthChangedListener;

public class UiSignup extends BaseUi {

	private EditText mEditName;
	private CustomerTextFilter mTextFilter;
	private EditText mEditPass;
	private EditText mEditConfirmPass;
	private EditText mEditCellphone;
	private AlertDialog.Builder mSignupOkAlertBuilder;
	private AlertDialog mSignupOkAlert;
	
	
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
	
		rootView = inflater.inflate(R.layout.ui_signup, null);
		
		// remember password
		mEditName = (EditText) rootView.findViewById(R.id.app_signup_edit_name);
		mEditPass = (EditText) rootView.findViewById(R.id.app_signup_edit_pass);
		mEditConfirmPass = (EditText) rootView.findViewById(R.id.app_signup_edit_confirm_pass);
		mEditCellphone = (EditText) rootView.findViewById(R.id.app_signup_edit_cellphone);
		final Button submitBtn = (Button) rootView.findViewById(R.id.app_signup_btn_submit);
		submitBtn.setEnabled(false);
		
		final EditText signupName = mEditName;
		final EditText signupPass = mEditPass;
		final EditText confirmPass = mEditConfirmPass;
		final EditText cellphone = mEditCellphone;
		
		final OnTextLengthChangedListener textLengthChangedListener 
			= new  OnTextLengthChangedListener()
			{
				@Override
				public void onTextLengthChanged()
				{
					if(signupName.length() >= C.custmerVail.username_min
							&& signupPass.length() >= C.custmerVail.password_min
							&& confirmPass.length() >= C.custmerVail.password_min
							&& cellphone.length() >= C.custmerVail.cellphone_min)
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
		mEditConfirmPass.addTextChangedListener(mTextFilter);
		mEditCellphone.addTextChangedListener(mTextFilter);
		
	
		
		// signup submit
		OnClickListener mOnClickListener = new OnClickListener() {
			@Override
			public void onClick(View v) {
				switch (v.getId()) {
					case R.id.app_signup_btn_submit : 
						doTaskSignup();
						break;

				}
			}
		};
		rootView.findViewById(R.id.app_signup_btn_submit).setOnClickListener(mOnClickListener);
		


		
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
		mEditConfirmPass.setOnFocusChangeListener(new CustomerTextFieldFocusListener(
				this.getContext(),
				R.string.signup_confirm_pass,
				InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_PASSWORD,
				mTextFilter
			));
		mEditCellphone.setOnFocusChangeListener(new CustomerTextFieldFocusListener(
				this.getContext(),
				R.string.signup_cellphone,
				InputType.TYPE_CLASS_TEXT | InputType.TYPE_CLASS_PHONE,
				mTextFilter
			));
		
		
		mSignupOkAlertBuilder = new AlertDialog.Builder(this.getContext());
		mSignupOkAlertBuilder.setCancelable(false);
		mSignupOkAlertBuilder.setMessage(
				this.getContext()
				.getResources()
				.getString(R.string.msg_signupok));
        
		mSignupOkAlertBuilder.setPositiveButton(
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
	

	
	private void doTaskSignup() {
		
		if (mEditPass.getText().toString().equals(mEditConfirmPass.getText().toString())) {
			app.setLong(System.currentTimeMillis());
			HashMap<String, String> urlParams = new HashMap<String, String>();
			urlParams.put("name", mEditName.getText().toString());
			urlParams.put("pass", mEditPass.getText().toString());
			urlParams.put("phone", mEditCellphone.getText().toString());
			try {
				this.doTaskAsync(C.task.register, C.api.register, urlParams);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		else
		{
			String eString = 
					this.getString(R.string.msg_signuppasserror);
			ForegroundColorSpan fgcSpan = new ForegroundColorSpan(R.color.red);
			SpannableStringBuilder ssbuilder 
				= new SpannableStringBuilder(eString);
			
			ssbuilder.setSpan(fgcSpan, 0, eString.length(), 0);
			mEditConfirmPass.setError(ssbuilder);
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
					mSignupOkAlert = mSignupOkAlertBuilder.create();
					mSignupOkAlert.show();
					
				}
				else 
				{
					String eString;
					ForegroundColorSpan fgcSpan = new ForegroundColorSpan(R.color.red);

					
					if(C.retCode.retSignupName.equalsIgnoreCase(
							message.getCode()))
					{

						eString = 
								this.getString(R.string.msg_signupfail);
						
						SpannableStringBuilder ssbuilder 
							= new SpannableStringBuilder(eString);
					
						ssbuilder.setSpan(fgcSpan, 0, eString.length(), 0);
					
						mEditName.setError(ssbuilder);
						

					}
					else
					{
						eString = 
								this.getString(R.string.msg_signupfailphone);
						
						SpannableStringBuilder ssbuilder 
						= new SpannableStringBuilder(eString);
				
						ssbuilder.setSpan(fgcSpan, 0, eString.length(), 0);
					
						mEditCellphone.setError(ssbuilder);
						
					}
					
					toast(eString);
				}
					

				break;
		}
	}
	
	@Override
	public void onNetworkError (int taskId) {
		super.onNetworkError(taskId);
	}
	
}
