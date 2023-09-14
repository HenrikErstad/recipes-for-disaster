import { renderPageContent, createBackButton, setPageTitle,  } from "../util/html.js";

export async function NotFoundPage() {
  const title = document.createElement("h1");
  title.textContent = "Kunne ikke finne siden du lette etter";

  setPageTitle("404", "Fant ikke siden");
  renderPageContent([title, createBackButton()]);
}

