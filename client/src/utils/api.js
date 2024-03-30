import { createContext } from "react";
import axios from "axios";
import { store } from "../store/store";
import { CapacitorHttp } from '@capacitor/core';

export class Api {
  baseUrl = "http://10.100.1.41:3000";
  async makeRequest(uri, method, body) {
    const token = store.getState().token.value;
    const options = {
      url: `${this.baseUrl}${uri}`,
      method,
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    };

    if (body) {
      options.data = body;
    }

    const res = await CapacitorHttp.request(options);
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error(res.data.error);
    }
  }

  get(uri) {
    return this.makeRequest(uri, "get");
  }

  post(uri, body) {
    return this.makeRequest(uri, "post", body);
  }

  put(uri, body) {
    return this.makeRequest(uri, "put", body);
  }

  del(uri) {
    return this.makeRequest(uri, "delete");
  }
}

export const ApiContext = createContext(new Api());
