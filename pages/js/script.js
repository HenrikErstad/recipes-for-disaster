import { createAnchor, resetPage, PAGE_ROOT } from "./util/html.js";
import { grabRecipeFileContents, makeApiUrl } from "./util/api.js";
import { parseMarkdown } from "./util/parseMd.js";


function handleRecipeClick(event, recipeName) {
  event.preventDefault();
  resetPage();

  createRecipeDetailsPage(recipeName);
}

async function createRecipeDetailsPage(recipeName) {
  // fetch the file from the API
  const rawFile = await grabRecipeFileContents(recipeName);
  const htmlFromMd = await parseMarkdown(rawFile);
  
  PAGE_ROOT.innerHTML = htmlFromMd;
  PAGE_ROOT.appendChild(createBackButton());
}

function createBackButton() {
  return createAnchor("Tilbake", "", (event) => {
    event.preventDefault();
    resetPage();
    createRecipeOverviewPage();
  });
}

async function createRecipeOverviewPage() {
  const title = document.createElement("h1");
  title.textContent = "Luddig";

  const recipeList = await createRecipeListMenu();

  PAGE_ROOT.appendChild(title);
  PAGE_ROOT.appendChild(recipeList);
}

async function createRecipeListMenu() {
  const recipeList = document.createElement("ul");
  recipeList.id = "recipe-list";
  recipeList.className = "recipe-list";

  // read the list of recipes from the API
  const response = await fetch(makeApiUrl("recipes"));
  const recipes = await response.json();

  recipes.forEach((recipe) => {
    const anchor = createAnchor(recipe.name, "", (event) =>
      handleRecipeClick(event, recipe.name)
    );

    const listItem = document.createElement("li");
    listItem.appendChild(anchor);

    recipeList.appendChild(listItem);
  });

  return recipeList;
}

document.addEventListener("DOMContentLoaded", createRecipeOverviewPage);
document.addEventListener('visibilitychange', async () => {
  if (screenLock !== null && document.visibilityState === 'visible') {
    screenLock = await navigator.wakeLock.request('screen');
  }
});