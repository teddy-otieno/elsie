import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import Cookie from 'js-cookie';
import styled from 'styled-components'
import { useRouter, withRouter } from 'next/router';

import { SERVER_URL } from "../utils";
import { 
	DashboardContainer, 
	DashboardTopNavigationContainer, 
	SideNavigationContainer, 
	CommunityChatContainer, 
	CommunityMemberContainer 
} from './styles/dashboard';
import { PrimaryButton, SecondaryButton, TextButton } from './styles/component';
import { CommunityCardContainer, MessageBubbleContainer } from "./styles/dashboard";
import { Patient, Psychiatrist, User } from "../pages/patient/index";
import { Icons, ERROR, PRIMARY_COLOR } from './styles/theme';
import { SuccessDialog } from '../pages/blog/new-post';
import { Appointment } from '../pages/patient/appointment';
import { DashCardContainer } from './styles/psychiatrist';

type DashboardProps = {
	center: any
	end?: any
	title: string;
	primary_action?: () => void;
	primary_action_label?: string;
	prefix: string
	dialog?: any
	token: string
};

//TODO center should fill the available space if no end component is provided

class __DashboardLayout extends React.Component<DashboardProps> {
	render() {
		const {prefix, center, end, title, primary_action, primary_action_label} = this.props;
		// let upcoming_appointments = this.props.appointments.filter((val: Appointment) => true)
		return (
			<DashboardContainer show_end={end !== undefined}>
				<DashboardTopNavigation 
					token={this.props.token}
					title={title} 
					primary_action={primary_action} 
					action_label={primary_action_label}  
					prefix={prefix}
				/>
				<div className="content">
					<SideNavigation prefix={prefix} />
					<div>{center}</div>
					<div>{end}</div>
					{this.props.dialog}
				</div>
			</DashboardContainer>
		);
	}
}


type SideNavigationProps = {
	prefix: string;
	router: any;
}



class __SideNavigation extends React.PureComponent<SideNavigationProps> {

	log_out_user = (e: any) => {
		e.preventDefault()

		Cookie.remove('token')
		this.props.router.push('/')
	}

	render() {
		const { prefix } = this.props;

		let custom_urls: any[] = []


		if(prefix === "counsellor") {
			custom_urls = [
				<li key={10}><Link href={`/${prefix}/blogposts`}>Blog Posts</Link></li>,
				<li key={11}><Link href={`/${prefix}/profile`}>Profile</Link> </li> ,
			]
		}

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
						<Link href={`/${prefix}/community`}>Help Groups</Link>
					</li>
					<li>
						<Link href={`/${prefix}/more`}>Questionaires</Link>
					</li>
					<li>
						<Link href={`/${prefix}/report`}>Report</Link>
					</li>
					{custom_urls}
				</ul>
				<TextButton color={ERROR} onClick={this.log_out_user}>Logout</TextButton>
			</SideNavigationContainer>
		)
	}
}
const SideNavigation = withRouter(__SideNavigation)

type DashboardTopNavigationProps = {
	primary_action?: () => void;
	action_label?: string;
	title: string;
	token: string
	prefix: string
};

const DashboardTopNavigation: React.FC<DashboardTopNavigationProps>  = ({title, action_label, primary_action, token, prefix}) => {

	const [upcoming_appointments, set_upcoming_appointments] = useState(0);
	const router =  useRouter()

	const get_available_appointments = async () => {

		try {

			let config = {
				headers: {
					Authorization: `Bearer ${token}`
				}
			}

			let response = await axios.get<{upcoming_appointments: number}>(`${SERVER_URL}/api/patient/upcoming-appointments/`, config)
			set_upcoming_appointments(response.data.upcoming_appointments)
		} catch(e) {
			console.log(e)
		}
	}

	useEffect(() => {
		get_available_appointments()
	}, [])

	return (
		<DashboardTopNavigationContainer>
			<div>
				<h3 className="title">{"Elsie"}</h3>
				<h5>{title}</h5>
			</div>
			<div>
				<div className="upcoming-events" onClick={() => router.push(`/${prefix}/appointment`)}>
					<span>You have <span key={0} className="highlight">{upcoming_appointments}</span> upcoming appointments</span><span>{Icons.NOTIFICATION}</span>
				</div>
				{
					(action_label !== undefined && primary_action !== undefined) && <SecondaryButton onClick={(e) => { e.preventDefault(); primary_action?.(); }}>{action_label}</SecondaryButton> 
				}
			</div>
		</DashboardTopNavigationContainer>
	);
}


