import axios, { AxiosError } from "axios";

export const handleHttpError = (e: AxiosError<any>) => {
	if (!axios.isAxiosError(e))
		return {
			message: "An internal server error occurred",
			statusCode: 500,
			id: "INTERNAL_SERVER"
		};

	if (e.response)
		return {
			message: e.response.data?.message,
			statusCode: e.response.status,
			id: e.response.data?.id
		};
	else if (e.request)
		return {
			message: e.request.data?.message,
			statusCode: e.request.status,
			name: e.request.data.name,
			id: e.request.data?.id
		};

	return {
		message: "An internal server error occurred",
		statusCode: 500,
		id: "INTERNAL_SERVER"
	};
}