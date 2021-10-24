import React from 'react';

import { Psychiatrist } from '../patient/index';

type CounsellorPageProps = {
	psychiatrist: Psychiatrist
}

class CounsellorPage extends React.Component<CounsellorPageProps> {
	render() {
		return null
	}
}

export const getServerSideProps: GetServerSideProps = async (context) => {

	let auth_token = context.req.cookies['token'];

	let config: AxiosRequestConfig = {
		headers: {
			Authorization: `Bearer ${auth_token}`
		}
	};

	try {
		let response = await axios.get<CounsellorPageProps>(`${SERVER_URL}/api/auth/is_auth/`, config);
		return { props: {...response.data, token: auth_token} };

	} catch(e) {
		context.res.writeHead(302, {"Location": `/`}).end("body");

		return {
			props: {}
		}
	}
}
