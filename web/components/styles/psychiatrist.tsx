import styled from 'styled-components';
import { LIGHT_GREY, PRIMARY_COLOR, SURFACE, SHADOW_COLOR, BACKGROUND, BACKGROUND_ALT } from './theme';


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

	.range {
		display: flex;
		justify-content: space-evenly;
		width: 100%;

		.range-item {
			display: flex;
			flex-direction: column;
			align-items: center;

			span:first-child {
				margin-bottom: 4pt;
			}
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
