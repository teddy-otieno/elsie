import React from "react";
import { GetServerSideProps } from "next";
import axios from "axios";

import { DashboardLayout } from "../../components/dashboard";
import { CommunitiesContainer } from "../../components/styles/psychiatrist";
import { CounsellorPageProps } from "./index";
import { SERVER_URL } from "../../utils";
import { CommunityChat, CommunityMembers, Message } from "../../components/dashboard";
import {User} from "../patient/index";

type CommunityPageState = {
	community_id: number
	members: User[]
	messages: Message []
	communit_id: number
}

interface CommunityPageProps extends CounsellorPageProps {
	router: any;
}
export default class Community extends React.Component<CommunityPageProps, CommunityPageState> {
	render() {
		const { community_id, members } = this.state;
		const { psychiatrist, token } = this.props;

		let user_data = psychiatrist.user;

		return <DashboardLayout 
			title={"Community"}
			center={<CommunityChat 
					set_community_members={(members) => this.setState({...this.state, members: members})}
					set_community_id={(id) => this.setState({...this.state, community_id: id})} 
					messages={this.state.messages}
					set_messages={(messages: Message[]) => this.setState({...this.state, messages: messages})}
					community_id={community_id} 
					token={this.props.token} 
					current_user={user_data}/>
				}
			end={<CommunityMembers community_id={community_id} current_user={user_data}  token={token} on_create={() => this.props.router.reload()} members={members}/>}
			prefix={"counsellor"}
		/>
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
