import styled from 'styled-components';
import { BACKGROUND, BACKGROUND_ALT, FONT, LIGHT_FONT, LIGHT_GREY, PRIMARY_COLOR, SHADOW_COLOR, SURFACE } from './theme';

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
export const DashboardContainer = styled.section`
	.content {
		display: grid;
		grid-template-columns: 200pt 1fr 300pt;
		min-height: calc(100vh - 45pt);
		column-gap: 100pt;
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
	padding: 8pt;
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
	margin-bottom: 4pt;

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
	grid-template-columns: 100pt 1fr;

	.commmunities {

	}

	.chat {

	}
`;

export const CommunityMemberContainer = styled.div`
	
`;
