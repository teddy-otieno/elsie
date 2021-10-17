import styled, { css } from 'styled-components';

import {BACKGROUND, BACKGROUND_ALT, LIGHT_FONT, LIGHT_GREY, PRIMARY_COLOR, SECONDARY_COLOR, SHADOW_COLOR, SURFACE} from './theme';

export const LayoutContainer = styled.div`
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${BACKGROUND_ALT};

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

export const TopNavigationContainer = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  height: 45pt;
  padding: 0pt 12pt;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  background-color: ${SURFACE};
  border-bottom: 1pt solid ${LIGHT_GREY};
  z-index: 2;


  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    li {
      width: 64pt;
      padding: 8pt;
      margin-right: 8pt;
      a {
        color: inherit;
        text-decoration: none;
      }

      &:hover {
        a {
          color: ${PRIMARY_COLOR};
        }
      }
    }
  }
`;

const common_styles = css`
  border: none;
  padding: 12pt 20pt;
  font: inherit;
  cursor: pointer;
  border-radius: 8pt;
  transition: box-shadow .4s ease;
`;

const button_hover_styles = css`
  box-shadow: 2pt 2pt 16pt ${PRIMARY_COLOR};
`;

export const PrimaryButton = styled.button`
  ${common_styles}
  background-color: ${PRIMARY_COLOR};
  color: ${SURFACE};

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
  width: 100%;

  input {
    font: inherit;
    padding: 8pt;
    border: 1pt solid ${LIGHT_GREY};
  }

  p {
    font-size: 0.8em;
    margin: 0;
    margin-bottom: 2pt;
    color: ${LIGHT_FONT};
  }
    
`;
