import styled from "styled-components";
import { BACKGROUND_ALT, LIGHT_FONT, LIGHT_GREY, PRIMARY_COLOR, PRIMARY_VARIANT, SHADOW_COLOR, SURFACE } from "./theme";

export const HomePageLayout = styled.main`
	width: 100%;
  min-height: calc(100vh - 40pt);

`;


export const IntroPage = styled.section`
  height: inherit;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  height: calc(100vh - 40pt);
  border-bottom: 1pt solid ${SHADOW_COLOR};

  aside {
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: center;
    justify-content: space-evenly;

    h1 {
      font-family:  'Playfair Display SC', serif;
      font-size: 3em;
      width: 60%;
      text-shadow: 2pt 2pt 4pt ${SHADOW_COLOR};
    }
    .actions {
      display: flex;
      justify-content: space-between;
      width: 60%;
    }

  }

  section {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    
    div {
      border-radius: 50%;
      border: 4pt solid ${SURFACE};
      box-shadow: 2pt 2pt 8pt ${SHADOW_COLOR};
    }

    div:nth-child(2) {
      transform: translate(-100pt, 50pt) scale(.8);
    }
  }
`;

export const WhyChooseUspage = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding: 50pt;
  width: 80%;

  .section-header {
    width: 50%;
    align-self: flex-start;
    font: 1.2em;


    p {
      color: ${LIGHT_FONT};
    }
  }

  .content {
    display:grid;
    grid-template-columns: .7fr 1fr;
    column-gap: 5pt;
    width: 100%;
    height: 100%;

    .left {
      height: 100%;
      padding: 16pt;
      display: flex;
      flex-direction: column;
    }

    .right {
      height: 100%;
      display: flex;
      padding: 16pt;
      align-items: flex-start;
      justify-content: center;

      div:first-child {
        border-radius: 8pt;

        img {
          object-fit: cover;
        }
      }
    }
  }
`;

export const ListCardContainer = styled.div`
  display: grid;
  height: 64pt;
  grid-template-columns: 64pt 1fr;
  align-items: center;
  justify-items: center;
  background-color: white;
  box-shadow: 4pt 8pt 12pt ${SHADOW_COLOR};
  border-radius: 8pt;
  overflow: hidden;
  margin-bottom: 10pt;
  border: 1pt solid ${LIGHT_GREY};

  span:first-child {
    background-color: #E3F2ED;
    height: 80%;
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4pt;

    svg {
      fill: ${PRIMARY_COLOR};
      height: 80%;
      width: 80%;
    }
  }

  span:nth-child(2) {
    padding: 4pt;
    display: flex;
    flex-direction: column;
    justify-self: flex-start;

    h4 {
      margin: 0;
      margin-bottom: 4pt;
      font-weight: 500;
    }

  }
`;

export const BestCounselorPage = styled.section`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: calc(100vh - 40pt);


  .content {
    display: flex;
    padding: 32pt;
  }
`;

export const CounsellorCardContainer = styled.div`
  width: 200pt;
  height: 300pt; 
  margin-right: 16pt;
  border-radius: 8pt;
  padding: 8pt 4pt;
  border: 1pt solid ${LIGHT_GREY};
  box-shadow: 4pt 4pt 16pt ${SHADOW_COLOR};
  display: grid;
  grid-template-rows: 1fr 40pt;
  justify-content: center;
  box-sizing: border-box;

  div:first-child {
    width: 100%;
    border-radius: 8pt;

    img {
      object-fit: cover;
    }
  }

  p {
    text-align: center;
  }
`;

export const FeedbackPage = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20pt 10%;
  /* height: calc(100vh - 40pt); */
  background-color: ${BACKGROUND_ALT};
  box-sizing: border-box;
  .content {
    display: flex;
    padding: 32pt;
  }
`;

export const FeebackCardContainer = styled.div`
  display: grid;
  grid-template-rows: 1pt 1fr 30pt;
  row-gap: 16pt;
  width: 360pt;
  background-color: ${SURFACE};
  margin-right: 12pt;
  border-radius: 8pt;
  padding: 16pt 16pt;
  height: fit-content;
  border: 1pt solid ${LIGHT_GREY};

  .quotation-icon {
    background-color: ${PRIMARY_COLOR};
    border-radius: 50%;
    height: 42pt;
    width: 42pt;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    top: -48pt;
    left: -8pt;
    /* box-sizing: border-box; */

    svg {
      fill: white;
    }
  }


  h4{
    margin: 0;
    margin-bottom: 4pt;
    font-weight: 500;
  }

  p {
    margin-bottom: 8pt;
    line-height: 1.5em;
  }

  .content-author {
    display: grid;
    width: 100%;
    height: fit-content;
    grid-template-columns: 50pt 1fr;
    column-gap: 8pt;

    div:first-child {
      height: 40pt;
      width: 40pt;
      border-radius: 50%;
    }

    span {
      display: flex;
      flex-direction: column;
      padding: 4pt;

      h5 {
        margin: 0;
        margin-bottom: 4pt;
      }
    }
  }
`;

export const NewsletterSection = styled.section`
  display: flex;
  flex-direction: column;
  padding: 32pt;
  align-items: center;
  background-color: ${PRIMARY_VARIANT};
  box-sizing: border-box;
  width: 100%;

  h1 {
    margin-bottom: 32pt;
  }
  p {
    width: 40%;
    font-size: 0.9em;
    margin-bottom: 32pt;
  }
`;
