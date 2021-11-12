import styled from 'styled-components';
import { ERROR, LIGHT_FONT, PRIMARY_COLOR, SHADOW_COLOR, SURFACE } from './theme';
import SmilePhoto from '../../assets/smile.jpg';

export const LoginPageContainer = styled.div`
	height: 100vh;
	width: 100%;
	display: grid;
	grid-template-columns: 30% 1fr;
	background-image: url("/bridge.jpg");
	background-color: #000000af;
	background-size: cover;
	background-blend-mode: darken;
	transition: all .4s ease;

	.title {
		color: ${SURFACE};
		margin: 0;
		margin-bottom: 4pt;
		align-self: center;
		justify-self: center;
		font-size: 3em;
		text-align: center;
		font-family: 'Playfair Display SC',serif
	}

	form {
		background-color: ${SURFACE};
		padding: 16pt;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		box-shadow: 4pt 4pt 8pt ${SHADOW_COLOR};
		transition: all .4s ease;
		box-sizing: border-box;


		h4, .title {
			text-align: center;
			font-weight: 500;
		}

		button {
			width: 90%;
		}

		.error_message {
			color: ${ERROR};
		}
	}
`;


export const SignUpContainer = styled.div`
	display:grid;
	grid-template-columns: .4fr 1fr;
	height: calc(100vh);
	width: 100%;

	.title {
		background-color: green;
		display: grid;
		grid-template-rows: 40pt 1fr;
		background-color: #0000008f;
		background-image: url(/smile.jpg);
		background-size: cover;
		background-position: center;

		background-blend-mode: multiply;

		color: white;
		justify-content: center;
		align-items: center;
		padding: 8pt;

		h2 {
			text-align: center;
			font-weight: normal;
		}

		p {
			font-size: 1.4em;
			font-weight: normal;
			width: 80%;
			text-align: center;
			position: relative;
			top: -20%;
		}
	}

	form {
		box-sizing: border-box;
		padding: 80pt 100pt;

		.double-fields-container {
			display: grid;
			grid-template-columns: 1fr 1fr;
			column-gap: 4pt;
			margin-bottom: 8pt;
		}

		h1 {
			font-weight: 500;	
			font-weight: 1.3em;
			margin-bottom: 32pt;
		}
	}
`;
