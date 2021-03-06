package com.locosoft.yon.base;

import android.os.Environment;

public final class C {
	
	////////////////////////////////////////////////////////////////////////////////////////////////
	// core settings (important)
	
	public static final class dir {
		public static final String base				=  Environment.getExternalStorageDirectory().getPath();
		public static final String faces			= base + "/faces";
		public static final String images			= base + "/images";
	}
	
	public static final class api {
		public static final String base				= "http://10.0.16.16:81/yon";
		public static final String postList			= "/posts.php";
		public static final String login			= "/login.php";
		public static final String register			= "/register.php";
		public static final String faceAdd 			= "/faceAdd.php";
		public static final String postCreate		= "/postCreate.php";
		public static final String commentList		= "/commentList.php";
		public static final String commentCreate	= "/commentCreate.php";
		public static final String customerView		= "/customerView.php";
		public static final String customerEdit		= "/customerEdit.php";
		public static final String notice			= "/notice.php";
		public static final String getSms			= "/sms.php";
		public static final String resetPass		= "/resetPass.php";

	}
	
	public static final class logTag {
		public static final String commonLog	=	"YonApp Log";
		public static final String waring	=	"YonApp Warning";
		public static final String critical	=	"YonApp Error";

	}
	
	
	public static final class custmerVail {
		public static final int username_min	=	5;
		public static final int username_max	=	50;
		public static final int password_min	=	5;
		public static final int password_max	=	112;
		public static final int cellphone_min	=	5;
		public static final int cellphone_max	=	50;
		public static final int smscode_min		=	5;
		public static final int smscode_max		=	10;
		public static final int smscode_max_time=	300;//300s = 5min
		public static final int smscode_wait_time=	30;//30s

	}
	
	public static final class task {
		public static final int postList			= 1001;
		public static final int login				= 1002;
		public static final int register			= 1003;
		public static final int faceAdd				= 1004;
		public static final int postCreate			= 1005;
		public static final int commentList			= 1006;
		public static final int commentCreate		= 1007;
		public static final int customerView		= 1008;		
		public static final int customerEdit		= 1009;
		public static final int notice				= 1010;
		public static final int getSms				= 1011;
		public static final int resetPass			= 1012;
	}
	
	public static final class err {
		public static final String network			= "network fault ";
		public static final String serverDown		= "Server Unresponse ";
		public static final String message			= "message error��";
		public static final String jsonFormat		= "message format incorrect��";
	}
	
	public static final class retCode {
		public static final String retDone			= "10000";
		public static final String retFail			= "14001";
		public static final String retSignupName	= "14002";
		public static final String retSignupPhone 	= "14003";
	}
	
	////////////////////////////////////////////////////////////////////////////////////////////////
	// intent & action settings
	
	public static final class intent {
		public static final class action {
			public static final String EDITTEXT		= "com.locosoft.yon.EDITTEXT";
			public static final String EDITPOST		= "com.locosoft.yon.EDITPOST";
		}
	}

	

}