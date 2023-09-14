import { renderPageContent, createBackButton, setPageTitle,  } from "../util/html.js";

export async function NotFoundPage() {
  const title = document.createElement("h1");
  title.textContent = "404";

  const text = document.createElement("p");
  text.textContent = "Fant ikke oppskriften du lette etter.";

  setPageTitle("404", "Fant ikke oppskriften");
  renderPageContent([title, text, createBackButton()]);
}

