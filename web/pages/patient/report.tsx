import React from 'react'
import axios from 'axios'
import styled from 'styled-components'

import { DashboardLayout, PatientCard } from '../../components/dashboard'
import {GetServerSideProps} from 'next'
import { withRouter } from 'next/router'
import { PatientDashboardProps } from '.'
import { SERVER_URL } from '../../utils'
import { PatientReport } from '../../types'


type PatientReportContentProps = {
	reports: PatientReport[]
	router: any
}

class PatientReportContent extends React.Component<PatientReportContentProps> {

	static PatientReportPageStyles = styled.div`
		padding: 10pt;
		min-height: 100vh;
		width: 100%;
		`;

	open_view_questionnaire = () => {

	}

	render() {
		let patients_components = this.props.reports.map((val: PatientReport, i: number) => {
			return <PatientCard on_click={this.open_view_questionnaire} key={i} patient={val.author!}/>
		})

		return <PatientReportContent.PatientReportPageStyles>
				{patients_components}
		</PatientReportContent.PatientReportPageStyles>
	}
}

interface PatientReportPageProps extends PatientDashboardProps {
	reports: PatientReport[]
	router: any
}
class PatientReportPage extends React.Component<PatientReportPageProps> {
	render() {
		return <DashboardLayout 
			center={ <PatientReportContent router={this.props.router} reports={this.props.reports} />}
			prefix="patient"
			title="Reports"
			token={this.props.token}
		/>
	}
}

export default withRouter(PatientReportPage)

export const getServerSideProps: GetServerSideProps = async (context) => {
	let auth_token = context.req.cookies['token'];

	let config = {
		headers: {
			Authorization: `Bearer ${auth_token}`
		}
	};

	try {
		let response = await axios.get<PatientDashboardProps>(`${SERVER_URL}/api/auth/is_auth/`, config);
		let report_data_response = await axios.get<PatientReport[]>(`${SERVER_URL}/api/psychiatrist/get-patient-reports/`, config)
		console.log(report_data_response.data)

		return {
			 props: {
				 patient: response.data, 
				 token: auth_token, 
				 is_valid: response.data["is_whom"] === "patient",
				 reports: report_data_response.data
				} 
			};

	} catch(e) {
		console.log(e);
		context.res.writeHead(302, {"Location": `/`}).end("body");

		return {
			props: {}
		}
	}
}
