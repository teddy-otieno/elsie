import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';

import { SERVER_URL } from "../utils";
import { 
	DashboardContainer, 
	DashboardTopNavigationContainer, 
	SideNavigationContainer, 
	CommunityChatContainer, 
	CommunityMemberContainer 
} from './styles/dashboard';
import { PrimaryButton, SecondaryButton } from './styles/component';
import { CommunityCardContainer } from "./styles/dashboard";
import { User } from "../pages/patient/index";

type DashboardProps = {
	center: any;
	end?: any
	title: string;
	primary_action?: () => void;
	primary_action_label?: string;
	prefix: string;
};

//TODO center should fill the available space if no end component is provided
class __DashboardLayout extends React.Component<DashboardProps> {
	render() {
		const {prefix, center, end, title, primary_action, primary_action_label} = this.props;

		return (
			<DashboardContainer show_end={end !== undefined}>
				<DashboardTopNavigation title={title} primary_action={primary_action} action_label={primary_action_label} />
				<div className="content">
					<SideNavigation prefix={prefix} />
					<div>{center}</div>
					<div>{end}</div>
				</div>
			</DashboardContainer>
		);
	}
}


type SideNavigationProps = {
	prefix: string;
}

class SideNavigation extends React.PureComponent<SideNavigationProps> {
	render() {
		const { prefix } = this.props;
		return (
			<SideNavigationContainer>
				<ul>
					<li>
						<Link href={`/${prefix}`}>Dashboard</Link>
					</li>
					<li>
						<Link href={`/${prefix}/appointment`}>Appointments</Link>
					</li>
					<li>
						<Link href={`/${prefix}/community`}>Community</Link>
					</li>
				</ul>
			</SideNavigationContainer>
		)
	}
}


type DashboardTopNavigationProps = {
	primary_action?: () => void;
	action_label?: string;
	title: string; 
};

const DashboardTopNavigation: React.FC<DashboardTopNavigationProps>  = ({title, action_label, primary_action}) => {
		return (
			<DashboardTopNavigationContainer>
				<div>
					<h3>{title}</h3>
				</div>
				<div>
					{
						(action_label !== undefined && primary_action !== undefined) && <SecondaryButton onClick={(e) => { e.preventDefault(); primary_action?.(); }}>{action_label}</SecondaryButton> 
					}
				</div>
			</DashboardTopNavigationContainer>
		);
}


export const DashboardLayout = __DashboardLayout;

type Community = {
	avatar: string;
	name: string;
	id?: number;
}

type Message = {
	message: string;
	sender: User;
}

type CommunityCardProps = {
	community: Community
	on_click: (community_id: number) => void;
}

const CommunityCard: React.FC<CommunityCardProps> = ({community, on_click}) => {
	const avatar = community.avatar === null ? 
		(<div className="avatar"></div>)
		: (<Image src={community.avatar} width={20} height={20} alt="Community Avatar"/>)
	return (
		<CommunityCardContainer onClick={() => community.id !== undefined && on_click(community.id)}>
			{avatar}
			<span>{community.name}</span>
		</CommunityCardContainer>
   )
}

type CommunityChatProps = {
	token: string;
}

type CommunityChatState = {
	communities: Community[]
}

class __CommunityChat extends React.PureComponent<CommunityChatProps, CommunityChatState> {

	constructor(props: CommunityChatProps) {
		super(props);

		this.state = {
			communities: []
		}
	}

	load_communities = async () => {
		
		try {
			let config = {
				headers: {
					Authorization: `Bearer ${this.props.token}`
				}
			}
			let response = await axios.get<Community[]>(`${SERVER_URL}/api/patient/community/`)
			this.setState({...this.state, communities: response.data})

		} catch(e) {
			console.log(e);
		}

	}

	load_community_messages = async (community_id: number) => {
		try {
			let config = {
				headers: {
					Authorization: `Bearer ${this.props.token}`,
			 }
			}
			let response = await axios.get(`${SERVER_URL}/api/patient/messages/${community_id}`, config);

		} catch(e) {

		}
	}

	componentDidMount() {
		this.load_communities();
	}

	render() {
		const { communities } = this.state;

		let communities_list = communities
			.map((value: Community, index: number) => <CommunityCard community={value} key={index}  on_click={this.load_community_messages}/>)
		return (
			<CommunityChatContainer>
				<div className="communities">
					{ communities_list }
				</div>
				<div className="chat"></div>
			</CommunityChatContainer>
	   )
	}
}

export const CommunityChat = __CommunityChat;


class __CommunityMembers extends React.PureComponent {
	render() {
		return (
			<CommunityMemberContainer></CommunityMemberContainer>	
	   );
	}
}

export const CommunityMembers = __CommunityMembers;
