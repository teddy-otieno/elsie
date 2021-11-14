import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactCalendar from 'react-calendar';
import { GetServerSideProps } from 'next';
import { withRouter } from 'next/router';
import Image from "next/image";

import {TextField} from '../../components/layout';
import { PrimaryButton, SecondaryButton } from "../../components/styles/component";
import { DashboardLayout } from '../../components/dashboard';
import { 
	AppointmentPageContainer, 
	AppointmentCardContainer, 
	CreateAppointmentDialogContainer,
	ConfirmationDialogContainer,
} from '../../components/styles/dashboard';
import { DoctorsDialogContainer, RatingComponentContainer } from '../../components/styles/psychiatrist';	
import {SERVER_URL} from '../../utils';
import {PatientDashboardProps, Psychiatrist, Patient, User} from './index';
import UserAvatar from "../../assets/user.jpg";

import 'react-calendar/dist/Calendar.css';

export type Appointment = {
		id: number;
    status: string;
    time: string;
    starter: Patient;
    with_who: Psychiatrist;
		meeting_link?: string;

		token: string
}

export type AppointmentCardState = {
	show_doctors_dialog: boolean
}

const VIDEO_CALL_ICON =  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4zM14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2z"/></svg>

const AppointmentCard: React.FC<Appointment> = ({id, status, time, starter, with_who, meeting_link, token}) => {
	const [state, set_state] = useState<AppointmentCardState>({
		show_doctors_dialog: false,
	});

	let time_object = new Date(time);

	const show_dialog = () => {
		set_state({...state, show_doctors_dialog: true})
	}
	
	const show_psychiatrist = () => {
		console.log(with_who)
		if(with_who === null) {
				return <h3 className="empty">Pending Psychiatrist approval</h3>
		} else {
			return (
				<div className="title" onClick={show_dialog}>
					<Image className="avatar" src={UserAvatar} width={100} height={100} alt="Avatar"/>
					<span><span className="color-text">Dr.</span> {`${with_who.user.f_name} ${with_who.user.l_name}`}</span>
				</div>
					)
		}
	};

	const open_video_call = async () => {
		//Note open link just a few hours before 
		window.open(meeting_link, '_blank')?.focus()
	}

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
				<span className="video-call" onClick={open_video_call}>
					{VIDEO_CALL_ICON}
					<div className="link-toast">{meeting_link}</div>
				</span>
			</div>
			{ state.show_doctors_dialog && <DoctorsDialog token={token} pychiatrist={with_who} on_dialog_close={() => set_state({...state, show_doctors_dialog: false})}/> }
		</AppointmentCardContainer>
			)
}

type AppointmentComponentState = {
	appointments: Appointment[];
};

type AppointmentComponentProps = {
	token: string;
	current_user: User;
	show_dialog: boolean;
	set_show_dialog: (value: boolean) => void;
	router: any;
}


type CreateAppointmentState = {
	hour: string;
	minute: string;
	date: Date,
	amount: number
	disable_create: boolean
	transaction_status: string
	show_confirmation_dialog: boolean
}

type CreateAppointmentDialogProps = {
	token: string;
	user: User,
	router: any;
	close_dialog: () => void;
	on_cancel: () => void;
}

type RatingComponentProps =  {
	className?: string	
	rating: number
	on_click: (rating: number) => void
}

const RatingComponent: React.FC<RatingComponentProps> = ({ className, rating, on_click }) => {
		let rating_items = []

		for(let i = 0; i < 5; i++ ) {
			if(i + 1 <= rating)
				rating_items.push(<span key={i} className="rating-item colored" onClick={() => on_click(i + 1)}></span>)
			else
				rating_items.push(<span key={i} className="rating-item" onClick={() => on_click(i + 1)}></span>)
		}
	return <RatingComponentContainer className={className}>
		<h5>Rating</h5>
		<div>{rating_items}</div>
	</RatingComponentContainer>
}

type DoctorDialogProps = {
	pychiatrist: Psychiatrist
	on_dialog_close: () => void;
	token: string
}

type DoctorDialogState = {
	rating_state?: number
}

class DoctorsDialog extends React.Component<DoctorDialogProps, DoctorDialogState> {

	constructor(props: DoctorDialogProps) {
		super(props)

		this.state = {
			rating_state: undefined	
		}
	}

	approve_appointment = async (e: any) => {
		e.preventDefault()
		e.stopPropagation()
		this.props.on_dialog_close()
	}

	update_doctors_ratings = async (rating: number) => {

		try {
			let config = {
				headers: {
					Authorization: `Bearer ${this.props.token}`
				}
			}

			let data = {
				doc_id: this.props.pychiatrist.id,
				rating: rating
			}
			let response = await axios.post(`${SERVER_URL}/api/patient/rate-doctor/`, data, config)

			this.setState({...this.state, rating_state: rating})
		} catch (e) {
			console.log(e)
		}
	}

