import React from "react";
import {graphql, Link} from "gatsby";

const Template = ({data, pageContext}) => {
	const {prev, next} = pageContext;

	const {frontmatter, html} = data.markdownRemark;
	const {title} = frontmatter;

	return (
		<div>
			<h1 style={{fontFamily: "avenir"}}>{title}</h1>
			<div dangerouslySetInnerHTML={{__html: html}} // eslint-disable-line react/no-danger
				className="blogpost"
				style={{
					fontFamily: "avenir"
				}}
			/>
			<div style={{marginBottom: "1rem", fontFamily: "avenir"}}>
				{next &&
					<Link to={next.frontmatter.path}>
						Next
					</Link>
				}
			</div>
			<div style={{fontFamily: "avenir"}}>
				{prev &&
					<Link to={prev.frontmatter.path}>
						Previous
					</Link>
				}
			</div>
		</div>
	);
};

export const query = graphql`
	query($pathSlug: String!) {
		markdownRemark(frontmatter: {path: {eq: $pathSlug}}) {
			html
			frontmatter {
				title
			}
		}
	}
`;

export default Template;
