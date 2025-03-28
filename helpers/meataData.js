import dotenv from 'dotenv';
dotenv.config();

// titel, description, keywords, author, type, image_url, page_url, twiter_summary

const setMetaData = (titel, description, keywords, author, type, image_url, page_url, twiter_summary) => {
    const defaultMeta = {
        title: "URL Shortener - Free and Fast URL Shortening Service",
        description: "Easily shorten your URLs for better sharing, tracking, and improved user experience. Our free URL shortening service helps you create concise, branded links for all your digital content, improving engagement and accessibility.",
        keywords: "URL shortener, link shortener, free URL shortening, short links, create short links, custom URL, branded URLs, link management, URL tracking, shorten links for sharing, fast URL shortener, online URL shortener",
        author: "Md. Asraful Alom",
        type: "website",
        image_url: `${process.env.SITE_URL}/logo.jpeg`,
        page_url: `${process.env.SITE_URL}`,
        twitter_summary: "Shorten URLs quickly and efficiently with our free URL Shortener. Perfect for sharing and tracking your links with ease."
    }

    return {
        titel: titel ?? defaultMeta.title,
        description: description ?? defaultMeta.description,
        keywords: keywords ?? defaultMeta.keywords,
        author: author ?? defaultMeta.author,
        type: type ?? defaultMeta.type,
        image_url: image_url ?? defaultMeta.image_url,
        page_url: page_url ?? defaultMeta.page_url,
        twiter_summary: twiter_summary ?? defaultMeta.twitter_summary
    }
};