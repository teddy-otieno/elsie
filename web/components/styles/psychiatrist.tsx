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

	.short-answer, .range, .answer{
		grid-column-start: answer;
		grid-column-end: answer;
		grid-row-start: answer;
		grid-row-end: action
	}

	.answer {
		align-items: flex-start !important;
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

export const DashCardContainer = styled.div`
	min-height: 200pt;
	width: 200pt;
	border: 1pt solid ${SHADOW_COLOR};
	border-radius: 8pt;
	padding: 8pt;
	transition: all .4s ease;
	font-size: 1.1em;
	margin-right: 8pt;
	background-color: ${SURFACE};

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

export const BlogCardContainer = styled(DashCardContainer)`

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
		height: 60%;
		width: 50%;
		background-color: white;
		border-radius: 8pt;
		padding: 8pt;

		display: grid;
		column-gap: 4pt;
		grid-template-columns: 1fr 0.7fr 0.3fr;
		grid-template-rows: 32pt 1fr 32pt;
		grid-template-areas: 
			"image name name"
			"image bio bio"
			"image ratings confirm";

		div:first-child {
			grid-area: image;
		}

		p{
			margin: 0;
			padding: 8pt;

			 span {
				 color: ${PRIMARY_COLOR};
			 }
		}
		.title {
			grid-area: name;
			font-weight: 500;
			font-size: 1.2em;
		}

		.bio {
			grid-area: bio;

			h5 {
				font-weight: 500;
				color: ${LIGHT_FONT};
			}
		}

		.ratings{
			grid-area: ratings;
		}

		.approve {
			grid-area: confirm;
		}

	}
`;

export const RatingComponentContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 4pt;
	box-sizing: border-box;
	justify-content: center;

	div {
		display: flex;
		align-items: center;
	}

	h5 {
		font-weight: 500;
		margin: 0;
		margin-bottom: 4pt;
		color: ${LIGHT_FONT};
	}

	.rating-item {
		display: block;
		border-radius: 50%;
		border: 2pt solid ${PRIMARY_COLOR};

		height: 10pt; width: 10pt;
		margin-right: 4pt;
	}

	.colored {
		background-color: ${PRIMARY_COLOR};
		border: 1pt solid ${PRIMARY_COLOR};
	}
`;


export const UpdateCounsellorDataContainer = styled.div`
	width: 100%;
	min-height: calc(100vh - 45pt);
	padding: 40pt 200pt;
	box-sizing: border-box;

	display: grid;
	grid-template-columns: 200pt repeat(4, 1fr);
	grid-template-rows: 32pt 200pt 100pt 100pt 32pt; 
	grid-template-areas: 
		"title title title title title"
		"avatar email email email email"
		"bio bio bio bio bio"
		"password	password password	confirm confirm"
		"update	update update update update ";
	column-gap: 10pt;
	row-gap: 10pt;

	.image {
		grid-area: avatar;
		width: 100%;
		height: 100%;
		cursor: pointer;
		div {
			grid-area: avatar;
			width: 100%;
			height: 100%;
			cursor: pointer;
			border-radius: 50%;
		}
	}

	h3 {
		grid-area: title;
		text-align: center;
		font-weight: normal;
		color: ${PRIMARY_COLOR};
	}

	.email{
		grid-area: email;
		align-self: center;
		box-sizing: border-box;
	}

	.bio {
		grid-area: bio;
		height: 100%;
		width: 100%;
	}

	.password {
		grid-area: password;
	}

	.confirm-password {
		grid-area: confirm;
	}

	button {
		align-self: center;
		justify-self: center;
		grid-area: update;
		width: 50%;
	}
`;