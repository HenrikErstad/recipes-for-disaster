export function parseMarkdown(markdown) {
  // replace headings with h1-h6
  markdown = markdown.replaceAll(/^\n?# (.*)\n?$/gm, "<h1>$1</h1>");
  markdown = markdown.replaceAll(/^\n?## (.*)\n?$/gm, "<h2>$1</h2>");
  markdown = markdown.replaceAll(/^\n?### (.*)\n?$/gm, "<h3>$1</h3>");

  // convert list items to tags
  markdown = markdown.replaceAll(/^- (.*)$/gm, "<li>$1</li>");

  // surround list items with ul tags
    markdown = markdown.replaceAll(/(<li>.*?<\/li>)(?!\n<li>)/gs, "<ul>$1</ul>");

  // replace all newlines preceded by a double whitespace with <br>
  markdown = markdown.replaceAll(/\s\s\n/gm, "<br />");

  // assume all remaining lines containing text are paragraphs
  markdown = markdown.replaceAll(/^(?!\n)[\n]?([^\n<]+)/gm, "<p>$1</p>");
  // ^[\n]?([^\n<]*(?=\n))

  return markdown;
}
