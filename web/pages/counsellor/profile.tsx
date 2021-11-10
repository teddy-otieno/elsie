import React from 'react';
import axios from 'axios';
import Image from 'next/image'
import { withRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { AccessDeniedPage, SERVER_URL } from '../../utils';
import { CounsellorPageProps } from './appointment';
import { DashboardLayout } from '../../components/dashboard';
import { UpdateCounsellorDataContainer } from '../../components/styles/psychiatrist';
import UserAvatar from "../../assets/user.jpg";
import { TextArea, TextField } from '../../components/layout';
import { PrimaryButton } from '../../components/styles/component';
import { Psychiatrist } from '../patient';


type UpdateCounsellorProps = {
	token: string
	router: any
}

type UpdateCounsellorDataState = {
	new_email: string;
	new_password: string
	bio: string
	confirm_password: string
	previous_records: Psychiatrist | undefined
}

class UpdateCounsellorData extends React.Component<UpdateCounsellorProps, UpdateCounsellorDataState> {

	constructor(props: UpdateCounsellorProps) {
		super(props)

		this.state = {
			new_email: "",
			new_password: "",
			bio: "",
			confirm_password: "",
			previous_records: undefined,
		}
	}
	
	load_psychiatrist = async () => {
		const { token } = this.props;	

		try {
			let config  = {
				headers: {
					Authorization: `Bearer ${token}`
				}
			}

			let response = await axios.get<Psychiatrist>(`${SERVER_URL}/api/auth/get-user-data`, config)

			this.setState({
				...this.state,
				previous_records: response.data
			})

			console.log(response.data)
		} catch(e) {
			console.log(e)
		}
	}

	componentDidMount() {
		this.load_psychiatrist()
	}

	update_user_info = async (e: any) => {
		e.preventDefault()

		const {new_email, bio, confirm_password, new_password} = this.state

		if(confirm_password !== new_password) {
			return;
		}

		try {
			let config = {
				headers: {
					Authorization: `Bearer ${this.props.token}`
				}
			}
			let request_data = {
				user: {
					email: new_email === "" ? undefined : new_email,
					passowrd: new_password == "" ? undefined : new_password
				},
				bio: bio,
			}

			let response = await axios.put(`${SERVER_URL}/api/auth/update-psychiatrist/`, request_data, config);
			this.props.router.reload()
		} catch(e) {
			console.log(e)
		}
	}

	render() {
		const {
			new_email, 
			new_password, 
			confirm_password, 
			bio, 
			previous_records,
		} = this.state;


		return <UpdateCounsellorDataContainer>
			<h3>Profile</h3>
			<div className="image">
				<Image src={UserAvatar} height={100} width={100} alt="Avatar"/>	
			</div>
			<TextField 
				className="email" 
				value={new_email} 
				set_value={(val) => this.setState({...this.state, new_email: val})}
				label="Email"
				placeholder={previous_records?.user.email}
				/>
			<TextArea 
				label="Bio" 
				className="bio" 
				value={bio} 
				set_value={(val) => this.setState({...this.state, bio: val})} 
				placeholder={previous_records?.bio}
			/>
			<TextField
				input_type={"password"}
				className="password" 
				value={new_password} 
				set_value={(val) => this.setState({...this.state, new_password: val})} 
				label="New Password"
				placeholder="******"
				on_error_message={"Not matching"}
				validation={(val: string) => {
					return val === confirm_password
				}}
			 />
			<TextField 
				className="confirm-password" 
				input_type={"password"}
				value={confirm_password} 
				set_value={(val) => this.setState({...this.state, confirm_password: val})} 
				label="Confirm New Password"
				placeholder="******"
				on_error_message={"Not matching"}
				validation={(val: string) => {
					return val === new_password
				}}
			/>
			<PrimaryButton onClick={this.update_user_info}>Update</PrimaryButton>
		</UpdateCounsellorDataContainer>
	}
}

interface ProfilePageProps extends CounsellorPageProps {
	router: any
}

class ProfilePage extends React.Component<ProfilePageProps> {
	render() {
		const {is_valid, router} = this.props;
		if(is_valid) {
			return <DashboardLayout 
				center={<UpdateCounsellorData router={router} token={this.props.token}/>}
				title="Profile"
				prefix={"counsellor"}
				token={this.props.token}
			/>
		} else {
			return <AccessDeniedPage />
		}
	}
}

export default withRouter(ProfilePage);


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