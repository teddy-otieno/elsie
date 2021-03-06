import styled, {css} from 'styled-components';
import { BACKGROUND, 
	BACKGROUND_ALT, 
	FONT, 
	LIGHT_FONT, 
	LIGHT_GREY, 
	PRIMARY_COLOR, 
	SHADOW_COLOR, 
	SURFACE, 
	PRIMARY_VARIANT,
	ERROR
} from './theme';

export const DashboardTopNavigationContainer = styled.header`
	display: grid;
	grid-template-columns: 1fr 0.5fr;
	position: sticky;
	top: 0pt;
	height: 40pt;
	background-color: ${SURFACE};
	border-bottom: 1pt solid ${LIGHT_GREY};
	width: 100%;
	z-index: 2;

	div:first-child {
		display: flex;
		align-items: center;
		padding: 0pt 4pt;
		
		.title, h5 {
			color: ${PRIMARY_COLOR};
			margin: 0;
			margin-right: 10pt;
		}

		.title {
			font-family: 'Lora', serif; 
			font-weight: 500;
			margin-right: 200pt;
			background-color: ${PRIMARY_VARIANT};
			padding: 4pt;
			border-radius: 4pt;
		}

		h5 {
			color: ${LIGHT_FONT};
			font-weight: 500;
			background-color: ${BACKGROUND_ALT};
			padding: 4pt;
			border-radius: 4pt;
		}

	}

	div:nth-child(2) {
		display: flex;
		align-items: center;
		padding: 0pt 4pt;

		justify-content: flex-end;
		padding: 6pt 8pt;

		.upcoming-events {
			font-size: 0.8em;
			color: ${LIGHT_FONT};
			background-color: ${BACKGROUND_ALT};
			border-radius: 8pt;
			margin-right: 8pt;
			cursor: pointer;
			transition: all .4s ease;

			.highlight {
				color: ${PRIMARY_COLOR};
			}
		}

		.upcoming-events:hover {
			background-color: ${LIGHT_GREY};
		}

		button {
			padding: 8pt 12pt;
			font-size: 0.9em;
		}
	}
`;

type DashContainerProps = {
	show_end: boolean;
}

export const DashboardContainer = styled.section<DashContainerProps>`
	.labeled-text {
		h5 {
			font-weight: 500;
			color: ${LIGHT_FONT};
			margin: 0; margin-bottom: 4pt;
		}

		p {
			justify-self: flex-end;
		}

	}

	.category-title {
		background-color: ${SURFACE};
		padding: 8pt;
		border-radius: 4pt;
		margin: 8pt 4pt;
		color: ${PRIMARY_COLOR};
		font-weight: 500;
	}

	.react-calendar {
		border: 1pt solid ${LIGHT_GREY};
		border-radius: 8pt;
	}

	.react-calendar__tile {
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: 20%;
		height: 36pt;
		width: 36pt;
		font: inherit;
		margin: 2pt;
	}

	.content {
		display: grid;
		background-color: ${BACKGROUND_ALT};
		${(props) => props.show_end ? "grid-template-columns: 160pt 1fr 200pt" : "grid-template-columns: 200pt 1fr"};
		min-height: calc(100vh - 40pt);
	}
`;

export const SideNavigationContainer = styled.nav`
	display: grid;
	grid-template-rows: 1fr 32pt;
	background-color: ${SURFACE};
	border-right: 1pt solid ${BACKGROUND_ALT};
	position: sticky;
	top: 40pt;
	height: calc(100vh - 40pt);

	ul {
		padding: 0;
		margin: 0;
		list-style: none;

		li {

			a {
				display: block;
				text-decoration: none;
				padding: 16pt 0;
				color: inherit;
				text-align: center;
				transition: all .4s ease;
			}

			a:hover {
				color: ${PRIMARY_COLOR};
				background-color: ${BACKGROUND_ALT};
			}
		}
	}
`;

export const NewsFeedContainer = styled.div`
	width: 100%;
	height: 100%;
	padding: 16pt 10%;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
`;

