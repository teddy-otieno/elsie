import axios from 'axios';
import { GetServerSideProps } from 'next';
import React from 'react'
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import styled from 'styled-components';
import { withRouter } from 'next/router';

import { DashboardLayout } from '../../components/dashboard';
import { AccessDeniedPage, SERVER_URL } from '../../utils';
import { CounsellorPageProps } from '../counsellor/appointment';
import 'react-markdown-editor-lite/lib/index.css';
import { TextField } from '../../components/layout';
import { PrimaryButton } from '../../components/styles/component';
import { Icons, LIGHT_GREY, PRIMARY_COLOR, SHADOW_COLOR, SURFACE } from '../../components/styles/theme';

type BlogPostWritePadProps = { 
	token: string
	router: any
}
type BlogPostWritePadState = {
	title: string
	blog_content: string
	show_success_dialog: boolean
}

class BlogPostWritePad extends React.Component<BlogPostWritePadProps, BlogPostWritePadState> {

	md_parser = new MarkdownIt()

	constructor(props: BlogPostWritePadProps) {
		super(props);

		this.state = {
			title: "",
			blog_content: "",
			show_success_dialog: false
		}
	}

	handle_editor_change = (data: {html: any, text: string}) => {
		this.setState({...this.state, blog_content: data.text})
	}


	submit_blog_post = async (e: any) => {
		e.preventDefault()

		const { title, blog_content } = this.state
		try {
			let config = {
				headers:  {
					Authorization: `Bearer ${this.props.token}`
				}
			}

			let data = {
				title: title,
				content: blog_content
			}

			let response = await axios.post(`${SERVER_URL}/api/psychiatrist/blog-posts/`, data, config)

			this.setState({...this.state, show_success_dialog: true});

			setTimeout(() => {
				this.props.router.back()
			}, 1000)

		} catch (e) {
			console.log(e)
		}
	}


	render() {
		const { title } = this.state;
		return <BlogWritePadStyles>
			<div className="header">
				<div>
					<h3>New Blog Post</h3>
				</div>
				<PrimaryButton className="submit" onClick={this.submit_blog_post}>Submit</PrimaryButton>
			</div>
			<div className="content">
				<TextField className="title" label="title" value={title} set_value={(val) => this.setState({...this.state, title: val})} />
				<div className="editor">
					<MdEditor renderHTML={text => this.md_parser.render(text)} onChange={this.handle_editor_change}/>
				</div>
			</div>
			{this.state.show_success_dialog  && <SuccessDialog title="Blog was created" />}
		</BlogWritePadStyles>
	}
}


type SuccessDialogProps = {
	title: string
}

const SuccessDialog: React.FC<SuccessDialogProps> = ({title}) => {
	return <SuccessDialogStyles>
		<div className="dialog">
			<div className="icon">
				{Icons.CHECK}
			</div>
			<p>{title}</p>
		</div>
	</SuccessDialogStyles>
}


interface BlogPostPageProps extends CounsellorPageProps {
	router: any
}

class BlogPostPage extends React.Component<BlogPostPageProps> {

	render () {
		if(this.props.is_valid) {
			return <BlogPostWritePad router={this.props.router} token={this.props.token} />
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


//// ------------------------------------------- Styles -----------------------------------------------


const BlogWritePadStyles = styled.div`
	.header {
		height: 50pt;
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 100pt;
		padding: 8pt;
		box-sizing: border-box;
		align-items: center;
		position: sticky;
		top: 0;
		box-shadow: 4pt 4pt 16pt ${SHADOW_COLOR};
		border-bottom: 1pt solid ${LIGHT_GREY};
		background-color: ${SURFACE};
		z-index: 2;	


		h3 {
			color: ${PRIMARY_COLOR};
			font-weight: 500;
			margin: 0;
		}
	}

	.content {
		height: calc(100vh - 53pt);
		padding: 10pt;
		width: 100%;
		margin: 0;

		display: grid;
		grid-template-rows: 64pt 1fr;
		box-sizing: border-box;

		.title {
			width: 90%;
		}

		.editor {
			width: 100%;
		}
		.rc-md-editor {
			height :100%;
		}
	}
`;

export const SuccessDialogStyles = styled.div`
	position: fixed;
	top: 0;
	height: 100vh;
	width: 100%;
	background-color: #00000043;
	z-index: 3;

	display: flex;
	align-items: center;
	justify-content: center;

	.dialog {
		height: 60%;
		width: 50%;
		background-color: white;
		border-radius: 8pt;
		display: grid;
		grid-template-rows: 1fr 32pt;
		padding: 50pt;
		box-sizing: border-box;

		p {
			text-align: center;
			font-size: 1.5em
		}
		.icon {
			height: 100pt;
			width: 100pt;
			border-radius: 50%;
			background-color: ${PRIMARY_COLOR};
			display: flex;
			align-items: center; justify-content: center;
			align-self: center;
			justify-self: center;
			svg {
				fill: ${SURFACE};
				height: 60%;
				width: 60%;
			}
		}
	}
`;