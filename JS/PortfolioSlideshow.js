let slideIndex = 1;

function loadSlides() {//THIS IS CODE TO COLLECT THE DATA NEEDED TO POPULATE THE SLIDESHOW
  let location = sessionStorage.getItem("portfolioNumber"); //Load the correct folder information PORTFOLIONUMBER IS BASED ON THE INDEX
  let htmlToAdd = "";


  if (portfolioJSON[location].onlyImages!== true){//If you have videos, add the videos first
    let videoIndex = 0;

    for (let i=1; i < portfolioJSON[location].captions.length+1; i++){
      if (portfolioJSON[location].videoNumbers[videoIndex] == i){//check if this is a video
        htmlToAdd +=  '<div class="mySlides">' +
                      '<div class="numbertext">' + i + ' / ' + portfolioJSON[location].captions.length + '</div>'+
                      '<video id="video_'+ i +'" width=100% height:auto; controls><source src="'+(portfolioJSON[location].location)+'/'+i+'.mp4" type="video/mp4">Please use a different browser</video></div>'
                      //'<div  class="text captions">'+portfolioJSON[location].captions[i-1]+'</div></div>' Need to find a better way to have captions work since they cover video controls
        document.getElementById("circleButtons").innerHTML+= '<span class="dot" onclick="currentSlide('+ i +')"></span>';
      }
      else {
      }
      videoIndex++;
    }
  }

  videoIndex = 0; //reset the index back to 0 to see which files are videos and which arent

  for (let i=1; i < portfolioJSON[location].captions.length+1; i++){//Afterwards, load the images
    if (portfolioJSON[location].videoNumbers !== undefined && portfolioJSON[location].videoNumbers[videoIndex] == i){//If this specific project has videos and this specific artifact is a video
    } else{
      htmlToAdd +=  '<div class="mySlides">' +
        '<div class="numbertext">' + i + ' / ' + portfolioJSON[location].captions.length + '</div>'+
        '<img src="'+(portfolioJSON[location].location)+'/'+i+'.png" style="max-width:100%; max-height: 55rem; height:auto; display: block; margin-left: auto; margin-right: auto;">'
        if(portfolioJSON[location].captions[i-1] ==""){ //If there is nothing in captions, dont show the captions
          htmlToAdd+= '<div class="text captions" style="display: none;"></div></div>'
        } else{
          htmlToAdd+= '<div class="text captions">'+portfolioJSON[location].captions[i-1]+'</div></div>';
        }
        
        document.getElementById("circleButtons").innerHTML+= '<span class="dot" onclick="currentSlide('+ i +')"></span>';
        
    }
    videoIndex++;
  }


  htmlToAdd += '<a class="prev" onclick="plusSlides(-1)">&larr;</a> <a class="next" onclick="plusSlides(1)">&rarr;</a>';//Add the left and right arrows
  document.getElementById("slideshow-container").innerHTML = htmlToAdd; //Add all of the slides

  document.getElementById("portfolioTitle").textContent = portfolioJSON[location].actualname; //Load the other text information
  document.getElementById("portfolioDescription").innerHTML = portfolioJSON[location].description;
  showSlides(slideIndex);
}



function showSlides(n) {//THIS IS CODE TO ACTUALLY POPULATE THE SLIDESHOW
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot"); //Get all the data from the html page

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
