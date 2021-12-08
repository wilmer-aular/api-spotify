import Axios, { AxiosInstance } from "axios";
import applyCaseMiddleware from "axios-case-converter";
import { config } from "../config";

const { spotify } = config;

const connection = (auth: string, url: string): AxiosInstance => {
  return applyCaseMiddleware(
    Axios.create({
      baseURL: `https://${url}.spotify.com`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: auth,
      },
    })
  );
};

export const authToken = async () => {
  const auth =
    "Basic " +
    Buffer.from(`${spotify.client_id}:${spotify.client_secret}`).toString(
      "base64"
    );
  try {
    const conn = connection(auth, "accounts");
    const { data } = await conn.post(
      "/api/token",
      "grant_type=client_credentials"
    );
    return data;
  } catch (err) {
    console.error(err);
    throw new Error(`Spotify Error - ${err}`);
  }
};
export const refreshToken = async (token: string) => {
  const auth =
    "Basic " +
    Buffer.from(`${spotify.client_id}:${spotify.client_secret}`).toString(
      "base64"
    );
  const refresh = `grant_type=refresh_token&refresh_token=${token}`;
  try {
    const conn = connection(auth, "accounts");
    const { data } = await conn.post("/api/token", refresh);
    return data;
  } catch (err) {
    console.error(err);
    throw new Error(`Spotify Error - ${err}`);
  }
};
export const getOne = async (token: string, url: string) => {
  const accessToken = `Bearer ${token}`;
  try {
    const conn = connection(accessToken, "api");
    const { data } = await conn.get(`/v1/${url}`);
    return data;
  } catch (err) {
    console.error(err);
    throw new Error(`Spotify Error - ${err}`);
  }
};
export const getAll = async (
  token: string,
  url: string,
  from?: number,
  limit?: number
) => {
  const accessToken = `Bearer ${token}`;
  try {
    const conn = connection(accessToken, "api");
    const { data } = await conn.get(`/v1/${url}?offset=${from}&limit=${limit}`);
    return data;
  } catch (err) {
    console.error(err);
    throw new Error(`Spotify Error - ${err}`);
  }
};
