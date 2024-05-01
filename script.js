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
    recipes.forEach((recipe, index) => {
        var ingredientsList = '';
        for (var i = 1; i <= 20; i++) {
            var ingredient = recipe[`strIngredient${i}`];
            var measure = recipe[`strMeasure${i}`];
            if (ingredient && ingredient.trim() !== '') {
                ingredientsList += `<li>${measure} ${ingredient}</li>`;
            }
        }

        var recipeCard = `
            <div class="recipeCard" onclick="info(${index})">
                <h2>${recipe.strMeal}</h2>
                <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
                <div id="details-${index}" class="hidden info">
                    <h3>Ingredientes:</h3>
                    <ul>${ingredientsList}</ul>
                    <h3>Receta:</h3>
                    <p>${recipe.strInstructions}</p>
                </div>
            </div>
        `;
        container.innerHTML += recipeCard;
    });
}

function info(index) {
    var details = document.getElementById('details-' + index);
    details.classList.toggle('hidden');
    details.style.width = '100%';
    details.style.textAlign = 'justify';
    details.style.textJustify = 'inter-word';
}
