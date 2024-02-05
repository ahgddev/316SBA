let side_menu_tab = document.getElementById("side_menu_tab");
let inner_menu = document.getElementById("inner_menu");
let menu_close = document.getElementById("close_menu");
let inner_menu_links = document.querySelectorAll("ul li");
let color_dropdown = document.getElementById("color_dropdown");
let itemStock = [
    {color:"purple", stock: 0, price:"5.99", on_sale: [false, null]},
    {color:"green", stock: 3, price:"3.99", on_sale: [true, "reduced"]},
    {color:"blue", stock: 10, price:"15.99", on_sale: [true, "BOGO"]},
    {color:"pink", stock: 8, price:"5.99", on_sale: [true, "reduced"]}
];
let itemIMGs = [["purple","/images/purple1.jpg","/images/purple2.jpg","/images/purple3.jpg","/images/purple4.jpg"],["green","/images/green1.jpg","/images/green2.jpg","/images/green3.jpg","/images/green4.jpg"],["blue","/images/blue1.jpg","/images/blue2.jpg","/images/blue3.jpg","/images/blue4.jpg"],["pink","/images/pink1.jpg","/images/pink2.jpg","/images/pink3.jpg","/images/pink4.jpg"]];
let currentImgIndex = 1;
let itemProductIMG = document.getElementById("pimg");
let priceTitle = document.getElementById("price");
let saleAlert = document.createElement("p");
let qtyAlert = document.createElement("p");
let item_title = document.getElementById("item_title");
let stockBtn = document.getElementById("stock_info");
let qty_input = document.getElementById("qty_input");
let cartBtn = document.getElementById("cart_button");
let cycleBtn = document.getElementById("cycle");

//Load up default values for Purple on page load since it's the color chosen by default.
window.onload = function(){
    isQtyOverStock(1, itemStock[0].stock);
    priceTitle.innerHTML = `<h1><s>$15.99</s> $${itemStock[0].price} </h1>`;
    qty_input.value = 1;
}

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
    link.addEventListener("mouseenter", function(event){
        event.currentTarget.classList.add("active");
    });
    link.addEventListener("mouseleave", function(event){
        event.currentTarget.classList.remove("active");
    });
}

function setSaleMsg(sale){
    switch (sale[1]){
           case "reduced":
            saleAlert.innerText = `Reduced Price`;
            break;
           case "BOGO":
            saleAlert.innerText = `Buy One, Get One FREE!`;
            break;
           case null:
            saleAlert.innerHTML = ``;
            break;
        }
}

function isQtyOverStock(currentQty, stock){
    debugger
    if(currentQty > stock){
        priceTitle.style.color = "grey";
        if (stock == 0) {
            stockBtn.innerText = "Out of Stock";
            stockBtn.disabled = true;
            priceTitle.style.color = "grey";
        }
        cartBtn.disabled = true;
        return true;
    } 
    else {
        stockBtn.innerText = "In Stock";
        stockBtn.disabled = false;
        qtyAlert.innerText = ""
        priceTitle.style.color = "black";
        cartBtn.disabled = false;
        return false
    }
}

function changeItemInfoDueToColor(userQTY){
    let colorSelection = color_dropdown[color_dropdown.selectedIndex].value;
    let colorStock = "";
    let colorPrice = "";
    let colorSale = "";
    for(item of itemStock){
        if(item.color == colorSelection){
            colorStock = item.stock;
            colorPrice = item.price;
            colorSale = item.on_sale;
        }
    }
    console.log(colorPrice)
    if(colorPrice == "15.99"){
        priceTitle.innerHTML = `<h1> $${colorPrice} </h1>`;
    } else {
        priceTitle.innerHTML = `<h1><s>$15.99</s> $${colorPrice} </h1>`;
    }
    
    item_title.innerHTML = `<h1>Plush Toy ${colorSelection.charAt(0).toUpperCase() + colorSelection.slice(1)}</h1>`;
    if(isQtyOverStock(userQTY, colorStock)){
        qtyAlert.innerText = "Qty too much. Please choose a lower amount."
    }
    setSaleMsg(colorSale);
    priceTitle.append(qtyAlert, saleAlert);
    setImageColor(colorSelection)
}

color_dropdown.addEventListener("change", function(event){
    let userQty = document.getElementById("qty_input").value;
    changeItemInfoDueToColor(userQty);
});

//Product Image Scripting
function setImageColor(color){
    for (colorID of itemIMGs){
        if(colorID[0] == color){
            itemProductIMG.src = colorID[1];
            return colorID;
        }
    }  
}

cycleBtn.addEventListener("click", function(event){
    let currentColor = setImageColor(color_dropdown[color_dropdown.selectedIndex].value);
        currentImgIndex += 1;
    if(currentImgIndex > currentColor.length - 1){
        currentImgIndex = 1;
    }
    itemProductIMG.src = colorID[currentImgIndex];   
});

//Set up bottom related products with DocumentFragments
let plushColors = [["Orange","/images/orange.jpg"], ["Black","/images/black.jpg"], ["Grey","/images/grey.jpg"], ["Red","/images/red.jpg"],["Brown","/images/brown.jpg"]];

let productContainer = document.getElementById("product_container")

let productFrag = new DocumentFragment();
plushColors.forEach((plushData) => {
    let holdDiv = document.createElement("div");
    let pImg = document.createElement("img");
    pImg.style.width = "100px";
    pImg.style.height = "100px";
    pImg.src = plushData[1];
    let pTitle = document.createElement("h2");
    pTitle.innerHTML = `Plush Toy ${plushData[0]}`;
    holdDiv.append(pImg, pTitle);
    productFrag.appendChild(holdDiv);
})

productContainer.appendChild(productFrag);
