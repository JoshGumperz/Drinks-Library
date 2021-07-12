
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
var ingredientsArr = [];



searchDrink.on("submit", function(event){
    event.preventDefault()
    infoDisplay.css("display", "block")
    var drink = drinkInput.val()
    getCockTail(drink)
    setTimeout(() => {
        getNutritionInfo()
    }, 500);
})

function scrollDown() {
    // For some reason scrollIntoView wasn't working when I tried selecting the "bottom" element with jQuery, so I had to use vanilla javascript
    document.getElementById("bottom").scrollIntoView();
};


function checkTime() {
    currentHour = currentTime.c.hour
    if (currentHour < 17) {
        $(".navbar").css("background-color", "#ff646b")
        $("header").css("background-color", "#ff646b")
        $(".message-header").css("background-color", "#ff646b")
        $("#occasionsDropdown").css("background-color", "#ff646b")
    }
    else {
        $(".navbar").css("background-color", "#00be8f")
        $("header").css("background-color", "#00be8f")
        $(".message-header").css("background-color", "#00be8f")
        $("#occasionsDropdown").css("background-color", "#00be8f")
    }
}


function getCockTail(drink) {
    fetch("https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s=" + drink)
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
}   


function getNutritionInfo() {
    for (let i = 0; i < ingredientsArr.length; i++) {
        fetch("https://cors.bridged.cc/https://nutrition-api.esha.com/foods?query=" + ingredientsArr[i] + "&0&10&true", {
        headers: {
            "Ocp-Apim-Subscription-Key": "6b72f14d1f764cf1b81c389072560fed"
        }
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(data){
            // console.log(data);
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


var drink;
var drinksDisplayedSoFar = 0;
var drinksArr = [];
localStorage.setItem( "drinksArr", JSON.stringify( drinksArr ) );


var inputOccasions = [ ];
var recipesData = [];
var recipesDisplayed = 0;




// handleUserInputOccasions();
// setTimeout( function() { displayDrinkData() }, 1000 );
    
// Initializes the web application by waiting for the user to select types of events
// Calls handleUserInputOccasions() to collect the info on the drinks that fit into the selected events
// Calls displayDrinkData() to display the drink info returned by the API calls on the browser window, one at a time
function init() {
    checkTime();
    $("#submit-occasions-btn").click( function() {
        $( document ).ready( function() {
            $.each( $( "input[name='event']:checked" ), function() {
                // console.log( $( this ).val() );
                inputOccasions.push( $( this ).val() );
            });
            // console.log( inputOccasions );
            handleUserInputOccasions();
            setTimeout( function() { displayDrinkData() }, 1000 );
        });        
    });   
}

// Calls the init() function
init();


// Event listener for nextBtn which displays info of the next drink when clicked
$( '.nextBtn' ).on( 'click', displayDrinkData );


// For each occasion that the user selected, finds its matching object in the occasions 
// Passes the categories associated with each occasion selected to the getDrinksByCategories function
// to get all the drinks in those categories
function handleUserInputOccasions() {

    // var temp;
    // console.log( temp = inputOccasions[0] );
    // console.log( occasions[ temp ] );

    for( var i = 0; i < inputOccasions.length; i++ ) {
        var temp = inputOccasions[i];
        getDrinksByCategories( occasions[ temp ].categories );
    }
}



// Takes an array of categoris as input
// For each element/category of the input arr, make an API call with that element/category as the query string
// API call returns an array of drinks for a category.
// For each element/drink in the array returned by the API call, call getCockTailRecipeByID to get fuller details about the drink.
function getDrinksByCategories( categories ) {
    for( var category of categories ) {
        fetch( "https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?c=" + category )
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

// Takes a drink ID as input and make an API call with that ID as the query string
// The API call returns an object containing full detail of that drink ID
// Pushes the object return by the API call onto the drinksArr array
function getCockTailRecipeByID( id ) {
    fetch("https://cors.bridged.cc/http://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=" + id )
    .then(function(response) {
        return response.json()
    })
    .then(function( data ){
        // console.log( data );
        drinksArr.push( data.drinks );
    })
    // .then( function () {
    //     displayDrinkData();
    // })
}


// For each element/drink of the drinksArr array, displays its name, thumbnail, and mixing instruction,
// and ingredient list in the browser window
// When displaying the ingredient list, call the displayDrinkDataHelper function with each element/drink of the drinksArr as argument
// to get the ingredient list as an array
// Uses the ingredient list array as argument and calls the getNutritionInfo() to get the nutritional information
function displayDrinkData() {

    // console.log( drinksArr );

    $( '.message' ).css( "display", "block")
    $( '.nextBtn' ).css( "display", "block" );

    var drink = drinksArr[ drinksDisplayedSoFar ];

    drinkNameEl.text(drink[0].strDrink );
    drinkImgEl.attr( "src", drink[0].strDrinkThumb );
    recipeText.text( drink[0].strInstructions );

    displayDrinkDataHelper( drink );
    getNutritionInfo();

    drinksDisplayedSoFar++;
}



// Takes a drink object as input
// Pushes the ingredients of the input drink object onto an array called ingredientsArr
// ingredientsArr is later used as input to retrieve nutritional info for each of its elements
function displayDrinkDataHelper( drink ) {

    ingredientsArr = []
    var ingredientIdx = 1;
    var done = false;
    var ingredientKey = "strIngredient" + ingredientIdx;
    // console.log( drink[ "strIngredient" + ingredientIdx ] );
    // console.log(drink.drinks)
    while(  drink[0][ "strIngredient" + ingredientIdx ] != null ) {
        ingredientsArr.push( drink[0][ "strIngredient" + ingredientIdx ] );
        ingredientIdx++;
        ingredientKey = "strIngredient" + ingredientIdx;
    }
    // console.log( ingredientsArr );
}

