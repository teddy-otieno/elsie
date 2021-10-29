import React, { useState } from "react";
import { GetServerSideProps } from "next";
import { withRouter } from "next/router"
import axios from "axios";

import { Community, DashboardLayout } from "../../components/dashboard";
import { CommunitiesContainer } from "../../components/styles/psychiatrist";
import { CounsellorPageProps } from "./appointment";
import { SERVER_URL } from "../../utils";
import { CommunityChat, CommunityMembers, Message } from "../../components/dashboard";
import {User} from "../patient/index";
import { CreateNewCommunityContainer } from "../../components/styles/dashboard";
import { TextField } from "../../components/layout";
import { PrimaryButton, SecondaryButton } from "../../components/styles/component";

type CommunityPageState = {
	community_id: number
	messages: Message []
	show_dialog: boolean
	communities: Community[]
}

interface CommunityPageProps extends CounsellorPageProps {
	router: any;
}


type NewCommunityProps = {
	on_cancel: () => void;
	after_create: () => void;
	token: string;
}

const CreateNewCommunity: React.FC<NewCommunityProps> = ({ on_cancel, after_create, token }) => {
	const [community, set_community] = useState("")
	const [sending, set_sending] = useState("Create")

	const create_community = async () => {

		try {
			let config = {
				headers: {
					Authorization: `Bearer ${token}`
				}
			}

			let data = { name: community }

			set_sending("Sending...")
			let response = await axios.post(`${SERVER_URL}/api/psychiatrist/community/`, data, config)
			set_sending("Done")
			setTimeout(() => { after_create() }, 400)

		} catch(e) {
			console.log(e)
		}
	}

	return <CreateNewCommunityContainer>
		<div>
			<h4>New Community</h4>
			<TextField 
				className="create" 
				label="Enter Community name"
				value={community}
				set_value={set_community}
				/>
			<PrimaryButton className="main" onClick={(e) => {e.preventDefault(); create_community();}}>{sending}</PrimaryButton>
			<SecondaryButton className="cancel" onClick={(e) => {e.preventDefault(); on_cancel();}}>Cancel</SecondaryButton>
		</div>
	</CreateNewCommunityContainer>
}
class CommunityComponent extends React.Component<CommunityPageProps, CommunityPageState> {

	constructor(props: CommunityPageProps) {
		super(props);
		
		this.state = {
			community_id: 0,
			messages: [],
			show_dialog: false,
			communities: []
		}
	}


	render() {
		const { community_id, communities } = this.state;
		const { psychiatrist, token } = this.props;

		let user_data = psychiatrist.user_data;

		return <DashboardLayout 
			title={"Community"}
			center={<CommunityChat 
					set_community_id={(id) => this.setState({...this.state, community_id: id})} 
					messages={this.state.messages}
					set_messages={(messages: Message[]) => this.setState({...this.state, messages: messages})}
					community_id={community_id} 
					token={this.props.token} 
					current_user={user_data}
					create_community={() => this.setState({...this.state, show_dialog: true})}
					communities={communities}
					set_communities={(val) => this.setState({...this.state, communities: val})}
					/>
				}
			end={
				<CommunityMembers 
						community_id={community_id} 
						current_user={user_data}  
						token={token} 
						on_create={() => this.props.router.reload()} 
						members={this.state.communities.find((val: Community) => val.id === community_id)?.community_members ?? []} 
						/>}
			dialog={this.state.show_dialog && <CreateNewCommunity token={this.props.token} after_create={() => this.props.router.reload()}  on_cancel={() => this.setState({...this.state, show_dialog: false})}/>}
			prefix={"counsellor"}
		/>
	}
}

export default withRouter(CommunityComponent)
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
