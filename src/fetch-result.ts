
import axios from "axios";
import qs from "qs";
import {  parseHtml } from "./parse-html";

export const fetch_result = async (rollno: string, session: string, sem: string, examType: string) => {
    let data = qs.stringify({
      'todo': 'post',
      'rollno': rollno,
      'session': session,
      'sem': sem,
      'examType': examType,
      'getdmc': 'SEARCH'
    });
  
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: process.env.url,
      headers: {
        'Accept': process.env.HEADER_ACCEPT,
    'Accept-Language': process.env.HEADER_ACCEPT_LANGUAGE,
    'Cache-Control': process.env.HEADER_CACHE_CONTROL,
    'Connection': process.env.HEADER_CONNECTION,
    'Content-Type': process.env.HEADER_CONTENT_TYPE,
    'Origin': process.env.HEADER_ORIGIN,
    'Referer': process.env.HEADER_REFERER,
    'Upgrade-Insecure-Requests': process.env.HEADER_UPGRADE_INSECURE_REQUESTS,
    'User-Agent': process.env.HEADER_USER_AGENT,
    'If-None-Match': process.env.HEADER_IF_NONE_MATCH,
    'If-Modified-Since': process.env.HEADER_IF_MODIFIED_SINCE
      },
      data: data
    };
  
    try {
      const response = await axios.request(config)
      const parsedData = parseHtml(JSON.stringify(response.data));
      
      if (parsedData) {
        return parsedData;
      }
  
      
  
  
  
    }
    catch (err) {
      return null;
    }
  
  
  
  
  
  }