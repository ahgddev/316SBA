let side_menu_tab = document.getElementById("side_menu_tab");
let inner_menu = document.getElementById("inner_menu");
let menu_close = document.getElementById("close_menu");
let inner_menu_links = document.querySelectorAll("ul li");

side_menu_tab.addEventListener("click", function(event){
    side_menu_tab.classList.add("side_slide");
    side_menu_tab.style.left = "-100px";
    inner_menu.classList.add("side_slide_in");
    inner_menu.style.left = "30px";
});

menu_close.addEventListener("click",function(event){
    inner_menu.classList.remove("side_slide_in");
    inner_menu.classList.add("side_slide_out");
    inner_menu.style.left = "-150px";
    side_menu_tab.classList.remove("side_slide_out");
    side_menu_tab.classList.add("side_slide_in");
    side_menu_tab.style.left = "10px";
});

for(link of inner_menu_links){
    console.log(inner_menu_links)
    console.log(link)
    link.addEventListener("mouseenter", function(event){
        event.currentTarget.classList.add("active");
    });
    link.addEventListener("mouseleave", function(event){
        console.log(link)
        event.currentTarget.classList.remove("active");
    });
}
