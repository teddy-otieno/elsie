import React from 'react'
import axios from 'axios'
import styled from 'styled-components'

import { withRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { DashboardLayout, PatientCard } from '../../components/dashboard'
import { CounsellorPageProps } from './appointment'
import { AccessDeniedPage, SERVER_URL } from '../../utils'
import { Patient, Psychiatrist } from '../patient/index';

type PatientReportData = {
	report_data: any
	patients: Patient[]
}

type PatientReport = {

}

type ListPatientsProps = {
	patients: Patient[]
}

class ListPatients extends React.Component<ListPatientsProps> {
	static ListPatientContainer = styled.div`
		display: flex;
		flex-wrap: wrap;	
		padding: 8pt;
	`;

	render() {
		let patients_components = this.props.patients.map((val: Patient, i: number) => {
			return <PatientCard key={i} patient={val}/>
		})
		return <ListPatients.ListPatientContainer>
			{patients_components}
		</ListPatients.ListPatientContainer>;
	}
}

type ListReportProps = {
	reports:  PatientReport[]
}

class ListReport extends React.Component<ListReportProps> {
	render() {
		return null
	}
}

type ReportContentProps = {
		data: PatientReportData
}

class ReportContent extends React.Component<ReportContentProps> {

	static ReportContentContainer = styled.div`
			height: calc(100vh - 40pt);
			display: flex;
			flex-direction: column;
		`;

	render() {
		return <ReportContent.ReportContentContainer>
			<ListPatients patients={this.props.data.patients} />
			<ListReport reports={this.props.data.report_data}/>
		</ReportContent.ReportContentContainer>
	}
}

interface CounsellorReportsProps extends CounsellorPageProps {
	router: any
	data: PatientReportData
}

class CounsellorReports extends React.Component<CounsellorReportsProps> {

	direct_to_new_report = () => {
		this.props.router.push('/counsellor/write_report')
	}

	render() {
		if(this.props.is_valid) {
			return <DashboardLayout 
				center={ <ReportContent data={this.props.data} />}
				prefix="counsellor"
				title="Reports"
				token={this.props.token}
				primary_action={this.direct_to_new_report}
				primary_action_label={"New Report"}
			/>
		} else {
			return <AccessDeniedPage />
		}

	}
}

export default withRouter(CounsellorReports)

export const getServerSideProps: GetServerSideProps = async (context) => {
	let auth_token = context.req.cookies['token'];

	let config = {
		headers: {
			Authorization: `Bearer ${auth_token}`
		}
	};

	try {
		let response = await axios.get<CounsellorPageProps>(`${SERVER_URL}/api/auth/is_auth/`, config);

		let report_data_response = await axios.get<PatientReportData>(`${SERVER_URL}/api/psychiatrist/patient-reports/`, config)
		return { 
			props: {
				psychiatrist: response.data, 
				token: auth_token, 
				is_valid: response.data["is_whom"] === "psychiatrist",
				data: report_data_response.data
				}, 
		}

	} catch(e) {
		console.log(e);

		return {
			props: {}
		}
	}
}
