const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const mealsEl = document.getElementById('meals');
const resultHeading = document.getElementById('result-heading');
const singleMealEL = document.getElementById('single-meal');

//Search mean and fetch from API

function searchMeal(e) {
    e.preventDefault();

    //clear single meal
    singleMealEL.innerHTML = '';

    //get search term
    const term = search.value;
    console.log(`this is your ${term}`);

    //check for empty
    if (term.trim()){
        fetch(`https:/\/www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                resultHeading.innerHTML = `<h2>Search results for ${term}:</h2>`;

                if (data.meals === null) {
                    console.log("null");
                    resultHeading.innerHTML = `<h2>No results. Look again.</h2>`;
                }else{
                mealsEl.innerHTML = data.meals
            .map(
              meal => `
            <div class="meal">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
              <div class="meal-info" data-mealID="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
              </div>
            </div>
          `
            )
            .join('');
        }
      });
               //clear search text
               search.value = '';
    }else{
        alert('Please enter search term');
    }
}

//fetch meal by ID
function getMealById(mealID) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0];

            addMealToDOM(meal);
     });
}

//add meal to dom

function addMealToDOM(meal) {

}

//event listeners
submit.addEventListener('submit', searchMeal);

mealsEl.addEventListener('click', e => {
  const mealID = e.target.closest('.meal-info').dataset.mealid;
  getMealById(mealID);
});
