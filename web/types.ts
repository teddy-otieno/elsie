import { Patient, Psychiatrist } from "./pages/patient";
import { Question } from "./pages/questionaires/create-questionaires";

export type PatientReport = {
	id: number
	patient: number | Patient
	diagnosis: string
	prescription: string
	description: string
	written_on: string
	author?: Psychiatrist
}

export type QuestionResponse = {
	id: number
	range_answer?: number
	question: Question
	short_answer?: string
}