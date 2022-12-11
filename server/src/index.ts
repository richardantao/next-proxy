import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

app.use(cors());
app.use(morgan("dev"));

const payload = {
	accessToken: "Some really long string blah blah blah",
	user: {
		name: {
			first: "Joe",
			last: "Doe"
		},
		email: "joe@example.com"
	}
};

/**
 * Login route
 */
app.post("/v1/access-tokens", (req, res) => {
	// Process request 
	// ...

	// Return response with access token and user
	return res.status(201).json(payload);
});

app.put("/v1/access-tokens", (req, res) => {
	const [, accessToken] = (req.headers.authorization || "").split(" ");

	// Verify accessToken
	// ...

	// Return response with refreshed accessToken
	return res.status(200).json(payload);

});

app.listen(1234, () => console.log("Server up and running on port 1234"));

export default app;