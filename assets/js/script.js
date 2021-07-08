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
        description : "Promotin",
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


// getCategories();
// getCockTail();
getDrinksByOccasions();

var drink;

function getDrinksByOccasions() {
    // for( var occasion of occasions ) {
    //     for( var category of occasion.categories ) {
    //         getDrinksByOccasionsHelper( category );
    //     }
    // }
    var drinkNameEl = $('<h2>' );
    drinkNameEl.text( "Occasion: " + occasions[0].description );
    $( '.drinkName-container' ).append( drinkNameEl );
    for( var category of occasions[0].categories ) {
        getDrinksByOccasionsHelper( category );
    }
}

function getDrinksByOccasionsHelper( category ) {
    fetch( "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=" + category )
    .then( function ( response ) {
        return response.json();
    })
    .then( function( data ) {
        return data;
    })
    .then( function ( categories ) {
        for( var each of categories.drinks ) {
            displayRecipe( each );
        }
    })
}


function displayRecipe( drink ) {
    var drinkNameEl = $( '<h3>' );
    drinkNameEl.text( drink.strDrink );
    $('.drinkName-container').append( drinkNameEl );

    var drinkID = drink.idDrink;
    getCockTailRecipeByID( drinkID );
}


function getNutritionInfo() {
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



function getCockTailRecipeByID( id ) {
    fetch("https://cors.bridged.cc/http://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007")
    .then(function(response) {
        return response.json()
    })
    .then(function(data){
        console.log( data );
        var recipeEl = $( '<p>' );
        recipeEl.text( data.drinks[0].strInstructions );
        $( '.recipe-container' ).append( recipeEl );
    })
    // .then( function () {
    //     getNutritionInfo();
    // })
}

function getCategories() {
    fetch( "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list" )
    .then( function( response ) {
        return response.json();
    })
    .then( function( data ) {
        console.log( data );
    })
}