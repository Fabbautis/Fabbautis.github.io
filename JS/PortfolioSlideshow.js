let slideIndex = 1;

function loadSlides() {//THIS IS CODE TO COLLECT THE DATA NEEDED TO POPULATE THE SLIDESHOW
  let location = sessionStorage.getItem("portfolioNumber");
  console.log(portfolioJSON[location])
  let htmlToAdd = "";

  for (let i=1; i < portfolioJSON[location].captions.length+1; i++){//The number of images to add will have to be based on the number of captions because I think its a bad thing if the computer can look in your files
    htmlToAdd +=  '<div class="mySlides">' +
                  '<div class="numbertext">' + i + ' / ' + portfolioJSON[location].captions.length + '</div>'+
                  '<img src="'+(portfolioJSON[location].location)+'/'+i+'.png"style="max-width:100%; height:auto;">'+
                  '<div class="text">'+portfolioJSON[location].captions[i-1]+'</div></div>'
  }

  htmlToAdd += '<a class="prev" onclick="plusSlides(-1)"></a> <a class="next" onclick="plusSlides(1)"></a>';
  document.getElementById("slideshow-container").innerHTML = htmlToAdd;

  document.getElementById("portfolioTitle").textContent = portfolioJSON[location].actualname;
  document.getElementById("portfolioDescription").textContent = portfolioJSON[location].description;
  showSlides(slideIndex);
}



function showSlides(n) {//THIS IS CODE TO ACTUALLY POPULATE THE SLIDESHOW
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot"); //Get all the data from the html page
console.log(slides, dots);

  if (n > slides.length) {//go back to the start of the index
    slideIndex = 1;
  }    
  if (n < 1) { //go to the front of the index
    slideIndex = slides.length;
  }

  for (i = 0; i < slides.length; i++) {//Hide all of the images and make the selector dots be basic color
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  } 

  slides[slideIndex-1].style.display = "block";  //Choose the selected picture and change the dot color
  dots[slideIndex-1].className += " active";
}


function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}
