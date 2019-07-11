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
         console.log(Object.keys(data));
         let keys = Object.keys(data);
         let navigation = document.getElementById("nav-style");
         navigation.innerHTML += buildNav(keys);
      })
} // loadPage function

/************************************************************
 * Function :: 
 * 
 ************************************************************/
function buildNav(data) {
   let navListItems = '<li><a href="">Home</a></li>';
   for (let i = 0; i < 4; i++) {
      navListItems += '<li><a href="">' + data[i] + '</a></li>';
   }

   return navListItems;
} // buildNav function

let pageNav = document.getElementById('nav-style');

pageNav.addEventListener("click", function (evt) {


})