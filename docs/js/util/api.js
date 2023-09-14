// /repos/{owner}/{repo}/contents/{path}
const API_URL = "https://api.github.com/repos";
const RAW_DATA_URL = "https://raw.githubusercontent.com";
const REPO_OWNER = "henrikerstad";
const REPO_NAME = "recipes-for-disaster";

export function makeApiUrl(endpoint) {
    return `${API_URL}/${REPO_OWNER}/${REPO_NAME}/contents/${endpoint}`;
}

export async function grabRecipeFileContents(recipeName) {
    const url = `${RAW_DATA_URL}/${REPO_OWNER}/${REPO_NAME}/main/recipes/${recipeName}/recipe.md`;
    const response = await fetch(url);
    return await response.text();
}