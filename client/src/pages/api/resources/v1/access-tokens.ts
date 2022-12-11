import { NextApiRequest, NextApiResponse } from "next";
import Cookies from "cookies";
import { AxiosError } from "axios";

import { ACCESS_TOKEN } from "~/constants";
import { httpClient } from "~/services";
import { setAccessTokenCookie, setAuthHeaderFromCookie } from "~/utils";

const DEFAULT_ERROR = { message: "An internal error occurred" };

const login = (req: NextApiRequest, res: NextApiResponse) => new Promise<void>(
	async (resolve, reject) => {
		try {
			req.url = req.url?.replace(/^\/api\/resources\/v1/, "");

			if (req.method === "PUT")
				setAuthHeaderFromCookie(req, res);

			// Don't forward cookies to the API
			req.headers.cookie = "";

			const { data } = await httpClient.request({
				url: req.url,
				method: req.method?.toLowerCase(),
				data: req.body,
				headers: req.headers as Record<string, string>
			});

			setAccessTokenCookie({ req, res }, data.accessToken);

			res.status(200).json(data.user);
			return resolve();
		} catch (e) {
			if (e instanceof AxiosError) {
				if (e.response) {
					res.status(e.response.status);

					res.json(e.response.data);
				}
				else
					res.status(500).json(DEFAULT_ERROR);
			}
			else
				res.status(500).json(DEFAULT_ERROR);

			return reject(e);
		}
	}
);

const logout = (req: NextApiRequest, res: NextApiResponse) => {
	const cookies = new Cookies(req, res);

	// Delete the cookies by not setting a value
	cookies.set(ACCESS_TOKEN);

	return res.status(204).end();
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (!req.method)
		return res.status(400).json({ message: "HTTP method not specified" });

	if (["POST", "PUT"].includes(req.method))
		return await login(req, res);

	if (req.method === "DELETE")
		return logout(req, res);

	return res.status(404).json({ message: "HTTP method not supported for this resource" });
}

export default handler;