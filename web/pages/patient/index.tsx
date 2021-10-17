import axios, { AxiosRequestConfig } from 'axios';
import { GetServerSideProps } from 'next';
import React from 'react';
import { DashboardLayout } from '../../components/dashboard';
import { SERVER_URL } from '../../utils';


type PatientDashboardProps = {
	
};

class PatientDashboard extends React.Component {
	render() {
		return (
			<DashboardLayout />
		);
	}
}

export default PatientDashboard;

export const getServerSideProps: GetServerSideProps = async (context) => {

	let auth_token = context.req.cookies['token'];

	let config: AxiosRequestConfig = {
		headers: {
			Authorization: `Bearer ${auth_token}`
		}
	};

	try {
		let response = await axios.get(`${SERVER_URL}/api/auth/is_auth/`, config);
		return {props: {}};

	} catch(e) {
		context.res.writeHead(302, {"Location": `/`}).end("body");

		return {
			props: {}
		}
	}
}