import axios from 'axios';
import React from 'react'
import styled from 'styled-components'
import { GetServerSideProps } from 'next';
import { TopNavigation } from '../../components/layout';
import { SERVER_URL } from '../../utils';
import { Blog } from '../counsellor/blogposts';
import { DashCardContainer } from '../../components/styles/psychiatrist';
import { withRouter } from 'next/router';
import { Icons , PRIMARY_COLOR, BACKGROUND_ALT, LIGHT_FONT} from '../../components/styles/theme';

type BlogCardProps = {
	blog: Blog
	on_click: (blog: Blog) => void
}
const BlogCardComponent: React.FC<BlogCardProps> = ({blog, on_click}) => {

	let created_date = new Date(blog.created_on)

	return <BlogCard onClick={() => on_click(blog)}>
		<div className="author">
			<div className="avatar">{Icons.ACCOUNT}</div>
			<p className='name'>{`${blog.author.user.f_name} ${blog.author.user.l_name}`}</p>
		</div>
		<span className="title">{blog.title}</span>
		<span className="other">*{created_date.toDateString()}</span>
		<div className="image">
			{Icons.NOTES}
		</div>
	</BlogCard>
}

type BlogViewProps = {
	blogs: []
	router: any
}

class BlogView extends React.Component<BlogViewProps> {

	render() {

		let blog_items = this.props.blogs.map((val: Blog, i: number) => {
			return <BlogCardComponent 
				key={i} 
				blog={val}
				on_click={(blog: Blog) => {this.props.router.push(`/blog/${blog.id}`)}}
			/>
		})
		return <BlogPostViewStyles>
			<TopNavigation />
			<BlogContent>
				<h4>New posts</h4>
				{blog_items}
			</BlogContent>
		</BlogPostViewStyles>;
	}
}

export default withRouter(BlogView)

export const getServerSideProps: GetServerSideProps = async (context) => {

	try {
		let response = await axios.get<Blog[]>(`${SERVER_URL}/api/psychiatrist/public-blogs/`);

		return { props: {blogs: response.data} };

	} catch(e) {
		console.log(e);
		return {
			props: {}
		}
	}
}

///-------------------------- Styles --------------------------------------
const BlogPostViewStyles = styled.div`
	background-color: ${BACKGROUND_ALT};
`;

const BlogContent =styled.div`
	display: flex;
	flex-direction: column;
	padding: 16pt;
	width: 60%;
	margin: auto;
`

const BlogCard = styled(DashCardContainer)`
	height: 100pt;
	width: 70%;
	min-height: unset;
	display: grid;
	grid-template-columns: 1fr 64pt;
	grid-template-rows: 16pt 1fr 16pt;
	grid-template-areas: 
		"author image"
		"title image"
		"other image";
	cursor: pointer;
	margin-bottom: 8pt;
	row-gap: 8pt;

	.title {
		grid-area: title;
	}

	.author {
		grid-area: author;
	}

	.other {
		grid-area: other;
		font-size: 0.8em;
		color: ${LIGHT_FONT};
	}
	.author, .other {
		font-size: .8em;
		p {
			margin: 0;
		}
	}
	
	.author {

			display: grid;
			height: 32pt;
			grid-template-columns: 32pt 1fr;
			grid-template-rows: 1fr 1fr;
			column-gap: 8pt;
			row-gap: 8pt;
			grid-template-areas: 
			"image name"
			"image content";

			.avatar {
				height: 80%;
				width: 80%;
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
	}
	.image {
		height: 64pt;
		width: 64pt;
		grid-area: image;
		background-color: ${PRIMARY_COLOR};
		border-radius: 8pt;
		display: flex;
		align-items: center; justify-content: center;
		align-self:center;

		svg {
			fill: white;
		}
	}
`;