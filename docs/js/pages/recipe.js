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
    //   createRecipeOverviewPage();
    });
  }