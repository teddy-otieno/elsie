import { Patient, Psychiatrist } from "./pages/patient";

export type PatientReport = {
	id: number
	patient: number | Patient
	diagnosis: string
	prescription: string
	description: string
	written_on: string
	author?: Psychiatrist
}