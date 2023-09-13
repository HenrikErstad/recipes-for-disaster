export const PAGE_ROOT = document.getElementById("main");

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