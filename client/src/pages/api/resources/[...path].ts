import { NextApiRequest, NextApiResponse } from "next";
import httpProxy from "http-proxy";

import { setAuthHeaderFromCookie } from "~/utils";

// Make sure that we don't parse JSON bodies on this route:
export const config = {
	api: {
		bodyParser: false
	}
}

const proxy = httpProxy.createProxyServer();

const proxyHandler = (req: NextApiRequest, res: NextApiResponse) => new Promise<void>(
	(resolve, reject) => {
		setAuthHeaderFromCookie(req, res);

		req.url = req.url?.replace(/^\/api\/resources\/v1/, "");

		proxy.web(
			req,
			res,
			{
				target: process.env["NEXT_PUBLIC_API_URL"],
				changeOrigin: true,
				// Don't autoRewrite because we manuallly rewrite
				// the URL in the route handler
				autoRewrite: false
			},
			err => err ? reject(err) : resolve()
		)
	}
);

export default proxyHandler;