import { createAsyncThunk } from "@reduxjs/toolkit";
import EventModel from "../../../interfaces/EventModel";
import axios from "axios";

export const fetchData = createAsyncThunk(
  "get/events",
  async (queryParams: string | null): Promise<EventModel[]> => {
    const url = `${import.meta.env.VITE_API_GET_EVENTS_URL}${queryParams}`;
    const response = await axios.get(
      // `https://localhost:7179/event-registration-event${queryParams}`
      url
    );
    console.log(url);
    return response.data;
  }
);

export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (formData: FormData) => {
    const authToken = localStorage.getItem("token");
    const url = `${import.meta.env.VITE_API_GET_EVENTS_URL}`;
    const response = await axios.post(url, formData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        accept: "text/plain",
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }
);

export const signUpUser = createAsyncThunk(
  "signup user",
  async (formData: any) => {
    const url = `${import.meta.env.VITE_API_POST_SIGNUP_URL}`;
    const response = await axios.post(
      // "https://localhost:7179/event-registration-users/signup",
      url,
      formData,
      {
        headers: {
          accept: "text/plain",
          "Content-Type": " application/json",
        },
      }
    );
    return response.data;
  }
);
