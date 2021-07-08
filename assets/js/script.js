var searchDrink = $(".search-form")
var drinkInput = $(".search-bar")

searchDrink.on("submit", function(event){
    event.preventDefault() 
    var drink = drinkInput.val()
    getCockTail(drink)
    getNutritionInfo(drink)
})

function getNutritionInfo(drink) {
    fetch("https://cors.bridged.cc/https://nutrition-api.esha.com/foods?query=" + drink + "&0&10&true", {
    headers: {
        "Ocp-Apim-Subscription-Key": "951b42ae2f4a4413a3d54640205f22c5"
    }
    })
    .then(function(response) {
        return response.json()
    })
    .then(function(data){
        console.log(data)
    })
}



function getCockTail(drink) {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drink)
    .then(function(response) {
        return response.json()
    })
    .then(function(data){
        console.log( data );
    })
}