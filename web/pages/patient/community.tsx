import React from 'react';
import { GetServerSideProps } from 'next';
import { withRouter } from 'next/router'
import axios, { AxiosRequestConfig } from 'axios';
import { DashboardLayout, CommunityChat, CommunityMembers, Message, Community } from '../../components/dashboard';
import { PatientDashboardProps, User } from "./index";
import { SERVER_URL } from "../../utils";


type CommunityPageState = {
	community_id: number
	messages: Message []
	communities: Community[]
}

class CommunityPage extends React.PureComponent<PatientDashboardProps, CommunityPageState> {

	constructor(props: PatientDashboardProps) {
		super(props);
		this.state = {
			community_id: 0,
			messages: [],
			communities: []
		}
	}

	load_community = (val: Community) => {

	}


	render() {
		const { community_id, communities } = this.state;
		const { user_data, token } = this.props;

		return <DashboardLayout 
			token={this.props.token}
			title={"Community"}
			center={<CommunityChat 
					set_community_id={(id) => this.setState({...this.state, community_id: id})} 
					messages={this.state.messages}
					set_messages={(messages: Message[]) => this.setState({...this.state, messages: messages})}
					community_id={community_id} 
					token={this.props.token} 
					current_user={user_data}
					communities={communities}
					set_communities={(val) => this.setState({...this.state, communities: val})}
					/>
				}
			end={<CommunityMembers 
				community_id={community_id} 
				current_user={user_data}  
				token={token} 
				on_create={() => this.props.router.reload()} 
				members={this.state.communities.find((val: Community) => val.id === community_id)?.community_members ?? []} 
				/>}
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
