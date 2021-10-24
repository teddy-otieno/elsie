import ReactCalendar from 'react-calendar';
import axios, { AxiosRequestConfig } from 'axios';
import { GetServerSideProps } from 'next';
import React from 'react';
import Image from "next/image";
import { DashboardLayout } from '../../components/dashboard';
import 'react-calendar/dist/Calendar.css';
import { NewPost, NewsFeedContainer, PostCardContainer, CalendarContainer, EventCardContainer } from '../../components/styles/dashboard';
import { SERVER_URL } from '../../utils';
import UserAvatar from "../../assets/user.jpg";


export type PatientDashboardProps = {
	username: string;
	f_name: string;
	l_name: string;
	token: string;
	date_of_birth: string;
	phone_number: string;
};

type Comment = {
	patient: any,
	comment: string
}

type User = {
	f_name: string;
	l_name: string;
	username: string;
}

type Patient = {
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
	token: string
}

type NewsFeedState = {
	posts: Array<Post> 
}

export type Psychiatrist = {
	qualification: string;
	univerity: string;
	user: User
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
				{/* <h5>{post.title}</h5>
				<p>{post.text}</p> */}
				<h4 className="post-title">{post.text}</h4>
				<p></p>
			</div>
			<div className="actions">
				<span>Like</span>
				<span>Comment</span>
				<span>Share</span>
			</div>

		</PostCardContainer>
	)
}


class NewFeed extends React.PureComponent<NewsFeedProps, NewsFeedState> {

	constructor(props: NewsFeedProps) {
		super(props);

		this.state = {
			posts: []
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
				<NewPost>
					<span>
						<p>{`Whats On Your Mind, ${this.props.f_name}?`}</p>
					</span>
				</NewPost>
				{posts}

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
				let new_events = response.data;
			} else {
				let new_events = [...date_map.get(date_string)!!, response.data];
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
	create_new_appointment = async () => { 
		//TODO(Teddy) direct to the create appointments 
	}

	render() {

		const {f_name } = this.props;

		let feed = <NewFeed token={this.props.token} f_name={f_name} />
		let calendar = <Calendar token={this.props.token} />

		console.log(this.props);

		return (
			<DashboardLayout 
				center={feed} 
				end={calendar} 
				title="Dashboard"
			/>
		);
	}
}

export default PatientDashboard;

export const getServerSideProps: GetServerSideProps = async (context) => {

	let auth_token = context.req.cookies['token'];

	let config: AxiosRequestConfig = {
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
