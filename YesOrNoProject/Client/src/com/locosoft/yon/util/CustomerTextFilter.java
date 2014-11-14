package com.locosoft.yon.util;


import android.text.Editable;
import android.text.TextWatcher;


public class CustomerTextFilter implements TextWatcher {
	private OnTextLengthChangedListener lengthListener = null;

	//private EditText editView = null;
	private boolean isEnabled = false;
	
	public CustomerTextFilter()
	{		
	}
	
	/*public void setEditText(EditText v)
	{
		editView = v;
	}*/
	
	public void setEnabled(boolean value)
	{
		isEnabled = value;
	}
	
	public boolean isEnabled()
	{
		return isEnabled;
	}
	
	public void setTextLengthChangedListener(OnTextLengthChangedListener listener)
	{
		lengthListener = listener;
	}
	
	
	@Override
	public void onTextChanged(CharSequence s, int start, int before, int count)
	{

		if (lengthListener != null && isEnabled)
		{
			lengthListener.onTextLengthChanged();
		}
	}

	@Override
	public void afterTextChanged(Editable s) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void beforeTextChanged(CharSequence s, int start, int count,
			int after) {
		// TODO Auto-generated method stub
		
	}
	

}
