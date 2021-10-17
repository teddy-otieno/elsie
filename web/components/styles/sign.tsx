import styled from 'styled-components';
import { SURFACE } from './theme';

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

