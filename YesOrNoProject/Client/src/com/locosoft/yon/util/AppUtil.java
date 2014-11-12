package com.locosoft.yon.util;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.lang.reflect.Field;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.zip.GZIPInputStream;

import org.apache.http.HttpEntity;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.CharArrayBuffer;
import org.apache.http.util.EntityUtils;
import org.json.JSONException;
import org.json.JSONObject;

import android.app.Service;
import android.content.Context;
import android.content.SharedPreferences;
import android.net.ParseException;
import android.util.Log;

import com.locosoft.yon.base.BaseMessage;
import com.locosoft.yon.base.BaseModel;
import com.locosoft.yon.base.C;
import com.locosoft.yon.model.Customer;

public class AppUtil {
	
	/* md5 encrypt  */
	static public String md5 (String str) {
		MessageDigest algorithm = null;
		try {
			algorithm = MessageDigest.getInstance("MD5");
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		if (algorithm != null) {
			algorithm.reset();
			algorithm.update(str.getBytes());
			byte[] bytes = algorithm.digest();
			StringBuilder hexString = new StringBuilder();
			for (byte b : bytes) {
				hexString.append(Integer.toHexString(0xFF & b));
			}
			return hexString.toString();
		}
		return "";
		
	}
	
	/* change the first letter of the string into uppercase*/
	static public String ucfirst (String str) {
		if (str != null && str != "") {
			str  = str.substring(0,1).toUpperCase()+str.substring(1);
		}
		return str;
	}
	
	/*  add gzip uncompress feature for EntityUtils.toString() */
	public static String gzipToString(final HttpEntity entity, final String defaultCharset) throws IOException, ParseException {
		if (entity == null) {
			throw new IllegalArgumentException("HTTP entity may not be null");
		}
		InputStream instream = entity.getContent();
		if (instream == null) {
			return "";
		}
		// gzip logic start
		if (entity.getContentEncoding().getValue().contains("gzip")) {
			instream = new GZIPInputStream(instream);
		}
		// gzip logic end
		if (entity.getContentLength() > Integer.MAX_VALUE) {
			throw new IllegalArgumentException("HTTP entity too large to be buffered in memory");
		}
		int i = (int)entity.getContentLength();
		if (i < 0) {
			i = 4096;
		}
		String charset = EntityUtils.getContentCharSet(entity);
		if (charset == null) {
			charset = defaultCharset;
		}
		if (charset == null) {
			charset = HTTP.DEFAULT_CONTENT_CHARSET;
		}
		Reader reader = new InputStreamReader(instream, charset);
		CharArrayBuffer buffer = new CharArrayBuffer(i);
		try {
			char[] tmp = new char[1024];
			int l;
			while((l = reader.read(tmp)) != -1) {
				buffer.append(tmp, 0, l);
			}
		} finally {
			reader.close();
		}
		return buffer.toString();
	}
	
	/*  add gzip uncompress feature for EntityUtils.toString() */
	public static String gzipToString(final HttpEntity entity)
		throws IOException, ParseException {
		return gzipToString(entity, null);
	}
	
	public static SharedPreferences getSharedPreferences (Context ctx) {
		return ctx.getSharedPreferences("com.app.demos.sp.global", Context.MODE_PRIVATE);
	}
	
	public static SharedPreferences getSharedPreferences (Service service) {
		return service.getSharedPreferences("com.app.demos.sp.global", Context.MODE_PRIVATE);
	}
	

	
	/* fetch Message object*/
	static public BaseMessage getMessage (String jsonStr) throws Exception {
		BaseMessage message = new BaseMessage();
		JSONObject jsonObject = null;
		try {
			jsonObject = new JSONObject(jsonStr);
			if (jsonObject != null) {
				message.setCode(jsonObject.getString("code"));
				message.setMessage(jsonObject.getString("message"));
				message.setResult(jsonObject.getString("result"));
			}
		} catch (JSONException e) {
			throw new Exception("Json format error");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return message;
	}
	
	/* Model get an object Map from models array */
	static public List<? extends Map<String,?>> dataToList (List<? extends BaseModel> data, String[] fields) {
		ArrayList<HashMap<String,?>> list = new ArrayList<HashMap<String,?>>();
		for (BaseModel item : data) {
			list.add((HashMap<String, ?>) dataToMap(item, fields));
		}
		return list;
	}
	
	/* Model get an object Map from a model */
	static public Map<String,?> dataToMap (BaseModel data, String[] fields) {
		HashMap<String,Object> map = new HashMap<String,Object>();
		try {
			for (String fieldName : fields) {
				Field field = data.getClass().getDeclaredField(fieldName);
				
				
				if (field == null) 
				{
					Log.e(C.logTag.critical, "Field name" + fieldName 
							+ " in class reflection is not found! Class Name:" + data.getClass().toString());
				}
				
				field.setAccessible(true); // have private to be accessable
				map.put(fieldName, field.get(data));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return map;
	}
	
	/* check if the Int value is a null object*/
	static public boolean isEmptyInt (int v) {
		Integer t = new Integer(v);
		return t == null ? true : false;
	}
	
	/* get current system time*/
	public static long getTimeMillis () {
		return System.currentTimeMillis();
	}
	
	/* get memory profiles */
	public static long getUsedMemory () {
		long total = Runtime.getRuntime().totalMemory();
		long free = Runtime.getRuntime().freeMemory();
		return total - free;
	}
}