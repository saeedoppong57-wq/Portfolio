const header = document.querySelector("header");
const hamburger = document.querySelector(".hamburger");

function toggleMenu(){
    header.classList.toggle("active");
}

/* CLICK OUTSIDE SIDEBAR TO CLOSE */
document.addEventListener("click", function(e){

    const clickInsideSidebar = header.contains(e.target);
    const clickHamburger = hamburger.contains(e.target);

    if(!clickInsideSidebar && !clickHamburger){
        header.classList.remove("active");
    }

});
