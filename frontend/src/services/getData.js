import axios from "axios";
const END_POINT = `http://localhost:8800/api/`;


export const getData = async ({ url }) => {
  try {
    const res = await axios.get(`${END_POINT}${url}`);
    const data = await res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

// export const getData = async ({ url }) => {
//   return axios(url)
//   .then(res=>res.data)
//   .catch(error=>console.log(error))
// };
