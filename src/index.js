let side_menu_tab = document.getElementById("side_menu_tab");

side_menu_tab.addEventListener("click", function(event){
    side_menu_tab.classList.add("side_slide");
    side_menu_tab.style.left = "-100px"
});
