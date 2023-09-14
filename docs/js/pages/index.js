import { renderPageContent, createAnchor, setPageTitle } from "../util/html.js";
import { makeApiUrl } from "../util/api.js";

export async function RecipeOverviewPage() {
  const title = document.createElement("h1");
  title.textContent = "Luddig";

  const recipeList = await createRecipeListMenu();

  setPageTitle();
  renderPageContent([title, recipeList]);
}

async function createRecipeListMenu() {
  const recipeList = document.createElement("ul");
  recipeList.id = "recipe-list";
  recipeList.className = "recipe-list";

  // read the list of recipes from the API
  const response = await fetch(makeApiUrl("recipes"));
  const recipes = await response.json();

  recipes.forEach((recipe) => {
    const anchor = createAnchor(recipe.name, "/" + recipe.name);

    const listItem = document.createElement("li");
    listItem.appendChild(anchor);

    recipeList.appendChild(listItem);
  });

  return recipeList;
}
