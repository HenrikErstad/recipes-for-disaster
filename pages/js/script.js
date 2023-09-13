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
  PAGE_ROOT.innerHTML = parseMarkdown(`

# Langebrød

## Ingredienser

- 11dl vann (romtemp)
- 100g gjær, eller 2pk tørrgjær
- 30g salt
- 100g mørk sirup
- 100g margarin
- 800g finsiktet rugmel
- 1000g siktet hvetemel

## Metode

Hvile i 30 minutter på et lunt sted, tildekket med plast.

Løs gjæren i vannet. Bland det tørre og tilsett margarin og sirup. Hell i vann/gjær-løsning og elt i 10 min. Forhev til dobbel størrelse, ca 30 min.
Lag 4 like runde emner, elt dem til store rundstykker. La dem hvile 10 minutter. Press dem flate, ca 1cm. Så ruller du dem stramt sammen. Disse brødene stekes ikke i form, men settes inntil hverandre på smurt plate. Ha litt olje mellom brødene, eller litt smeltet margarin. 
Dekk dem til med litt klingfilm eller et fuktig håndkle. Heves til dobbel størrelse, ca 1 time. 
Sett brødene nederst på 250 grader, skru ned til 200 grader når brødene er kommet inni.
Stekes gylne, ca 45 minutter.
`);
  return;
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
