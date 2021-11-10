import axios from 'axios';
import { GetServerSideProps } from 'next';
import { withRouter } from 'next/router';
import React from 'react'
import styled from 'styled-components';
import { DashboardLayout } from '../../components/dashboard';
import { LIGHT_GREY } from '../../components/styles/theme';
import { AccessDeniedPage, SERVER_URL } from '../../utils';
import { CounsellorPageProps } from './appointment';
import { DashCardContainer } from '../../components/styles/psychiatrist';
import { Psychiatrist } from '../patient';

export type Blog = {
	id?: number
	title: string
	subtitle: string
	content: string
	views: string
	author: Psychiatrist
	created_on: string
}

type BlogContentState = {
	blogs: Blog[]
}

type BlogContentProps = {
	token: string
	router: any
}

class BlogPostPageContent extends React.Component<BlogContentProps,BlogContentState> {

	constructor(props: BlogContentProps) {
		super(props)

		this.state = {
			blogs: []
		}
	}
	load_blogs = async () => {
		try {
			let config = {
				headers: {
					Authorization: `Bearer ${this.props.token}`
				}
			}

			let response = await axios.get<Blog[]>(`${SERVER_URL}/api/psychiatrist/blog-posts`, config)

			this.setState({...this.state, blogs: response.data})
		} catch(e) {
			console.log(e)
		}
	}

	componentDidMount() {
		this.load_blogs()
	}

	render() {

		let blog_cards = this.state.blogs.map((val: Blog, i: number) => {
			return <BlogCard key={i} blog={val} on_click={(blog: Blog) => this.props.router.push(`/blog/${blog.id}`)}/>
		})
		return <BlogContentStyles>
			{blog_cards}
		</BlogContentStyles>
	}
}

type BlogCardProps = {
	blog: Blog
	on_click: (blog: Blog) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({blog, on_click}) => {
	return <BlogCardStyles onClick={() => on_click(blog)}>
		<h4>{blog.title}</h4>
		<div className="labeled-text">
			<span>Views</span>
			<span>{blog.views}</span>
		</div>
	</BlogCardStyles>
}
interface BlogPostPageProps extends CounsellorPageProps {
	router: any
}
class BlogPostPage extends React.Component<BlogPostPageProps> {

	render () {
		if(this.props.is_valid) {
			return <DashboardLayout
				center={<BlogPostPageContent router={this.props.router} token={this.props.token}/>} 
				title="More"
				prefix="counsellor"
				primary_action={() => {this.props.router.push('/blog/new-post/')}}
				primary_action_label="New Blog"
				/>
		} else {
			return <AccessDeniedPage />
		}
	}
}

export default withRouter(BlogPostPage)

export const getServerSideProps: GetServerSideProps = async (context) => {
	let auth_token = context.req.cookies['token'];

	let config = {
		headers: {
			Authorization: `Bearer ${auth_token}`
		}
	};

	try {
		let response = await axios.get<CounsellorPageProps>(`${SERVER_URL}/api/auth/is_auth/`, config);

		return { props: {psychiatrist: response.data, token: auth_token, is_valid: response.data["is_whom"] === "psychiatrist"} };

	} catch(e) {
		console.log(e);
		context.res.writeHead(302, {"Location": `/`}).end("body");

		return {
			props: {}
		}
	}
}



/// ------------------------------------------- Styles -----------------------------------------------


const BlogContentStyles = styled.div`
	display: flex;
	height: 100%;
	width: 100%;
	padding: 16pt;
	flex-wrap: wrap;
	justify-content: flex-start;
	box-sizing: border-box;
`;

const BlogCardStyles = styled(DashCardContainer)`
	width: 200pt;
	height: 100pt !important;
	min-height: 0pt;
	border: 1pt solid ${LIGHT_GREY};
	border-radius: 8pt;	
	cursor: pointer;
`;