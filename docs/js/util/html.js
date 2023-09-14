export const PAGE_ROOT = document.getElementById("main");
const PAGE_TITLE_SUFFIX = "Luddig";
const PAGE_TITLE_DELIMITER = " - ";

export function createAnchor(name, href, onClick = null) {
  const anchor = document.createElement("a");
  anchor.textContent = name;
  anchor.href = href;

  if (onClick) {
    anchor.addEventListener("click", onClick);
  }

  return anchor;
}

export function resetPage() {
  PAGE_ROOT.innerHTML = "";
}

export function renderPageContent(content) {
  // check if content is an array
  if (Array.isArray(content)) {
    content.forEach((item) => PAGE_ROOT.appendChild(item));
  } else {
    PAGE_ROOT.innerHTML = content;
  }
}

export function setPageTitle(title = undefined) {
  if (!title || title === "") {
    document.title = PAGE_TITLE_SUFFIX;
  } else if (Array.isArray(title)) {
    document.title = title.join(PAGE_TITLE_DELIMITER);
  } else {
    document.title = title + PAGE_TITLE_DELIMITER + PAGE_TITLE_SUFFIX;
  }
}

export function createFragment(content) {
  const fragment = document.createElement("div");
  fragment.innerHTML = content;

  return fragment;
}

export function createBackButton() {
  return createAnchor("Tilbake", "./");
}
