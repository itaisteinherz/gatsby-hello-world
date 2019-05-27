import React from "react";
import {Link} from "gatsby";

const SingleTagTemplate = ({pageContext}) => {
	const {posts, tagName} = pageContext;

	return (
		<div style={{fontFamily: "avenir"}}>
			<div>
				Posts about {tagName}
			</div>
			<div>
				<ul>
					{posts.map((post, index) => {
						return (
							<li key={index}> {/* eslint-disable-line react/no-array-index-key */}
								<Link to={post.frontmatter.path}>
									{post.frontmatter.title}
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

export default SingleTagTemplate;
