import React, {useState} from 'react';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { SERVER_URL } from '../../utils';
import { Psychiatrist } from '../patient/index';
import { DashboardLayout } from '../../components/dashboard';
import { AvailableAppointmentsContainer, AvailableAppointmentCardContainer } from '../../components/styles/dashboard';
import { Appointment } from "../patient/appointment";


type AvailableAppointmentCardProp = {
	appointment: Appointment;
	token: string;
}

const CONFIRM_BUTTON = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>

const AvailableAppointmentCard: React.FC<AvailableAppointmentCardProp> = ({appointment, token}) => {
	let time_object = new Date(appointment.time);

	const [active, set_active] = useState(appointment.status === "BOOKED");

	const router = useRouter();

	const approve_appointment = async () => {

		try {
			let config = {
				headers: {
					Authorization: `Bearer ${token}`
				 }
			}

			let response = await axios.post(`${SERVER_URL}/api/psychiatrist/accept-appointment/${appointment.id}/`, undefined, config);
			set_active(true);
			router.reload();
		} catch(e) {

		}

	}

	return (
		<AvailableAppointmentCardContainer activated={active}>
			<div className="avatar"></div>
			<div className="name">{"John Doe"}</div>
			<div className=" date labeled-text">
				<h5>Date</h5>
				<p>{time_object.toDateString()}</p>
			</div>
			<div className="time labeled-text">
				<h5>Time</h5>
				<p>{time_object.toLocaleTimeString('en-US')}</p>
			</div>
			<span className="status"><span>{appointment.status}</span></span>
			<span className="confirm" onClick={() => { if(!active) approve_appointment() }}>
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
						{appointment_items}
					</AvailableAppointmentsContainer>
				</div>
					)
	}
}

export type CounsellorPageProps = {
	psychiatrist: Psychiatrist;
	token: string;
}

class CounsellorPage extends React.Component<CounsellorPageProps> {
	render() {
		return <DashboardLayout 
			center={ 
				<div>
					<AvailableAppointments token={this.props.token}/> 
					<PendingAppointments token={this.props.token} />
				</div>
				}
			title="Dashboard"
			prefix={"counsellor"}
		/>
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
		return { props: {psychiatrist: response.data, token: auth_token} };

	} catch(e) {
		console.log(e);
		context.res.writeHead(302, {"Location": `/`}).end("body");

		return {
			props: {}
		}
	}
}
