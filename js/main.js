
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

/******************************************
/* Nav Bar Toggle
/*******************************************/

const primaryNav = document.querySelector(".nav-body")
const navToggle = document.querySelector(".mobile-nav-toggle")

navToggle.addEventListener("click", () => {
    const visibility = primaryNav.getAttribute("data-visible")

    if(visibility === "false"){
        primaryNav.setAttribute("data-visible" , true)  
        navToggle.setAttribute("aria-expanded", true)
      }else{
        primaryNav.setAttribute("data-visible" , false)  
        navToggle.setAttribute("aria-expanded", false)
      }
})

/******************************************
/* Carousel Product Display
/*******************************************/

const track = document.querySelector(".carousel__track")
const slides = Array.from(track.children)
const nextButton = document.querySelector(".carousel__button--right")
const prevButton = document.querySelector(".carousel__button--left")
const nameDisplayNav = document.querySelector(".carousel__nav-by-name--top")
const nameNav = Array.from(nameDisplayNav.children)
const dotsNav = document.querySelector(".carousel__nav--bottom")
const dots = Array.from(dotsNav.children)

const slideWidth = slides[0].getBoundingClientRect().width

// Arrange the slides next to one another

slides.forEach(setSlidePosition)

function setSlidePosition(slides, i) {
  slides.style.left = slideWidth * i + "px"
}

function moveToSlide(track, currentSlide, targetSlide){
  track.style.transform = `translateX( -${targetSlide.style.left})`
  currentSlide.classList.remove("current-slide")
  targetSlide.classList.add("current-slide")
}

function updateDots(currentDot, targetDot){
  currentDot.classList.remove("current-slide")
  targetDot.classList.add("current-slide") // Error Accures here wherer we get null on classlist
}

function hideShowArrows(slides, prevButton, nextButton, targetIndex){
  if(targetIndex === 0) {
    prevButton.classList.add("is-hidden")
    nextButton.classList.remove("is-hidden")
  }else if(targetIndex === slides.length-1){
    prevButton.classList.remove("is-hidden")
    nextButton.classList.add("is-hidden")
  }else{
    prevButton.classList.remove("is-hidden")
    nextButton.classList.remove("is-hidden")
  }
}

/* Update Nav button class .currrent-slide  !!! Note this is maybe what is needed so wwe dont get the type Error 

Error comes up when we click on the nav bar button and then use the arrow key buttons, somethign isent tracking or matching upwith eachother. 

- Note the code line that keeps running into error seasm to be 68 consistently and then after clicking again after this error the error appears on another line where the element is being use in another variable

- Additional notice: 
    -It seams that the error is happening through the currentDot function when trying to select previousElementSibling or another method of the sort.

      Idea for Fix

        1. Create a function or process that happens if we run into such an error Either when we get the first line 68 error or on the secondary error... 


        2. We can check if insuring that both nav and product display page update eachothers class so they match the page they are with; insure the dots are also doing this.

        3. Dots class not updating when selecting through nav bar? Mayube we need to insure it is updating when clicking nav as well. 
          -To add it does seam that we do not run into same error when using the dots as oppose to the nav, so this error is accuring specifically when using the nav options,m something might not be updating or sincking together
            -Confirmed the dots dont update when using nav




Uncaught TypeError: Cannot read properties of null (reading 'classList')
    at updateDots (main.js:68:13)
    at HTMLButtonElement.<anonymous> (main.js:93:3)

    and

    Uncaught TypeError: Cannot read properties of null (reading 'previousElementSibling')
    at HTMLButtonElement.<anonymous> (main.js:89:30)
    
    */


// When I click left, move slides to the left
prevButton.addEventListener("click", e => {
  const currentSlide = track.querySelector(".current-slide")
  const prevSlide = currentSlide.previousElementSibling
  const currentDot = dotsNav.querySelector(".current-slide")
  const prevDot = currentDot.previousElementSibling
  const prevIndex = slides.findIndex(slide => slide === prevSlide)

  moveToSlide(track, currentSlide, prevSlide)
  updateDots(currentDot, prevDot)
  hideShowArrows(slides, prevButton, nextButton, prevIndex)

})


// When I click right, move slides to the right
nextButton.addEventListener("click", e => {
  const currentSlide = track.querySelector(".current-slide")
  const nextSlide = currentSlide.nextElementSibling
  const currentDot = dotsNav.querySelector(".current-slide")
  const nextDot = currentDot.nextElementSibling 
  const nextIndex = slides.findIndex(slide => slide === nextSlide)

  moveToSlide(track, currentSlide, nextSlide)
  updateDots(currentDot, nextDot)
  hideShowArrows(slides, prevButton, nextButton, nextIndex)
})

// When click on nav options type, move display to appropriate slide
nameDisplayNav.addEventListener("click", e => {

  // What indicator was clicked on
  const targetName = e.target.closest("li")

  if(!targetName) return

  const currentSlide = track.querySelector(".current-slide")
  const currentName = nameDisplayNav.querySelector(".current-slide")
  const targetIndex = nameNav.findIndex( el => el === targetName)
  const targetSlide = slides[targetIndex]

  moveToSlide(track, currentSlide, targetSlide)
  updateDots(currentName, targetName)
  hideShowArrows(slides, prevButton, nextButton, targetIndex)

})


// When click the nav dots indicators, move to that slide
dotsNav.addEventListener("click", e => {
  
  
  // What indicator was clicked on?
  const targetDot = e.target.closest("button")

  if(!targetDot) return;


  const currentSlide = track.querySelector(".current-slide")
  const currentDot = dotsNav.querySelector(".current-slide")
  const targetIndex = dots.findIndex(dot => dot === targetDot)
  const targetSlide = slides[targetIndex]

  moveToSlide(track, currentSlide, targetSlide)
  updateDots(currentDot, targetDot)
  hideShowArrows(slides, prevButton, nextButton, targetIndex)
})

