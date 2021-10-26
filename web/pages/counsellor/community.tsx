import React from "react";
import { GetServerSideProps } from "next";
import axios from "axios";

import { DashboardLayout } from "../../components/dashboard";
import { CommunitiesContainer } from "../../components/styles/psychiatrist";
import { CounsellorPageProps } from "./index";
import { SERVER_URL } from "../../utils";
import { CommunityChat, CommunityMembers } from "../../components/dashboard";

export default class Community extends React.Component<CounsellorPageProps> {
	render() {
		return <DashboardLayout 
			title="Help Groups"
			prefix={"counsellor"}
			center={<CommunityChat token={this.props.token}/>}
			end={<CommunityMembers />}
			primary_action={() => {}}
			primary_action_label={"Create Community"}
		/>;
	}
}


class Communities extends React.Component {

	load_communities = async () => {

	}

	componentDidMount() {
		this.load_communities();
	}

	render() {
		return (
			<CommunitiesContainer>
			</CommunitiesContainer>
				);
	}
}


export const getServerSideProps: GetServerSideProps = async (context) => {
	let auth_token = context.req.cookies['token'];

	let config = {
		headers: {
			Authorization: `Bearer ${auth_token}`
		}
	};

	try {
		let response = await axios.get<CounsellorPageProps>(`${SERVER_URL}/api/auth/is_auth/`, config);
		return { props: {psychiatrist: response.data, token: auth_token} };

	} catch(e) {
		console.log(e);
		context.res.writeHead(302, {"Location": `/`}).end("body");

		return {
			props: {}
		}
	}
}
