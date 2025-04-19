import Constants from 'expo-constants';
import axios from "axios";

const ApiRequestHandler = axios.create({
  baseURL:  Constants.expoConfig!.extra!.backendApiUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});

export {ApiRequestHandler};