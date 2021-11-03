import styled from 'styled-components';
import { LIGHT_GREY, PRIMARY_COLOR, SURFACE, SHADOW_COLOR, BACKGROUND, BACKGROUND_ALT, LIGHT_FONT, PRIMARY_VARIANT, ERROR } from './theme';


export const CommunitiesContainer = styled.div`
		
`;

export const OptionsContainer = styled.div`
	display: flex;
	flex-direction: column;


	.questionnaire-list {
		display: flex;
		flex-direction:column;

		h3 {
			font-weight: 500;
			text-align: center;
		}

		div:nth-child(2n + 1) {
			background-color: ${LIGHT_GREY};
		}
	}

	.options {
		display: flex;
		flex-wrap: wrap;
		height: 100%;
		width: 100%;
		padding: 16pt;

		.option {
			border: 1pt solid ${LIGHT_GREY};
			height: 232pt;
			width: 200pt;
			display: grid;
			grid-template-rows: 1fr 32pt;
			border-radius: 8pt;
			transition: all .4s ease;
			cursor: pointer;

			svg {
				align-self: center; justify-self: center;
				height: 50%;
				width: 50%;
				background-color: ${PRIMARY_COLOR};
				fill: ${SURFACE};
				border-radius: 8pt;
				padding: 8pt;
			}

			span {
				text-align: center;
			}
		}

		.option:hover {
			box-shadow: 4pt 4pt 8pt ${SHADOW_COLOR};
			transform: translateY(-8pt);
		}
	}
`;

export const CreateQuestionaireComponent = styled.div`
	display: flex;
	flex-direction: column;
	background-color: ${BACKGROUND_ALT};
	align-items: center;
	min-height: 100vh;

	h2 {
		font-weight: 500;
		color: ${PRIMARY_COLOR};
		text-align: center;
	}

	.title {
		width: 50%;
		box-sizing: border-box;
	}

	.header {
		background-color: ${SURFACE};
		width: 100%;
		height: 45pt;
		margin: 0;
		text-align: center;
		margin-bottom: 4pt;
		position: sticky;
		top:0;
		display:grid;
		grid-template-columns: 1fr 100pt;
		padding: 4pt 16pt;
		box-sizing: border-box;
		align-items: center;

		button {
			padding: 8pt;
			font-size: 0.9em;
		}

		h3 {
			font-weight: 500;
			margin: 0;
		}
	}
`;

export const NewQuestionsContainer = styled.div`
	width: 50%;
	background-color: white;
	border-radius: 8pt;
	padding: 16pt;
	
	display: grid;
	grid-template-columns: 1fr 150pt;
	grid-template-rows: auto auto 48pt;
	row-gap: 8pt;
	grid-template-areas: 
		"question option"
		"answer answer"
		"action  submit";
	align-items: flex-end;
	border: 1pt solid ${LIGHT_GREY};

	div:first-child {
		grid-area: question;
	}
	.drop-down {
		grid-area: option;
	}

	button {
		grid-area: submit;
	}
	.short-answer {
		grid-area: answer;
		display: flex;
		align-items: flex-end;

		span {
			border-bottom: 1pt dashed ${LIGHT_GREY};
			display: block;
			padding: 8pt;
			width: 60%;
			height: fit-content;
		}
	}
`;

export const QuestionComponentContainer = styled(NewQuestionsContainer)`
	background-color: ${SURFACE};
	margin-bottom: 8pt;

	.question {
		grid-column-start: question;
		grid-column-end: option;
		font-weight: 500;
		margin-bottom: 8pt;
		font-size: 1.2em;
	}

	.short-answer, .range{
		grid-column-start: answer;
		grid-column-end: answer;
		grid-row-start: answer;
		grid-row-end: action
	}

	.answer {
		grid-row-end: submit !important;
	}

	.range {
		display: flex;
		justify-content: space-evenly;
		width: 100%;
		font-size: 0.95em;

		.range-item {
			display: flex;
			flex-direction: column;
			align-items: center;

			span:first-child {
				margin-bottom: 8pt;
				color: #444444;
			}
		}

		.range-item:first-child, .range-item:last-child {
			font-weight: 500;
			font-size: 1em;
			color: inherit;
		}
	}
`;

export const RangeContainer = styled.div`
	display: flex;
	flex-direction: column;

	.from {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 40%;
		span {
			display: block;
			margin: 0 8pt;
		}

		.drop-down {
			width: 64pt;
		}
	}

	.labels {
		width: 100pt;
		margin-top: 8pt;

		.label {
			display: grid;
			grid-template-columns: auto 1fr;
			column-gap: 8pt;
			align-items: center;
			margin-bottom: 4pt;

			input {
				padding: 8pt;
				border: none;
				border-bottom: 1pt solid ${LIGHT_GREY};
				font: inherit;
			}
		}
	}
`;


export const InfoDashContainer = styled.div`
	padding: 16pt;
	display: flex;
`;

const DashCardContainer = styled.div`
	min-height: 200pt;
	width: 200pt;
	border: 1pt solid ${SHADOW_COLOR};
	border-radius: 8pt;
	padding: 8pt;
	transition: all .4s ease;
	font-size: 1.1em;

	h4 {
		text-align: center;
		font-weight: 500;
		color: ${PRIMARY_COLOR};
	}
	.labeled-text {
		display: grid;
		grid-template-columns: 1fr .4fr;
		column-gap: 8pt;
		padding: 8pt;

		span:first-child {
			color: ${LIGHT_FONT};
		}

		.highlight {
			color: ${PRIMARY_COLOR};
			font-weight: bold;
		}
	}

	&:hover {
		box-shadow: 4pt 4pt 8pt ${SHADOW_COLOR};
	}

`;

export const YourQuestionnairesContainer = styled(DashCardContainer)`

	display: grid;
	grid-template-rows: 1fr 1fr 48pt;
	span {
		display: block;
	}
`;

export const PatientsCardContainer = styled(DashCardContainer)`

`;

export const QuestionnaireCardContainer = styled(DashCardContainer)`
	cursor: pointer;	
	height: 200pt;
	display: grid;
	grid-template-rows: 48pt 1fr 32pt;
	margin-right: 16pt;
	box-sizing: border-box;

	h5 {
		font-weight: 500;
		color: ${LIGHT_FONT};
	}

	button {
		padding: 0;
	}

	span:last-child {
		padding: 8pt;
		border: 1pt solid ${LIGHT_GREY};
		text-align: center;
		color: #888888;
	}

`;

export const ListAvailableQuestionairesContainer = styled.div`
	padding: 16pt;

	h3 {
		font-weight: normal;
		color: ${PRIMARY_COLOR};
	}
	.content {
		display: flex !important;
		width: 100%;
		flex-wrap: wrap;
	}
`;

export const FillQuestionnairePage = styled.div`

`


export const DoctorsDialogContainer  = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100vw;
	z-index: 10;
	background-color: #00000033;
	display: flex;
	align-items: center; justify-content: center;

	.dialog-content {
		display: grid;
		height: 60%;
		width: 50%;
		grid-template-columns: 1fr 1fr;
		column-gap: 4pt;
		grid-template-rows: 1fr 1fr 1fr;
		background-color: white;
	}
`;