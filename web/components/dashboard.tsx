import React from 'react';
import Link from 'next/link';
import { DashboardContainer, DashboardTopNavigationContainer, SideNavigationContainer } from './styles/dashboard';
import { PrimaryButton, SecondaryButton } from './styles/component';

type DashboardProps = {
	center: any;
	end: any
	title: string;
	primary_action: () => void;
	primary_action_label: string;
};

class __DashboardLayout extends React.Component<DashboardProps> {
	render() {
		const {center, end, title, primary_action, primary_action_label} = this.props;

		return (
			<DashboardContainer>
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
						<Link href="patient/">Dashboard</Link>
					</li>
					<li>
						<Link href="patient/community">Community</Link>
					</li>
					<li>
						<Link href="patient/appointment">Appointments</Link>
					</li>
					<li>
						<Link href="patient/not_sure">NotSure</Link>
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

class DashboardTopNavigation extends React.PureComponent<DashboardTopNavigationProps> {
	render() {
		const {title, action_label, primary_action} = this.props;

		return (
			<DashboardTopNavigationContainer>
				<div>
					<h3>{title}</h3>
				</div>
				<div>
					{(action_label !== undefined && primary_action !== undefined) && <SecondaryButton>{action_label}</SecondaryButton> }
				</div>
			</DashboardTopNavigationContainer>
		);
	}
}


export const DashboardLayout = __DashboardLayout;