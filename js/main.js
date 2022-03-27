
/*----------------------------      Home Section Tab       -------------------------------*/
(() => {
    const hamburgerBtn = document.querySelector(".hamburger-btn"),
    navMenu = document.querySelector(".nav-menu"),
    closeNavBtn = navMenu.querySelector(".close-nav-menu"),
    fadeOut = document.querySelector(".fade-out-effect");

    //  Show and Hide Navigation by on click:
    hamburgerBtn.addEventListener("click", showNavMenu);
    closeNavBtn.addEventListener("click", hideNavMenu)

    //  Function to Show Nav Menu:
    function showNavMenu () {
        navMenu.classList.toggle("open");
        bodyScrollingToggle();
    }

    //  Function to Hide Nav Menu:
    function hideNavMenu () {
        navMenu.classList.remove("open");
        fadeOutEffect();
        bodyScrollingToggle();
    }

    //  Function For Fade Out Effect:
    function fadeOutEffect () {
        fadeOut.classList.add("active");
        setTimeout(() => {
            fadeOut.classList.remove("active");
        }, 300)
    }

    //  attach an event handler to document:
    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("link-item")) {
            if (event.target.hash !== "") {
                event.preventDefault();
                const hash = event.target.hash;
                //  deactivate existing active 'section' 
                document.querySelector(".section.active").classList.add("hide");
                document.querySelector(".section.active").classList.remove("active");
            
                //  activate new 'Section'
                document.querySelector(hash).classList.add("active");
                document.querySelector(hash).classList.remove("hide");
            
                //  deactivate existing active navigation
                navMenu.querySelector(".active").classList.add("outer-shadow", "hover-in-shadow");
                navMenu.querySelector(".active").classList.remove("active", "inner-shadow");

                //  if clicked 'link-item' is contained without navigation menu
                if (navMenu.classList.contains("open")) {
                    //  activate new navigation menu 'link-item':
                    event.target.classList.add("active", "inner-shadow");
                    event.target.classList.remove("outer-shadow", "hover-in-shadow");
                    
                    //  hide navigation menu
                    hideNavMenu();
                } else {
                    let navItem = navMenu.querySelectorAll(".link-item");
                    navItem.forEach((item) => {
                        if (hash === item.hash) {
                            //  activate new navigation menu
                            item.classList.add("active", "inner-shadow");
                            item.classList.remove("outer-shadow", "hover-in-shadow");
                        }
                    })
                    fadeOutEffect();
                }
                //  add hash (#) to url
                window.location.hash = hash;
            }
        }
    })
})();






/*----------------------------      About Section Tab       -------------------------------*/
(() =>{
    const aboutSection = document.querySelector(".about-section"),
    tabsContainer = document.querySelector(".about-tabs");

    tabsContainer.addEventListener("click", (event) => {
        if(event.target.classList.contains("tab-item") && !event.target.classList.contains("active")){
            const target = event.target.getAttribute("data-target");
            
            //  deactivate existing active "tab-item"
            tabsContainer.querySelector(".active").classList.remove("outer-shadow", "active");
            
            //  activate new "tab-item"
            event.target.classList.add("active", "outer-shadow");

            //  deactivate existing active "tab-content"
            aboutSection.querySelector(".tab-content.active").classList.remove("active");
            
            //  activate new "tab-content"
            aboutSection.querySelector(target).classList.add("active");
        }
    })
})();


//  Function for body scrolling Toggle:
function bodyScrollingToggle() {
    document.body.classList.toggle("hidden-scrolling")
}






