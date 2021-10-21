import styled from 'styled-components';
import { SURFACE } from './theme';
import SmilePhoto from '../../assets/smile.jpg';

export const LoginPageContainer = styled.div`
	height: calc(100vh - 45pt);
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	form {
		background-color: ${SURFACE};
		padding: 16pt;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 30%;

		h3 {
			text-align: center;
			font-weight: 500;
		}

		button {
			width: 90%;
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
		grid-template-rows: 45pt 1fr;
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
