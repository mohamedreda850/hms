import axios from "axios";

const baseURL = "https://upskilling-egypt.com:3000/api/v0/admin";

export const axiosInstanceAdminAuth = axios.create({ baseURL: baseURL });
export const axiosInstanceAdmin = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: localStorage.getItem("HMSToken"),
  },
});
export const AUTH_URL = {
  LOGIN: "/users/login",
  REGISTER: "/users",
  FORGOT_PASSWORD : "/users/forgot-password",
  RESET_PASSWORD: "/users/reset-password",
  CHANGE_PASSWORD: "/users/change-password",
  USER_Profile:(id:string)=> `/users/${id}`,
};
//ADD Users URLS 
export const USERS_URL={
  GET_ALL_USERS: "/users",

}


export const ROOMS_URLS = {
  ADD_ROOM: "/rooms",
  GET_ROOM: (id: string) => `/rooms/${id}`,
  GET_ALL_ROOMS: "/rooms",
  UPDATE_ROOM: (id: string) => `/rooms/${id}`,
  DELETE_ROOM: (id: string) => `/rooms/${id}`,
};
export const BOOKING_URLS = {
  GET_BOOKING: (id: string) => `/booking/${id}`,
  GET_ALL_booking: "/booking",
  DELETE_BOOKING: (id: string) => `/booking/${id}`,
};
export const FACILITIES_URLS = {
    ADD_FACILITY: "/room-facilities",
    GET_FACILITY: (id: string) => `/room-facilities/${id}`,
    GET_ALL_FACILITIES: "/room-facilities",
    UPDATE_FACILITY: (id: string) => `/room-facilities/${id}`,
    DELETE_FACILITY: (id: string) => `/room-facilities/${id}`,
}

export const ADS_URLS = {
    ADD_ADS: "/ads",
    GET_ADS: (id: string) => `/ads/${id}`,
    GET_ALL_ADS: "/ads",
    UPDATE_ADS: (id: string) => `/ads/${id}`,
    DELETE_ADS: (id: string) => `/ads/${id}`,
}
export const DASHBOARD_URLS = {
    GET_DASHBOARD: "/dashboard",
}