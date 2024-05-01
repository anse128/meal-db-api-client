function changeInputPlaceholder() {
    var searchType = document.getElementById('searchType').value;
    var input = document.getElementById('searchInput');
    if (searchType === 'meal') {
        input.placeholder = "Ingresa el nombre de un plato";
    } else if (searchType === 'ingredient') {
        input.placeholder = "Ingresa un ingrediente principal";
    } else if (searchType === 'category') {
        input.placeholder = "Ingresa una categoría";
    } else if (searchType === 'area') {
        input.placeholder = "Ingresa un área (nacionalidad)";
    }
}

function searchRecipe() {
    var input = document.getElementById('searchInput').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`)
        .then(response => response.json())
        .then(data => displayRecipes(data.meals));
}

function displayRecipes(recipes) {
    var container = document.getElementById('recipeContainer');
    container.innerHTML = ''; // Limpiar resultados anteriores
    recipes.forEach(recipe => {
        var recipeCard = `
            <div>
                <h2>${recipe.strMeal}</h2>
                <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
                <p>${recipe.strInstructions}</p>
            </div>
        `;
        container.innerHTML += recipeCard;
    });
}
