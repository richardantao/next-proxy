import { GetServerSidePropsContext } from "next";
import Cookies from "cookies";
import { AxiosRequestConfig } from "axios";

import { ACCESS_TOKEN } from "~/constants";

/**
 * 
 * @param param0 
 * @returns 
 */
export const getServerSideRequestConfig = ({ req, res }: GetServerSidePropsContext): AxiosRequestConfig => {
	const config: AxiosRequestConfig = {
		headers: { "Content-Type": "application/json" }
	};

	const cookies = new Cookies(req, res);
	const accessToken = cookies.get(ACCESS_TOKEN);

	if (accessToken)
		config.headers!["Authorization"] = `Bearer ${accessToken}`;

	return config;
};