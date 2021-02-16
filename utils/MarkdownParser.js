const MarkdownIt = require('markdown-it');
export const mdToHTML = (data) => {
    const md = new MarkdownIt();
    return md.render(data)
}