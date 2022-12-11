import { NextApiRequest, NextApiResponse } from "next";
import Cookies from "cookies";

import { ACCESS_TOKEN } from "~/constants";

/**
 * @param {NextApiRequest} req 
 * @param {NextApiResponse} res 
 */
export const setAuthHeaderFromCookie = (req: NextApiRequest, res: NextApiResponse) => {
	const cookies = new Cookies(req, res);
	const accessToken = cookies.get(ACCESS_TOKEN);

	if (accessToken)
		req.headers["authorization"] = `Bearer ${accessToken}`;
};