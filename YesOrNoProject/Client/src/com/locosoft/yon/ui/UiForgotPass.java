package com.locosoft.yon.ui;

import java.util.HashMap;


import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.text.SpannableStringBuilder;
import android.text.style.ForegroundColorSpan;
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
import com.locosoft.yon.util.AppUtil;

public class UiForgotPass extends BaseUi {
	private EditText mEditPhone;	
	private EditText mEditSMSCode;
	private Button mBtnGetSMSCode;
	private SharedPreferences settings;
	private int mRemainSMSCount;
	private String mSMSCodeMd5Answer;
	private CountDownTimer mCntDownTimer = null;
	private long mPrevSuccessedSysTime = 0;
	//reset the sms code answer into invaild state if true.
	private boolean mResetFormOnStart = false;
	

	@Override
	public View onCreateView(LayoutInflater inflater, 
			ViewGroup container, Bundle savedInstanceState)
	{	
	
		rootView = inflater.inflate(R.layout.ui_forgotpass, null);
		Bundle b = this.getArguments();
		if (b != null)
		{
			mResetFormOnStart = b.getBoolean("reset");
		}
		
		// remember password
		mEditPhone = (EditText) rootView.findViewById(R.id.app_forgot_cellphone);
		mEditSMSCode = (EditText) rootView.findViewById(R.id.app_forgot_verlicode);
		final Button BtnGetSMSCode 
			= mBtnGetSMSCode = (Button) rootView.findViewById(R.id.app_forgot_btn_get_sms);

		settings = this.getActivity().getPreferences(Context.MODE_PRIVATE);
		mRemainSMSCount = settings.getInt("smsremain", 0);
		mSMSCodeMd5Answer = settings.getString("smsanswer", "");
		mPrevSuccessedSysTime = settings.getLong("smssuctime", 0);
		String prevPhone = settings.getString("smsphone", "");
		long curSysTime = System.currentTimeMillis();
		int sysSucTimeDiff = (int) ((curSysTime - mPrevSuccessedSysTime) / 1000.0f);
		
		if (mRemainSMSCount > 0) {
						

			
			if (sysSucTimeDiff > mRemainSMSCount)
			{
				BtnGetSMSCode.setEnabled(true);
				BtnGetSMSCode.setText(this.getString(R.string.forgot_get_sms));
				

			}
			else
			{
				mRemainSMSCount -= sysSucTimeDiff;
				BtnGetSMSCode.setEnabled(false);
				BtnGetSMSCode.setText(
						String.format(
								this.getString(R.string.forgot_resend)
								, mRemainSMSCount)
								);
				startBtnCountDown(mRemainSMSCount);
			}
		}
		else
		{
			BtnGetSMSCode.setEnabled(true);
			BtnGetSMSCode.setText(this.getString(R.string.forgot_get_sms));
		}
		//if the difference between the current time and the previous sms time is 
		//greater than ?? s, then the previous sms code is invaild
		if(sysSucTimeDiff >= C.custmerVail.smscode_max_time || mResetFormOnStart)
		{
			prevPhone = "";
			mSMSCodeMd5Answer = "";
		}
		mEditPhone.setText(prevPhone);
		
		// login submit
		OnClickListener mOnClickListener = new OnClickListener() {
			@Override
			public void onClick(View v) {
				switch (v.getId()) {
					case R.id.app_forgot_btn_get_sms : 
						
						doTaskGetSMS();
						
						break;
					case R.id.app_forgot_btn_reset_pass:
					{
						long curSysTime = System.currentTimeMillis();
						int sysSucTimeDiff = (int) ((curSysTime - mPrevSuccessedSysTime) / 1000.0f);
						//The previous sms code is too old. Hint user to get it again.
						if(sysSucTimeDiff >= C.custmerVail.smscode_max_time)
						{
							mSMSCodeMd5Answer = "";
							toast(
									UiForgotPass.this.getString(R.string.msg_smscodetimesup));
							break;
						}
						
						if(mEditSMSCode.length() >= C.custmerVail.smscode_min)
						{
							String strTmpMD5 = AppUtil.md5(mEditSMSCode.getText().toString());
							if (strTmpMD5.equals(mSMSCodeMd5Answer))
							{
								mSMSCodeMd5Answer = "";
								BaseAuth.getCustomer()
									.setPhoneNum(mEditPhone.getText().toString());

								// Go to reset password form
								change(R.id.app_forgotpass_container, new UiResetPass());
								break;
							}
							else
							{
								String eString = 
										UiForgotPass.this.getString(R.string.msg_wrongsmscode);
								
								displayEditTextError(mEditSMSCode, eString);
					
								toast(eString);
								
							}

						}
						else
						{
							String eString = String.format(
									UiForgotPass.this.getString(R.string.msg_smscodeerror)
									,C.custmerVail.smscode_min);
									
							displayEditTextError(mEditSMSCode, eString);
							
							toast(eString);
						}
					}


					break;

				}
			}
		};
		rootView.findViewById(R.id.app_forgot_btn_get_sms).setOnClickListener(mOnClickListener);
		rootView.findViewById(R.id.app_forgot_btn_reset_pass).setOnClickListener(mOnClickListener);
		


		
		return rootView;
	}
	
