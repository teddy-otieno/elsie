import { GetServerSideProps } from 'next';
import React from 'react'
import axios from 'axios'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown';
import { SERVER_URL } from '../../utils';
import { Blog } from '../counsellor/blogposts';
import { TopNavigation } from '../../components/layout';
import { Icons, LIGHT_GREY, PRIMARY_COLOR } from '../../components/styles/theme';

type BlogViewProps = {
	blog: Blog
}

class BlogViewComponent extends React.Component<BlogViewProps> {

	update_view = async () => {

		try {
			let response = axios.get(`${SERVER_URL}/api/psychiatrist/blog-viewed/${this.props.blog.id}`)
		} catch(e) {
			console.log(e)
		}
	}
	componentDidMount() {
		this.update_view()
	}

	render() {
		const {blog} = this.props;
		
		console.log(this.props)

		let created_date = new Date(blog.created_on)


		return <BlogView>
			<TopNavigation />

			<div className="content">
				<div className="top">
					<h4>{blog.title}</h4>
					<h5>{blog.subtitle}</h5>
					<div className="author">
						<span className="name">{`${blog.author.user.f_name} ${blog.author.user.l_name}`}</span>
						<div className="avatar">{Icons.ACCOUNT}</div>
						<div className="other"><span>{`${created_date.toDateString()}`}</span></div>
					</div>
				</div>
				<ReactMarkdown>{this.props.blog.content}</ReactMarkdown>
			</div>
		</BlogView>
	}
}

export default BlogViewComponent

export const getServerSideProps: GetServerSideProps = async (context) => {

	try {
		let blog_id = context.query['id']
		let response = await axios.get<Blog>(`${SERVER_URL}/api/psychiatrist/public-blogs/${blog_id}`);

		return { props: {blog: response.data} };

	} catch(e) {
		console.log(e);
		return {
			props: {}
		}
	}
}

const BlogView = styled.div`
	width: 100%;
	min-height: calc(100vh - 45pt);
	.content {
		height: 100%;
		width: 60%;
		margin: auto;

		.author {
			display: grid;
			height: 32pt;
			grid-template-columns: 32pt 1fr;
			grid-template-rows: 1fr 1fr;
			column-gap: 8pt;
			grid-template-areas: 
			"image name"
			"image content";

			.avatar {
				grid-area: image;
				background-color: ${PRIMARY_COLOR};
				display: flex; align-items: center; justify-content: center;
				border-radius: 50%;
				svg {
					fill: white;
				}
			}

			.name {
				grid-area: name;
			}

			.other {
				grid-area: content;
				font-size: 0.8em;
				color: ${LIGHT_GREY};
			}
		}

		.top {
			width: 80%;
			margin: 16pt auto;
		}
		h4 {
			font-family: 'Lora', serif;
			font-size: 3em;
			font-weight: 500;
		}
	}
	@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap');
`;