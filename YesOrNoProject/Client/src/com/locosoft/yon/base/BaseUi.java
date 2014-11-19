package com.locosoft.yon.base;

import java.util.HashMap;

import com.locosoft.yon.R;
import com.locosoft.yon.util.AppCache;
import com.locosoft.yon.util.AppUtil;

import android.app.Activity;
import android.app.Fragment;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.os.Message;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Toast;

public class BaseUi extends Fragment {
	
	protected BaseApp app;
	protected BaseHandler handler;
	protected BaseTaskPool taskPool;
	protected View rootView;
	protected boolean showLoadBar = false;
	protected boolean showDebugMsg = true;
	protected ProgressDialog loadingDialog;

	
	// Called when the Fragment is attached to its parent Activity.
	@Override
	public void onAttach(Activity activity) {
	super.onAttach(activity);
	// Get a reference to the parent Activity.
	// init application

		loadingDialog = new ProgressDialog(this.getContext(), 
				R.style.com_locosoft_yon_theme_dialog);
		loadingDialog.setProgressStyle(ProgressDialog.STYLE_SPINNER);
		loadingDialog.setCancelable(false);
		loadingDialog.setCanceledOnTouchOutside(false);

	}
	
	/** Called when the activity is first created. */
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		// debug memory
		debugMemory("onCreate");
		// async task handler
		this.handler = new BaseHandler(this);
		// init task pool
		this.taskPool = new BaseTaskPool(this);
		this.app = (BaseApp) this.getActivity().getApplicationContext();
		
		
	}
	

	
	@Override
	public void onResume() {
		super.onResume();
		// debug memory
		debugMemory("onResume");
	}
	
	@Override
	public void onPause() {
		super.onPause();
		// debug memory
		debugMemory("onPause");
	}
	
	@Override
	public void onStart() {
		super.onStart();
		// debug memory
		debugMemory("onStart");
	}
	
	@Override
	public void onStop() {
		super.onStop();
		// debug memory
		debugMemory("onStop");
	}
	
	@Override
	public void onDestroy() {
		super.onDestroy();
		// debug memory
		debugMemory("onDestroy");
	}
	
	////////////////////////////////////////////////////////////////////////////////////////////////
	// util method
	
	public void toast (String msg) {
		Toast.makeText(this.getActivity(), msg, Toast.LENGTH_SHORT).show();
	}
	
	public void overlay (Class<?> classObj) {
        Intent intent = new Intent(Intent.ACTION_VIEW);
        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_WHEN_TASK_RESET);
        intent.setClass(this.getActivity(), classObj);
        startActivity(intent);
	}
	
	public void overlay (Class<?> classObj, Bundle params) {
        Intent intent = new Intent(Intent.ACTION_VIEW);
        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_WHEN_TASK_RESET);
        intent.setClass(this.getActivity(), classObj);
        intent.putExtras(params);
        startActivity(intent);
	}
	
	public void forward (Class<?> classObj) {
		Intent intent = new Intent();
		intent.setClass(this.getActivity(), classObj);
		intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
		this.startActivity(intent);
		this.getActivity().finish();
	}
	
	public void forward (Class<?> classObj, Bundle params) {
		Intent intent = new Intent();
		intent.setClass(this.getActivity(), classObj);
		intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
		intent.putExtras(params);
		this.startActivity(intent);
		this.getActivity().finish();
	}
	
	public Context getContext () {
		return this.getActivity();
	}
	
	public BaseHandler getHandler () {
		return this.handler;
	}
	
	public void setHandler (BaseHandler handler) {
		this.handler = handler;
	}
	
	public LayoutInflater getLayout () {
		return (LayoutInflater) this.getActivity().getSystemService(Context.LAYOUT_INFLATER_SERVICE);
	}
	
	public View getLayout (int layoutId) {
		return getLayout().inflate(layoutId, null);
	}
	
	public View getLayout (int layoutId, int itemId) {
		return getLayout(layoutId).findViewById(itemId);
	}
	
	public BaseTaskPool getTaskPool () {
		return this.taskPool;
	}
	
	public void showLoadBar () {
		loadingDialog.show();
		showLoadBar = true;
	}
	
	public void hideLoadBar () {
		if (showLoadBar) {
			loadingDialog.dismiss();
			showLoadBar = false;
		}
	}
	
	public void loadImage (final String url) {
		taskPool.addTask(0, new BaseTask(){
			@Override
			public void onComplete(){
				AppCache.getCachedImage(getContext(), url);
				sendMessage(BaseTask.LOAD_IMAGE);
			}
		}, 0);
	}
	
	////////////////////////////////////////////////////////////////////////////////////////////////
	// logic method
	
	public void doFinish () {
		this.getActivity().finish();
	}
	
	public void doLogout () {
		BaseAuth.setLogin(false);
	}
	
	public void doEditText () {
		Intent intent = new Intent();
		intent.setAction(C.intent.action.EDITTEXT);
		this.startActivity(intent);
	}
	
	public void doEditText (Bundle data) {
		Intent intent = new Intent();
		intent.setAction(C.intent.action.EDITTEXT);
		intent.putExtras(data);
		this.startActivity(intent);
	}
	
	public void doEditPost () {
		Intent intent = new Intent();
		intent.setAction(C.intent.action.EDITPOST);
		this.startActivity(intent);
	}
	
	public void doEditPost (Bundle data) {
		Intent intent = new Intent();
		intent.setAction(C.intent.action.EDITPOST);
		intent.putExtras(data);
		this.startActivity(intent);
	}
	
	public void sendMessage (int what) {
		Message m = new Message();
		m.what = what;
		handler.sendMessage(m);
	}
	
	public void sendMessage (int what, String data) {
		Bundle b = new Bundle();
		b.putString("data", data);
		Message m = new Message();
		m.what = what;
		m.setData(b);
		handler.sendMessage(m);
	}
	
	public void sendMessage (int what, int taskId, String data) {
		Bundle b = new Bundle();
		b.putInt("task", taskId);
		b.putString("data", data);
		Message m = new Message();
		m.what = what;
		m.setData(b);
		handler.sendMessage(m);
	}
	
	public void doTaskAsync (int taskId, int delayTime) {
		taskPool.addTask(taskId, new BaseTask(){
			@Override
			public void onComplete () {
				sendMessage(BaseTask.TASK_COMPLETE, this.getId(), null);
			}
			@Override
			public void onError (String error) {
				sendMessage(BaseTask.NETWORK_ERROR, this.getId(), null);
			}
		}, delayTime);
	}
	
	public void doTaskAsync (int taskId, BaseTask baseTask, int delayTime) {
		taskPool.addTask(taskId, baseTask, delayTime);
	}
	
	public void doTaskAsync (int taskId, String taskUrl) {
		showLoadBar();
		taskPool.addTask(taskId, taskUrl, new BaseTask(){
			@Override
			public void onComplete (String httpResult) {
				sendMessage(BaseTask.TASK_COMPLETE, this.getId(), httpResult);
			}
			@Override
			public void onError (String error) {
				sendMessage(BaseTask.NETWORK_ERROR, this.getId(), null);
			}
		}, 0);
	}
	
	public void doTaskAsync (int taskId, String taskUrl, HashMap<String, String> taskArgs) {
		showLoadBar();
		taskPool.addTask(taskId, taskUrl, taskArgs, new BaseTask(){
			@Override
			public void onComplete (String httpResult) {
				sendMessage(BaseTask.TASK_COMPLETE, this.getId(), httpResult);
			}
			@Override
			public void onError (String error) {
				sendMessage(BaseTask.NETWORK_ERROR, this.getId(), null);
			}
		}, 0);
	}
	
	public void onTaskComplete (int taskId, BaseMessage message) {
		
	}
	
	public void onTaskComplete (int taskId) {
		
	}
	
	public void onNetworkError (int taskId) {
		toast(this.getString(R.string.msg_networkerror));
	}
	
	////////////////////////////////////////////////////////////////////////////////////////////////
	// debug method
	
	public void debugMemory (String tag) {
		if (this.showDebugMsg) {
			Log.w(this.getClass().getSimpleName(), tag+":"+AppUtil.getUsedMemory());
		}
	}
	

}