export const NewPost = styled.div`
	width: 100%;
	background-color: ${BACKGROUND_ALT};
	padding: 8pt 8pt;
	box-sizing: border-box;
	border-radius: 10pt;
	border: 1pt solid ${LIGHT_GREY};
	box-shadow: 2pt 2pt 8pt ${SHADOW_COLOR};
	transition: box-shadow .4s ease;
	margin-bottom: 8pt;

	span {
		border-radius: 8pt;
		padding: 8pt;
		background-color: ${SURFACE};
		display: flex;
		width: 100%;
		box-sizing: border-box;

		p {
			margin: 0;
			color: ${LIGHT_FONT};
		}
	}

	&:hover {
		box-shadow: 4pt 2pt 17pt ${SHADOW_COLOR};
		cursor: text;
	}
`;


export const PostCardContainer = styled.div`
	display: grid;
	flex-direction: column;
	border: 1pt solid ${LIGHT_GREY};
	padding: 4pt 12pt;
	border-radius: 8pt;
	box-shadow: 2pt 2pt 4pt ${SHADOW_COLOR};
	margin-bottom: 8pt;
	background-color: ${SURFACE};

	.user {
		padding: 4pt;
		display: grid;
		grid-template-columns: 32pt 1fr;
		column-gap: 8pt;
		/* justify-items: center; */
		align-items: center;

		div:first-child {
			border-radius: 50%;
			margin-right: 8pt;
			height: 24pt;
			width: 24pt;
			border: 2pt solid ${PRIMARY_COLOR};
		}

		span {
			color: ${LIGHT_FONT};
		}
	}

	.post-content {
		h4 {
			font-weight: 500;
		}
	}

	.actions {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		justify-items: center;
		height: 24pt;

		span:hover {
			background-color: ${BACKGROUND_ALT};
		}
	}
`;

export const CalendarContainer = styled.div`
	display: grid;
	position: sticky;
	height: calc(100vh - 40pt);
	top: 40pt;
	padding: 8pt 4pt;
	width: 100%;
	box-sizing: border-box;

	.events-container {
			padding: 4pt;
	}

	.calendar-icon {
		display: block;
		height: 8pt; width: 8pt;
		background-color: ${PRIMARY_COLOR};
		border-radius: 50%;
		box-shadow: 0pt 0pt 4pt ${PRIMARY_COLOR};
	}

	.react-calendar {
		width: 100%;
		box-sizing: border-box;
	}

`;

export const EventCardContainer = styled.div`
    border: 1pt solid ${SHADOW_COLOR};
    padding: 8pt;
    margin-bottom: 4pt;
		border-radius: 8pt;
		width: 90%;
		background-color: ${SURFACE};

		display: grid;
		grid-template-columns: 1fr 0.4fr;
		grid-template-rows: 1fr 1fr;

		grid-template-areas: 
			"title time"
			"text text";

		h5 {
			margin: 0;
			font-weight: 500;
			color: ${LIGHT_FONT};
		}

		h5:first-child {
			grid-area: title;
		}

		h5:nth-child(2) {
			grid-area: time;
			color: ${PRIMARY_COLOR};
		}
		p {
			font-size: 0.9em;
			grid-area: text;
		}
`;

export const CommunityChatContainer  = styled.div`
	display: grid;
	grid-template-columns: 240pt 1fr;

	.communities {
		border-right: 1pt solid ${LIGHT_GREY};
		height: calc(100vh - 40pt);
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 4pt 0;
		background-color: ${SURFACE};
		padding: 8pt;
		box-sizing: border-box;

		.create {
			color: ${PRIMARY_COLOR};
			width: 90%;
			padding: 8pt 0;
			text-align: center;
		}
	}

	.chat {
		flex-direction: column;
		background-color: ${"#f1f1f1"};
		width: 100%;
		display: grid;
		grid-template-rows: 1fr 48pt;
		height: calc(100vh- 40pt);

		.prev-messages {
			padding: 8pt;
			display: flex;
			flex-direction: column-reverse;
			overflow-y: auto;
		}

		.message-input {
			display: grid;
			grid-template-columns: 1fr;
			padding: 5pt;

			input {
				font: inherit;
				border: 1pt solid ${LIGHT_GREY};
				padding: 0 8pt;
			}
		}
	}
`;

