package com.locosoft.yon.model;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class SceneContentMgr {
	
	private String mNowEditingSceneId;
	private String mNowEditingPageId;

	private static SceneContentMgr mContentMgr;
	
	private Map<String, Content> mNowEditPageContents;
	
	public static SceneContentMgr getInstance()
	{
		if(mContentMgr == null)
		{
			mContentMgr = new SceneContentMgr();
		}
		
		return mContentMgr;
	}
	
	public SceneContentMgr() {
		mNowEditPageContents = new HashMap<String, Content>();
	}
	
	public void preparePage(String sceneId, String pageId)
	{
		mNowEditingSceneId = sceneId;
		mNowEditingPageId = pageId;
		
	}
	
	public void clearPageContents()
	{
		mNowEditPageContents.clear();
	}
	
	public String getSceneId()
	{
		return mNowEditingSceneId;
	}
	
	public String getPageId()
	{
		return mNowEditingPageId;
	}
	
	public void setContent(String strKey, Content c)
	{
		c.setKey(strKey);
		mNowEditPageContents.put(strKey, c);
	}
	
	public void setContentValue(String strKey, String value, String type)
	{
		if(!mNowEditPageContents.containsKey(strKey))
		{
			mNowEditPageContents.put(strKey, new Content());
		}
		
		Content c = (Content) mNowEditPageContents.get(strKey);
		c.setValue(value);
		c.setKey(strKey);
		c.setType(type);
		c.setSceneId(mNowEditingSceneId);
		c.setPageNum(mNowEditingPageId);
	}
	
	public Content getContent(String strKey)
	{
		if(!mNowEditPageContents.containsKey(strKey))
		{
			Content c = new Content();
			c.setKey(strKey);
			mNowEditPageContents.put(strKey, c);
		}
		
		Content c = (Content) mNowEditPageContents.get(strKey);
		
		
		return c;
	}
	
	public String getContentValue(String strKey)
	{
		if(!mNowEditPageContents.containsKey(strKey))
		{
			Content c = new Content();
			c.setKey(strKey);
			mNowEditPageContents.put(strKey, c);
		}
		
		Content c = (Content) mNowEditPageContents.get(strKey);
		
		
		return c.getValue();
	}
	
	public void setContentType(String strKey, String strType)
	{
		if(!mNowEditPageContents.containsKey(strKey))
		{
			Content c = new Content();
			c.setKey(strKey);
			mNowEditPageContents.put(strKey, c);
		}
		
		Content c = (Content) mNowEditPageContents.get(strKey);	
		c.setType(strType);
	}
	
	
	public String getContentType(String strKey)
	{
		if(!mNowEditPageContents.containsKey(strKey))
		{
			Content c = new Content();
			c.setKey(strKey);
			mNowEditPageContents.put(strKey, c);
		}
		
		Content c = (Content) mNowEditPageContents.get(strKey);
		
		
		return c.getType();
	}
	
	public Set<String> getContentsKeySet()
	{
		return mNowEditPageContents.keySet();
	}
}
