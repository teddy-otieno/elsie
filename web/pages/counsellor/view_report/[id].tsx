import React from 'react'
import axios from 'axios'
import styled from 'styled-components'

import { GetServerSideProps } from 'next'
import { SERVER_URL } from '../../../utils'
import { PatientReport } from '../../../types'
import { BACKGROUND_ALT, LIGHT_FONT, LIGHT_GREY, SURFACE } from '../../../components/styles/theme'
import { PrimaryButton } from '../../../components/styles/component'
import { Patient } from '../../patient'

import jspdf from 'jspdf'
import html2canvas from 'html2canvas'
import ReactPDF, { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer"

type ViewReportPageProps = {
	report: PatientReport
	is_rerender?: boolean
}

type ViewReportState = {
	show_downloader: boolean
}
class ViewReportPage extends React.Component<ViewReportPageProps, ViewReportState> {

	static ViewReportPageStyles = styled.div`
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

			.item {
				width: 100%;
				h5 {
					color: ${LIGHT_FONT};
					font-weight: 500;
				}
			}
		}
	`

		constructor(props: ViewReportPageProps) {
			super(props)

			this.state = {
				show_downloader: false,
			}
		}
	componentDidMount() {
		this.setState({
			...this.state,
			show_downloader: true
		})
	}
	generate_html = () => {
		//Hide the Download Report button
		let page = document.getElementById("__next")
		// html2canvas(page!).then(canvas => {

		// 	const content_data_url = canvas.toDataURL('image/png')
		// 	let pdf = new jspdf('p', 'mm', 'a4')
		// 	//pdf.text("Hello world!", 10, 10);
		// 	pdf.addImage(content_data_url, 'PNG', 0, 0, canvas.width, canvas.height)
		// 	pdf.save('report.pdf')
		// })

	}

	render() {
		const { report } = this.props
		return <ViewReportPage.ViewReportPageStyles id="page">
    { (this.state.show_downloader && !this.props.is_rerender) && 
			<PDFDownloadLink document={<ViewReportPage report={this.props.report} is_rerender={true}/>} fileName="somename.pdf">
      {({ blob, url, loading, error }) =>
        loading ? 'Loading document...' : 'Download now!'
      }
    </PDFDownloadLink>
	}
			<div className="patient">
				<div></div>
					<span>{`${(report.patient as Patient).user.f_name} ${(report.patient as Patient).user.l_name}`}</span>
			</div>
			<div className="report-content">
				<h3>{report.diagnosis}</h3>
				<div className="item">
					<h5>Description</h5>
					<p>{report.description}</p>
				</div>

				<div className="item">
					<h5>Prescription</h5>
					<p>{report.prescription}</p>
				</div>
				<PrimaryButton onClick={this.generate_html}>Download Report</PrimaryButton>
			</div>
		</ViewReportPage.ViewReportPageStyles>
	}
}


export default ViewReportPage

export const getServerSideProps: GetServerSideProps = async (context) => {

	let report_id = context.query["id"]
	try {

		let response = await axios.get<PatientReport>(`${SERVER_URL}/api/psychiatrist/get-report/${report_id}`)
		return { 
			props: { 
				report: response.data
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