import React from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import {SignUpContainer} from '../components/styles/sign';
import Layout, {TextField, TopNavigation} from '../components/layout';
import {PrimaryButton} from "../components/styles/component";
import {SERVER_URL} from '../utils';
import {withRouter, NextRouter} from 'next/router';

type SignUpPageState = {
	username: string;
	password: string;
	confirm_password: string;
	email_address: string;
	phone_number: string;
	f_name: string;
	l_name: string;
	date_of_birth: string;

	qualificatoin: string;
	university: string;
}

type SignUpProps = {
	router: NextRouter;
}

class SignUpPage extends React.Component<SignUpProps, SignUpPageState> {

	constructor(props: SignUpProps) {
		super(props);

		this.state = {
			username: "",
			password: "helloworld",
			confirm_password: "helloworld",
			email_address: "",
			phone_number: "254758551230",
			f_name: "doe",
			l_name: "john",
			date_of_birth: "1978-05-20",
			qualificatoin: "Masters in psychology",
			university: "MMU"
		};
	}

	//TODO: Add flag to distinguish users
	sign_up_user = async (event: any) => {
		event.preventDefault();
		const { router } = this.props;

		const {
			username,
			password,
			email_address,
			phone_number,
			f_name,
			l_name,
			date_of_birth,
			confirm_password,
			qualificatoin,
			university
		} = this.state;


		if(password !== confirm_password) {
			return
		}

		let data;
		let route_suffix;

		let user = {
			username: username,
			password: password,
			email: email_address,
			f_name: f_name,
			l_name: l_name,
			phone_number: phone_number,
			date_of_birth: date_of_birth
		}

		let acc = this.props.router.query["acc"];

		if(acc !== undefined) {
			data = {
				qualifications: qualificatoin,
				university: university,
				user: user,
			};
			route_suffix = "counsellor"
		} else {
			data = {
				user: user,
			};
			route_suffix = "patient"
		}

		try {
			let response = await axios.post<any>(`${SERVER_URL}/api/auth/new-${route_suffix}/`, data);
			Cookies.set("token", response.data["token"]);
			let is_whom = response.data['is_whom'];
			if (is_whom == "patient") {
				router.push("/patient/")
			} else {
				router.push("/counsellor/")
			}
		} catch (e) {
			console.log(e);
		}

	}

	render() {
		const {
			username,
			password,
			confirm_password,
			email_address,
			phone_number,
			f_name,
			l_name,
			date_of_birth,
			qualificatoin,
			university
		} = this.state;

		let acc = this.props.router.query["acc"];

		//<TopNavigation />
		return (
				<Layout>
					<SignUpContainer>
						<div className="title">
							<h2>Elsie Online</h2>
							<p>Few clicks away from joining our community</p>
						</div>
						<form>
							<h1>Register</h1>
							<p className="">Join and connect with our world class psychiatrists and friendly communities</p>
							{
							acc !== undefined && (
										<div className="double-fields-container">
											<TextField label={"Qualification"} value={qualificatoin} set_value={(value) => this.setState({...this.state, qualificatoin: value})}/>
											<TextField label={"University"} value={university} set_value={(value) => this.setState({...this.state, university: value})}/>
										</div>
									)
							}
							<div className="double-fields-container">
								<TextField label={"First Name"} value={f_name} set_value={(value) => this.setState({...this.state, f_name: value})}/>
								<TextField label={"Last Name"} value={l_name} set_value={(value) => this.setState({...this.state, l_name: value})}/>
							</div>
							<div className="double-fields-container">
								<TextField label={"Email Address"} value={email_address} set_value={(value) => this.setState({...this.state, email_address: value})}/>
								<TextField 
									label={"Phone Number"} 
									value={phone_number} 
									set_value={(value) => this.setState({...this.state, phone_number: value})}
									validation={(value) => (/254\d{9}/).test(value)}
									on_error_message="Invalid phone number"
									/>
							</div>
							<div className="double-fields-container">
								<TextField label={"Username"} value={username} set_value={(value) => this.setState({...this.state, username: value})}/>
								<TextField 
									label={"Date Of Birth"} 
									value={date_of_birth} 
									set_value={(value) => this.setState({...this.state, date_of_birth: value})}
									validation={(value) => (/\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])/).test(value)}
									on_error_message={"Expected YYYY-MM-dd format"}
								/>
							</div>
							<div className="double-fields-container">
								<TextField
									label={"Password"} 
									value={password} 
									input_type="password" 
									validation={(value) => (/\w{8,}/).test(value)}
									on_error_message="Password should be have more than 8 characters"
									set_value={(value) => {
										this.setState({...this.state, password: value})
										}}
								/>
								<TextField 
								label={"Confirm Password"} 
								value={confirm_password} 
								input_type="password" 
								validation={(value) => (/\w{8,}/).test(value)}
								on_error_message="Password should be have more than 8 characters"
								set_value={(value) => this.setState({...this.state, confirm_password: value})}
								/>
							</div>

							<PrimaryButton onClick={this.sign_up_user}>Register</PrimaryButton>
						</form>
						</SignUpContainer>
				</Layout>
				)
	}
}

export default withRouter(SignUpPage);
