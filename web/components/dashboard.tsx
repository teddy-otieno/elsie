import React from 'react';
import { DashboardContainer } from './styles/dashboard';

type DashboardProps = {
	center: any;
	end: any
};

class __DashboardLayout extends React.Component<DashboardProps> {
	render() {
		const {center, end} = this.props;

		return (
			<DashboardContainer>
				<DashboardTopNavigation />
				<div className="content">
					<SideNavigation />
					<div>{center}</div>
					<div>{end}</div>
				</div>
			</DashboardContainer>
		);
	}
}

class SideNavigation extends React.PureComponent {
	render() {
		return (
			<div>Nav</div>
		)
	}
}


class DashboardTopNavigation extends React.PureComponent {

	render() {
		return (
			<div>TopNavigation</div>
		);
	}
}


export const DashboardLayout = __DashboardLayout;