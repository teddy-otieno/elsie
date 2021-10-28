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
	grid-template-columns: 1fr 0.25fr;
	position: sticky;
	top: 0pt;
	height: 45pt;
	background-color: ${SURFACE};
	border-bottom: 1pt solid ${LIGHT_GREY};
	width: 100%;
	z-index: 2;
	box-shadow: 2pt 2pt 4pt ${SHADOW_COLOR};

	div:first-child {
		display: flex;
		align-items: center;
		padding: 0pt 4pt;
		
		h3 {
			font-weight: 500;
			color: ${PRIMARY_COLOR};
		}
	}

	div:nth-child(2) {
		display: flex;
		align-items: center;
		padding: 0pt 4pt;

		justify-content: flex-end;
		padding: 6pt 8pt;

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

	.content {
		display: grid;

		${(props) => props.show_end ? "grid-template-columns: 200pt 1fr 300pt" : "grid-template-columns: 200pt 1fr"};
		min-height: calc(100vh - 45pt);
	}
`;

export const SideNavigationContainer = styled.nav`
	display: flex;
	flex-direction: column;
	background-color: ${BACKGROUND};
	border-right: 1pt solid ${LIGHT_GREY};
	position: sticky;
	top: 45pt;
	height: calc(100vh - 45pt);

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
	height: calc(100vh - 45pt);
	top: 45pt;
	padding: 8pt 4pt;

    .events-container {
        padding: 4pt;
    }
`;

export const EventCardContainer = styled.div`
    display: flex;
    border: 1pt solid ${LIGHT_GREY};
    padding: 8pt 4pt;
    margin-bottom: 4pt;
`;

export const CommunityChatContainer  = styled.div`
	display: grid;
	grid-template-columns: 200pt 1fr;

	.communities {
		border-right: 1pt solid ${LIGHT_GREY};
		height: calc(100vh - 45pt);
	}

	.chat {
		flex-direction: column;
		background-color: #eeeeee;
		width: 100%;
		display: grid;
		grid-template-rows: 1fr 48pt;
		height: calc(100vh- 45pt);

		.prev-messages {
			padding: 8pt;
			display: flex;
			flex-direction: column-reverse;
			overflow-y: auto;
		}

		.message-input {
			display: grid;
			grid-template-columns: 1fr;
			background-color: ${PRIMARY_VARIANT};
			padding: 5pt;

			input {
				font: inherit;
				border: 1pt solid ${LIGHT_GREY};
				border-radius: 32pt;
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
	grid-template-column: 1fr 1fr;
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

		span:first-child {
			font-size: 0.7em;
			color: ${LIGHT_GREY};
			text-align: ${(props) => props.is_sender ? "right" : "left"};
		 }
	}
`;

export const CommunityCardContainer = styled.div`
	display: grid;
	grid-template-columns: 32pt 1fr;
	column-gap: 4pt;
	border-bottom: 1pt solid ${LIGHT_GREY};
	padding: 4pt;
	height 32pt;
	align-items: center;
	cursor: pointer;

	.avatar {
		background-color: ${LIGHT_GREY};
		height: 100%;
		width: 100%;
		border-radius: 50%;
	}

	&:hover {
		background-color: ${PRIMARY_VARIANT};
	}
`;

export const CommunityMemberContainer = styled.div`
	height: 100%;
	width: 100%;
	padding: 4pt;
	overflow-y: auto;

	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const AppointmentPageContainer = styled.div`
	height: 100%; width: 100%;

	h1 {
		font-weight: 500;
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

	display: grid;
	grid-template-columns: 32pt 1fr 1fr;
	grid-template-rows: 32pt 1fr 32pt;
	transition: all .4s ease;

	&:hover {
		box-shadow: 2pt 2pt 16pt ${SHADOW_COLOR};
		transform: translateY(-3pt);
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

			div:first-child {
				height: 32pt;
				width: 32pt;
				border-radius: 50%;
			}

			span {

			}
		}

		.empty {
			text-align: center;
			font-weight: 500;
			color: ${ERROR};
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

			svg {
				fill: ${(props) => props.is_booked ? "inherit" : "grey"};
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
	height: calc(100vh - 45pt); width: 100%;
	background-color: #00000023;
	top: 45pt;
	left: 0;
	position: absolute;
	z-index; 3;

	display: flex; 
	align-items: center; justify-content: center;

	.dialog-content {
		background-color: ${SURFACE};
		min-height: 60%; width: fit-content;
		border-radius: 8pt;
		padding: 16pt;

		display: grid;
		grid-template-rows: 1fr 32pt;
		grid-template-columns: 150pt 150pt 150pt 150pt;

		grid-template-areas: 
		"calendar calendar desc desc"
		"calendar calendar action action";

		.react-calendar {
			grid-area: calendar;
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
	height: 100%;
	width: 100%;
	padding: 8pt;
	flex-wrap: wrap;
`;

type AvailableAppointmentsContainerProps = {
	is_booked: boolean;
}

export const AvailableAppointmentCardContainer = styled.div<AvailableAppointmentsContainerProps>`
	border: 1pt solid ${(props) => props.is_booked ? PRIMARY_COLOR : LIGHT_GREY};
	height: 200pt;
	width: 200pt;
	padding: 16pt;
	border-radius: 8pt;
	margin: 4pt;

	display: grid;
	grid-template-columns: 32pt 1fr 1fr 48pt;
	grid-template-rows: 32pt 1fr 48pt;
	row-gap: 16pt;
	column-gap: 4pt;

	grid-template-areas: 
		"avatar name name name"
		"date date time time"
		"pick pick pick action";

	.avatar {
		grid-area: avatar;
		background-color: grey;
		height: 24pt;
		width: 24t;
		border-radius: 50%;
		align-self: center; justify-self: center;
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
		grid-template-rows: 32pt 54pt 1fr 32pt;

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

		span:first-child {
			grid-area: title;
		 }

		 textarea {
			 grid-area: content;
			 font: inherit;
		 }

			button:first-child {
				grid-area: cancel;
		 }

			button:nth-child(2) {
				grid-area: post;
		 }
	}
`;
