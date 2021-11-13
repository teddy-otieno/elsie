import React from 'react'
import { DashboardLayout } from '../../components/dashboard'


class PatientReportPage extends React.Component {

	render() {
		return null
	}
}

class CounsellorReportsPage extends React.Component {
	render() {
		return <DashboardLayout 
			center={ <PatientReportPage />}
			prefix="counsellor"
			title="Reports"
		/>
	}
}

export default CounsellorReportsPage