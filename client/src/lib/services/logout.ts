import { proxyHttpClient } from "./http"

export const logout = async () => {
	try {
		await proxyHttpClient.delete("/access-tokens");
	} catch (e) {
		console.error(e);
	}
}