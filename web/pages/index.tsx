import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image';
import {useRouter} from 'next/router';
import Layout, {InputWithAction, TopNavigation} from '../components/layout';
import { 
  HomePageLayout, 
  IntroPage, 
  ListCardContainer, 
  WhyChooseUspage, 
  BestCounselorPage, 
  CounsellorCardContainer, 
  FeedbackPage, 
  FeebackCardContainer,
  NewsletterSection
 } from '../components/styles';
import { PrimaryButton, SecondaryButton } from '../components/styles/component';
import OasisImage from '../assets/oasis.jpg';
import Psychiatris1 from '../assets/psychatrist_1.jpg';
import SampleUserImage from "../assets/user.jpg";

const Home: NextPage = () => {

  const router = useRouter();
  let reasons = reasons_list.map((value: ListCardProps, index: number) => {
    return <ListCard key={index} {...value} />
  });

  return (
    <div>
      <Head>
        <title>Elsie</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <TopNavigation/>
        <HomePageLayout>
          <IntroPage>
            <aside>
              <h1>Elsie Interactive Mental Health Online Care</h1>
              <div className="actions">
                <PrimaryButton onClick={(e) => {e.preventDefault(); router.push("/sign_up");} }>Book Now</PrimaryButton>
              </div>
            </aside>
            <section>
              <Image className="image" src={OasisImage} alt="Oasis Logo" width={500} height={500}/>
            </section>
          </IntroPage>
        </HomePageLayout>
        <WhyChooseUspage>
          <div className="section-header">
            <h1 className="big-sub-title">Why Choose Us?</h1>
            <p className="dimmed-text">Allows you to get secure and private online counselling via your own smartphone or tablet</p>
          </div>
          <div className="content">
            <div className="left">
              {reasons}
            </div>
            <div className="right">
              <Image height={500} width={700} className="" alt="Sample Image" src={SampleUserImage}/>
            </div>
          </div>
        </WhyChooseUspage>
        <BestCounselorPage>
          <div className="section-title">
            <span>
              <h1 className="big-sub-title">Best Councellor</h1>
              <p className="dimmed-text">All our cuncellors have minimum qualificaton of Masters in Psychology of Psychiatry</p>
            </span>
            <span>
              <SecondaryButton>See all</SecondaryButton>
            </span>
          </div>
          <div className="content">
            <CounselorCard name="Dr. Jame Wachira" />
            <CounselorCard name="Dr. Wambui Anastacia"/>
            <CounselorCard name="Dr. Sylvia"/>
          </div>
        </BestCounselorPage>
{/*        <FeedbackPage>
          <div className="section-title">
            <h1 className="big-sub-title">What do <span>people</span> think of us?</h1>
          </div> 
          <div className="content">
            <FeedbackCard/>
            <FeedbackCard/>
          </div>
        </FeedbackPage> */}
        <NewsletterSection>
          <h1 className="big-sub-title">Hi, how can we <span>help you?</span></h1>
          <p>Please fill in the start from beside your privacy and confidentiality are safe under the protection of Psychologoical Code of Ethics</p>
		  <InputWithAction value={""} set_value={() => {

		  }}/>
        </NewsletterSection>
      </Layout>
    </div>
  )
}

export default Home;


type ListCardProps = {
  icon: any,
  title: string,
  text: string
}

const ListCard: React.FC<ListCardProps> = ({icon, title, text} : ListCardProps) => {
  return(
    <ListCardContainer>
      <span className="icon">{icon}</span>
      <span className="label">
        <h4>{title}</h4>
        <p className="dimmed-text">{text}</p>
		<p>{title}</p>
      </span>
    </ListCardContainer>
  )
}

const SecurityIcon = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11.19 1.36l-7 3.11C3.47 4.79 3 5.51 3 6.3V11c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6.3c0-.79-.47-1.51-1.19-1.83l-7-3.11c-.51-.23-1.11-.23-1.62 0zm-1.9 14.93L6.7 13.7c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L10 14.17l5.88-5.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-6.59 6.59c-.38.39-1.02.39-1.41 0z"/></svg>
const HeartIcon = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M13.35 20.13c-.76.69-1.93.69-2.69-.01l-.11-.1C5.3 15.27 1.87 12.16 2 8.28c.06-1.7.93-3.33 2.34-4.29 2.64-1.8 5.9-.96 7.66 1.1 1.76-2.06 5.02-2.91 7.66-1.1 1.41.96 2.28 2.59 2.34 4.29.14 3.88-3.3 6.99-8.55 11.76l-.1.09z"/></svg>
const Calendar = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M17 10H7v2h10v-2zm2-7h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zm-5-5H7v2h7v-2z"/></svg>
const People = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>;


const reasons_list: Array<ListCardProps> = [
  {
    icon: SecurityIcon, 
    title: "Confidentiality", 
    text: "Allows you to get secure and private online counselling via your own smartphone or tablet."
  },
  {
    icon: HeartIcon, 
    title: "Comfortable to use", 
    text: "No need to make an appointment or go to the counsellor office in advance"
  },
  {
    icon: Calendar, 
    title: "Flexible", 
    text: "Flexibe consultation time make it easy for you to spend time."
  },
  {
    icon: People,
    title: "Community",
    text: "We have help groups you can join and be a part of and you can share you journey with others as you help each other"
  }
]

type CounsellorCardProps = {
	name: string;
}

const CounselorCard: React.FC<CounsellorCardProps> = ({ name }) => {
  return (
    <CounsellorCardContainer>
      <Image src={Psychiatris1} width={300} height={300} alt="doctor"/>
      <p>{name}</p>
    </CounsellorCardContainer>
  )
}

const FeedbackCard: React.FC = () => {
  return (
     <FeebackCardContainer>
      <span className="quotation-icon">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/></svg>

      </span>
      <span>
        <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h4>
        <p className="dimmed-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet consectetur adipiscing elit duis tristique sollicitudin. Id diam vel quam elementum pulvinar etiam non. Orci sagittis eu volutpat odio facilisis mauris sit.</p>
      </span>
      <span className="content-author">
        <Image src={SampleUserImage} height={40} width={40} alt="Content Author" />
        <span>
          <h5>Name</h5>
          <p className="dimmed-text">Patient</p>
        </span>
      </span>
     </FeebackCardContainer>
  )
}
