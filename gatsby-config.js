module.exports = {
	siteMetadata: {
		title: "gatsby-hello-world",
		description: "Gatsby hello world blog"
	},
	plugins: [
		"gatsby-transformer-remark",
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "pages",
				path: `${__dirname}/src/pages`
			}
		}
	]
};
