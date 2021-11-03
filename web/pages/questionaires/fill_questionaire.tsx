import React, {useState} from 'react'
import axios from 'axios'
import { withRouter } from 'next/router';

import { GetServerSideProps } from 'next'
import { PatientDashboardProps } from '../patient';
import { SERVER_URL } from '../../utils';
import { Questionnaire, Question, RangeItem } from './create-questionaires';
import { CreateQuestionaireComponent, FillQuestionnairePage, QuestionComponentContainer } from '../../components/styles/psychiatrist';
import { TextArea } from '../../components/layout';
import {PrimaryButton} from "../../components/styles/component";

type RangeQuestionState = {
	answer: string
	selected_item: number | undefined
}

type RangeAnswerProps = {
	on_answer: (a: number) => void;
	question: Question
}

const RangeQuestion: React.FC<RangeAnswerProps> = ({ question, on_answer }) => {
	const [state, set_state] = useState<RangeQuestionState>({answer: "", selected_item: undefined})

	let range_items = []

	for(let i = question.min ?? 0; i <= (question.max); i++) {
		const label = (): string => {
			if(i == question.min) {
				return question.min_label
			} else if( i === question.max) {
				return question.max_label
			} else {
				return i.toString()
			}
		}

		range_items.push(<RangeItem
			 label={label()} 
			 is_selected={state.selected_item === i} 
			 on_selected={ 
			 () => {
					set_state({...state, selected_item: i})
					on_answer(i)
			 }
				 } 
			 />)
	}

	return <QuestionComponentContainer>
		<p className="question">{question.question}</p>
		<div className="range">{range_items}</div>
	</QuestionComponentContainer>
}

type ShortAnswerQuestionState = {
	answer: string
}

type ShortAnswerProps = {
	question: Question
	on_answer: (a: string) => void
}

const ShortAnswerQuestion: React.FC<ShortAnswerProps> = ({ question, on_answer }) => {

	const [state, set_state] = useState<ShortAnswerQuestionState>({answer: ""})
	return <QuestionComponentContainer>
			<p className="question">{question.question}</p>
			<TextArea 
				className="short-answer answer" 
				value={state.answer} 
				set_value={(val) => {
					set_state({...state, answer: val})
					on_answer(val)
					}
				}
			/>
		</QuestionComponentContainer>
}

interface FillQuestionnaireProps extends PatientDashboardProps {
	questionnaire: Questionnaire;
}

interface QuestionAndAnswerMap {
	[question: string] : string | number
}

type FillQuestionnaireState = {
	sending_state: string
	answers: QuestionAndAnswerMap
}

class FillQuestionnaire extends React.PureComponent<FillQuestionnaireProps, FillQuestionnaireState> {

	constructor(props: FillQuestionnaireProps) {
		super(props)

		this.state = {
			sending_state: "Submit",
			answers: {}
		}
	}

	submit_answers = async () => {

		try {
			let config = {
				headers: {
					Authorization: `Bearer ${this.props.token}`
				}
			}

			let responses = []
			for(let key in this.state.answers) {
				console.log(key)
				let temp = {}
				responses.push({response: this.state.answers[key], question_id: key})
			}

			let data = {
				questionnaire_id: this.props.questionnaire.id,
				responses: responses
			}

			this.setState({...this.state, sending_state: "Submitting..."})
			let response = await axios.post(`${SERVER_URL}/api/psychiatrist/save-response/`, data, config)
			
			this.setState({...this.state, sending_state: "Done"})

			setTimeout(() => {
				this.props.router.push('/patient/more')
			}, 400)	

		} catch(e) {
			console.log(e)
		}

	}

	render() {
		const { questionnaire } = this.props;


		let question_components = questionnaire.questions.map((val: Question, i: number) => {
			const on_answer = (answer: string | number) => {
				let copy_of_answers = {...this.state.answers};
				copy_of_answers[val.id!.toString()] = answer;

				this.setState({...this.state, answers: copy_of_answers})
			}

			if(val.type === "SHORTANSWER") {
				return <ShortAnswerQuestion key={i} question={val}  on_answer={on_answer}/>
			} else {
				return <RangeQuestion key={i} question={val} on_answer={on_answer}/>
			}
		})

		return <CreateQuestionaireComponent>
			<div className="header">
				<h3>Fill Questionnaire</h3>
				<PrimaryButton onClick={this.submit_answers}>{this.state.sending_state}</PrimaryButton>
			</div>
			<h2 className="title">{questionnaire.title}</h2>
			{question_components}
		</CreateQuestionaireComponent>;
	}
}

export default withRouter(FillQuestionnaire);

export const getServerSideProps: GetServerSideProps = async (context) => {
	let auth_token = context.req.cookies['token'];

	let config = {
		headers: {
			Authorization: `Bearer ${auth_token}`
		}
	};

	try {
		let response = await axios.get<PatientDashboardProps>(`${SERVER_URL}/api/auth/is_auth/`, config);

		let questionnaire_id = context.query["id"]

		let questionnaire_response = await axios.get<Questionnaire>(`${SERVER_URL}/api/psychiatrist/questionnaires/${questionnaire_id}/`, config)


		return { 
			props: {
				psychiatrist: response.data, 
				token: auth_token, 
				is_valid: response.data["is_whom"] === "patient",
				questionnaire: questionnaire_response.data
			} 
		}

	} catch(e) {
		console.log(e);
		context.res.writeHead(302, {"Location": `/`}).end("body");

		return {
			props: {}
		}
	}
}

