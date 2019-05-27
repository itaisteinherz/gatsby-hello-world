module.exports = {
	siteMetadata: {
		title: "netoani.com",
		description: "Itai Steinherz's personal website"
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
