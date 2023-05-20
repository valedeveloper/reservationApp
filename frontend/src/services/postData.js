import axios from "axios";
const END_POINT = `http://localhost:8800/api/`;


export const postData = async ( url,info) => {
  try {
    const res = await axios.post(`${END_POINT}${url}`,info);
    const data = await res.data;
    return data;
  } catch (error) {
    console.log(error.response.data);
  }
};