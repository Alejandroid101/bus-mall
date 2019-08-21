'use strict';

var container = document.getElementById('image-container');
var thisSet = {};
var previousSet = {};
var allImages = [];
var totalClicks = 0;


function CatalogEntry(name, url) {
  this.id = Math.random();
  this.name = name;
  this.src = url;
  this.numClicks = 0;
  this.numViews = 0;
  allImages.push(this);
}

CatalogEntry.prototype.updateViews = function () {
  this.numViews++;
}

CatalogEntry.prototype.updateClicks = function () {
  this.numClicks++;
}



function loadCatalogEntrys() {
  new CatalogEntry('R2D2 Bag', '/assets/bag.jpg');
  new CatalogEntry('Banana Slicer', '/assets/banana.jpg');
  new CatalogEntry('TP Tech Stand', '/assets/bathroom.jpg');
  new CatalogEntry('Toeless Rain Boots', '/assets/boots.jpg');
  new CatalogEntry('Ultimate breakfast maker', '/assets/breakfast.jpg');
  new CatalogEntry('Meatball bubblegum', '/assets/bubblegum.jpg');
  new CatalogEntry('WTF Chair', '/assets/chair.jpg');
  new CatalogEntry('Mighty Cthulhu', '/assets/cthulhu.jpg');
  new CatalogEntry('Dragon Meat', '/assets/dragon.jpg');
  new CatalogEntry('Pen cap utensils', '/assets/pen.jpg');
  new CatalogEntry('Pet Sweeper', '/assets/pet-sweep.jpg');
  new CatalogEntry('Pizzissors', '/assets/scissors.jpg');
  new CatalogEntry('Shark sleeping bag', '/assets/shark.jpg');
  new CatalogEntry('Baby sweeper', '/assets/sweep.png');
  new CatalogEntry('TaunTaun sleeping bag', '/assets/tauntaun.jpg');
  new CatalogEntry('Tenticle USB', '/assets/usb.gif');
  new CatalogEntry('Unicorn Meat', '/assets/unicorn.jpg');
  new CatalogEntry('Water Can', '/assets/water-can.jpg');
  new CatalogEntry('Egg Wine Glass', '/assets/wine-glass.jpg');
}

function setupImageContainers(numImages) {

  for (var i = 1; i <= numImages; i++) {
    // Add an <img /> to the section
    var figure = document.createElement('figure');
    var img = document.createElement('img');
    var imageCaption = document.createElement('figcaption');
    
    imageCaption.id = `caption-${i}`;
    imageCaption.textContent = 'fwh';

    img.id = `image-${i}`;
    img.src = 'http://placehold.it/200x200';
    figure.appendChild(img);
    figure.appendChild(imageCaption);
    container.appendChild(figure);
}

}


function setupListener() {
  container.addEventListener('click', clickHandler);


}

function clickHandler(e) {
  var imageName = e.target.alt;
  // find imageName in that array of images
  // Add one to the click counter for it.
  for (var i = 0; i < allImages.length; i++) {
    if (allImages[i].name === imageName) {
      allImages[i].updateClicks();
    }
  }
  totalClicks++;
  if (totalClicks === 25){
    container.removeEventListener('click', clickHandler);
    displayResults();
  }
  showRandomImages(3);
}

function showRandomImages(numImages) {

  thisSet = {};

  // loop numImages times ...
  for (var i = 1; i <= numImages; i++) {

    // find image-# as an id and that's where it goes...
    var id = `image-${i}`;
    var img = document.getElementById(id);
    var capt = document.getElementById(`caption-${i}`);

    // put in a unique and valid random image ***
    var imageObject = getRandomUniqueImage();

    img.src = imageObject.src;
    img.alt = imageObject.name;
    capt.textContent = imageObject.name;
    

  }

  previousSet = thisSet;

  console.log(allImages);
}

function getRandomUniqueImage() {

  var found = false;

  while (!found) {
    var n = Math.floor(Math.random() * allImages.length);
    if (!thisSet[n] && !previousSet[n]) {
      found = allImages[n];
      allImages[n].updateViews();
      thisSet[n] = true;
    }
  }

  return found; // something from that array
}


function displayResults(){
    console.log('clicked 25 times');
}

loadCatalogEntrys();
setupImageContainers(3);
setupListener();
showRandomImages(3);
