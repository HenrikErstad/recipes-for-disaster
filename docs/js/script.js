import { NotFoundPage } from "./pages/404.js";
import { RecipeOverviewPage } from "./pages/index.js";
import { RecipeDetailsPage } from "./pages/recipe.js";

async function handleRouteChange(url) {
  // determine where we are
  const path = url.split("/").pop();
  
  if (path === "/" || path === "" || path === "index.html") {
    RecipeOverviewPage();
    return;
  }
  
  const hasIllegalSymbols = path.match(/[^a-z0-9-]/g) !== null;

  if (!hasIllegalSymbols) {
    try {
      await RecipeDetailsPage(path);
      return;
    } catch (error) {
      // console.error(error);
    }
  }

  NotFoundPage();
}

handleRouteChange(window.location.pathname);

// Listen for the popstate event to handle route changes
window.addEventListener("popstate", function (event) {
  // Get the current route from the event state
  const route = event.state;

  // Handle the route change
  handleRouteChange(route);
});

// Update the URL and handle the route change
function navigateTo(route) {
  // Sanitize the route - TODO
  route = route.replace(/^%$/g, "");

  // Update the URL using history.pushState
  window.history.pushState(route, "", route);

  // Handle the route change
  handleRouteChange(route);
}

// document.addEventListener("DOMContentLoaded", renderPage);

// Screen lock to prevent screen from turning off
// automatically released when the page is hidden
let screenLock = null;
document.addEventListener("visibilitychange", async () => {
  if (screenLock !== null && document.visibilityState === "visible") {
    screenLock = await navigator.wakeLock.request("screen");
  }
});