type MessageBubbleProps = {
	is_sender: boolean;
}

export const MessageBubbleContainer = styled.div<MessageBubbleProps>`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-areas: "left right";
	width: 100%;
	margin-bottom: 4pt;

	.message {
		grid-area: ${(props) => props.is_sender ? "right" : "left"};
		justify-self: ${(props) => props.is_sender ? "flex-end" : "flex-start"};
		background-color: ${SURFACE};
		padding: 4pt 8pt;
		border-radius: 8pt;
		box-shadow: 2pt 2pt 4pt ${SHADOW_COLOR};
		width: fit-content;
		display: flex;
		flex-direction: column;
		position: relative;

		span:first-child {
			font-size: 0.7em;
			color: ${LIGHT_GREY};
			text-align: ${(props) => props.is_sender ? "right" : "left"};
		 }
	}

	&:hover {
		.actions {
			display: block;
		}
	}

	.actions {
		position: absolute;
		left: -20pt;
		display: none;
		cursor: pointer;

		svg {
			height: 16pt;
			width: 16pt;
			fill: ${ERROR};
		}
	}
`;

export const CommunityCardContainer = styled.div`
	display: grid;
	grid-template-columns: 32pt 1fr 24pt;
	column-gap: 4pt;
	padding: 12pt 4pt;
	align-items: center;
	cursor: pointer;
	width: 100%;
	box-sizing: border-box;
	border-bottom: 1pt solid #f1f1f1;

	.avatar {
		background-color: ${SHADOW_COLOR};
		height: 24pt;
		width: 24pt;
		border-radius: 50%;
	}

	span:first-child {
		height: 100%;
	}

	&:hover {
		background-color: ${"#f1f1f1"};
	}
`;

export const CommunityMemberContainer = styled.div`
	height: 100%;
	width: 100%;
	padding: 4pt;
	overflow-y: auto;
	box-sizing: border-box;
	background-color: ${SURFACE};
	color: #555555;

	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 4pt;

	h5 {
		color: ${LIGHT_FONT};
		font-weight: 500;
		font-size: 0.9em;
	}
	span {
		display: block;
		border-bottom: 1pt solid ${LIGHT_GREY};
		width: 100%;
		padding: 8pt 0;
	}
`;

export const AppointmentPageContainer = styled.div`
	height: 100%; width: 100%;
	padding: 16pt;
	box-sizing: border-box;
	
	h1 {
		font-weight: 500;
		color: ${PRIMARY_COLOR};
	}

	.content {
		width: 100%;
		height: 100%;
		display: flex;
		padding: 8pt;
		box-sizing: border-box;
		column-gap: unset !important;
		flex-wrap: wrap;
	}
`;

type AppointmentCardProps = {
	is_booked: boolean;
}

