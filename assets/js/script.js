var searchDrink = $(".search-form")
var drinkInput = $(".search-bar")
var drinkNameEl = $("#cocktail-name")
var drinkImgEl = $("#cocktail-img")
var NutritionInfo = $(".nutritional-info")
var ingredientsList = $("#ingredients-list")
var recipeText = $("#recipe-text")
var infoDisplay = $(".message")
var DateTime = luxon.DateTime
var currentTime = DateTime.local()
var ingredientsArr = []

var occasions = [
    FormalParty = { 
        description : "Formal Party",
        categories : [ "Punch / Party Drink", "Beer", "Soft Drink / Soda", "Cocktail" ]
    }, 
    Graduation = {
        description : "Graduation",
        categories : [ "Shot", "Beer" ]
    },
    Promotion = {
        description : "Promotion",
        categories : [ "Shot", "Beer" ]
    },
    Birthday = { 
        description : "Birthday",
        categories : [ "Soft Drink / Soda", "Punch / Party Drink", "Shot" ]
    },
    InformalParty = {
        description : "InformalParty",
        categories : [ "Homemade Liqueur", "Soft Drink / Soda", "Cocktail" ]
    },
    HolidayParty = {
        description : "Holiday Party",
        categories : [ "Ordinary Drink", "Milk / Float / Shake", "Cocoa" ]
    },
    MovieNight = {
        description : "Movie Night",
        categories : [ "Cocoa", "Milk / Float / Shake", "Soft Drink / Soda", "Beer" ]
    },
    Tropical = {
        description : "Tropical",
        categories : [ "Cocoa", "Cocktail", "Soft Drink / Soda", "Beer" ]
    },
    Relaxing = {
        description : "Relaxing",
        categories : [ "Ordinary Drink", "Milk / Float / Shake", "Coffee / Tea" ]
    }
]
checkTime()


searchDrink.on("submit", function(event){
    event.preventDefault()
    infoDisplay.css("display", "block")
    var drink = drinkInput.val()
    getCockTail(drink)
    // setTimeout(() => {
    //     getNutritionInfo()
    // }, 500);
})

function scrollDown() {
    // For some reason scrollIntoView wasn't working when I tried selecting the "bottom" element with jQuery, so I had to use vanilla javascript
    document.getElementById("bottom").scrollIntoView({behavior: "smooth"});
};

function checkTime() {
    currentHour = currentTime.c.hour
    if (currentHour < 17) {
        $(".navbar").css("background-color", "#ff949a")
        $("header").css("background-color", "#ff949a")
    }
    else {
        $(".navbar").css("background-color", "#86dbae")
        $("header").css("background-color", "#86dbae")
    }
}


function getCockTail(drink) {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drink)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        // console.log(data)
        var drinkName = data.drinks[0].strDrink
        var drinkImg = data.drinks[0].strDrinkThumb
        var recipeInstructions = data.drinks[0].strInstructions
        getIngredientListForDrink(data)
        drinkNameEl.text(drinkName)
        drinkImgEl.attr("src", drinkImg)
        recipeText.text(recipeInstructions)
        // console.log(drinkName)
        setTimeout(() => {
            scrollDown()
        }, 150);    
    })
    .then(function(){
        getNutritionInfo()
    })
}                                                                           


function getNutritionInfo() {
    for (let i = 0; i < ingredientsArr.length; i++) {
        fetch("https://cors.bridged.cc/https://nutrition-api.esha.com/foods?query=" + ingredientsArr[i] + "&0&10&true", {
        headers: {
            "Ocp-Apim-Subscription-Key": "951b42ae2f4a4413a3d54640205f22c5"
        }
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(data){
            console.log(data)
            var displayIngredients = data.query
            ingredientsList.append($("<li>").text(displayIngredients))
            // console.log(data.items[0].description)
        })
    }
    clearNutritionInfo()
}

function clearNutritionInfo(){
    ingredientsList.empty()
}

var drink;
var drinksDisplayedSoFar = 0;
var drinksArr = [];
localStorage.setItem( "drinksArr", JSON.stringify( drinksArr ) );

var inputOccasions = [ "Formal Party" ];
var recipesData = [];
var recipesDisplayed = 0;

// handleUserInputOccasions();
// console.log( recipesData );


function handleUserInputOccasions() {

    for( var each of inputOccasions ) {
        for( var j of occasions ) {
            if( each === j.description ) {
                getDrinksByCategories( j.categories );
            }
        }
    }
    
}


function getDrinksByCategories( categories ) {
    for( var category of categories ) {
        fetch( "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=" + category )
        .then( function ( response ) {
            return response.json();
        })
        .then( function( data ) {
            // console.log( data );
            for( var each of data.drinks) {
                getCockTailRecipeByID( each.idDrink );
            }
        })
    }
}


function getCockTailRecipeByID( id ) {
    fetch("https://cors.bridged.cc/http://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + id )
    .then(function(response) {
        return response.json()
    })
    .then(function(data){
        // console.log( data );
        storeData( data );
    })
    .then( function () {
        displayDrinkData();
    })
}


function storeData( data ) {
    var drinksArr = JSON.parse( localStorage.getItem( "drinksArr" ) );
    drinksArr.push( data.drinks[0] );
    // console.log( drinksArr );
    localStorage.setItem( "drinksArr", JSON.stringify( drinksArr ) );
}


function displayDrinkData( ) {
    var drinksArr = JSON.parse( localStorage.getItem( "drinksArr" ) );
    // console.log( drinksArr.length );

    var drinkName = drinksArr[ drinksArr.length - 1 ].strDrink;
    
    // var btnEl = $( '#' + ( drinksDisplayedSoFar + 1 ) ).children('button');
    // console.log( btnEl.textContent );

    var btnEl = $( '#1' ).children('button');
    // console.log( btnEl.text() );
    drinksDisplayedSoFar++;

}

function getIngredientListForDrink( drink ) {
    ingredientsArr = []
    var ingredientIdx = 1;
    var done = false;
    var ingredientKey = "strIngredient" + ingredientIdx;
    // console.log( drink[ "strIngredient" + ingredientIdx ] );
    // console.log(drink.drinks)
    while(  drink.drinks[0][ "strIngredient" + ingredientIdx ] != null ) {
        ingredientsArr.push( drink.drinks[0][ "strIngredient" + ingredientIdx ] );
        ingredientIdx++;
        ingredientKey = "strIngredient" + ingredientIdx ;
    }
    // console.log( ingredientsArr );
}
    