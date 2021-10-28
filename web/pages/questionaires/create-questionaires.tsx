import React, { useState } from 'react'
import { withRouter } from "next/router"

import axios from 'axios'
import { GetServerSideProps } from 'next';
import { DropDownMenu, RadioButton, TextField } from '../../components/layout';
import { PrimaryButton, SecondaryButton } from '../../components/styles/component';

import { CreateQuestionaireComponent, NewQuestionsContainer, QuestionComponentContainer, RangeContainer } from '../../components/styles/psychiatrist';
import { SERVER_URL } from '../../utils';
import { CounsellorPageProps } from '../counsellor';
import { Psychiatrist } from '../patient';

type Question = {
	question: string
	type: string
	min: number
	max: number
	min_label: string
	max_label: string
}

export type QuestionnaireResponse = {

}

export type Questionnaire = {
	id?: number
	questions: Question[]
	title: string
	owner?: Psychiatrist
	responses?: QuestionnaireResponse[]
	created_on?: string
}

type CreateQuestionaireState = {
	questions: Question[]
	title: string

	sending_state: string
}

interface CreateQuestionairesProps extends CounsellorPageProps {
	router: any
}

class CreateQuestionaires extends React.Component<CreateQuestionairesProps, CreateQuestionaireState> {
	constructor(props: CreateQuestionairesProps) {
		super(props);

		this.state = {
			title: "",
			questions: [],
			sending_state: "Send"
		}
	}


	send_questionnaire = async (e: any) => {
		e.preventDefault();

		try {
			let config = {
				headers: {
					Authorization: `Bearer ${this.props.token}`
				}
			}

			let data: Questionnaire = {
				questions: this.state.questions, 
				title: this.state.title
			}

			this.setState({...this.state, sending_state: "Sending..."})
			let response = await axios.post(`${SERVER_URL}/api/psychiatrist/questionnaires/`, data, config)

			this.setState({...this.state, sending_state: "Done"})

			this.props.router.push("/counsellor/more")

		} catch(e) {
			console.log(e);
		}
	}

	render() {
		const {title} = this.state

		let questions = this.state.questions.map((val: Question, index: number) => <QuestionComponent key={index} question={val} />);
		return <CreateQuestionaireComponent>
			<div className="header">
				<h3>Create Questionaire</h3>
				<PrimaryButton onClick={this.send_questionnaire}>{this.state.sending_state}</PrimaryButton>
			</div>

			<TextField className="title" label="Questionaire Title" value={title} set_value={(val) => this.setState({...this.state, title: val})}/>

			{questions}
			<NewQuestion 
				on_create={(question) => this.setState({ ...this.state, questions: [...this.state.questions, question]})}/>	
		</CreateQuestionaireComponent>;
	}
}

export default withRouter(CreateQuestionaires)

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


const answer_types = ["ShortAnswer", "Range"]

type NewQuestionProps = {
	on_create: (question: Question) => void
}

type Range = {
	min: number
	max: number
}

const NewQuestion: React.FC<NewQuestionProps> = ({on_create}) => {
	const [question, set_question] = useState("")
	const [answer_type, set_answer_type] = useState("shortanswer")
	const [min_label, set_min_label] = useState("");
	const [max_label, set_max_label] = useState("")
	const [min, set_min] = useState<number>(0)
	const [max, set_max] = useState<number>(5)

	const on_questionare_type_select = (index: number) => {
		set_answer_type(answer_types[index].toLowerCase())
	}

	const create_question = (e: any) => {
		e.preventDefault()

		let new_question: Question = {
			question: question,
			type: answer_type.toUpperCase(),
			min: min,
			max: max,
			min_label: min_label,
			max_label: max_label
		};

		on_create(new_question)
	}

	return <NewQuestionsContainer>
		<TextField label="Question" value={question} set_value={set_question}/>
		<DropDownMenu items={answer_types} on_item_select={on_questionare_type_select}/>
		{answer_type === "shortanswer" && <ShortAnswer />}
		{answer_type === "range" && 
			<Range 
			min_label={min_label} 
			max_label={max_label} 
			set_min_label={set_min_label} 
			set_max_label={set_max_label}
			min_value={min}
			max_value={max}
			set_min_value={set_min}
			set_max_value={set_max}
			/>
			}
		<SecondaryButton onClick={create_question}>Add</SecondaryButton>
	</NewQuestionsContainer>	
}


const ShortAnswer: React.FC = () => {
	return <div className="short-answer"><span>Short Answer</span></div>
}

type RangeProps = {
	min_label: string;
	max_label: string;
	set_min_label: (a: string) => void;
	set_max_label: (a: string) => void;

	min_value: number;
	max_value: number;
	set_min_value: (a: number) => void;
	set_max_value: (a: number) => void;
}

const Range: React.FC<RangeProps> = ({
	min_label,
	max_label,
	set_min_label,
	set_max_label,

	min_value,
	max_value,
	set_min_value,
	set_max_value
}) => {

	let max_items: string[] = [];
	let min_items: string[] = ["0", "1"];
	for(let i =2; i< 6; i++) {
		max_items.push(i.toString())
	}

	return <RangeContainer>
		<div className="from">
			<DropDownMenu items={min_items} value={min_value} on_item_select={(e) => set_min_value(parseInt(min_items[e]))}/>
			<span>to</span>
			<DropDownMenu items={max_items} value={max_value} on_item_select={(i) => set_max_value(parseInt(max_items[i]))}/>
		</div>
		<div className="labels">
			<span className="label">
				<span>{min_value}</span>
				<input value={min_label} type="text" placeholder="Label" onChange={(e) => set_min_label(e.target.value)}/>
			</span>
			<span className="label">
				<span>{max_value}</span>
				<input value={max_label} type="text" placeholder="Label" onChange={(e) => set_max_label(e.target.value)}/>
				</span>
		</div>
	</RangeContainer>
}

type QuestionProps = {
	question: Question;
}

const QuestionComponent: React.FC<QuestionProps> = ({question}) => {

	const [clicked, set_clicked] = useState<number | undefined>();
	let range_items = []

	for(let i=question.min ?? 0; i <= (question.max ); i++) {
		range_items.push(<RangeItem label={i} is_selected={clicked === i} on_selected={() => set_clicked(i)}/>)
	}

	return <QuestionComponentContainer>
		<span className="question">{question.question}</span>
		{question.type === "SHORTANSWER" && <div className="short-answer"><span>Short Answer</span></div>}
		{question.type === "RANGE" && 
			<div className="range">
				{range_items}
			</div>
		}
		</QuestionComponentContainer>
}


const RangeItem: React.FC<{label: number; on_selected: () => void; is_selected: boolean}> = ({label, is_selected, on_selected}) => {
	return <span className="range-item">
		<span>{label}</span>
		<RadioButton on_click={on_selected} is_clicked={is_selected}/> 
	</span>
}