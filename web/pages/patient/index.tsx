import ReactCalendar from 'react-calendar'
import axios, { AxiosRequestConfig } from 'axios'
import { GetServerSideProps } from 'next'
import React, { useState } from 'react'
import Image from "next/image"
import { withRouter } from "next/router"

import { DashboardLayout } from '../../components/dashboard';
import { TextField, TextArea } from '../../components/layout';
import 'react-calendar/dist/Calendar.css';
import { NewPost, NewsFeedContainer, PostCardContainer, CalendarContainer, EventCardContainer, CreatePostComponentContainer } from '../../components/styles/dashboard';
import { SecondaryButton, PrimaryButton } from "../../components/styles/component";
import { SERVER_URL, AccessDeniedPage } from '../../utils';
import UserAvatar from "../../assets/user.jpg";


export interface PatientDashboardProps {
	token: string;
	is_whom: string;
	user_data: User;
	is_valid: boolean;
	router: any;
};

type Comment = {
	patient: any,
	comment: string
}

export type User = {
	f_name: string;
	l_name: string;
	username: string;
	phone_number: string;
}

export type Patient = {
	id: number;
	user: User
}

type Post = {
	title: string,
	text: string,
	comment: Comment,
	patient: Patient
}

type NewsFeedProps = {
	f_name: string,
	token: string,
	router: any;
}

type NewsFeedState = {
	posts: Array<Post> 
	show_dialog: boolean;
}

export type Psychiatrist = {
	qualification: string;
	univerity: string;
	user_data: User
}

type Event = {
	title: string;
	description: string;
	time: string;
	owner: Psychiatrist;
}

type CalendarState = {
	events: Map<string, Event[]>;
	selected_date: string;
}

type CalendarProps = {
	token: string;
}

const PostCard: React.FC<{post: Post}> = ({post}) => {
	let user = post.patient.user;

	return (
		<PostCardContainer>
			<span className="user">
				<Image height={30} width={30} src={UserAvatar} alt={"Avatar"}/>
				<span>{`${user.f_name} ${user.l_name}`}</span>
			</span>
			<div className="post-content">
				<h5>{post.title}</h5>
				<h4 className="post-title">{post.text}</h4>
				<p></p>
			</div>
			<div className="actions">
				{/* <span>Like</span>
				<span>Comment</span>
				<span>Share</span> */}
			</div>

		</PostCardContainer>
	)
}

type CreatePostComponentPros = {
	on_close: () => void;
	token: string;
}

type PostDetails = {

}

const CreatePostComponent: React.FC<CreatePostComponentPros> = ({ token, on_close}) => {
	const [title, set_title] = useState("")
	const [text, set_text] = useState("")

	const publish_post = async () => {
		try {
			let config = {
				headers: {
					Authorization: `Bearer ${token}`
			 }
			}

			let data = {
				"text": text,
				"title": title
			}

			let response = await axios.post(`${SERVER_URL}/api/patient/post/`, data, config)
			on_close();
		} catch(e) {
			console.log(e)
		}
	}

	return (
		<CreatePostComponentContainer>
			<form>
				<h3>Write your own post</h3>
				<TextField 
					value={title} 
					set_value={(value) => set_title(value)}
					label={"Title"}
				/>
				<TextArea value={text} set_value={(val) => set_text(val)}/>
				<SecondaryButton onClick={(e) => {e.preventDefault(); on_close()}} style={{gridArea: "cancel"}}>Cancel</SecondaryButton>
				<PrimaryButton style={{gridArea: "post"}} onClick={ (e) => {e.preventDefault(); publish_post();} }>Post</PrimaryButton>
			</form>
		</CreatePostComponentContainer>
	)
}

class NewFeed extends React.PureComponent<NewsFeedProps, NewsFeedState> {

	constructor(props: NewsFeedProps) {
		super(props);

		this.state = {
			posts: [],
			show_dialog: false,
		};
	}

