package com.mime.qweibo;

import java.io.File;
import java.util.List;

import org.apache.commons.httpclient.HttpStatus;
import org.apache.commons.httpclient.methods.multipart.FilePart;
import org.apache.commons.httpclient.methods.multipart.MultipartRequestEntity;
import org.apache.commons.httpclient.methods.multipart.Part;
import org.apache.commons.httpclient.methods.multipart.StringPart;
import org.apache.commons.httpclient.params.HttpMethodParams;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.params.BasicHttpParams;
import org.apache.http.params.HttpConnectionParams;
import org.apache.http.params.HttpParams;
import org.apache.http.util.EntityUtils;

import com.mime.qweibo.utils.QHttpUtil;

public class QHttpClient {

	private static final int CONNECTION_TIMEOUT = 20000;

	public QHttpClient() {

	}

	/**
	 * Using GET method.
	 * 
	 * @param url
	 *            The remote URL.
	 * @param queryString
	 *            The query string containing parameters
	 * @return Response string.
	 * @throws Exception
	 */
	public String httpGet(String url, String queryString) throws Exception {
		if (queryString != null && !queryString.equals("")) {
			url += "?" + queryString;
		}

		HttpGet httpGet = new HttpGet(url);

		HttpParams params = new BasicHttpParams();
		HttpConnectionParams.setConnectionTimeout(params, CONNECTION_TIMEOUT);
		HttpConnectionParams.setSoTimeout(params, CONNECTION_TIMEOUT);
		HttpClient httpClient = new DefaultHttpClient(params);

		try {
			HttpResponse response = httpClient.execute(httpGet);
			if (response.getStatusLine().getStatusCode() != HttpStatus.SC_OK) {
				System.err.println("HttpGet Method failed: "
						+ response.getStatusLine().toString());
				httpGet.abort();
			}
			return EntityUtils.toString(response.getEntity());
		} catch (Exception e) {
			throw new Exception(e);
		} finally {
			httpClient.getConnectionManager().shutdown();
		}

	}

	/**
	 * Using POST method.
	 * 
	 * @param url
	 *            The remote URL.
	 * @param queryString
	 *            The query string containing parameters
	 * @return Response string.
	 * @throws Exception
	 */
	public String httpPost(String url, String queryString) throws Exception {
		HttpPost httpPost = new HttpPost(url);

		if (queryString != null && !queryString.equals("")) {
			StringEntity se = new StringEntity(queryString);
			httpPost.setHeader("Content-Type",
					"application/x-www-form-urlencoded");
			httpPost.setEntity(se);
		}
		HttpParams params = new BasicHttpParams();
		HttpConnectionParams.setConnectionTimeout(params, CONNECTION_TIMEOUT);
		HttpConnectionParams.setSoTimeout(params, CONNECTION_TIMEOUT);
		HttpClient httpClient = new DefaultHttpClient(params);

		try {
			HttpResponse response = httpClient.execute(httpPost);
			if (response.getStatusLine().getStatusCode() != HttpStatus.SC_OK) {
				System.err.println("HttpPost Method failed: "
						+ response.getStatusLine().toString());
				httpPost.abort();
			}
			return EntityUtils.toString(response.getEntity());
		} catch (Exception e) {
			throw new Exception(e);
		} finally {
			httpClient.getConnectionManager().shutdown();
		}
	}

	/**
	 * Using POST method with multiParts.
	 * 
	 * @param url
	 *            The remote URL.
	 * @param queryString
	 *            The query string containing parameters
	 * @param files
	 *            The list of image files
	 * @return Response string.
	 * @throws Exception
	 */
	public String httpPostWithFile(String url, String queryString,
			List<QParameter> files) throws Exception {

		String responseData = null;
		HttpPost httpPost = new HttpPost(url);

		if (queryString != null && !queryString.equals("")) {
			StringEntity se = new StringEntity(queryString);
			httpPost.setHeader("Content-Type",
					"application/x-www-form-urlencoded");
			httpPost.setEntity(se);
		}
		HttpParams params = new BasicHttpParams();
		HttpConnectionParams.setConnectionTimeout(params, CONNECTION_TIMEOUT);
		HttpConnectionParams.setSoTimeout(params, CONNECTION_TIMEOUT);
		HttpClient httpClient = new DefaultHttpClient(params);
		try {
			List<QParameter> listParams = QHttpUtil
					.getQueryParameters(queryString);
			int length = listParams.size() + (files == null ? 0 : files.size());
			Part[] parts = new Part[length];
			int i = 0;
			for (QParameter param : listParams) {
				parts[i++] = new StringPart(param.mName,
						QHttpUtil.formParamDecode(param.mValue), "UTF-8");
			}
			for (QParameter param : files) {
				File file = new File(param.mValue);
				parts[i++] = new FilePart(param.mName, file.getName(), file,
						QHttpUtil.getContentType(file), "UTF-8");
			}
			httpPost.setEntity((HttpEntity) new MultipartRequestEntity(parts,
					(HttpMethodParams) httpPost.getParams()));

			HttpResponse response = httpClient.execute(httpPost);
			if (response.getStatusLine().getStatusCode() != HttpStatus.SC_OK) {
				System.err.println("HttpPost Method failed: "
						+ response.getStatusLine().toString());
				httpPost.abort();
			}
			return EntityUtils.toString(response.getEntity());
		} catch (Exception e) {
			throw new Exception(e);
		} finally {
			httpClient.getConnectionManager().shutdown();
		}
	}

}
