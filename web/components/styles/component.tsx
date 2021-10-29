import styled, { css } from 'styled-components';

import {
	BACKGROUND, 
	BACKGROUND_ALT, 
	LIGHT_FONT, 
	LIGHT_GREY, 
	PRIMARY_COLOR, 
	SECONDARY_COLOR, 
	SHADOW_COLOR, 
	SURFACE,
	ERROR
	} from './theme';

export const LayoutContainer = styled.div`
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${BACKGROUND};

  .dimmed-text {
    margin: 0;
    font-size: 0.9em;
    color: ${LIGHT_FONT};
  }

  .section-title {
    display: flex;
    justify-content: space-between;
  }

	.big-sub-title {
		font-size: 2em;

		span {
			color: ${PRIMARY_COLOR};
		}
	}

`;


type TopNavigationContainerProps =  {
	show_url: boolean;
}

export const TopNavigationContainer = styled.header<TopNavigationContainerProps>`
  position: sticky;
  top: 0;
  width: 100%;
  height: 45pt;
  padding: 0pt 12pt;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  background-color: ${SURFACE};
  border-bottom: 1pt solid ${LIGHT_GREY};
  z-index: 2;

	.color-text {
		color: ${PRIMARY_COLOR};
	}

  ul {
    justify-self: flex-end;
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    li {
      padding: 8pt;
      margin-right: 8pt;
			position: relative;
      display: flex;
      align-items: center;
      flex-direction: column;
      a {
        color: inherit;
        text-decoration: none;
      }

			a:hover {
				color: ${PRIMARY_COLOR};
			}
    }
  }

	.avatar {
		height: 32pt;
		width: 32pt;
		background-color: ${PRIMARY_COLOR};
		border-radius: 50%;
		position: relative;
		cursor: pointer;
    display: flex;
     
    align-items: center;
    justify-content: center;

    svg {
      fill: white;
    }
	}

	.avatar:hover {
		box-shadow: 2pt 2pt 8pt ${SHADOW_COLOR};
	}

	.account-menu {
		position: absolute;
		width: 160pt;
		background-color: white;
		border: 1pt solid ${LIGHT_GREY};
		box-shadow: 2pt 2pt 8pt ${SHADOW_COLOR};
		padding: 4pt;
		border-radius: 4pt;
		left: -300%;
    top: 100%;
		${(props) => props.show_url ? "display: flex" : "display: none"};
		flex-direction: column;
	}

	a {
		padding: 8pt 8pt;
		text-align: center;
	}
`;

const common_styles = css`
  border: none;
  padding: 10pt 30pt;
  font: inherit;
  cursor: pointer;
  border-radius: 4pt;
  transition: box-shadow .4s ease;
`;

const button_hover_styles = css`
  box-shadow: 2pt 2pt 8pt ${SHADOW_COLOR};
`;

type PrimaryButtonProps = {
	disable?: boolean;
}

export const PrimaryButton = styled.button<PrimaryButtonProps>`
  ${common_styles}
  background-color: ${PRIMARY_COLOR};
  color: ${SURFACE};

  ${(props) => {
    if(props.disable)
    return css`
      background-color: ${LIGHT_GREY};
      pointer-events: none;
    `;
  }}
  &:hover {
    ${button_hover_styles}
  }
`;

export const SecondaryButton = styled.button`
  ${common_styles}
  background: none;
  background-color: ${SURFACE};
  color: ${PRIMARY_COLOR};
  border: 1pt solid ${PRIMARY_COLOR};

  &:hover {
    ${button_hover_styles}
  }
`;

export const InputWithActionContainer = styled.button`
  display: grid;
  grid-template-columns: 1fr 100pt;
  padding: 0;
  margin: 0;
  border-radius: 20pt;
  overflow: hidden;
  width: 400pt;
  background-color: ${SURFACE};
  border: none;
  
  input {
    padding: 8pt 16pt;
    margin: 0;
    border: none;
    background: none;
  }

  button {
    border-radius: 20pt;
  }
`;

export const TextFieldContainer = styled.span`
  padding: 4pt;
  display: flex;
  flex-direction: column;
  margin-bottom: 4pt;
  width: 95%;
  box-sizing: border-box;

  input {
    font: inherit;
    padding: 12pt 8pt;
    border: 1pt solid ${LIGHT_GREY};
		border-radius: 2pt;
		width: 100%;
  }

  p {
    font-size: 0.9em;
		font-weight: 500;
    margin: 0;
    margin-bottom: 2pt;
    color: ${LIGHT_FONT};
  }

	.error {
		color: ${ERROR};
		margin-top: 4pt;
		font-size: 0.8em;
	}
    
`;



export const AccessDeniedPageContainer = styled.main`
	height: 100vh;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;

	span {
		font-size: 1.8em;
	}
`;


