import axios from "axios";

const baseURL = "https://upskilling-egypt.com:3000/api/v0/portal";

export const axiosInstanceUserAuth = axios.create({ baseURL: baseURL });
export const axiosInstanceUser = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: localStorage.getItem("HMSToken"),
  },
});

  export const ROOMS_URL ={
    GET_ROOM: (id: string) => `/rooms/${id}`,
    GET_ALL_ROOMS: "/rooms/available",
  }
  export const BOOKING_URLS = {
    BOOKING: "/booking",
    GET_ALL_MY_BOOKING: "/booking/my",
    GET_BOOKING_DETAIL: (id: string) => `/booking/${id}`,
    PAY_BOOKING: (id: string) => `/booking/${id}/pay`,
  }
  export const ADS_API ={
    GET_ALL_ADS: "/ads",
    ADS_DETAILS: (id: string) => `/ads/${id}`,
  }
  export const FAVORITE_ROOMS_URLS = {
    ADD_FAVORITE_ROOM: "/favorite-rooms",
    GET_ALL_FAVORITE_ROOMS: "/favorite-rooms",
    DELETE_FAVORITE_ROOM: (id: string) => `/favorite-rooms/${id}`,
  }

  export const ROOM_COMMENTS_URLS = {
    GET_ALL_ROOM_COMMENTS: (id:string)=>`/room-comments/${id}`,
    ADD_ROOM_COMMENT: "/room-comments",
    DELETE_ROOM_COMMENT: (id: string) => `/room-comments/${id}`,
    UPDATE_ROOM_COMMENT: (id: string) => `/room-comments/${id}`,
  }
  export const ROOM_REVIEWS_URLS = {
    GET_ALL_ROOM_REVIEWS: (id:string)=>`/room-reviews/${id}`,
    ADD_ROOM_REVIEW: "/room-reviews",
    UPDATE_ROOM_REVIEW: (id: string) => `/room-reviews/${id}`,
  }