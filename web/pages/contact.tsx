import React from 'react'
import styled from 'styled-components'
import { TextArea, TextField, TopNavigation } from '../components/layout';
import Image from 'next/image'
import Tree from '../assets/tree.jpg'
import { PrimaryButton } from '../components/styles/component';
import { BACKGROUND_ALT, SHADOW_COLOR, SURFACE } from '../components/styles/theme';
import axios from 'axios';
import { SERVER_URL } from '../utils';


type ContactUsComponentState = {
	name: string
	email: string
	phone_number: string
	message: string
}
class ContactUsComponent extends React.Component<{}, ContactUsComponentState> {

	constructor(props: {}) {
		super(props)

		this.state = {
			name: "",
			email: "",
			phone_number: "",
			message: ""
		}
	}

	submit_contact_information = async () => {
		const { name, email, phone_number, message } = this.state
		try {

			let data = {
				name: name,
				email: email,
				phone_number: phone_number,
				message: message
			}
			let response = await axios.post(`$oSERVER_URL}/api/patient/contact-us/`, data);
			this.setState({...this.state, name: "", email: "", phone_number: "", message: ""})
		} catch (e) {
			console.log(e)
		}
	}

	render() {
		const { name, email, phone_number, message } = this.state;

		return <ContactUs>
			<h2>Contact Us</h2>
			<TextField label="Name" value={name} set_value={(val: string) => this.setState({...this.state, name: val})} />
			<div className="doubl">
				<TextField label="Email" value={email} set_value={(val: string) => this.setState({...this.state, email: val})} />
				<TextField label="Phone Number" value={phone_number} set_value={(val: string) => this.setState({...this.state, phone_number: val})} />
			</div>
			<TextArea label="Message" value={message} set_value={val => this.setState({...this.state, message: val})}/>
			<PrimaryButton>Submit</PrimaryButton>
		</ContactUs>
	}
}

class ContactPageComponent extends React.Component {

	render() {
		return (
			<ContactPage>
				<TopNavigation />
				<div className="content">
					<Image src={Tree} alt="image" objectFit={"cover"} />			
					<ContactUsComponent />
				</div>
			</ContactPage>
		)
	}
}

export default ContactPageComponent;

const ContactPage = styled.div`
	@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap');
	background-color: ${BACKGROUND_ALT};
	.content {
		display: grid;
		grid-template-columns: 300pt 1fr;
		height: calc(100vh - 45pt);
	}
`;

const ContactUs = styled.div`
	width: 50%;
	margin: auto;
	padding: 24pt;
	background-color: ${SURFACE};
	border-radius: 8pt;
	box-shadow: 4pt 4pt 16pt ${SHADOW_COLOR};

	h2 {
		font-family: 'Lora', serif;
		font-weight: 500;
	}
	.doubl {
		display: grid;
		grid-template-columns: 1fr 1fr;
		column-gap: 8pt;

	}
`;