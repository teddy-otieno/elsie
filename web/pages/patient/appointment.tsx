import React from 'react';
import axios from 'axios';
import ReactCalendar from 'react-calendar';
import { GetServerSideProps } from 'next';
import { withRouter } from 'next/router';
import Image from "next/image";

import {TextField} from '../../components/layout';
import { PrimaryButton, SecondaryButton } from "../../components/styles/component";
import { DashboardLayout } from '../../components/dashboard';
import { AppointmentPageContainer, AppointmentCardContainer, CreateAppointmentDialogContainer } from '../../components/styles/dashboard';
import {SERVER_URL} from '../../utils';
import {PatientDashboardProps, Psychiatrist, Patient} from './index';
import UserAvatar from "../../assets/user.jpg";

import 'react-calendar/dist/Calendar.css';

export type Appointment = {
		id: number;
    status: string;
    time: string;
    starter: Patient;
    with_who: Psychiatrist;
}

const VIDEO_CALL_ICON =  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4zM14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2z"/></svg>

const AppointmentCard: React.FC<Appointment> = ({id, status, time, starter, with_who}) => {
	let time_object = new Date(time);

	const show_psychiatrist = () => {
		if(with_who === null) {
				return <h3 className="empty">Pending Psychiatrist approval</h3>
		} else {
			return (
				<div className="title">
					<Image className="avatar" src={UserAvatar} width={100} height={100} alt="Avatar"/>
					<span><span className="color-text">Dr.</span> {`${with_who.user.f_name} ${with_who.user.l_name}`}</span>
				</div>
					)
		}
	};

	return (
		<AppointmentCardContainer is_booked={status === "BOOKED"}>

			<div className="psychiatrist">
				{show_psychiatrist()}
			</div>

			<div className="time">
				<div className="labeled-text">
					<h5>Date</h5>
					<p>{time_object.toDateString()}</p>
				</div>
				<div className="labeled-text">
					<h5>Time</h5>
					<p>{time_object.toLocaleTimeString('en-US')}</p>
				</div>
			</div>

			<div className="status">
				<span className="status-label">{status}</span>
				<span className="video-call">
					{VIDEO_CALL_ICON}
				</span>
			</div>
		</AppointmentCardContainer>
			)
}

type AppointmentComponentState = {
	appointments: Appointment[];
};

type AppointmentComponentProps = {
	token: string;
	show_dialog: boolean;
	set_show_dialog: (value: boolean) => void;
	router: any;
}


type CreateAppointmentState = {
	hour: string;
	minute: string;
	date: Date,
}

type CreateAppointmentDialogProps = {
	token: string;
	router: any;
	close_dialog: () => void;
	on_cancel: () => void;
}

class __CreateAppointmentDialog extends React.Component<CreateAppointmentDialogProps, CreateAppointmentState> {

	constructor(props: CreateAppointmentDialogProps) {
		super(props);

		this.state = {
			hour: "",
			minute: "",
			date: new Date()
		};
	}

	create_new_appointment = async () => {
		let new_date = new Date(this.state.date.getTime());
		new_date.setHours(parseInt(this.state.hour), parseInt(this.state.minute));

		let request_data = {
			time: new_date.toISOString()
		}

		let config = {
				headers: {
					Authorization: `Bearer ${this.props.token}`,
			 }
		};

		try {
			let response = axios.post<Appointment>(`${SERVER_URL}/api/patient/appointment/`, request_data, config);
			this.props.close_dialog();
		} catch(e) {
			console.log("")
		}
	}

	render() {
		const {hour, minute, date} = this.state;

		return (
			<CreateAppointmentDialogContainer>
				<div className="dialog-content">
					<ReactCalendar 
						value={date} 
						onChange={(value: Date) => this.setState({...this.state, date: value})}
						minDate={new Date()}
					/>	
					<div className="desc">
						<h4>Select the date of the appointment and input the time</h4>

						<div className="time">
							<TextField 
								label={"Hour"} 
								value={hour} 
								set_value={(value) => this.setState({...this.state, hour: value})} 
								validation={(value) => (/([0-1][0-9])|(2[0-3])/).test(value)}
								on_error_message={"Expecting 24hr"}
								/>
							<TextField label={"Minute"} 
								value={minute} 
								set_value={(value) => this.setState({...this.state, minute: value})}
								validation={(value) => (/([0-6][0-9])/).test(value)}
								on_error_message={"Invalid minute expected format - mm"}
							/>
						</div>
					</div>

					<div className="action">
						<PrimaryButton onClick={this.create_new_appointment}>Book Appointment</PrimaryButton>
						<SecondaryButton onClick={() => this.props.on_cancel()}>Cancel</SecondaryButton>
					</div>
				</div>
			</CreateAppointmentDialogContainer>
		)
	}
}

const CreateAppointmentDialog = withRouter(__CreateAppointmentDialog);

class __AppointmentComponent extends React.Component<AppointmentComponentProps, AppointmentComponentState> {
	constructor(props: AppointmentComponentProps) {
		super(props);

		this.state = {
			appointments: []
		};
	}

	load_appointments = async () => {
		const {token} = this.props;
		try {
			let config = {
					headers: {
						Authorization: `Bearer ${token} `
				 }
			};
			let response = await axios.get<Appointment[]>(`${SERVER_URL}/api/patient/appointment/`, config);
			this.setState({...this.state, appointments: response.data});
		} catch(e) {
			console.log("Unable to make the request")
		}
	}

	componentDidMount() {
		this.load_appointments();
	}

	render() {

		let appointments_cards = this.state.appointments.map((value, index) => {
			return <AppointmentCard key={index} {...value} />
			});

		return(
			<AppointmentPageContainer>
				<h1>Your Appointments</h1>
				<div className="content">
					{appointments_cards}
				</div>
				{ this.props.show_dialog && 
					<CreateAppointmentDialog 
						token={this.props.token} 
						on_cancel={() => this.props.set_show_dialog(false)} 
						close_dialog={() => {
							this.props.set_show_dialog(false) 
							this.props.router.reload()
							}}
						/> 
					}
			</AppointmentPageContainer>
				)
	}
}

const AppointmentComponent = withRouter(__AppointmentComponent)

type AppointmentPageState = {
	show_dialog: boolean;
}

class AppointmentPage extends React.Component<PatientDashboardProps, AppointmentPageState> {
	constructor(props: PatientDashboardProps) {
		super(props);

		this.state = {
			show_dialog: false
		};

	}

	render() {
		const {token} = this.props

		return (
			<DashboardLayout
				primary_action={() => this.setState({...this.state, show_dialog: true})}
				primary_action_label="Create appointment"
				title="Dashboard"
				center={<AppointmentComponent set_show_dialog={(value) => this.setState({...this.state, show_dialog: value})} token={token} show_dialog={this.state.show_dialog}/>}
				prefix={"patient"}
			/>
				)
	}
}


export default AppointmentPage;

export const getServerSideProps: GetServerSideProps = async (context) => {

	let auth_token = context.req.cookies['token'];

	let config = {
		headers: {
			Authorization: `Bearer ${auth_token}`
		}
	};

	try {
		let response = await axios.get<PatientDashboardProps>(`${SERVER_URL}/api/auth/is_auth/`, config);
		return {props: {...response.data, token: auth_token}};

	} catch(e) {
		context.res.writeHead(302, {"Location": `/`}).end("body");

		return {
			props: {}
		}
	}
}