export const AppointmentCardContainer =  styled.div<AppointmentCardProps>`
	border: 1pt solid ${(props) => props.is_booked ? PRIMARY_COLOR : LIGHT_GREY};
	height: 200pt;
	width: 240pt;
	padding: 16pt;
	border-radius: 8pt;
	margin-right: 4pt;
	background-color: ${SURFACE};

	display: grid;
	grid-template-columns: 32pt 1fr 1fr;
	grid-template-rows: 32pt 1fr 32pt;
	transition: all .4s ease;

	&:hover {
		box-shadow: 2pt 2pt 16pt ${SHADOW_COLOR};
	}

	grid-template-areas: 
		"header header header"
		"time time time"
		"status status status";


	.psychiatrist {
		grid-area: header;


		.title {
			display: grid;
			grid-template-columns: 32pt 1fr;
			column-gap: 8pt;
			align-items: center;
			width: 100%;
			cursor: pointer;
			padding: 4pt;
			transition: all .2s ease;
			border-radius: 4pt;

			div:first-child {
				height: 32pt;
				width: 32pt;
				border-radius: 50%;
			}

			span {

			}
		}

		/* .title:hover {
			background-color: ${LIGHT_GREY};
		} */

		.empty {
			text-align: center;
			font-weight: 500;
			color: ${ERROR};
		}
		.title:hover {
			background-color: ${SHADOW_COLOR}
		}
	}


	.time {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-area: time;
		align-items: center;

	}

	.status {
		grid-area: status;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.status-label {
			background-color: ${PRIMARY_VARIANT};
			color: ${PRIMARY_COLOR};
			padding: 4pt 16pt;
			border-radius: 4pt;
			text-align:center;
		}

		.video-call {
			background-color: ${(props) => props.is_booked ? PRIMARY_VARIANT: LIGHT_GREY};
			padding: 8pt;
			cursor: pointer;
			border-radius: 50%;
			display: flex;
			align-items: center; justify-content: center;
			position: relative;

			.link-toast {
				position: absolute;
				background-color: white;
				border: 1pt solid ${LIGHT_GREY};
				padding: 4pt;
				border-radius: 4pt;
				box-shadow: 2pt 2pt 4pt ${SHADOW_COLOR};
				top: 100%;
				left: 100%;
				display: none;
				font-size: 0.8em;
			}
			svg {
				fill: ${(props) => props.is_booked ? "inherit" : "grey"};
			}
		}

		.video-call:hover {
			.link-toast {
				display: block;
			}
		}
		
		${(props) => {
			if(props.is_booked) {

				return css`
					.video-call:hover {
						svg {
							fill: ${PRIMARY_COLOR};
						}
					}
				`;
			}
		}}
	}
`;

export const CreateAppointmentDialogContainer = styled.div`
	height: calc(100vh - 40pt); width: 100%;
	background-color: #00000023;
	top: 40pt;
	left: 0;
	position: absolute;
	z-index: 3;

	display: flex; 
	align-items: center; justify-content: center;

	.dialog-content {
		background-color: ${SURFACE};
		min-height: 60%; width: fit-content;
		border-radius: 8pt;
		padding: 16pt;

		display: grid;
		grid-template-rows: 1fr 1fr 32pt;
		grid-template-columns: 150pt 150pt 150pt 150pt;

		grid-template-areas: 
		"calendar calendar desc desc"
		"calendar calendar transaction transaction"
		"calendar calendar action action";

		.react-calendar {
			grid-area: calendar;
		}

		.payment {
			grid-area: transaction;
			display: flex;
			flex-direction: column;

			span {
				display: block;
				margin-bottom: 8pt;
			}
		}

		.desc {
			grid-area: desc;
			padding: 8pt;

			h4 {
				font-weight: 500;
			}

			.time {
				display: grid;
				grid-template-columns: 1fr 1fr;
				column-gap: 4pt;
			}
		}

		.action {
			grid-area: action;
			display: flex;
			align-items: center; justify-content: space-between;
			padding: 4pt;
		}
	}
`;


export const AvailableAppointmentsContainer = styled.div`
	display: flex;
	min-height: 50vh;
	width: 100%;
	padding: 8pt;
	flex-wrap: wrap;
`;

type AvailableAppointmentsContainerProps = {
	is_booked: boolean;
}

