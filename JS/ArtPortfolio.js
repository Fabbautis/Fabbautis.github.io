let selectedMedia = sessionStorage.getItem("chosenMedia");
document.addEventListener("DOMContentLoaded", function(){
    displayOneMedia();
})



function changeContent(media) //This code changes what media you are looking at on the portfolio page
{
    let oldSelectedMedia = selectedMedia
    if (oldSelectedMedia == media){ //If the button you pressed is the same thing, then don't reload the page
        return;
    }
    switch (media){
        case 'Illustration':
            selectedMedia = "Illustration"
            break;
        case 'Animation':
            selectedMedia = "Animation"
            break;
        case 'Video':
            selectedMedia = "Video"
            break;
        case '3D':
            selectedMedia = "3D"
            break;
        default:
            selectedMedia = "Illustration"
            break;
    }
    sessionStorage.setItem("chosenMedia", selectedMedia);
    displayOneMedia()
}

function displayOneMedia(){ //This code updates the page content to actually have the stuff you want to look at
    let artSection = document.getElementById("artSection");
    let selectedOptions = [];

    if(selectedMedia == undefined){
        selectedMedia = "Illustration";
    }
    for(let i = portfolioJSON.length-1; i>=0; i--){ //Check which parts of my portfolio coorelate with my media type
        if (portfolioJSON[i].media == selectedMedia)
            selectedOptions.push(portfolioJSON[i]);
    }

    let HTMLToAdd = "";

    for (let i = 0; i< selectedOptions.length; i++){ //Add the relevant portfolio artifacts
        HTMLToAdd +=    '<div class="row"><div class ="col"></div><div class ="col-10">'+
                        '<a href="../HTML/specificart.html">'+
                        '<img id="'+ selectedOptions[i].name +'" src="../Portfolio/'+selectedMedia+'/Thumbnail/'+selectedOptions[i].name+'.png" '+
                        'onclick="sessionStorage.setItem("portfolioNumber","'+ selectedOptions[i].name +'")></a>';

        if (i+1 < selectedOptions.length)
        {
            i++;
            HTMLToAdd+= '<a href="../HTML/specificart.html">'+
                        '<img id="'+ selectedOptions[i].name +'" src="../Portfolio/'+selectedMedia+'/Thumbnail/'+selectedOptions[i].name+'.png" '+
                        'onclick="sessionStorage.setItem("portfolioNumber","'+ selectedOptions[i].name +'")></a>';
        }
        
        if (i+1 < selectedOptions.length){
            i++;
            HTMLToAdd+= '<a href="../HTML/specificart.html">'+
                        '<img id="'+ selectedOptions[i].name +'" src="../Portfolio/'+selectedMedia+'/Thumbnail/'+selectedOptions[i].name+'.png" '+
                        'onclick="sessionStorage.setItem("portfolioNumber","'+ selectedOptions[i].name +'")></a>';
        }
        
        HTMLToAdd+= '</div><div class ="col"></div></div>';
    }
    artSection.innerHTML = HTMLToAdd;

    for(let i = 0; i<selectedOptions.length; i++){
        document.getElementById(selectedOptions[i].name).addEventListener("click", function(){
            sessionStorage.setItem("portfolioNumber", selectedOptions[i].id)
        })
    }
}
