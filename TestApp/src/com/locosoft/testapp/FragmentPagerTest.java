package com.locosoft.testapp;

import java.util.ArrayList;
import java.util.List;
 
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentActivity;
import android.support.v4.app.FragmentPagerAdapter;
import android.support.v4.view.ViewPager;
import android.util.Log;
import android.view.View;
import android.widget.TextView;

public class FragmentPagerTest extends FragmentActivity {

	private final String dbgTag = "[TestApp]";
	
	public static final int FRAGMENT_EXAMPLE = 0;
	public static final int FRAGMENT_EXAMPLE2 = 1;
	public static final int FRAGMENT_EXAMPLE3 = 2;
	
	private FragmentPagerAdapter mFragmentPagerAdapter;
	
	private ViewPager mViewPager;
	
	private List<Fragment> mFragmentsList = new ArrayList<Fragment>();
	
	@Override
	public void onCreate(Bundle savedInstanseState)
	{
		super.onCreate(savedInstanseState);
		
		Log.d(dbgTag, "---- FragmentPagerTest::onCreate() ----");
		
		setContentView(R.layout.fragmentpagertest);
		
		mFragmentsList.add(FRAGMENT_EXAMPLE, new ExampleFragment());
		mFragmentsList.add(FRAGMENT_EXAMPLE2, new ExampleFragment2());
		mFragmentsList.add(FRAGMENT_EXAMPLE3, new ExampleFragment3());
		
		TextView tab1 = (TextView) findViewById(R.id.tab1);
		TextView tab2 = (TextView) findViewById(R.id.tab2);
		TextView tab3 = (TextView) findViewById(R.id.tab3);
		
		tab1.setOnClickListener(new MyPageTabOnClickListener(FRAGMENT_EXAMPLE));
		tab2.setOnClickListener(new MyPageTabOnClickListener(FRAGMENT_EXAMPLE2));
		tab3.setOnClickListener(new MyPageTabOnClickListener(FRAGMENT_EXAMPLE3));
		
		mFragmentPagerAdapter = new FragmentPagerAdapter(getSupportFragmentManager())
		{
			@Override
			public int getCount()
			{
				return mFragmentsList.size();
			}
		
			@Override
			public Fragment getItem(int position)
			{
				return mFragmentsList.get(position);
			}
			
			@Override
			public CharSequence getPageTitle(int position)
			{
				switch(position)
				{
				case FRAGMENT_EXAMPLE:
					{
						return "Fragment0 Title";
					}
				case FRAGMENT_EXAMPLE2:
					{
						return "Fragment2 Title";
					}
				case FRAGMENT_EXAMPLE3:
					{
						return "Fragment3 Title";
					}
				default:
					return null;
				}
			}
			
		};
		
		mViewPager = (ViewPager) findViewById(R.id.viewPagerTest);
		mViewPager.setAdapter(mFragmentPagerAdapter);

		mViewPager.setCurrentItem(FRAGMENT_EXAMPLE);
	}
	
	public class MyPageTabOnClickListener implements View.OnClickListener
	{
		private int index = 0;
		
		private MyPageTabOnClickListener(int i)
		{
			index = i;
		}
		
		@Override
		public void onClick(View v)
		{
			mViewPager.setCurrentItem(index);
		}
	}
}
