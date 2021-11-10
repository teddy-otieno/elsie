import React, {useState} from 'react';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Image from "next/image"
import styled from 'styled-components';

import { SERVER_URL, AccessDeniedPage } from '../../utils';
import { Psychiatrist } from '../patient/index';
import { DashboardLayout } from '../../components/dashboard';
import { AvailableAppointmentsContainer, AvailableAppointmentCardContainer } from '../../components/styles/dashboard';
import { Appointment } from "../patient/appointment";
import UserAvatar from "../../assets/user.jpg";
import { LIGHT_FONT, PRIMARY_COLOR } from '../../components/styles/theme';
import { TextField } from '../../components/layout';


type AvailableAppointmentCardProp = {
	appointment: Appointment;
	token: string;
}

type AvailableAppointmentCardState = {
	active: boolean
	meeting_link: string
}

const CONFIRM_BUTTON = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>

const AvailableAppointmentCard: React.FC<AvailableAppointmentCardProp> = ({appointment, token}) => {
	let time_object = new Date(appointment.time);

	const [state, set_state] = useState<AvailableAppointmentCardState>({
		active: appointment.status === "BOOKED",
		meeting_link: appointment.meeting_link ?? ""
	})

	const router = useRouter();

	const approve_appointment = async () => {

		try {
			let config = {
				headers: {
					Authorization: `Bearer ${token}`
				 }
			}

			//Note meeting links can be provided later
			let data = {
				meeting_link: state.meeting_link
			}

			let response = await axios.post(`${SERVER_URL}/api/psychiatrist/accept-appointment/${appointment.id}/`, data, config);
			set_state({...state, active: true})
			router.reload();
		} catch(e) {

		}

	}

	let starter = appointment.starter.user;
	return (
		<AvailableAppointmentCardContainer is_booked={state.active}>
			<Image className="avatar" src={UserAvatar} height={100} width={100} alt="Appointment Start avatar"/> 
			<div className="name">
				<span>{`${starter.f_name} ${starter.l_name}`}</span>
			</div>
			<div className=" date labeled-text">
				<h5>Date</h5>
				<p>{time_object.toDateString()}</p>
			</div>
			<div className="time labeled-text">
				<h5>Time</h5>
				<p>{time_object.toLocaleTimeString('en-US')}</p>
			</div>
			<span className="status"><span>{appointment.status}</span></span>
			<TextField className="link" label="Meeting Link" value={state.meeting_link} set_value={(val) => set_state({...state, meeting_link: val})}/>
			<span className="confirm" onClick={() => { if(!state.active) approve_appointment() }}>
				<span>{CONFIRM_BUTTON}</span>
			</span>
		</AvailableAppointmentCardContainer>
			)
}

type AvailableAppointmentProps = {
	token: string;
}

type AvailableAppointmentsState = {
	appointments: Appointment[];
}

class AvailableAppointments extends React.Component<AvailableAppointmentProps, AvailableAppointmentsState> {

	constructor(props: AvailableAppointmentProps) {
		super(props);
		this.state = {
			appointments: [],
		}
	}

	load_available_appointments = async () => {
		let config = {
			headers: {
				Authorization: `Bearer ${this.props.token}`
			 }
		}

		try {
			let response = await axios.get<Appointment[]>(`${SERVER_URL}/api/psychiatrist/available-appointments/`, config);
			this.setState({...this.state, appointments: response.data});
		} catch(e) {
		}
	} 

	componentDidMount() {
		this.load_available_appointments();
	}

	render() {

		let appointments_items = this.state.appointments.map((value, index) => <AvailableAppointmentCard token={this.props.token} key={index} appointment={value}/>)
		return (
			<div>
				<h3 style={{fontWeight: 500}}>Pending Appointment</h3>
				<AvailableAppointmentsContainer>
					{this.state.appointments.length === 0 && <h4>No available appointments</h4>}
					{appointments_items}
				</AvailableAppointmentsContainer>
			</div>
				);
	}
}

class PendingAppointments extends React.Component<AvailableAppointmentProps, AvailableAppointmentsState> {

	constructor(props:AvailableAppointmentProps) {
		super(props);

		this.state = {
			appointments: []
		};
	}

	load_approved_appointments = async () => {

		try {
			let config = {
				headers: {
					Authorization: `Bearer ${this.props.token}`
				 }
			};

			let response = await axios.get<Appointment[]>(`${SERVER_URL}/api/psychiatrist/accept-appointment/9/`, config);
			this.setState({...this.state, appointments: response.data})

		} catch(e) {
			console.log(e);
		}
	}

	componentDidMount() {
		this.load_approved_appointments();
	}

	render() {
		let appointment_items = this.state.appointments.map((value, index) => <AvailableAppointmentCard token={this.props.token} key={index} appointment={value}/>)
			return (
				<div>
					<h3 style={{fontWeight: 500}}>Your Booked Appointment</h3>
					<AvailableAppointmentsContainer>
						{this.state.appointments.length === 0 && <h4>No available appointments</h4>}
						{appointment_items}
					</AvailableAppointmentsContainer>
				</div>
					)
	}
}

export interface CounsellorPageProps {
	psychiatrist: Psychiatrist;
	token: string;
	is_whom: string;
	is_valid: boolean;
}

const CounsellorPageContainer = styled.div`
	padding: 8pt;

	h3 {
		font-weight: normal;
		color: ${PRIMARY_COLOR}
	}

	h4 {
		font-weight: 500;
		color: ${LIGHT_FONT};
	}
`;
class CounsellorPage extends React.Component<CounsellorPageProps> {
	render() {
		const { is_valid } = this.props;

		if(is_valid) {
			return <DashboardLayout 
			token={this.props.token}
				center={ 
					<CounsellorPageContainer>
						<AvailableAppointments token={this.props.token}/> 
						<PendingAppointments token={this.props.token} />
					</CounsellorPageContainer>
					}
				title="Dashboard"
				prefix={"counsellor"}
			/>
		} else {
			return <AccessDeniedPage />
		}
	}
}


export default CounsellorPage;

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