/*----------------------------      Portfolio filter and Popup       -------------------------------*/
(() => {
    const filterContainer = document.querySelector(".portfolio-filter"),
    portfolioItemsContainer = document.querySelector(".portfolio-items"),
    portfolioItems = document.querySelectorAll(".portfolio-item"),
    popup = document.querySelector(".portfolio-popup"),
    prevBtn = popup.querySelector(".pp-prev"),
    nextBtn = popup.querySelector(".pp-next"),
    closeBtn = popup.querySelector(".pp-close"),
    projectDetailsContainer = popup.querySelector(".pp-details"),
    projectDetailsBtn = popup.querySelector(".pp-project-details-btn");
    let itemIndex, slideIndex, screenshots;

    /*  filter portfolio items  */
    filterContainer.addEventListener("click", (event) => {
        if(event.target.classList.contains("filter-item") && !event.target.classList.contains("active")){
            //  deactivate existing active 'filter-item'
            filterContainer.querySelector(".active").classList.remove("outer-shadow", "active");
            
            //  activate new 'filter-item'
            event.target.classList.add("active", "outer-shadow");
            const target = event.target.getAttribute("data-target");
            portfolioItems.forEach((item) => {
                if(target === item.getAttribute("data-category") || target === 'all'){
                    item.classList.remove("hide");
                    item.classList.add("show");
                }else{
                    item.classList.remove("show");
                    item.classList.add("hide");
                }
            })
            
        }
    })

    //  for Portfolio Items Container:
    portfolioItemsContainer.addEventListener("click", (event) => {
        if(event.target.closest(".portfolio-item-inner")){
            const portfolioItem = event.target.closest(".portfolio-item-inner").parentElement;
            //  get the portfolioItem Index
            itemIndex   = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
            screenshots = portfolioItems[itemIndex].querySelector(".portfolio-item-img img").getAttribute("data-screenshots");
           //   convert screenshot into array
           screenshots = screenshots.split(",");
           if(screenshots.length === 1){
               prevBtn.style.display = "none";
               nextBtn.style.display = "none";
           }else{
               prevBtn.style.display = "block";
               nextBtn.style.display = "block";
           }
           slideIndex = 0;
            popupToggle();
            popupSlideshow();
            popupDetails();
        }
    })

    //  Close Button Handler:
    closeBtn.addEventListener("click", () =>{
        popupToggle();
        if(projectDetailsContainer.classList.contains("active")){
            popupDetailsToggle();
        }
    })

    //  Popup Function:
    function popupToggle() {
        popup.classList.toggle("open");
        bodyScrollingToggle();
    }

    //  popup slideshow Function:
    function popupSlideshow() {
        const imgSrc = screenshots[slideIndex];
        const popupImg = popup.querySelector(".pp-img");
        /*  activate loader until the popupImg loaded   */
        popup.querySelector(".pp-loader").classList.add("active")
        popupImg.src = imgSrc;
        popupImg.onload = () => {
            //  deactivate loader after the popImg loaded
            popup.querySelector(".pp-loader").classList.remove("active");
        }
        popup.querySelector(".pp-counter").innerHTML = (slideIndex + 1) + " Of " + screenshots.length;
    }

    //  next slide
    nextBtn.addEventListener("click", () => {
        if(slideIndex === screenshots.length - 1){
            slideIndex = 0;
        }else{
            slideIndex++;
        }
        popupSlideshow();
    })

    //  prev slide
    prevBtn.addEventListener("click", () => {
        if(slideIndex === 0){
            slideIndex = screenshots.length - 1
        }else{
            slideIndex--;
        }
        popupSlideshow();
    })


    //  Function For Popup Details:
    function popupDetails(){
        //  get the project details
        const details = portfolioItems[itemIndex].querySelector(".portfolio-item-details").innerHTML;
        //  set the project details
        popup.querySelector(".pp-project-details").innerHTML = details;
        //  get the project title
        const title = portfolioItems[itemIndex].querySelector(".portfolio-item-title").innerHTML;
        //  set the project title
        popup.querySelector(".pp-title h2").innerHTML = title;
        //  get the project category
        const category = portfolioItems[itemIndex].getAttribute("data-category");
        //  set the project category
        popup.querySelector(".pp-project-category").innerHTML = category.split("-").join(" ");
        
        //  if portfolio-Item-details not exists
        if(!portfolioItems[itemIndex].querySelector(".portfolio-item-details")){
            projectDetailsBtn.style.display = "none";
            return;
        }
        projectDetailsBtn.style.display = "block";
    }

    //  popup details
    projectDetailsBtn.addEventListener("click", () => {
        popupDetailsToggle();
    })
    
    //  Function For Popup Details Toggle:
    function popupDetailsToggle(){
        if(projectDetailsContainer.classList.contains("active")){
            projectDetailsContainer.classList.remove("active");
            projectDetailsContainer.style.maxHeight = 0 + "px";
            projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
            projectDetailsBtn.querySelector("i").classList.add("fa-plus");
        }else{
            projectDetailsContainer.classList.add("active");
            projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";
            popup.scrollTo(0, projectDetailsContainer.offsetTop);
            projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
            projectDetailsBtn.querySelector("i").classList.add("fa-minus");
        }
    }
})();







/*----------------------------      Testimonial Section       -------------------------------*/
(() => {
    const sliderContainer =  document.querySelector(".testi-slider-container"),
    slides = sliderContainer.querySelectorAll(".testi-item"),
    slideWidth = sliderContainer.offsetWidth,
    prevBtn = document.querySelector(".testi-slider-nav .prev"),
    nextBtn = document.querySelector(".testi-slider-nav .next"),
    activeSlide = sliderContainer.querySelector(".testi-item.active");
    let slideIndex = Array.from(activeSlide.parentElement.children).indexOf(activeSlide);

    //  set width of all slides
    slides.forEach((slide) => {
        slide.style.width = slideWidth + "px";
    })

    //  set width of sliderContainer
    sliderContainer.style.width = slideWidth * slides.length + "px";
    
    //  Next Button Implementation:
    nextBtn.addEventListener("click", () => {
        if(slideIndex === slides.length - 1){
            slideIndex = 0;
        }else{
            slideIndex++;
        }
        slider();
    })

    //  Prev Button Implementation:
    prevBtn.addEventListener("click", () => {
        if(slideIndex === 0) {
            slideIndex = slides.length - 1;
        }else{
            slideIndex--;
        }
        slider();
    })

    //  Slider Implementation:
    function slider(){
        //  deactivate existing active slides
        sliderContainer.querySelector(".testi-item.active").classList.remove("active");

        //  Activate new slide
        slides[slideIndex].classList.add("active");
        sliderContainer.style.marginLeft = - (slideWidth * slideIndex) + "px";
    }
    slider();
})();






/*----------------------------  hide all sections except active  ---------------------------------*/
(() => {
    const section = document.querySelectorAll(".section");
    section.forEach((section) => {
        if (!section.classList.contains("active")) {
            section.classList.add("hide");
        }
    })
})();




/*------------------------------------------  PreLoader  ----------------------------------------*/
window.addEventListener("load", () => {
    document.querySelector(".preloader").classList.add("fade-out");
    setTimeout(() => {
        document.querySelector(".preloader").style.display = "none";
    }, 600)
})