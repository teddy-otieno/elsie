import React from 'react';
import { DashboardLayout, CommunityChat, CommunityMembers } from '../../components/dashboard';


class CommunityPage extends React.PureComponent {

	render() {
		return <DashboardLayout 
			title={"Community"}
			center={<CommunityChat />}
			end={<CommunityMembers />}
		/>
	}
}

export default CommunityPage;
