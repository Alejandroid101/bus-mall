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
    for ( var i=0; i<allImages.length; i++){
      labels.push(allImages[i].name);
      data.push(allImages[i].numClicks);
    }
    displayResults();
  }
  //=======the next lines calls the function that makes All of the images and their info into a string
  stringifier();
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
//=====stringifier
function stringifier (){
  var labelsToString = JSON.stringify(labels);
  localStorage.setItem('storedLabels', labelsToString);
  var dataToString = JSON.stringify(data);
  localStorage.setItem('storedData',dataToString);
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
var labels = [];
var data = [];




function displayResults(){
  
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: labels,
          datasets: [{
              label: '# of Votes',
              data: data,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
  });
    console.log('clicked 25 times');
}

loadCatalogEntrys();
setupImageContainers(3);
setupListener();
showRandomImages(3);
