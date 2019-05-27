const path = require("path");

const createTagPages = (createPage, posts) => {
	const allTagsIndexTemplate = path.resolve("src/templates/allTagsIndex.js");
	const singleTagIndexTemplate = path.resolve("src/templates/singleTagIndex.js");

	const postsByTag = {};

	posts.forEach(({node}) => {
		if (node.frontmatter.tags) {
			node.frontmatter.tags.forEach(tag => {
				if (!postsByTag[tag]) {
					postsByTag[tag] = [];
				}

				postsByTag[tag].push(node);
			});
		}
	});

	const tags = Object.keys(postsByTag);

	createPage({
		path: "/tags",
		component: allTagsIndexTemplate,
		context: {
			tags: tags.sort()
		}
	});

	tags.forEach(tagName => {
		const posts = postsByTag[tagName];

		createPage({
			path: `/tags/${tagName}`,
			component: singleTagIndexTemplate,
			context: {
				posts,
				tagName
			}
		});
	});
};

exports.createPages = ({actions, graphql}) => {
	const {createPage} = actions;

	const blogPostTemplate = path.resolve("src/templates/blogPost.js");

	return graphql(`
		query {
			allMarkdownRemark (
				sort: {order: ASC, fields: [frontmatter___date]}
			) {
				edges {
					node {
						frontmatter {
							path
							title
							tags
						}
					}
				}
			}
		}
	`).then(result => { // eslint-disable-line promise/prefer-await-to-then
		if (result.errors) {
			return Promise.reject(result.errors);
		}

		const posts = result.data.allMarkdownRemark.edges;

		createTagPages(createPage, posts);

		posts.forEach(({node}, index) => {
			const nodePath = node.frontmatter.path;

			createPage({
				path: nodePath,
				component: blogPostTemplate,
				context: {
					pathSlug: nodePath,
					prev: index === 0 ? null : posts[index - 1].node,
					next: index === posts.length - 1 ? null : posts[index + 1].node
				}
			});
		});
	});
};