export const DashboardLayout = __DashboardLayout;

type Member = {
	member: User
}

export type Community = {
	avatar: string;
	name: string;
	id?: number;
	community_members: Member[]
}

export type Message = {
	id?: number
	message: string;
	sent_at: string;
	sender: User;
	community: number;
}

type CommunityCardProps = {
	community: Community
	on_click: (community: Community) => void;
	is_member: boolean;
	add_user_to_community: (community: Community) => void;
}

const CommunityCard: React.FC<CommunityCardProps> = ({community, is_member, on_click, add_user_to_community}) => {
	const avatar = community.avatar === null ? 
		(<div className="avatar"></div>)
		: (<Image src={community.avatar} width={20} height={20} alt="Community Avatar"/>)
	return (
		<CommunityCardContainer onClick={() => community.id !== undefined && on_click(community)}>
			{avatar}
			<span>{community.name}</span>
			{ !is_member && <span onClick={() => add_user_to_community(community)}>{Icons.ADD}</span>}
		</CommunityCardContainer>
   )
}

type CommunityChatProps = {
	token: string;
	current_user: User,
	community_id: number,
	set_community_id: (id: number) => void;
	messages: Message[],
	set_messages: (messages: Message[]) => void;
	create_community?: () => void;
	communities: Community[],
	set_communities: (a: Community[]) => void;
	router: any;
}

type CommunityChatState = {
	show_join_dialog: boolean
}

class __CommunityChat extends React.PureComponent<CommunityChatProps, CommunityChatState> {
	constructor(props: CommunityChatProps) {
		super(props);

		this.state = {
			show_join_dialog: false
		}
	}
	load_communities = async () => {
		const { community_id } = this.props;

		try {
			let config = {
				headers: {
					Authorization: `Bearer ${this.props.token}`
				}
			}
			let response = await axios.get<Community[]>(`${SERVER_URL}/api/patient/community/`, config)
			this.props.set_communities(response.data)

		} catch(e) {
			console.log(e);
		}

	}

	componentDidUpdate(prevProps: CommunityChatProps) {

		if(prevProps.community_id !== this.props.community_id) {
			this.load_community_messages();
		}
	}

	load_community_messages = async () => {
		const { community_id } = this.props;

		if(this.props.messages.find((val) => val.community === community_id) !== undefined || community_id == 0)
			return

		try {
			let config = {
				headers: {
					Authorization: `Bearer ${this.props.token}`,
			 }
			}

			let response = await axios.get<Message[]>(`${SERVER_URL}/api/patient/messages/${community_id}`, config)

			console.log(response.data);

			//TODO temporary work around
			if(response.data.length > 0) this.props.set_messages(response.data);

		} catch(e) {
			console.log(e)
		}
	}

	componentDidMount() {
		this.load_communities();
	}

	send_message = async (message: string) => {
		const { community_id } = this.props;

		try {
			let config = {
				headers: {
					Authorization: `Bearer ${this.props.token}`,
				 }
			}

			let data = {
				message: message
			}

			let response = await axios.post<Message>(`${SERVER_URL}/api/patient/messages/${community_id}/`, data, config)
			this.props.set_messages([response.data, ...this.props.messages])
		} catch(e) {
			console.log(e)
		}
	}

	add_user_to_community = async (community: Community) => {

		try {
			let config = {
				headers: {
					Authorization: `Bearer ${this.props.token}`
				}
			}

			let response = await axios.get(`${SERVER_URL}/api/patient/register_member/${community.id!}`, config)

			this.setState({
				...this.state, 
				show_join_dialog: true
			});

			setTimeout(() => {
				this.setState({...this.state, show_join_dialog: false})
				this.props.set_community_id(community.id!)
				this.props.router.reload()
			}, 1000)
		} catch (e) {
			console.log(e)
		}
	}

	remove_message = async (message: Message) => {
		try {
			let config = {
				headers: {
					Authorization: `Bearer ${this.props.token}`
				}
			}
			let response = await axios.get(`${SERVER_URL}/api/patient/delete_message/${message.id}`, config)

			let new_messages = this.props.messages.filter((val: Message) => {
				return val.id! !== message.id!
			})
			this.props.set_messages(new_messages)
		} catch(e) {
			console.log(e)
		}
	}

