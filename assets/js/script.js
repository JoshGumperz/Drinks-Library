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


// getCategories();
// getCockTail();
// getDrinksByOccasions();



// function getDrinksByOccasions() {
//     // for( var occasion of occasions ) {
//     //     for( var category of occasion.categories ) {
//     //         getDrinksByOccasionsHelper( category );
//     //     }
//     // }
//     var drinkNameEl = $('<h2>' );
//     drinkNameEl.text( "Occasion: " + occasions[0].description );
//     $( '.drinkName-container' ).append( drinkNameEl );
//     for( var category of occasions[0].categories ) {
//         getDrinksByOccasionsHelper( category );
//     }
// }

// function getDrinksByOccasionsHelper( category ) {
//     fetch( "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=" + category )
//     .then( function ( response ) {
//         return response.json();
//     })
//     .then( function( data ) {
//         // console.log( data );
//         for( var each of data.drinks ) {
//             displayRecipe( each );
//         }
//         return data;
//     })
// }


// function displayRecipe( drink ) {
//     var drinkNameEl = $( '<h3>' );
//     drinkNameEl.text( drink.strDrink );
//     $('.drinkName-container').append( drinkNameEl );

//     var drinkID = drink.idDrink;
//     return getCockTailRecipeByID( drinkID );
// }


// function getNutritionInfo() {
//     fetch("https://cors.bridged.cc/https://nutrition-api.esha.com/foods?query=" + drink + "&0&10&true", {
//     headers: {
//         "Ocp-Apim-Subscription-Key": "951b42ae2f4a4413a3d54640205f22c5"
//     }
//     })
//     .then(function(response) {
//         return response.json()
//     })
//     .then(function(data){
//         console.log(data)
//     })
// }



// For testing purposes
// function getCategories() {
//     fetch( "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list" )
//     .then( function( response ) {
//         return response.json();
//     })
//     .then( function( data ) {
//         console.log( data );
//     })
// }


var drink;
var drinksDisplayedSoFar = 0;
var drinksArr = [];
localStorage.setItem( "drinksArr", JSON.stringify( drinksArr ) );
var ingredientsArr = [];

var inputOccasions = [ "Formal Party" ];
var recipesData = [];
var recipesDisplayed = 0;




handleUserInputOccasions();
setTimeout( function() { displayDrinkData() }, 3000 );
    
    

$( '.nextThree' ).on( 'click', displayDrinkData );


// console.log( recipesData );


async function handleUserInputOccasions() {
    for( var each of inputOccasions ) {
        for( var j of occasions ) {
            if( each === j.description ) {
                await getDrinksByCategories( j.categories );
                // main( j.categories );
            }
        }
    }
    
}


// async function main( categories ) {
//     for( var category of categories ) {
//         const res = await fetch( "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=" + category );
//         var data = res.body;
//         console.log( data );
//         console.log( data[2] );
//         for( var each of data.PromiseResult.drinks ) {
//             getCockTailRecipeByID( each.idDrink );
//         }
//     }
// }




async function getDrinksByCategories( categories ) {
    for( var category of categories ) {
        await fetch( "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=" + category )
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


async function getCockTailRecipeByID( id ) {
    await fetch("https://cors.bridged.cc/http://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + id )
    .then(function(response) {
        return response.json()
    })
    .then(function( data ){
        // console.log( data );
        // storeData( data );
        drinksArr.push( data.drinks );
    })
    // .then( function () {
    //     displayDrinkData();
    // })
}


function storeData( data ) {
    var drinksArr = JSON.parse( localStorage.getItem( "drinksArr" ) );
    drinksArr.push( data.drinks[0] );
    // console.log( drinksArr );
    localStorage.setItem( "drinksArr", JSON.stringify( drinksArr ) );
}


function displayDrinkData( ) {
    // var drinksArr = JSON.parse( localStorage.getItem( "drinksArr" ) );
    // console.log( drinksArr );

    clearDisplay();

    for( var i = 1; i < 4; i++ ) {

        var recipeEl = $( '#' + i );

        var drink = drinksArr[ drinksDisplayedSoFar ];
        var drinkName = drink[0].strDrink;
        var btnEl = recipeEl.children( 'button' );
        btnEl.text( drinkName );

        var detailEl = $( '<p>' );
        detailEl.text( drink[0].strInstructions );
        recipeEl.append( detailEl );

        drinksDisplayedSoFar++;
    } 
}

function clearDisplay() {

    for( var i = 1; i < 4; i++ ) {
       $( '#' + i ).children( 'button' ).text(''); 
       $( '#' + i ).children( 'p' ).text('');
    }
}


// function collectRecipeInfo( drink ) {
//     var ingredientIdx = 1;
//     var done = false;
//     var ingredientKey = "strIngredient" + ingredientIdx;
//     // console.log( drink[ "strIngredient" + ingredientIdx ] );

//     while(  drink[ "strIngredient" + ingredientIdx ] != null ) {
//         ingredientsArr.push( drink[ "strIngredient" + ingredientIdx ] );
//         ingredientIdx++;
//         ingredientKey = "strIngredient" + ingredientIdx ;
//     }
//     // console.log( ingredientsArr );



// }



// For when the user directly search a drink
function getCockTail(drink) {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drink)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data)
        var drinkName = data.drinks[0].strDrink
        var drinkImg = data.drinks[0].strDrinkThumb
        var recipeInstructions = data.drinks[0].strInstructions
        drinkNameEl.text(drinkName)
        drinkImgEl.attr("src", drinkImg)
        recipeText.text(recipeInstructions)
        console.log(drinkName)
    })
}