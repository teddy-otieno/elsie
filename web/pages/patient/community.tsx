import React from 'react';
import { GetServerSideProps } from 'next';
import { withRouter } from 'next/router'
import axios, { AxiosRequestConfig } from 'axios';
import { DashboardLayout, CommunityChat, CommunityMembers, Message } from '../../components/dashboard';
import { PatientDashboardProps, User } from "./index";
import { SERVER_URL } from "../../utils";


type CommunityPageState = {
	community_id: number
	members: User[]
	messages: Message []
}

class CommunityPage extends React.PureComponent<PatientDashboardProps, CommunityPageState> {

	constructor(props: PatientDashboardProps) {
		super(props);
		this.state = {
			community_id: 0,
			members: [],
			messages: []
		}
	}

	render() {
		const { community_id, members } = this.state;
		const { user_data, token } = this.props;

		return <DashboardLayout 
			title={"Community"}
			center={<CommunityChat 
					set_community_members={(members) => this.setState({...this.state, members: members})}
					set_community_id={(id) => this.setState({...this.state, community_id: id})} 
					messages={this.state.messages}
					set_messages={(messages: Message[]) => this.setState({...this.state, messages: messages})}
					community_id={community_id} 
					token={this.props.token} 
					current_user={this.props.user_data}/>
				}
			end={<CommunityMembers community_id={community_id} current_user={user_data}  token={token} on_create={() => this.props.router.reload()} members={members}/>}
			prefix={"patient"}
		/>
	}
}

export default withRouter(CommunityPage);

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
