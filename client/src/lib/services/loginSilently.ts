import { AxiosError } from "axios";
import { GetServerSidePropsContext } from "next";

import { getServerSideRequestConfig, setAccessTokenCookie } from "~/utils";
import { handleHttpError } from "./handleHttpError";
import { httpClient } from "./http";

/**
 * Login silently to get a new refresh token
 * @function loginSilently
 * @param {string | undefined} cookie 
 * @returns {Promise<void>}
 */
export const loginSilently = async (ctx: GetServerSidePropsContext) => {

	try {
		const config = getServerSideRequestConfig(ctx);

		// Get the access token from the server
		const { data } = await httpClient.put("/access-tokens", undefined, config);

		setAccessTokenCookie(ctx, data.accessToken);

		return data.user || null;
	} catch (e) {
		throw handleHttpError(e as AxiosError);
	}
};