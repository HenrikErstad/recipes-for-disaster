import { grabRecipeFileContents } from "../util/api.js";
import { extractPageTitle, parseMarkdown } from "../util/parseMd.js";
import {
  renderPageContent,
  createBackButton,
  setPageTitle,
  createFragment,
} from "../util/html.js";

export async function RecipeDetailsPage(recipeName) {
  // fetch the file from the API
  const rawFile = await grabRecipeFileContents(recipeName);

  if (!rawFile || rawFile === "404: Not Found") {
    throw new Error("Recipe not found");
  }

  const htmlFromMd = await parseMarkdown(rawFile);
  const htmlFromMdFragment = createFragment(htmlFromMd);
  const pageTitle = extractPageTitle(rawFile);

  setPageTitle(pageTitle);
  renderPageContent([htmlFromMdFragment, createBackButton()]);
}
