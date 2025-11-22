
import axios from "axios";


export const HTTP_SERVER =
    process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";


export const USERS_API = "/api/users";


const axiosWithCredentials = axios.create({
    baseURL: HTTP_SERVER,
    withCredentials: true,
});

export type Credentials = { username: string; password: string };
export type UserUpdates = Record<string, unknown>;
export type NewUserPayload = Record<string, unknown>;

export const signin = async (credentials: Credentials) =>
    (await axiosWithCredentials.post(`${USERS_API}/signin`, credentials)).data;

export const signup = async (user: NewUserPayload) =>
    (await axiosWithCredentials.post(`${USERS_API}/signup`, user)).data;

export const signout = async () => {
    await axiosWithCredentials.post(`${USERS_API}/signout`);
};

export const profile = async () =>
    (await axiosWithCredentials.post(`${USERS_API}/profile`)).data;

export const findAllUsers = async () =>
    (await axiosWithCredentials.get(USERS_API)).data;

export const updateUser = async (id: string, updates: UserUpdates) =>
    (await axiosWithCredentials.put(`${USERS_API}/${id}`, updates)).data;

export const createUser = async (user: NewUserPayload) =>
    (await axiosWithCredentials.post(USERS_API, user)).data;

export const deleteUser = async (id: string) =>
    (await axiosWithCredentials.delete(`${USERS_API}/${id}`)).data;
