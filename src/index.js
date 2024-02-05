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
let priceTitle = document.getElementById("price");
let saleAlert = document.createElement("p");
let qtyAlert = document.createElement("p");
let item_title = document.getElementById("item_title");
let stockBtn = document.getElementById("stock_info");
let qty_input = document.getElementById("qty_input");
let insert = document.getElementById("insert");



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
        console.log(link)
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
        return true;
    } else if(stock == 0) {
        stockBtn.innerText = "Out of Stock";
        stockBtn.disabled = true;
        priceTitle.style.color = "grey";
    }
    else {
        stockBtn.innerText = "In Stock";
        stockBtn.disabled = false;
        qtyAlert.innerText = ""
        priceTitle.style.color = "black";
        return false
    }
}

function changePrice(price, sale){
    if(sale[0] == false){
        priceTitle.innerHTML = `<h1><s>$15.99</s> $${price} </h1>`;
    } else {
        
        priceTitle.innerHTML = `<h1><s>$15.99</s> $${price} </h1>`;
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
    item_title.innerHTML = `<h1>Plush Toy ${colorSelection.charAt(0).toUpperCase() + colorSelection.slice(1)}</h1>`;
    debugger
    if(isQtyOverStock(userQTY, colorStock)){
        qtyAlert.innerText = "Qty too much. Please choose a lower amount."
    }
    setSaleMsg(colorSale)
    priceTitle.append(qtyAlert, saleAlert)
}

color_dropdown.addEventListener("change", function(event){
    let userQty = document.getElementById("qty_input").value;
    changeItemInfoDueToColor(userQty);
});