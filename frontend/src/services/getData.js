import axios from "axios";
export const getData = async ({ url }) => {
  try {
    const res = await axios.get(url);
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
