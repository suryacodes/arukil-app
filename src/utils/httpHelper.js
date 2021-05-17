import fetch from 'node-fetch';
import AsyncStorage from '@react-native-community/async-storage';

export async function triggerSimpleAjax(
  requestURL,
  method = 'POST',
  body = {},
  isFormData = false,
) {
  const token = await AsyncStorage.getItem('backendtoken');
  let headerObject = {authorization: `Bearer ${token}`};
  if (!isFormData) {
    headerObject = {
      ...headerObject,
      'Content-Type': 'application/json',
    };
  }

  const headers = headerObject;

  const requestDetails = {
    method,
    mode: 'cors',
    credentials: 'include',
    headers,
  };
  if (method !== 'GET' && !isFormData) {
    requestDetails.body = JSON.stringify(body);
  }
  if (isFormData) {
    requestDetails.body = body;
  }

  try {
    const request = await fetch(requestURL, requestDetails);
    const result = await request.json();
    return result;
  } catch (err) {
    console.log('Err', err);
    throw err;
  }
}