	render() {
		const { messages, community_id, communities} = this.props;

		let communities_list = communities
			.map((value: Community, index: number) => {
				let is_member = value.community_members.find((val: Member) => {
					return val.member.email === this.props.current_user.email
				}) !== undefined

				return <CommunityCard 
					community={value} 
					key={index} 
					is_member={is_member}
					add_user_to_community={this.add_user_to_community}
					on_click={(val) => {
						if(!is_member) {
							this.add_user_to_community(val)
							return
						}
						this.props.set_community_id(val.id!)
				}}/>
			})

			console.log(messages);
			let community_messsage_bubble = messages.map((value: Message, index: number) => {
				return <MessageBubble
					message={value} 
					key={index} 
					is_owner={value.sender.email === this.props.current_user.email}
					remove_message={this.remove_message}
				/>
				})
		return (
			<CommunityChatContainer>
				<div className="communities">
					{this.props.create_community !== undefined && 
						<SecondaryButton 
							onClick={(e) => {e.preventDefault(); this.props.create_community!!();}} 
							className="create"
						>Start Help Group</SecondaryButton> }
					{ communities_list }
				</div>
				<div className="chat">
					{this.props.community_id > 0 && (<div className="prev-messages">{community_messsage_bubble}</div>)}
					{this.props.community_id > 0 && (<MessageInput on_new_message={this.send_message} />)}
				</div>

				{this.state.show_join_dialog && <SuccessDialog title="You have successfully joined" />}
			</CommunityChatContainer>
	   )
	}
}

export const CommunityChat = withRouter(__CommunityChat);

type MessageBubbleProps = {
	message: Message,
	is_owner: boolean
	remove_message: (message: Message) => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({message, is_owner, remove_message}) => {
	return <MessageBubbleContainer is_sender={is_owner}>
		<div className="message">
			<span>{`~${!is_owner ? message.sender.email: "you"}`}</span>
			<span>{message.message}</span>
			<div className="actions" onClick={() => remove_message(message)}>
				{Icons.DELETE}
			</div>
		</div>
	</MessageBubbleContainer>
}

type MessageInputProps = {
	on_new_message: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ on_new_message }) => {
	const [message, set_message ] = useState("");

	return <div className="message-input">
		<input 
			type="text" 
			placeholder="Type message here" 
			value={message}
			onChange={(e) => set_message(e.target.value)}
			onKeyDown={(e) => {
				if(e.code === "Enter") {
					on_new_message(message)
					set_message("")
				}
			}}
		/>
	</div>
}

type CommunityMemberProps = {
	community_id: number;
	current_user: User;
	token: string;
	on_create: () => void;
	members: Member[];
}

type CommunityMemberState = {

}

class __CommunityMembers extends React.PureComponent<CommunityMemberProps, CommunityMemberState> {

	is_member = (): boolean => {
		return this.props.members.find((member: Member) => this.props.current_user.email === member.member.email) != undefined
	}

	render() {
		const {community_id, members} = this.props;

		let member_names = members.map((val: Member, i: number) => {
			return <span key={i}>{`${val.member.f_name} ${val.member.l_name}`}</span>
		})

		return (
			<CommunityMemberContainer>
				<h5>Community Members</h5>
				{member_names}
			</CommunityMemberContainer>	
	   );
	}
}

export const CommunityMembers = __CommunityMembers;


type PatientCardProps = {
	patient: Patient | Psychiatrist
	title: string
	on_click: (id: number) => void
}

const PatientCardContainer = styled(DashCardContainer)`
	height: 200pt;
	width: 200pt;
	margin-right: 4pt;
	display: grid;
	grid-template-rows: 1fr 32pt;
	cursor: pointer;
	justify-content: center;

	.image {
		display: flex;
		align-items: center;
		justify-content: center;
	}
`;

export const PatientCard: React.FC<PatientCardProps> = ({patient, on_click, title}) => {
	const router = useRouter()

	return <PatientCardContainer onClick={() => on_click(patient.id!)}>
		<div className="image">
			<p style={{color: PRIMARY_COLOR}}>{title}</p>
		</div>
		<div className="description">
			<span>{`${patient.user.f_name} ${patient.user.l_name}`}</span>
		</div>
	</PatientCardContainer>
}