package com.locosoft.yon.util;


import android.R;
import android.content.Context;
import android.text.InputType;
import android.view.Gravity;
import android.view.View;
import android.view.View.OnFocusChangeListener;
import android.widget.EditText;

public class CustomerTextFieldFocusListener implements OnFocusChangeListener {
	private Context mContext;
	private int mDefaultString;
	private int mActualInputType;
	private CustomerTextFilter mTextFilter;
	
	public CustomerTextFieldFocusListener(Context context,
			int defaultString,
			int actualInputType,
			CustomerTextFilter filter)
	{
		mContext = context;
		mDefaultString = defaultString;
		mActualInputType = actualInputType;
		mTextFilter = filter;
	}
	@Override
	public void onFocusChange(View v, boolean hasFocus) {
		EditText view = (EditText) v;
		String name = view.getText().toString().trim();
		
		if(hasFocus) {
			mTextFilter.setEnabled(true);
			if(name.isEmpty() 
					|| name.equalsIgnoreCase(
							mContext.getResources().getString(mDefaultString))) 
			{
				view.setText("");
				view.setInputType(mActualInputType);
				view.setTextColor(mContext.getResources().getColor(R.color.black));
			}
			view.setGravity(Gravity.LEFT);
			
			
		}
		else {
			mTextFilter.setEnabled(false);
			
			if(name.isEmpty()) 
			{
				view.setText(
						mContext.getResources().getString(mDefaultString));
				
				view.setGravity(Gravity.CENTER);
				view.setInputType(InputType.TYPE_CLASS_TEXT);
				view.setTextColor(mContext.getResources().getColor(R.color.darker_gray));
				
			}
			else
			{							
				view.setGravity(Gravity.LEFT);
				view.setTextColor(mContext.getResources().getColor(R.color.black));
			}
		}
	}

}
