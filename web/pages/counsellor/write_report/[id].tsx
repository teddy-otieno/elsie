
import React from 'react'
import { GetServerSideProps } from 'next'
import { withRouter } from 'next/router'
import axios from 'axios';
import styled from 'styled-components'
import {is_empty, SERVER_URL} from '../../../utils'
import { Patient } from '../../patient';
import { BACKGROUND_ALT, SURFACE, ERROR } from '../../../components/styles/theme';
import { TextArea, TextField } from '../../../components/layout';
import { CounsellorPageProps } from '../appointment';
import { PrimaryButton } from '../../../components/styles/component';


interface WriteReportPageProps extends CounsellorPageProps {
	patient: Patient
	token: string
	router: any
}

type WriteReportPageState = {
	diagnosis: string
	prescription: string
	description: string
	error_message: string | undefined
}

class WriteReportPage extends React.Component<WriteReportPageProps, WriteReportPageState> {
	static WriteReportPageStyles = styled.div`
		background-color: ${BACKGROUND_ALT};
		min-height: 100vh;
		width: 100%;
		padding: 10pt 20%;
		box-sizing: border-box;

		.patient {
			display: grid;
			grid-template-columns: 48pt 1fr;
			column-gap: 8pt;
			background-color: ${SURFACE};
			align-items: center;
			border-radius: 4pt;
			padding: 8pt;
			height: 48pt;

			div:first-child {
				background-color: grey;
				border-radius: 50%;
				height: 100%;
				width: 100%;
			}

		}

		.report-content {
			display: flex;
			flex-direction: column;
			padding: 8pt 10%;
			background-color: ${SURFACE};
			margin-top: 10pt;
			border-radius: 4pt;
			align-items: center;
		}
	`

	constructor(props: WriteReportPageProps) {
		super(props)
		this.state = {
			diagnosis: "",
			prescription: "",
			description: "",
			error_message: undefined
		}
	}		

	submit_report = async () => {
		const { diagnosis, prescription, description} = this.state;

		if(is_empty(diagnosis) || is_empty(prescription) || is_empty(description)) {
			this.setState({...this.state, error_message: "Please fill in all the fields"})
			return;
		}

		let data = {
			diagnosis,
			prescription,
			description,
			patient: this.props.patient.id
		}

		let config = {
			headers: {
				Authorization: `Bearer ${this.props.token}`
			}
		}

		try {
			let response = await axios.post(`${SERVER_URL}/api/psychiatrist/patient-reports/`, data, config)
			this.props.router.back()
		} catch(e) {
			console.log(e)
		}
	}

	render() {
		return <WriteReportPage.WriteReportPageStyles>
			<div className="patient">
				<div></div>
				<span>{`${this.props.patient.user.f_name} ${this.props.patient.user.l_name}`}</span>
			</div>

			<div className="report-content">
				<TextField 
					value={this.state.diagnosis}
					label="Diagnosis"
					set_value={(val) => this.setState({...this.state, diagnosis: val})}
				/>
				<TextArea 
					label={"Description"}
					value={this.state.description}
					set_value={(val) => this.setState({...this.state, description: val})}
					rows={10}
				/>
				<TextArea 
					label={"Prescription"}
					value={this.state.prescription}
					set_value={(val) => this.setState({...this.state, prescription: val})}
					rows={10}
				/>
				{this.state.error_message && <p style={{color: ERROR}}>{this.state.error_message}</p>}
				<PrimaryButton onClick={this.submit_report}>Submit</PrimaryButton>
			</div>
		</WriteReportPage.WriteReportPageStyles>
	}
}

export default withRouter(WriteReportPage)

export const getServerSideProps: GetServerSideProps = async (context) => {
	let auth_token = context.req.cookies['token'];

	let config = {
		headers: {
			Authorization: `Bearer ${auth_token}`
		}
	};

	try {
		let response = await axios.get<CounsellorPageProps>(`${SERVER_URL}/api/auth/is_auth/`, config);
		let patient_id = context.query["id"]

		let get_patient_response = await axios.get<Patient>(`${SERVER_URL}/api/auth/get-user-data/${patient_id}/`, config)
		return { props: {
				psychiatrist: response.data, 
				token: auth_token, 
				is_valid: response.data["is_whom"] === "psychiatrist",
				patient: get_patient_response.data
			} 
		};

	} catch(e) {
		console.log(e);

		return {
			props: {}
		}
	}
}