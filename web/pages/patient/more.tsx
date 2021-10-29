import axios from 'axios';
import { GetServerSideProps } from 'next';
import React from 'react'
import { PatientDashboardProps } from '.';
import { DashboardLayout } from '../../components/dashboard';
import { CounsellorCardContainer } from '../../components/styles';
import { ListAvailableQuestionairesContainer, PatientsCardContainer, QuestionnaireCardContainer } from '../../components/styles/psychiatrist';
import { SERVER_URL } from '../../utils';
import { Questionnaire } from '../questionaires/create-questionaires';


type AvailableQuestionnairesState = {
	questionnaires: Questionnaire[]
}

type AvailableQuestionnairesProps = {
	token: string;
}

class ListAvailableQuestionaires extends React.Component<AvailableQuestionnairesProps,AvailableQuestionnairesState> {

	constructor(props: AvailableQuestionnairesProps) {
		super(props);
		this.state = {
			questionnaires: []
		}
	}

	load_questionnaires = async () => {
		try {
			let config = {
				headers: {
					Authorization: `Bearer ${this.props.token}`
				}
			}

			let response = await axios.get<Questionnaire[]>(`${SERVER_URL}/api/psychiatrist/questionnaires`, config)

			this.setState({...this.state, questionnaires: response.data})

		} catch(e) {
			console.log(e)
		}
	}

	componentDidMount() {
		this.load_questionnaires()
	}

	render() {

		let questionnaire_cards = this.state.questionnaires.map((val: Questionnaire, i: number) => {
			return <QuestionnaireCardContainer key={i} >
					<h5>Title</h5>
					<span>{val.title}</span>
					<span className="status">No filled</span>
				</QuestionnaireCardContainer>
		})
		return <ListAvailableQuestionairesContainer>
				<h3>Available questionnaires to fill</h3>
				<div className="content">
					{questionnaire_cards}
				</div>
		</ListAvailableQuestionairesContainer>
	}
}

class Questionaires extends React.Component<PatientDashboardProps> {

	render() {
		return <DashboardLayout
			center={<ListAvailableQuestionaires token={this.props.token}/>}
			title="Questionnaires"
			prefix="patient"
		/>
	}
}

export default Questionaires;

export const getServerSideProps: GetServerSideProps = async (context) => {
	let auth_token = context.req.cookies['token'];

	let config = {
		headers: {
			Authorization: `Bearer ${auth_token}`
		}
	};

	try {
		let response = await axios.get<PatientDashboardProps>(`${SERVER_URL}/api/auth/is_auth/`, config);

		return { props: {psychiatrist: response.data, token: auth_token, is_valid: response.data["is_whom"] === "patient"} };

	} catch(e) {
		console.log(e);
		context.res.writeHead(302, {"Location": `/`}).end("body");

		return {
			props: {}
		}
	}
}