	private void startBtnCountDown(int totalTimeInSec)
	{
		mCntDownTimer = new CountDownTimer(totalTimeInSec * 1000, 1000)
		{

			@Override
			public void onFinish() {
				final Button BtnGetSMSCode = mBtnGetSMSCode;
				BtnGetSMSCode.setEnabled(true);
				BtnGetSMSCode.setText(UiForgotPass.this.getString(R.string.forgot_get_sms));
				mRemainSMSCount = 0;
			}

			@Override
			public void onTick(long t) {
				final Button BtnGetSMSCode = mBtnGetSMSCode;
				mRemainSMSCount = (int) (t/1000);
				BtnGetSMSCode.setText(
						String.format(
								UiForgotPass.this.getString(R.string.forgot_resend)
								, mRemainSMSCount)
								);
			}
			
		};
		mCntDownTimer.start();
	}
	
	private void doTaskGetSMS() {
		mSMSCodeMd5Answer = "";
		if (mEditPhone.length() > 0) {
			app.setLong(System.currentTimeMillis());
			HashMap<String, String> urlParams = new HashMap<String, String>();
			urlParams.put("phone", mEditPhone.getText().toString());
			
			try {
				this.doTaskAsync(C.task.getSms, C.api.getSms, urlParams);
			} catch (Exception e) {
				e.printStackTrace();
			}
			
			mBtnGetSMSCode.setEnabled(false);
		}
		else
		{
			String eString = 
					this.getString(R.string.msg_phoneempty);

			displayEditTextError(mEditPhone, eString);

			toast(eString);
			
			mBtnGetSMSCode.setEnabled(true);
		}
	}
	
	
	@Override
	public void onPause() {
		super.onPause();
		SharedPreferences.Editor editor = settings.edit();
		editor.putString("smsphone", mEditPhone.getText().toString());
		editor.putString("smsanswer", mSMSCodeMd5Answer);
		editor.putInt("smsremain", mRemainSMSCount);
		editor.putLong("smssuctime", mPrevSuccessedSysTime);
		editor.commit();
		
		if (mCntDownTimer != null)
		{
			mCntDownTimer.cancel();
		}
	}
	
	////////////////////////////////////////////////////////////////////////////////////////////////
	// async task callback methods
	
	@Override
	public void onTaskComplete(int taskId, BaseMessage message) {
		super.onTaskComplete(taskId, message);
		switch (taskId) {
			case C.task.getSms:
				if(C.retCode.retDone.equalsIgnoreCase(
						message.getCode()))
				{
					mSMSCodeMd5Answer = message.getMessage();
					mPrevSuccessedSysTime = System.currentTimeMillis();
					startBtnCountDown(C.custmerVail.smscode_wait_time);
					
				}
				else
				{
					mBtnGetSMSCode.setEnabled(true);
					mBtnGetSMSCode.setText(this.getString(R.string.forgot_get_sms));
	
					
					String eString = this.getString(R.string.msg_wrongphone);
					
					displayEditTextError(mEditPhone, eString);

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
