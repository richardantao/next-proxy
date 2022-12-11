/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	redirects: () => [
		{
			source: "/",
			destination: "/login",
			permanent: true
		}
	]
}

module.exports = nextConfig
