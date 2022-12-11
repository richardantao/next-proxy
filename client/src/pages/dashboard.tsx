import { useRouter } from "next/router";
import { logout } from "~/services";

export default function Dashboard() {
	const router = useRouter();
	const handleClick = async () => {
		try {
			await logout();
			router.replace("/login");
		} catch (e) {
			console.error(e);
		}
	}

	return (
		<div>
			<h1>It works!</h1>
			<button onClick={handleClick}>Logout</button>
		</div>
	)
};