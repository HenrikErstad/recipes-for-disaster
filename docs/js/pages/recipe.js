import { grabRecipeFileContents } from "../util/api.js";
import { parseMarkdown } from "../util/parseMd.js";
import { renderPageContent, createAnchor, setPageTitle, createFragment } from "../util/html.js";

export async function RecipeDetailsPage(recipeName) {
  // fetch the file from the API
  const rawFile = await grabRecipeFileContents(recipeName);
  const htmlFromMd = await parseMarkdown(rawFile);
  const htmlFromMdFragment = createFragment(htmlFromMd);
  
  setPageTitle(recipeName);
  renderPageContent([htmlFromMdFragment, createBackButton()]);
}

function createBackButton() {
  return createAnchor("Tilbake", "./");
}
