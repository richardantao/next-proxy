import axios, { AxiosRequestConfig } from "axios";

if (!process.env["NEXT_PUBLIC_API_URL"])
	throw new Error("NEXT_PUBLIC_API_URL is not defined");

if (!process.env["NEXT_PUBLIC_PROXY_API_URL"])
	throw new Error("NEXT_PUBLIC_PROXY_API_URL is not defined");

/**
* @function makeHttpClient
* @param {AxiosRequestConfig} config config object
* @returns {AxiosInstance} axios http client instance
* @default timeout 5000
*/
const makeHttpClient = ({
	baseURL,
	timeout = 5000
}: AxiosRequestConfig) => axios.create({
	headers: {
		"Accept": "application/json",
		"Content-Type": "application/json",
	},
	timeoutErrorMessage: "Request timed out",
	withCredentials: true,
	baseURL,
	timeout
});

export const proxyHttpClient = makeHttpClient({
	baseURL: process.env["NEXT_PUBLIC_PROXY_API_URL"]
});

export const httpClient = makeHttpClient({
	baseURL: process.env["NEXT_PUBLIC_API_URL"]
});