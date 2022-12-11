import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { FormEventHandler } from "react";

import { loginSilently, proxyHttpClient } from "~/services";
import { isCsr } from "~/utils";

const Login = () => {
	const router = useRouter();

	const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
		try {
			e.preventDefault();

			const res = await proxyHttpClient.post("/access-tokens", {
				email: "joe@example.com",
				password: "Abcd1234"
			});

			console.log(res.data);

			router.replace("/dashboard");
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<button type="submit">Login</button>
			</form>
		</>
	)
};

export const getServerSideProps: GetServerSideProps = async context => {
	const props = {};

	try {
		// Skip logging back in if redirected from client-side transition
		if (isCsr(context))
			return { props };

		await loginSilently(context);

		// Redirect to homepage if user is logged in
		return {
			redirect: {
				destination: "/dashboard",
				permanent: true
			}
		};
	} catch (error) {
		return { props };
	}
};

export default Login;