	render() {
		const {pychiatrist, on_dialog_close} = this.props;
		const { rating_state } = this.state;

		return <DoctorsDialogContainer>

			<div className="dialog-content">
				<Image src={UserAvatar} alt="Avatar" />
				<p className="title"><span>Dr.</span>{` ${pychiatrist.user.f_name} ${pychiatrist.user.l_name}`}</p>
				<div className="bio">
					<h5>Bio</h5>
					<p>{pychiatrist.bio}</p>
					</div>
				<RatingComponent on_click={(rating) => this.update_doctors_ratings(rating)} className={"ratings"} rating={rating_state === undefined ? pychiatrist.rating : rating_state}/>
				<SecondaryButton className="approve" onClick={this.approve_appointment}>Close</SecondaryButton>
			</div>
		</DoctorsDialogContainer>
	}
}

class __CreateAppointmentDialog extends React.Component<CreateAppointmentDialogProps, CreateAppointmentState> {

	constructor(props: CreateAppointmentDialogProps) {
		super(props);

		this.state = {
			hour: "",
			minute: "",
			date: new Date(),
			amount: 2000,
			disable_create: true,
			transaction_status: "Proceed",
			show_confirmation_dialog: false
		};
	}

	create_new_appointment = async () => {
		let new_date = new Date(this.state.date.getTime());
		new_date.setHours(parseInt(this.state.hour), parseInt(this.state.minute));

		let request_data = {
			time: new_date.toISOString(),
			transaction: {
				t_id: "PC12AX32",
				amount: this.state.amount
			}
		}

		let config = {
				headers: {
					Authorization: `Bearer ${this.props.token}`,
			 }
		};

		try {
			let response = await axios.post<Appointment>(`${SERVER_URL}/api/patient/appointment/`, request_data, config);
			this.setState({...this.state, show_confirmation_dialog: true})
		} catch(e) {
			console.log("")
		}
	}

	proceed_click = (e: any) => {
		e.preventDefault(); 
		this.setState({...this.state, transaction_status: "Processing..."})

		this.setState({...this.state, disable_create: false, transaction_status: "Complete"})
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
					<div className="payment">
						<span>{`Billing request for KES ${this.state.amount} has been sent to`}</span>
						<span style={{fontWeight: 500, }}>{`${this.props.user.email}`}</span>
						<SecondaryButton onClick={(e) => {this.proceed_click(e)}}>{this.state.transaction_status}</SecondaryButton>
					</div>

					<div className="action">
						<PrimaryButton disable={this.state.disable_create}  onClick={this.create_new_appointment}>Book Appointment</PrimaryButton>
						<SecondaryButton onClick={() => this.props.on_cancel()}>Cancel</SecondaryButton>
					</div>

					{
						this.state.show_confirmation_dialog && 
						<ConfirmationDialog 
							message={"Your appointment has been booked"} 
							on_timeout={() => {
								this.setState({...this.state, show_confirmation_dialog: false}) 
								this.props.close_dialog()
							}}/>
					}
				</div>
			</CreateAppointmentDialogContainer>
		)
	}
}

const CreateAppointmentDialog = withRouter(__CreateAppointmentDialog);


type ConfirmationDialogProps = {
	message: string
	on_timeout: () => void;
}

const DONE_BUTTON = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ message, on_timeout }) => {

	useEffect(() => {
		setTimeout(() => { on_timeout() }, 1200)
	}, [on_timeout])

	return <ConfirmationDialogContainer>
		<div className="dialog-content">
			<div>{DONE_BUTTON}</div>
			<h3>{message}</h3>
		</div>
	</ConfirmationDialogContainer>
}

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
			return <AppointmentCard key={index} {...value} token={this.props.token} />
			});

		return(
			<AppointmentPageContainer>
				<h1>Your Appointments</h1>
				<div className="content">
					{appointments_cards}
				</div>
				{ this.props.show_dialog && 
					<CreateAppointmentDialog 
						user={this.props.current_user}
						token={this.props.token} 
						on_cancel={() => this.props.set_show_dialog(false)} 
						close_dialog={() => {
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
				token={this.props.token}
				primary_action={() => this.setState({...this.state, show_dialog: true})}
				primary_action_label="Create appointment"
				title="Dashboard"
				center={<AppointmentComponent current_user={this.props.user_data} set_show_dialog={(value) => this.setState({...this.state, show_dialog: value})} token={token} show_dialog={this.state.show_dialog}/>}
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
		console.log(response.data)
		return {props: {...response.data, token: auth_token}};

	} catch(e) {
		context.res.writeHead(302, {"Location": `/`}).end("body");

		return {
			props: {}
		}
	}
}
