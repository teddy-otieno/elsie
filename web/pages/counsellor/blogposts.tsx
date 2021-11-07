import axios from 'axios';
import { GetServerSideProps } from 'next';
import { withRouter } from 'next/router';
import React from 'react'
import { DashboardLayout } from '../../components/dashboard';
import { AccessDeniedPage, SERVER_URL } from '../../utils';
import { CounsellorPageProps } from './appointment';

interface BlogPostPageProps extends CounsellorPageProps {
	router: any
}
class BlogPostPage extends React.Component<BlogPostPageProps> {

	render () {
		if(this.props.is_valid) {
			return <DashboardLayout
				center={<div></div>} 
				title="More"
				prefix="counsellor"
				primary_action={() => {this.props.router.push('/blog/new-post/')}}
				primary_action_label="New Blog"
				/>
		} else {
			return <AccessDeniedPage />
		}
	}
}

export default withRouter(BlogPostPage)

export const getServerSideProps: GetServerSideProps = async (context) => {
	let auth_token = context.req.cookies['token'];

	let config = {
		headers: {
			Authorization: `Bearer ${auth_token}`
		}
	};

	try {
		let response = await axios.get<CounsellorPageProps>(`${SERVER_URL}/api/auth/is_auth/`, config);

		return { props: {psychiatrist: response.data, token: auth_token, is_valid: response.data["is_whom"] === "psychiatrist"} };

	} catch(e) {
		console.log(e);
		context.res.writeHead(302, {"Location": `/`}).end("body");

		return {
			props: {}
		}
	}
}


