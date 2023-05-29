
/******************************************
/* Interactive styling
/*******************************************/

// Underline show up when hoevering over interactible links


// document.querySelector(".hoverGlow").addEventListener("mouseover", hoverGlow)

// function hoverGlow(){
//     document.querySelector(".hoverGlow li").style.text-decoration: "underline";
// }


/******************************************
/* Parallax
/*******************************************/

const parallax = document.getElementById("parallax") 
const parallax02 = document.getElementById("parallax02") 


window.addEventListener("scroll", paralaxScroll)

function paralaxScroll(){
    let offset = window.pageYOffset;
    parallax.style.backgroundPositionY = offset * 0.7 +"px"
    parallax02.style.backgroundPositionY = offset * 0.7 +"px"
}