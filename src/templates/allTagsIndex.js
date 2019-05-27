import React from "react";
import {Link} from "gatsby";

const AllTagsTemplate = ({pageContext}) => {
	const {tags} = pageContext;

	return (
		<div style={{fontFamily: "avenir"}}>
			<div>
				<ul>
					{tags.map((tagName, index) => {
						return (
							<li key={index}> {/* eslint-disable-line react/no-array-index-key */}
								<Link to={`/tags/${tagName}`}>
									{tagName}
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

export default AllTagsTemplate;
