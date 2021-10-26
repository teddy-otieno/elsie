import React from 'react';
import { GetServerSideProps } from 'next';
import axios, { AxiosRequestConfig } from 'axios';
import { DashboardLayout, CommunityChat, CommunityMembers } from '../../components/dashboard';
import { PatientDashboardProps } from "./index";
import { SERVER_URL } from "../../utils";



class CommunityPage extends React.PureComponent<PatientDashboardProps> {

	render() {
		return <DashboardLayout 
			title={"Community"}
			center={<CommunityChat token={this.props.token}/>}
			end={<CommunityMembers />}
			prefix={"patient"}
		/>
	}
}

export default CommunityPage;

export const getServerSideProps: GetServerSideProps = async (context) => {

	let auth_token = context.req.cookies['token'];

	let config: AxiosRequestConfig = {
		headers: {
			Authorization: `Bearer ${auth_token}`
		}
	};

	try {
		let response = await axios.get<PatientDashboardProps>(`${SERVER_URL}/api/auth/is_auth/`, config);
		return {props: {...response.data, token: auth_token}};

	} catch(e) {
		context.res.writeHead(302, {"Location": `/`}).end("body");

		return {
			props: {}
		}
	}
}
