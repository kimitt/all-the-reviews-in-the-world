import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/";

export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, //refreshToken cookie 주고 받기
  headers: {
    "Content-Type": "application/json"
  }
});

export const axiosPrivateInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

// `withCredentials`은 자격 증명을 사용하여 사이트 간 액세스 제어 요청을 해야 하는지 여부를 나타낸다
