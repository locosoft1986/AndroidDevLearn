package com.locosoft.testapp;

import java.util.ArrayList;

import android.os.Bundle;
import android.app.Activity;
import android.graphics.drawable.Drawable;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.ViewGroup;
import android.widget.*;
import android.widget.ViewSwitcher.ViewFactory;


public class ViewSwitcherTest extends Activity {

	private final String dbgTag = "[TestApp]";
	
	public static final int NUMBER_PER_SCREEN = 12;
	
	public static class DataItem
	{
		public String dataName;
		public Drawable drawable;
	}
	
	public ArrayList<DataItem> items = new ArrayList<DataItem>();
	private int curScreenNum = -1;
	private int screenCount;
	ViewSwitcher viewSwitcher;
	LayoutInflater inflater;
	
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        inflater = LayoutInflater.from(ViewSwitcherTest.this);
        
        for (int i =0; i < 40; ++i)
        {
        	String labelStr = "" + i;
        	Drawable drawable = getResources().getDrawable(R.drawable.ic_launcher);
        	DataItem item = new DataItem();
        	item.dataName = labelStr;
        	item.drawable = drawable;
        	items.add(item);
        }
        
        screenCount = items.size() % NUMBER_PER_SCREEN == 0 ? 
        		items.size() / NUMBER_PER_SCREEN : items.size() / NUMBER_PER_SCREEN + 1;
        		
        viewSwitcher = (ViewSwitcher) findViewById(R.id.viewswitcher);
        viewSwitcher.setFactory(new ViewFactory()
        {
        
        	@Override
        	public View makeView()
        	{
        		return inflater.inflate(R.layout.slidelistview, null);
        	}
        });
        
        next(null);
        
        Button btnReturn = (Button) findViewById(R.id.buttonReturn); 
        btnReturn.setOnClickListener(new OnClickListener()
        {
        
        	@Override
        	public void onClick(View v)
        	{
        		finish();
        	}
        });
        
        Log.d(dbgTag, "---- ViewSwitcherTest::onCreate() ----");
    }
    
	@Override
	public void onStart()
	{
		super.onStart();
		Log.d(dbgTag, "---- ViewSwitcherTest::onStart() ----");
	}
	
	@Override
	public void onRestart()
	{
		super.onRestart();
		Log.d(dbgTag, "---- ViewSwitcherTest::onRestart() ----");
	}
	
	@Override
	public void onPause()
	{
		super.onPause();
		Log.d(dbgTag, "---- ViewSwitcherTest::onPause() ----");
	}
	
	@Override
	public void onResume()
	{
		super.onResume();
		Log.d(dbgTag, "---- ViewSwitcherTest::onResume() ----");
	}
	
	@Override
	public void onStop()
	{
		super.onStop();
		Log.d(dbgTag, "---- ViewSwitcherTest::onStop() ----");
	}
	
	@Override
	public void onDestroy()
	{
		super.onDestroy();
		Log.d(dbgTag, "---- ViewSwitcherTest::onDestroy() ----");
	}

    public void next(View v)
    {
    	if (curScreenNum < screenCount - 1)
    	{
    		++curScreenNum;
    		viewSwitcher.setInAnimation(this, R.animator.slide_in_right);
    		viewSwitcher.setOutAnimation(this, R.animator.slide_out_left);
    		
    		((GridView) viewSwitcher.getNextView()).setAdapter(adapter);
    		viewSwitcher.showNext();
    	}
    }

    public void prev(View v)
    {
    	if (curScreenNum > 0)
    	{
    		--curScreenNum;
    		viewSwitcher.setInAnimation(this, R.animator.slide_in_left);
    		viewSwitcher.setOutAnimation(this, R.animator.slide_out_right);
    		
    		((GridView) viewSwitcher.getNextView()).setAdapter(adapter);
    		viewSwitcher.showPrevious();
    	}
    }
    
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.main, menu);
        return true;
    }
    
    
    private BaseAdapter adapter = new BaseAdapter()
    {
    	@Override
    	public int getCount()
    	{
    		if (curScreenNum == curScreenNum - 1 && items.size() % NUMBER_PER_SCREEN != 0)
    		{
    			return items.size() % NUMBER_PER_SCREEN;
    		}
    		
    		return NUMBER_PER_SCREEN;
    	}
    	
    	@Override
    	public DataItem getItem(int position)
    	{
    		if (curScreenNum * NUMBER_PER_SCREEN + position >= items.size())
    		{
    			return null;
    		}
    		return items.get(curScreenNum * NUMBER_PER_SCREEN + position);
    	}
    	
    	@Override
    	public long getItemId(int position)
    	{
    		return position;
    	}
    	
    	public View getView(int position, View convertView, ViewGroup parent)
    	{
    		View view = convertView;
    		if (convertView == null)
    		{
    			view = inflater.inflate(R.layout.labelicon, null);
    		}
    		
    		DataItem curItem = getItem(position);
    		if (curItem != null)
    		{
	     		ImageView imageView = (ImageView) view.findViewById(R.id.imageView);
	    		imageView.setImageDrawable(curItem.drawable);
	    		
	    		TextView textView = (TextView) view.findViewById(R.id.textView);
	    		textView.setText(curItem.dataName);   			
    		}

    		return view;
    	}
    };
    
}
