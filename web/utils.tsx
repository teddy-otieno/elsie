import React from 'react';
import { AccessDeniedPageContainer } from "./components/styles/component";

export const redirect_to = (context: any, path: string, reason: string = "") => {
	console.log(`Redirecting to ${path}: ${reason}`)
	context.res.writeHead(302, {"Location": path}).end("body");
}

export const SERVER_URL = "http://localhost:8000"

export const AccessDeniedPage: React.FC = () => {
	return (
		<AccessDeniedPageContainer>
			<span>Oops! you're trespassing. Go back.</span>
		</AccessDeniedPageContainer>
			)
}
