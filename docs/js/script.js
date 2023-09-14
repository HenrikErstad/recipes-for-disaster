import { RecipeOverviewPage } from "./pages/index.js";

function renderPage() {
  // determine where we are
  const path = window.location.pathname.split("/").pop();
  console.log(path);
  if(path === "/" || path === "" || path === "/index.html") {
    RecipeOverviewPage();
  } else {
    try {

    } catch (error) {
      console.error(error);
    }
  }
}

document.addEventListener("DOMContentLoaded", renderPage);

// Screen lock to prevent screen from turning off
// automatically released when the page is hidden
let screenLock = null;
document.addEventListener('visibilitychange', async () => {
  if (screenLock !== null && document.visibilityState === 'visible') {
    screenLock = await navigator.wakeLock.request('screen');
  }
});