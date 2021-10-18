import axios, { AxiosRequestConfig } from 'axios';
import { GetServerSideProps } from 'next';
import React from 'react';
import Image from "next/image";
import { DashboardLayout } from '../../components/dashboard';
import { NewPost, NewsFeedContainer, PostCardContainer } from '../../components/styles/dashboard';
import { SERVER_URL } from '../../utils';
import UserAvatar from "../../assets/user.jpg";


type PatientDashboardProps = {
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

type Patient = {
	id: number;
	user: {
		f_name: string;
		l_name: string;
		username: string;
	}
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
				<p>Hello goodmorning and how are you today. What are you doing and what are you seeing whatt are we saying and wy I'm I typing. A story a story is being told and what story is best if it doesnt come rom you. What do you tell them zen? what is zen what is to feel when you dont know how to feel. And what is it to see whaen you are blink. Mumbo jambo. Being writen here</p>
			</div>
			<div className='actions'>
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

class Calendar extends React.PureComponent {
	render() {
		return(
			<div>Calendar</div>
		)
	}
}

class PatientDashboard extends React.Component<PatientDashboardProps> {
	render() {

		const {f_name } = this.props;

		let feed = <NewFeed token={this.props.token} f_name={f_name} />
		let calendar = <Calendar />

		console.log(this.props);

		return (
			<DashboardLayout center={feed} end={calendar} />
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