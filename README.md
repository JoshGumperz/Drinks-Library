# Cocktail-Database
Cocktail Database

Not everyone knows which drink to choose for which situation. The cocktail database serves as a recommendation system allowing the user to find all the necessary information they need to make preparing for an event as easy as possible.

### Prerequisites

In order to use the cocktail database, you'll need a device with internet connection, and a browser.

## Getting Started

I've included screenshots of what the site looks like. The site is also linked below so feel free to take a look. 
Main features include:
- A search function that allows you to input a cocktail and find the recipe and ingredients for that cocktail
- A dropdown menu that allows you to get drink recommendations based on occasion
- Time based style changes that update after 5pm every day 

Upon initially loading in to the site you will see something similar to this (remember the site looks different before/after 5pm every day):
![Screenshot](https://i.imgur.com/geDQkfb.png)

After searching a cocktail you will be presented with a text box that displays a photo of the cocktail, ingredients for the cocktail, and mixing instructions
![Screenshot](https://i.imgur.com/sQPNy6W.png)

If you choose, you can use the recommendation feature instead of the search feature. This allows you to choose one or more occasions from a preset list, and get drink recommendations for those occasions. After hitting the "find drinks" button you will be presented with the same text box containing the same information as if you had searched for a cocktail directly, except you will also see an arrow button. If you click the arrow button, the text box will update to display the next drink in the recommendations list:
![Screenshot](https://i.imgur.com/ZEDQUF0.png)

If you scale the screen down to a smaller size, you'll see the content adjusts to accomodate the new dimensions:
![Screenshot](https://i.imgur.com/zz6E0pM.png)
![Screenshot](https://i.imgur.com/A5LL1AR.png)

One important thing to note is that the API we used to display the ingredients has a call limit. Meaning we were unable to use it more than a certain amount of times in a certain time period without paying for the full API version. Keep in mind this site is a work in progress and we will upgrade to a better API as we continue to update in the future.

## Built With
* [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
* [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## Deployed Link

* [See Live Site](https://hugh18019.github.io/Drinks-Library/)


## Authors

**Josh Gumperz** 

- [Link to Github](https://github.com/JoshGumperz)

**Huiran Lin**
- [Link to Github](https://github.com/hugh18019)

## License

This project is licensed under the MIT License 

## Acknowledgments

* I'd like to acknowledge my teammate and fellow developer for this for this assignment, Huiran Lin, for his contributions to our final product, as well as for helping me with my contributions when I needed it.  