import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DashboardLayout } from '../../components/dashboard';
import { AccessDeniedPage, SERVER_URL } from '../../utils';
import { CounsellorPageProps } from './appointment';
import { BlogCardContainer, InfoDashContainer, PatientsCardContainer, YourQuestionnairesContainer } from '../../components/styles/psychiatrist';
import Renderer from 'markdown-it/lib/renderer';


type YouQuestionnairesProps = {
	token: string
}

type YouQuestionnaireStatsState = {
	active: number
	responses: number
}

const YouQuestionnaires: React.FC<YouQuestionnairesProps> = ({ token }) => {
	const [state, set_state] = useState<YouQuestionnaireStatsState>({active: 0, responses: 0})

	const load_questionnaires_data = async () => {
		try {
			let config = {
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
			let response = await axios.get<YouQuestionnaireStatsState>(`${SERVER_URL}/api/psychiatrist/questionnaire-stats`, config);
			set_state(response.data)
		}	 catch (e) {
			console.log(e)
		}
	}

	useEffect(() => {
		load_questionnaires_data()
	}, [])

	return <YourQuestionnairesContainer>
		<h4>Questionnaire</h4>
		<div className="labeled-text">
			<span>Active Questionnaires</span>
			<span>{state.active}</span>
		</div>
		<div className="labeled-text">
			<span>Total Responses</span>
			<span className="highlight">{`${state.responses}`}</span>
		</div>
	</YourQuestionnairesContainer>
}

type PatientStatData = {
	recent_logins: number;
	total_patient: number;
	percentage: number;
}

const PatientsCard: React.FC<{token: string}> = ({token}) => {

	const [stat_data, set_stat_data] = useState<PatientStatData>()

	const load_patient_stat = async () => {
		try {
			 let config = {
				 headers: {
					 Authorization: `Bearer ${token}`
				 }
			 }
			 let response = await axios.get<PatientStatData>(`${SERVER_URL}/api/psychiatrist/patients-stats`, config)
			 set_stat_data(response.data)
		} catch(e) {
			console.log(e)
		}
	}

	useEffect(() => {
		load_patient_stat()
	}, []);
	
	return <PatientsCardContainer>
		<h4>Patients Stats</h4>
		<div className="labeled-text">
			<span>No.Patients</span>
			<span>{stat_data?.total_patient}</span>
		</div>
		<div className="labeled-text">
			<span>Recent SignUps</span>
			<span>{stat_data?.recent_logins}</span>
		</div>
		<div className="labeled-text">
			<span>Percentage Increase</span>
			<span className="highlight">{`${stat_data?.percentage} %`}</span>
		</div>
	</PatientsCardContainer>
}

type BlogPostState = {
	total_views: number
	blogs: number
}

const BlogPostCardComponent: React.FC<{token: string}> = ({token}) => {
	const [state, set_state] = useState<BlogPostState>({
		total_views: 0,
		blogs: 0
	});

	const load_blog_stats = async () => {

		try {
			let config = {
				headers: {
					Authorization: `Bearer ${token}`
				}
			}

			let response = await axios.get<BlogPostState>(`${SERVER_URL}/api/psychiatrist/blog-stats`, config)
			set_state(response.data)

		} catch(e) {
			console.log(e)
		}
	}
	useEffect(() => {
		load_blog_stats()
	}, [])

	return <BlogCardContainer>
		<h4>Your Blogs</h4>
		<div className="labeled-text">
			<span>Your Blogs</span>
			<span>{state.blogs}</span>
		</div>
		<div className="labeled-text">
			<span>Total Views</span>
			<span className="highlight">{`${state.total_views}`}</span>
		</div>
	</BlogCardContainer>
}

class InfoDash extends React.Component<{token: string}> {

	render() {
		return <InfoDashContainer>
			<PatientsCard token={this.props.token}/>
			<YouQuestionnaires token={this.props.token}/>
			<BlogPostCardComponent token={this.props.token}/>
		</InfoDashContainer>
	}
}

export default class MorePage extends React.PureComponent<CounsellorPageProps> {

	constructor(props: CounsellorPageProps) {
		super(props)

		this.state = {
			questionnaires: []
		}
	}

	render() {

		if(this.props.is_valid) {
			return <DashboardLayout
				center={<InfoDash token={this.props.token} />} 
				title="More"
				prefix="counsellor"
				/>
		} else {
			return <AccessDeniedPage />
		}
	}
}

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