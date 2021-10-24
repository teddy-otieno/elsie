import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
	DashboardContainer, 
	DashboardTopNavigationContainer, 
	SideNavigationContainer, 
	CommunityChatContainer, 
	CommunityMemberContainer 
} from './styles/dashboard';
import { PrimaryButton, SecondaryButton } from './styles/component';

type DashboardProps = {
	center: any;
	end?: any
	title: string;
	primary_action?: () => void;
	primary_action_label?: string;
};

//TODO center should fill the available space if no end component is provided
class __DashboardLayout extends React.Component<DashboardProps> {
	render() {
		const {center, end, title, primary_action, primary_action_label} = this.props;

		return (
			<DashboardContainer show_end={end !== undefined}>
				<DashboardTopNavigation title={title} primary_action={primary_action} action_label={primary_action_label} />
				<div className="content">
					<SideNavigation />
					<div>{center}</div>
					<div>{end}</div>
				</div>
			</DashboardContainer>
		);
	}
}


//TODO(teddy) Mark active links.
class SideNavigation extends React.PureComponent {
	render() {
		return (
			<SideNavigationContainer>
				<ul>
					<li>
						<Link href="/patient/">Dashboard</Link>
					</li>
					<li>
						<Link href="/patient/appointment">Appointments</Link>
					</li>
					<li>
						<Link href="/patient/community">Community</Link>
					</li>
					<li>
						<Link href="/patient/not_sure">NotSure</Link>
					</li>
					{/* <li>
						<Link></Link>
					</li> */}
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

type CommunityCardProps = {
	avatar: string;
	name: string;
}

const CommunityCard: React.FC<CommunityCardProps> = ({avatar, name}) => {
	return (
		<div>
			<Image src={avatar} width={20} height={20} alt="Community Avatar"/>
			<p>{}</p>
		</div>
   )
}

class __CommunityChat extends React.PureComponent {

	componentDidMount() {

	}

	render() {
		return (
			<CommunityChatContainer>
				<div className="communities"></div>
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
