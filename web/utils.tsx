import React from 'react';
import { AccessDeniedPageContainer } from "./components/styles/component";

export const redirect_to = (context: any, path: string, reason: string = "") => {
	console.log(`Redirecting to ${path}: ${reason}`)
	context.res.writeHead(302, {"Location": path}).end("body");
}

export const SERVER_URL = "http://127.0.0.1:8000"

export const AccessDeniedPage: React.FC = () => {
	return (
		<AccessDeniedPageContainer>
			<span>Oops! you're trespassing. Go back.</span>
		</AccessDeniedPageContainer>
			)
}

export const is_not_empty = (text: string) => text !== "";
export const is_empty = (text: string) => text == "";
