import React from 'react'
import axios from 'axios'
import styled from 'styled-components'

import { useRouter, withRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { DashboardLayout, PatientCard } from '../../components/dashboard'
import { CounsellorPageProps } from './appointment'
import { AccessDeniedPage, SERVER_URL } from '../../utils'
import { Patient, Psychiatrist } from '../patient/index';
import { PatientReport } from '../../types'
import { LIGHT_FONT, LIGHT_GREY, SHADOW_COLOR, SURFACE } from '../../components/styles/theme'

type PatientReportData = {
	report_data: any
	patients: Patient[]
}


type ListPatientsProps = {
	patients: Patient[]
	router: any
}

class ListPatients extends React.Component<ListPatientsProps> {
	static ListPatientContainer = styled.div`
		display: flex;
		flex-wrap: wrap;	
		padding: 8pt;
	`;


	render() {
		let patients_components = this.props.patients.map((val: Patient, i: number) => {
			const go_to_write_report = (id: number) => {
				this.props.router.push(`/counsellor/write_report/${val.id}`)
			}
			return <PatientCard title={"Click to write report for"} on_click={go_to_write_report} key={i} patient={val}/>
		})
		return <ListPatients.ListPatientContainer>
			{patients_components}
		</ListPatients.ListPatientContainer>;
	}
}

const ListCardStyles = styled.div`
	display: grid;
	padding: 8pt;
	border-bottom: 1pt solid ${SHADOW_COLOR};
	grid-template-columns: 160pt 1fr 0.5fr;
	background-color: ${SURFACE};
	transition: all .4s ease;
	cursor: pointer;

	&:hover {
		background-color: ${SHADOW_COLOR}
	}

`;
type ReportListCardProps = {
	report: PatientReport
	patient: Patient
}

const ListCard: React.FC<ReportListCardProps> = ({report, patient}) => {
	const router = useRouter()

	const view_report = () => {
		router.push(`/counsellor/view_report/${report.id}`)
	}

	const written_time = new Date(report.written_on)
	return <ListCardStyles onClick={view_report}>
		<span>{`${patient.user.f_name} ${patient.user.l_name}`}</span>
		<span>{report.diagnosis}</span>
		<span>{written_time.toDateString()}</span>
	</ListCardStyles>
}
type ListReportProps = {
	reports:  PatientReport[]
	patients: Patient[]
}

class ListReport extends React.Component<ListReportProps> {
	static ListReportStyles = styled.div`

		.header {
			color: ${LIGHT_FONT};
			background-color: ${LIGHT_GREY};
		}
	`;
	render() {
		const { reports, patients } = this.props;

		let list_card_components = reports.map((val: PatientReport, i: number) => {
			let patient = patients.find((patient: Patient) => {
				return val.patient === patient.id
			})

			return <ListCard report={val} patient={patient!} key={i}/>
		})

		//TODO: Add search
		return <ListReport.ListReportStyles>
			<h3 className="category-title">Previous Reports</h3>
			<ListCardStyles className="header">
				<span>{`Name`}</span>
				<span>{"Diagnosis"}</span>
				<span>{"Date"}</span>
			</ListCardStyles>
			{list_card_components}
		</ListReport.ListReportStyles>
	}
}

type ReportContentProps = {
		data: PatientReportData
		router: any
}

class ReportContent extends React.Component<ReportContentProps> {

	static ReportContentContainer = styled.div`
			height: calc(100vh - 40pt);
			display: flex;
			flex-direction: column;
		`;

	render() {

		const { data } = this.props;

		return <ReportContent.ReportContentContainer>
			<ListPatients router={this.props.router} patients={data.patients} />
			<ListReport reports={data.report_data} patients={data.patients}/>
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
				center={ <ReportContent router={this.props.router} data={this.props.data} />}
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
