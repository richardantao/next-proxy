import { GetServerSidePropsContext } from "next";
import Cookies from "cookies";
import { ACCESS_TOKEN } from "~/constants";

export const setAccessTokenCookie = ({ req, res }: Pick<GetServerSidePropsContext, "req" | "res">, accessToken: string) => {
	const cookies = new Cookies(req, res);
	const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 15;

	cookies.set(ACCESS_TOKEN, accessToken, {
		httpOnly: true,
		sameSite: "lax",
		secure: process.env.NODE_ENV === "production",
		maxAge: COOKIE_MAX_AGE
	});

	return;
}
