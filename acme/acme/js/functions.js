"use strict"


console.log("My JavaScript is being read!");
loadPage();

/************************************************************
 * Function :: 
 * 
 ************************************************************/
function loadPage() {
   let acmeURL = "./js/acme.json";

   fetch(acmeURL)
      .then(function (response) {
         if (response.ok) {
            return response.json();
         }
         throw new Error('Network response was not ok.');
      })
      .then(function (data) {
         console.log(data);
         let navigation = document.getElementById("nav-style");
         navigation.innerHTML = buildNav();
      })
} // loadPage function

/************************************************************
 * Function :: 
 * 
 ************************************************************/
function buildNav() {
   let navListItems = '<li><a>Home</a></li>';

   return navListItems;
} // buildNav function

let pageNav = document.getElementById('nav-style');

pageNav.addEventListener("click", function (evt) {


})