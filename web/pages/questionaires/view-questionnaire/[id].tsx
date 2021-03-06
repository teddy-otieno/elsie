import axios from 'axios';
import React, {useEffect, useState} from 'react'
import styled from 'styled-components';

import { GetServerSideProps } from 'next';
import {CounsellorPageProps} from '../../counsellor/appointment';
import { SERVER_URL } from '../../../utils';
import { QuestionComponent, Questionnaire, QuestionnaireResponse } from '../create-questionaires';
import { BACKGROUND_ALT, LIGHT_GREY, PRIMARY_COLOR } from '../../../components/styles/theme';
import { QuestionResponse } from '../../../types';
import { NewQuestionsContainer } from '../../../components/styles/psychiatrist';


type QuestionnaireAnswerComponentProps = {
	response_id: number
	patient_id: number;
	token: string
	title: string
}

type QuestionnaireAnswerComponentState = {

}

const QuestionnaireResponseStyle = styled.div`
	width: 100%;
	height: 100%;
	background-color: ${BACKGROUND_ALT};
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 10pt 0;
`;

const QuestionnaireAnswersComponent: React.FC<QuestionnaireAnswerComponentProps> = ({ response_id, patient_id, token, title }) => {
	const [answers, set_answers] = useState<QuestionResponse[]>([]);
	const load_answers = async () => {
		try {
			let config = {
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
			let response = await axios.get<QuestionResponse[]>(`${SERVER_URL}/api/psychiatrist/get-responses/${response_id}/${patient_id}/`, config)
			set_answers(response.data)
		} catch(e) {
			console.log(e)
		}
	}

	useEffect(() => {
		load_answers()
	}, [response_id, patient_id])

	let response_answers = answers.map((val: QuestionResponse, i: number) => {
		return <QuestionComponent 
			key={i}
			question={val.question}
			short_answer={val.short_answer}
			range_answer={val.range_answer}
		/>
	})
	return <QuestionnaireResponseStyle>
		<h2 style={{color: PRIMARY_COLOR, fontWeight: 500}}>{`Response for '${title}'`}</h2>
			{response_answers}
	</QuestionnaireResponseStyle>
}

interface ViewQuestionnaireScreenProps extends CounsellorPageProps {
	questionnaire: Questionnaire
}

type ViewQuestionnaireScreenState = {
	selected_response: QuestionnaireResponse | undefined;
}

class ViewQuestionnaireScreen extends React.Component<ViewQuestionnaireScreenProps, ViewQuestionnaireScreenState> {

	constructor(props: ViewQuestionnaireScreenProps) {
		super(props)

		this.state = {
			selected_response: undefined,
		}
	}

	render() {
		const { questionnaire } = this.props;
		const { selected_response } = this.state;

		let respones = questionnaire.responses?.map((val: QuestionnaireResponse, i: number) => {
			return <div 
				key={i}
				className="response-card" 
				onClick={() => {
					this.setState({...this.state, selected_response: val})
			}}>
				{val.patient.user.f_name}
				</div>
		})

		return <ViewQuestionnaireContainer>
			<div className="content">
				<div className="responses">
					{respones}
					</div>
				<div className="answers">{
					selected_response !== undefined && <QuestionnaireAnswersComponent title={questionnaire.title} response_id={selected_response.id!} patient_id={selected_response!.patient.id!} token={this.props.token}/>
				}</div>
			</div>
		</ViewQuestionnaireContainer>
	}
}

export default ViewQuestionnaireScreen

export const getServerSideProps: GetServerSideProps = async (context) => {
	let auth_token = context.req.cookies['token'];

	let config = {
		headers: {
			Authorization: `Bearer ${auth_token}`
		}
	};

	try {
		let response = await axios.get<CounsellorPageProps>(`${SERVER_URL}/api/auth/is_auth/`, config);
		let questionnaire_id = context.query["id"]
		console.log(context.query)

		let questionnaire_response = await axios.get<Questionnaire>(`${SERVER_URL}/api/psychiatrist/questionnaires/${questionnaire_id}/`, config)

		return { props: {questionnaire: questionnaire_response.data, psychiatrist: response.data, token: auth_token, is_valid: response.data["is_whom"] === "psychiatrist"} };

	} catch(e) {
		console.log(e);
		context.res.writeHead(302, {"Location": `/`}).end("body");

		return {
			props: {}
		}
	}
}

const ViewQuestionnaireContainer = styled.div`
	display: flex;
	flex-direction:column;

	height: 100vh;
	width: 100%;

	.content {
		height: 100%;
		width: 100%;
		display:grid;
		grid-template-columns: 200pt 1fr;

		.responses {
			display: flex;
			flex-direction: column;
			border-right: 1pt solid ${LIGHT_GREY};
		}
		.response-card {
			width: 100%;
			padding: 8pt;
			display: flex;
			align-items: center;
			justify-content: center;
			border-bottom: 1pt solid ${LIGHT_GREY};
			box-sizing: border-box;
			cursor: pointer;
			transition: all .4s ease;
		}

		.response-card:hover {
			background-color: ${LIGHT_GREY};
		}
	}
`;