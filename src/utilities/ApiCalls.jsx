import {expireToken} from './UtilFunctions';
import {json} from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const headers = {
  'API-KEY': import.meta.env.VITE_API_KEY,
};

export const getDataWithToken = async (api) => {
  // console.log("api>>", BASE_URL + api);
  try {
    const response = await fetch(BASE_URL + api, {
      method: 'GET',
      // mode:"no-cors",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        ...headers,
      },
    });
    if (response.status === 401) {
      expireToken();
    }
    console.log(`${api}>> Get:`, response);
    return await response.json();
  } catch (error) {
    throw new Error('Error Getting Data', error);
  }
};

export const getData = async (api) => {
  // console.log("api>>", BASE_URL + api);
  try {
    const response = await fetch(BASE_URL + api, {
      method: 'GET',
      // mode:"no-cors",
      headers: {
        ...headers,
      },
    });
    if (response.status === 401) {
      expireToken();
    }
    console.log(`${api}>> Get:`, response);
    return await response.json();
  } catch (error) {
    throw new Error('Error Getting Data', error);
  }
};

export const postData = async (api, postData) => {
  console.log(JSON.stringify(postData));
  try {
    const response = await fetch(BASE_URL + api, {
      method: 'POST',
      // mode:"no-cors",
      headers: {
        ...headers,
        // Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(postData),
    });
    if (response.status === 401) {
      expireToken();
    }
    // console.log(`${api}>> Post:`, postData);
    return await response.json();
  } catch (error) {
    console.log(error);
    throw new Error('Error in post request');
  }
};
export const postDataWithToken = async (api, postData) => {
  try {
    // console.log(postData);
    const response = await fetch(BASE_URL + api, {
      method: 'POST',
      // mode:"no-cors",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      },
      body: JSON.stringify(postData),
    });
    if (response.status === 401) {
      expireToken();
    }
    // console.log(`${api}>> Post:`, response);
    return await response.json();
  } catch (error) {
    // console.log(error.stack);
    throw new Error('Error in post request', error);
  }
};

export const postMultipartDataWithToken = async (api, postData) => {
  let formData = new FormData();
  // console.log(postData);
  for (const key in postData) {
    if (Object.prototype.hasOwnProperty.call(postData, key)) {
      const value = postData[key];
      if (Array.isArray(value)) {
        // If the value is an array, append each file separately
        value.forEach((file) => {
          formData.append(`${key}[]`, file);
          // console.log(`Appended ${key}: ${file.name} to formData`);
        });
      } else {
        formData.append(key, value);
        // console.log(`Appended ${key}: ${value.name || value} to formData`);
      }
    }
  }
  try {
    // console.log(postData);
    const response = await fetch(BASE_URL + api, {
      method: 'POST',
      // mode:"no-cors",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      },
      body: formData,
    });
    // console.log(response.status);
    if (response.status === 401) {
      expireToken();
    }
    // console.log(`${api}>> Post Multi:`, dataResponse);
    return await response.json();
  } catch (error) {
    // console.log(error.stack);
    throw new Error('Error in post request', error);
  }
};

export const postMultipartData = async (api, postData) => {
  console.log(api, postData);

  let formData = new FormData();
  // console.log(postData);
  for (const key in postData) {
    if (Object.prototype.hasOwnProperty.call(postData, key)) {
      const value = postData[key];
      if (Array.isArray(value)) {
        // If the value is an array, append each file separately
        value.forEach((file) => {
          formData.append(`${key}[]`, file);
          // console.log(`Appended ${key}: ${file.name} to formData`);
        });
      } else {
        formData.append(key, value);
        // console.log(`Appended ${key}: ${value.name || value} to formData`);
      }
    }
  }
  try {
    // console.log(postData);
    const response = await fetch(BASE_URL + api, {
      method: 'POST',
      // mode:"no-cors",
      headers: {
        ...headers,
      },
      body: formData,
    });
    // console.log(response.status);
    if (response.status === 401) {
      expireToken();
    }
    // console.log(`${api}>> Post Multi:`, dataResponse);
    return await response.json();
  } catch (error) {
    // console.log(error.stack);
    throw new Error('Error in post request', error);
  }
};

export const deleteDataWithToken = async (api) => {
  try {
    const response = await fetch(BASE_URL + api, {
      method: 'DELETE',
      // mode:"no-cors",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      },
    });
    if (response.status === 401) {
      expireToken();
    }
    // console.log(response);
    // console.log(`${api}>> Delete:`, dataResponse);

    return await response.json();
  } catch (error) {
    throw new Error('Error in delete request', error);
  }
};
