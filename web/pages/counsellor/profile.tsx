import React from 'react';
import axios from 'axios';
import Image from 'next/image'
import { GetServerSideProps } from 'next';
import { AccessDeniedPage, SERVER_URL } from '../../utils';
import { CounsellorPageProps } from './appointment';
import { DashboardLayout } from '../../components/dashboard';
import { UpdateCounsellorDataContainer } from '../../components/styles/psychiatrist';
import UserAvatar from "../../assets/user.jpg";
import { TextArea, TextField } from '../../components/layout';


type UpdateCounsellorProps = {
	token: string
}

type UpdateCounsellorDataState = {
	new_email: string;
	new_password: string
	confirm_password: string
}

class UpdateCounsellorData extends React.Component<UpdateCounsellorProps, UpdateCounsellorDataState> {

	constructor(props: UpdateCounsellorProps) {
		super(props)

		this.state = {
			new_email: "",
			new_password: "",
			confirm_password: ""
		}
	}
	render() {
		const {new_email, new_password, confirm_password} = this.state;

		return <UpdateCounsellorDataContainer>
			<div>
				<Image src={UserAvatar} height={48} width={48} alt="Avatar"/>	
			</div>
			<TextField className="email" value={new_email} set_value={(val) => this.setState({...this.state, new_email: val})} label="Email"/>
			<TextArea label="Bio" className="bio" value={new_email} set_value={(val) => this.setState({...this.state, new_email: val})} />
			<TextField className="email" value={new_password} set_value={(val) => this.setState({...this.state, new_email: val})} label="Email"/>
		</UpdateCounsellorDataContainer>
	}
}

class ProfilePage extends React.Component<CounsellorPageProps> {
	render() {
		const {is_valid} = this.props;
		if(is_valid) {
			return <DashboardLayout 
				center={<UpdateCounsellorData token={""}/>}
				title="Dashboard"
				prefix={"counsellor"}
			/>
		} else {
			return <AccessDeniedPage />
		}
	}
}

export default ProfilePage;


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