import React from "react";
import axios from 'axios';
import styled from 'styled-components';

import { GetServerSideProps } from 'next';
import { withRouter } from 'next/router';
import {CounsellorPageProps} from './appointment';
import { SERVER_URL, AccessDeniedPage } from '../../utils';

import { DashboardLayout } from '../../components/dashboard';
import { OptionsContainer } from "../../components/styles/psychiatrist";
import { Questionnaire } from "../questionaires/create-questionaires";
import { ERROR, LIGHT_GREY } from "../../components/styles/theme";


type OptionsProps = {
	router: any
	questionnaires: Questionnaire[]
	token: string
}

class __Options extends React.PureComponent<OptionsProps> {

	terminate_questionnaire = async (questionnaire: Questionnaire) => {

		try {
			let config ={
				headers: {
					Authorization: `Bearer ${this.props.token}`
				}
			}

			let response = await axios.get(`${SERVER_URL}/api/psychiatrist/terminate-questionnaire/${questionnaire.id!}`, config)
			this.props.router.reload()
		} catch(e) {
			console.log(e)
		}
	}

	view_questionairre = async (questionnaire: Questionnaire) => {
		// this.props.router.push(`/questionaires/view-questionnaire/${questionnaire.id}`)
	}

	render() {
		let questionnare_cards = this.props.questionnaires.map((val: Questionnaire, i: number) => {
			return <QuestionnaireCard 
				questionnaire={val}
				key={i} 
				on_terminate={(questionnaire: Questionnaire) => {
					this.terminate_questionnaire(questionnaire)

				}}
				on_click={(questionnaire: Questionnaire) => {
					this.view_questionairre(questionnaire)
				}}

				on_active_change={(questionnaire: Questionnaire) => {

				}}
			/>
		}
		)
		return <OptionsContainer>
			<div className="options">
				<div className="option" onClick={() => {this.props.router.push('/questionaires/create-questionaires/')}}>
					<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 9h4c.55 0 1-.45 1-1s-.45-1-1-1h-4c-.55 0-1 .45-1 1s.45 1 1 1zm0 4h4c.55 0 1-.45 1-1s-.45-1-1-1h-4c-.55 0-1 .45-1 1s.45 1 1 1zm0 4h4c.55 0 1-.45 1-1s-.45-1-1-1h-4c-.55 0-1 .45-1 1s.45 1 1 1zM7 7h2v2H7zm0 4h2v2H7zm0 4h2v2H7zM20 3H4c-.55 0-1 .45-1 1v16c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1zm-1 16H5V5h14v14z"/></svg>
					<span>Create Questionaires</span>
				</div>
			</div>
			<div className="questionnaire-list">
				<h3>All your questionnaires</h3>
				<QuestionnaireCardStyle style={{borderTop: `1pt solid ${LIGHT_GREY}`}}>
					<span>Title</span>
					<span>Responses</span>
					<span>Created On</span>
					<span>Is active</span>
					<span>Terminate</span>
				</QuestionnaireCardStyle>
				{questionnare_cards}
			</div>
		</OptionsContainer>
	}
}

const Options = withRouter(__Options);

const QuestionnaireCardStyle = styled.div`
	width: 100%;
	display: grid;
	align-items: center;
	padding: 12pt 8pt;
	grid-template-columns: 1fr 0.5fr 1fr 0.5fr 0.5fr;
	column-gap: 4pt;
	cursor: pointer;

	.terminate {

		svg {
			fill: ${ERROR};
		}
	}
`;


type QuestionnaireCardProps = {
	questionnaire: Questionnaire
	on_terminate: (questionnaire: Questionnaire) => void
	on_click: (questionnaire: Questionnaire) => void
	on_active_change: (questionnaire: Questionnaire) => void
}

const QuestionnaireCard: React.FC<QuestionnaireCardProps> = ({questionnaire, on_terminate, on_click }) => {
	let created_date = new Date(questionnaire.created_on ?? 0)

	return <QuestionnaireCardStyle onClick={() => on_click(questionnaire)}>
		<span>{questionnaire.title}</span>
		<span>{questionnaire.responses?.length ?? 0}</span>
		<span>{created_date.toLocaleString()}</span>
		<span >
			{questionnaire.is_active && <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M9 16.2l-3.5-3.5c-.39-.39-1.01-.39-1.4 0-.39.39-.39 1.01 0 1.4l4.19 4.19c.39.39 1.02.39 1.41 0L20.3 7.7c.39-.39.39-1.01 0-1.4-.39-.39-1.01-.39-1.4 0L9 16.2z"/></svg>}
		</span>
		<span className="terminate" onClick={(e) => {
			e.stopPropagation()
			on_terminate(questionnaire)
		}}>
			{questionnaire.is_active && <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" opacity=".87"/><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm4.3 14.3c-.39.39-1.02.39-1.41 0L12 13.41 9.11 16.3c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41L10.59 12 7.7 9.11c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L12 10.59l2.89-2.89c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41L13.41 12l2.89 2.89c.38.38.38 1.02 0 1.41z"/></svg>}
		</span>
		</QuestionnaireCardStyle>
}

type QuestionairesPageState = {
	questionnaires: Questionnaire[]
}

export default class MorePage extends React.PureComponent<CounsellorPageProps, QuestionairesPageState> {

	constructor(props: CounsellorPageProps) {
		super(props)

		this.state = {
			questionnaires: []
		}
	}

	load_questionaires = async () => {

		try {
			let config = {
				headers: {
					Authorization: `Bearer ${this.props.token}`
				}
			}

			let response = await axios.get<Questionnaire[]>(`${SERVER_URL}/api/psychiatrist/questionnaires/`, config)
			this.setState({...this.state, questionnaires: response.data})
		} catch(e) {
			console.log(e)
		}
	}

	componentDidMount() {
		this.load_questionaires()
	}

	render() {

		if(this.props.is_valid) {
			return <DashboardLayout
				center={<Options token={this.props.token} questionnaires={this.state.questionnaires} />} 
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
