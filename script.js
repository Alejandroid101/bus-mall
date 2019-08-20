'use strict';
// for (i=0; i < 3; i++)
function everything (){
var section = document.getElementsByTagName('section')[0];
var figure = document.createElement('figure');
var imageElement = document.createElement('img');
var imageCaption = document.createElement('figcaption');
section.appendChild(figure);
figure.appendChild(imageElement);
figure.appendChild(imageCaption);


function Image(name, url) {
    this.name = name;
    this.src = url;
    Image.list.push(this);
}
Image.list = [];

// function loadImageFromArray() {
//   for (var i = 0; i < imagesToBeLoaded.length; i++) {
//     new Image(`Image-${i}`, imagesToBeLoaded[i]);
//   }
// }

function loadImages() {
  new Image('bag', '/assets/bag.jpg');
  new Image('banana', '/assets/banana.jpg');
  new Image('bathroom', '/assets/bathroom.jpg');
  new Image('boots', '/assets/boots.jpg');
  new Image('breakfast', '/assets/breakfast.jpg');
  new Image('bubblegum', '/assets/bubblegum.jpg');
  new Image('chair', '/assets/chair.jpg');
  new Image('cthulhu', '/assets/cthulhu.jpg');
  new Image('dog', '/assets/dog-duck.jpg');
  new Image('dragon', '/assets/dragon.jpg');
  new Image('pen', '/assets/pen.jpg');
  new Image('pet', '/assets/pet-sweep.jpg');
  new Image('scissors', '/assets/scissors.jpg');
  new Image('shark', '/assets/shark.jpg');
  new Image('sweep', '/assets/sweep.png');
  new Image('tauntaun', '/assets/tauntaun.jpg');
  new Image('unicorn', '/assets/unicorn.jpg');
  new Image('usb', '/assets/usb.gif');
  new Image('water', '/assets/water-can.jpg');
  new Image('wine', '/assets/wine-glass.jpg');

  console.log(Image.list);
}

function showRandomImage() {

  // Random, but make sure we haven't seen it before ...
  var randomNumber = Math.floor(Math.random() * Image.list.length);

  // <img id="image" src="" />
  // Change what's being shown
//   for (var i = 0; i < 3; i++){
    imageElement.src = Image.list[randomNumber].src;
    imageCaption.textContent = Image.list[randomNumber].name;
 


}

// imageElement click handler
imageElement.addEventListener('click', showRandomImage);


loadImages();

showRandomImage();
}

everything();
everything();
everything();