	load_posts = async () => {

		try {
			let config = {
				headers: {
					Authorization: `Bearer ${this.props.token}`
				}
			}

			let response = await axios.get<Array<Post>>(`${SERVER_URL}/api/patient/news_feed/`, config);
			this.setState({...this.state, posts: response.data})

		} catch(e) {
			console.log(e);
		}
	}

	componentDidMount() {
		this.load_posts();
	}

	render() {

		let posts = this.state.posts.map((value, index) => {
			return <PostCard post={value} key={index}/>
		});

		return(
			<NewsFeedContainer>
				<NewPost onClick={() => this.setState({...this.state, show_dialog: true})}>
					<span>
						<p>{`Whats On Your Mind, ${this.props.f_name}?`}</p>
					</span>
				</NewPost>
				{posts}
				{this.state.show_dialog && <CreatePostComponent token={this.props.token} on_close={() => {this.setState({...this.state, show_dialog: false}); this.props.router.reload()}} />}
			</NewsFeedContainer>
		)
	}
}

type EventCardProps = {
    title?: string;
    text: string;
}

const EventCard: React.FC<EventCardProps> = ({title, text}) => {
    return (
        <EventCardContainer>
           {text} 
        </EventCardContainer>
   )
}

class Calendar extends React.PureComponent<CalendarProps, CalendarState> {

	constructor(props: CalendarProps) {	
		super(props);

		this.state = {
			events: new Map(),
			selected_date: ""
		}
	}

	load_events = async (date: Date) => {
		const { token } = this.props;
		try {
			let config = {
				headers: {
					Authorization: `Bearer ${token}`
				}
			}

			let date_string = date.toISOString().substring(0, 10);
			let response = await axios.get<Event[]>(`${SERVER_URL}/api/patient/event/?date=${date_string}`, config);
			let date_map = new Map(this.state.events);
			let new_events: Event[] = [];

			if(date_map.get(date_string) === undefined) {
				new_events = response.data;
			} else {
				new_events = [...date_map.get(date_string)!!, ...response.data];
			}
			date_map.set(date_string, new_events);
			this.setState({ ...this.state, events: date_map });

		} catch(e) {
			console.log(e);
		}
	}

	render() {
		const {selected_date, events} = this.state;
		const event_cards = events.get(selected_date)?.map((value: Event, index: number) => {
			return <EventCard key={index} text={value.title}/>
		});

		return(
			<CalendarContainer>
			    <ReactCalendar
				onClickDay={(value, _) => {
					this.load_events(value)
					this.setState({...this.state, selected_date: value.toISOString().substring(0, 10)});
				}}
				/>	
                <div>
                    <h3>Events</h3>
                    <div className="event-container">
					{event_cards?.length === 0 || event_cards === undefined ? (
						<span className="dimmed-text">Not events</span>
						) : (event_cards)
					}
                    </div>
                </div>
			</CalendarContainer>
		)
	}
}

class PatientDashboard extends React.Component<PatientDashboardProps> {
	create_new_appointment = async () => { }

	render() {

		const { user_data, is_valid } = this.props;

		let feed = <NewFeed router={this.props.router} token={this.props.token} f_name={user_data.f_name} />
		let calendar = <Calendar token={this.props.token} />

		console.log(this.props);


		if(is_valid) {

			return (
				<DashboardLayout 
					center={feed} 
					end={calendar} 
					title="Dashboard"
					prefix={"patient"}
				/>
			);
		} else {
			return <AccessDeniedPage />
		}
	}
}

export default withRouter(PatientDashboard)

export const getServerSideProps: GetServerSideProps = async (context) => {

	let auth_token = context.req.cookies['token'];

	let config: AxiosRequestConfig = {
		headers: {
			Authorization: `Bearer ${auth_token}`
		}
	};

	try {
		let response = await axios.get<PatientDashboardProps>(`${SERVER_URL}/api/auth/is_auth/`, config);
		return {props: {...response.data, token: auth_token, is_valid: response.data["is_whom"] == "patient"}};

	} catch(e) {
		context.res.writeHead(302, {"Location": `/`}).end("body");

		return {
			props: {}
		}
	}
}