export const AvailableAppointmentCardContainer = styled.div<AvailableAppointmentsContainerProps>`
	border: 1pt solid ${(props) => props.is_booked ? PRIMARY_COLOR : LIGHT_GREY};
	height: 248pt;
	width: 248pt;
	padding: 16pt;
	border-radius: 8pt;
	margin: 4pt;
	background-color: ${SURFACE};
	transition: all .4s ease;

	display: grid;
	grid-template-columns: 32pt 1fr 1fr 48pt;
	grid-template-rows: 32pt 1fr 48pt 48pt;
	row-gap: 16pt;
	column-gap: 4pt;

	grid-template-areas: 
		"avatar name name name"
		"date date time time"
		"meeting meeting meeting meeting"
		"pick pick pick action";

	&:hover {
		box-shadow: 2pt 2pt 4pt ${SHADOW_COLOR};
	}
	.avatar {
		grid-area: avatar;
		background-color: grey;
		height: 24pt;
		width: 24t;
		border-radius: 50%;
		align-self: center; justify-self: center;
	}

	.link {
		grid-area: meeting;
	}

	.name {
		grid-area: name;
		align-self: center; justify-self: flex-start;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		padding: 0 16pt;
	}

	.time {
		grid-area: time;
	}

	.date {
		grid-area: date;
		font-size: unset !important;
	}

	.date, time {
		font-size: 0.9em;
	}

	.status {
		grid-area: pick;
		background-color: ${PRIMARY_VARIANT};
		color: ${PRIMARY_COLOR};
		padding: 4pt 16pt;
		border-radius: 4pt;
		text-align:center;
		margin: 4pt;
		height: 32pt;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.confirm {
		grid-area: action;
		display:flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		border-radius: 50%;
		border: 1pt solid ${PRIMARY_VARIANT};
		transition: box-shadow .4s ease;
		margin: 4pt;
		${(props) => props.is_booked ? `background-color: ${PRIMARY_COLOR}`: ""};

		svg {
			${(props) => props.is_booked ? `fill: ${SURFACE}` : ""};
		}
	}

	.confirm:hover { 
		box-shadow: 0 0 8pt ${SHADOW_COLOR};
	}
`;


export const CreatePostComponentContainer = styled.div`
	position: absolute;
	height: 100%;
	width: 100%;
	background-color: #00000033;
	z-index: 3;
	top: 0;
	left: 0;
	
	display: flex;
	align-items: center;
	justify-content: center;
	
	form {
		height: 50%;
		width: 50%;
		background-color: white;
		padding: 8pt;
		border-radius: 8pt;

		display: grid;
		grid-template-columns: 1fr 100pt 100pt;
		grid-template-rows: 32pt 54pt  100pt 32pt;

		row-gap: 4pt;
		column-gap: 4pt;

		grid-template-areas:
			"header		header		header"
			"title		title		title"
			"content	content content"
			"space		cancel	post";

		h3 {
			grid-area: header;
			text-align: center;
			font-weight: 500;
			color: ${PRIMARY_COLOR}
		}

		.title {
			grid-area: title;
		 }

		 .content {
			 grid-area: content;
			 font: inherit;
			 width: 100%;
		 }

			button:first-child {
				grid-area: cancel;
		 }

			button:nth-child(2) {
				grid-area: post;
		 }
	}
`;


export const CreateNewCommunityContainer = styled.div`
	position: fixed;
	top: 0;
	height: 100vh;
	width: 100%;
	background-color: #0000003f;
	z-index: 3;
	display: flex;
	align-items: center;
	justify-content: center;

	div:first-child {
		height: 36%;
		width: 30%;
		background-color: white;
		padding: 16pt;
		border-radius: 8pt;

		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr 32pt;
		column-gap: 8pt;
		grid-template-areas: 
			"header header"
			"name name"
			"cancel accept"
			;

		.create {
			grid-area: name;
		}

		h4 {
			grid-area: header;
			text-align: center;
			font-weight: 500;
			font-size: 1.2em;
			color: ${PRIMARY_COLOR};
		}

		.main {
			grid-area: accept;
		}

		.cancel {
			grid-area: cancel;
		}
	}
`;

export const ConfirmationDialogContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center; justify-content: center;
	height: 100vh;
	width: 100vw;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 10;
	background-color: #00000033;

	.dialog-content {
		height: 300pt !important;
		width: 300pt !important;
		background-color: white;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: unset;

		div {
			height: 100pt;
			width: 100pt;
			background-color: ${PRIMARY_COLOR};
			display: flex;
			align-items: center; justify-content: center;
			border-radius: 50%;
			margin-bottom: 50pt;

			svg {
				height: 32pt;
				width: 32pt;
				fill: white;
			}
		}
	}
`;
