const fs = require("fs");
const path = require("path");

const RECIPES_DIR = path.join(__dirname, "recipes");
const DOCS_DIR = path.join(__dirname, "docs");

function parseMarkdown(markdown) {
  markdown = markdown.replaceAll(/^\n?# (.*)\n?$/gm, "<h1>$1</h1>");
  markdown = markdown.replaceAll(/^\n?## (.*)\n?$/gm, "<h2>$1</h2>");
  markdown = markdown.replaceAll(/^\n?### (.*)\n?$/gm, "<h3>$1</h3>");
  markdown = markdown.replaceAll(/^- (.*)$/gm, "<li>$1</li>");
  markdown = markdown.replaceAll(
    /(<li>.*?<\/li>)(?!\n<li>)/gs,
    "<ul>$1</ul>"
  );
  markdown = markdown.replaceAll(/\s\s\n/gm, "<br />");
  markdown = markdown.replaceAll(/^(?!\n)[\n]?([^\n<]+)/gm, "<p>$1</p>");
  markdown = markdown.replaceAll(
    /\[([^\]]+)\]\(([^)]+)\)/gm,
    '<a href="$2" target="_blank">$1</a>'
  );
  return markdown;
}

function extractPageTitle(markdown) {
  const title = markdown.match(/# (.*)/);
  return title ? title[1] : null;
}

function htmlPage({ title, cssPath, githubIconPath, body }) {
  return `<!DOCTYPE html>
<html lang="no">
  <head>
    <title>${title}</title>
    <link rel="stylesheet" href="${cssPath}" />
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <main role="main" id="main">
${body}
    </main>
    <footer>
      <a
        href="https://github.com/HenrikErstad/recipes-for-disaster"
        aria-label="GitHub repository"
        target="_blank"
        rel="noopener"
        ><img src="${githubIconPath}" alt="A picture of the GitHub Invertocat" />Henrik Erstad</a
      >
      |
      <a
        href="https://github.com/HenrikErstad/recipes-for-disaster/blob/main/LICENSE"
        >Lisens</a
      >
    </footer>
  </body>
</html>
`;
}

function buildRecipePages() {
  const recipeDirs = fs
    .readdirSync(RECIPES_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const recipes = [];

  for (const recipeName of recipeDirs) {
    const mdPath = path.join(RECIPES_DIR, recipeName, "recipe.md");
    const markdown = fs.readFileSync(mdPath, "utf-8");
    const pageTitle = extractPageTitle(markdown);
    const recipeHtml = parseMarkdown(markdown);

    const body = `      <div>${recipeHtml}</div>\n      <a href="../">Tilbake</a>`;

    const outDir = path.join(DOCS_DIR, recipeName);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(
      path.join(outDir, "index.html"),
      htmlPage({
        title: pageTitle ? `${pageTitle} - Luddig` : "Luddig",
        cssPath: "../bakingbread.css",
        githubIconPath: "../github-mark.svg",
        body,
      })
    );

    recipes.push({ dir: recipeName, title: pageTitle || recipeName });
    console.log(`Built: ${recipeName}/index.html`);
  }

  return recipes;
}

function buildIndexPage(recipes) {
  const listItems = recipes
    .map((r) => `        <li><a href="./${r.dir}/">${r.title}</a></li>`)
    .join("\n");

  const body = `      <h1>Luddig</h1>
      <ul class="recipe-list">
${listItems}
      </ul>`;

  fs.writeFileSync(
    path.join(DOCS_DIR, "index.html"),
    htmlPage({
      title: "Luddig",
      cssPath: "bakingbread.css",
      githubIconPath: "github-mark.svg",
      body,
    })
  );

  console.log("Built: index.html");
}

function build404Page() {
  const body = `      <h1>404</h1>
      <p>Fant ikke oppskriften du lette etter.</p>
      <a href="/">Tilbake</a>`;

  fs.writeFileSync(
    path.join(DOCS_DIR, "404.html"),
    htmlPage({
      title: "404 - Fant ikke oppskriften - Luddig",
      cssPath: "bakingbread.css",
      githubIconPath: "github-mark.svg",
      body,
    })
  );

  console.log("Built: 404.html");
}

const recipes = buildRecipePages();
buildIndexPage(recipes);
build404Page();

console.log("Done!");
