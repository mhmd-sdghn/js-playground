module.exports = {
    siteMetadata: {
        siteUrl: "https://www.yourdomain.tld",
        title: "My Gatsby Site",
    },
    plugins: [
        "gatsby-plugin-image",
        "gatsby-plugin-react-helmet",
        "gatsby-plugin-sitemap",
        "gatsby-theme-material-ui",
        "gatsby-plugin-typescript",
        {
            resolve: "gatsby-plugin-manifest",
            options: {
                icon: "src/statics/images/icon.png",
            },
        },
        "gatsby-plugin-sharp",
        "gatsby-transformer-sharp",
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "images",
                path: "src/statics/images/icon.png",
            },
            __key: "images",
        },
    ],
};
