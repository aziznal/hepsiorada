

// search bar highlight effects
(function() {
    var searchInput = document.getElementById("search-input");
    searchInput.addEventListener("focusin", x => onSearchBarFocusIn());

    searchInput.addEventListener("focusout", x => onSearchBarFocusOut());

})();

function onSearchBarFocusIn(){
    document.getElementById("search-bar").style.borderColor = "rgb(253, 87, 26)";
    document.getElementById("search-bar-button").style.backgroundColor = "rgb(253, 87, 26)";
}

function onSearchBarFocusOut(){
    document.getElementById("search-bar").style.borderColor = "gray";
    document.getElementById("search-bar-button").style.backgroundColor = "gray";
}


// account dropdown menu highlight n stuff
(function() {
    var dropdownMenu = document.getElementsByClassName("account-dropdown")[0];

    dropdownMenu.addEventListener("mouseover", x => dropdownMenuMouseover(dropdownMenu));
    dropdownMenu.addEventListener("mouseout", x => dropdownMenuMouseout(dropdownMenu));

})();

function dropdownMenuMouseover(){
    document.getElementById("account-dropdown-arrow").style.visibility = "visible";
    document.getElementById("account-dropdown-collision").style.visibility = "visible";
    document.getElementById("account-overlay").style.display = "block";
}

function dropdownMenuMouseout(){
    document.getElementById("account-dropdown-arrow").style.visibility = "hidden";
    document.getElementById("account-dropdown-collision").style.visibility = "hidden";
    document.getElementById("account-overlay").style.display = "none";
}


// adding event listeners for the menu bar headers:
(function () {
    var headers = document.getElementById("menu-bar-ul").children;

    for (header of headers){
        header.addEventListener("mouseover", x => menuBarHeaderMouseover());
        header.addEventListener("mouseout", x => menuBarHeaderMouseout());
    }

})();

function menuBarHeaderMouseover() {
    document.getElementById("menu-bar-overlay").style.display = "block";

}

function menuBarHeaderMouseout(){
    document.getElementById("menu-bar-overlay").style.display = "none";

}

// Was forced to add event listeners here without a loop
(function() {
    electronicsHeader = document.getElementById("electronic-header");

    electronicsHeader.addEventListener("mouseover", x => electronicsHeaderMouseover());
    electronicsHeader.addEventListener("mouseout", x => electronicsHeaderMouseout());

})();


function electronicsHeaderMouseover(){
    document.getElementById("electronic-custom-dropdown").style.display = "block";
}


function electronicsHeaderMouseout(){
    document.getElementById("electronic-custom-dropdown").style.display = "none";
    
    // hide all miniMenus when the dropdown menu is mouseouted
    var miniMenus = document.getElementsByClassName("electronic-mini-menu");

    for (menu of miniMenus){
        menu.style.display = "none";
    }

}


//#region adding custom event listeners for the electronics menu
(function() {

    // storing header names to loop over them later
    cat_names = [
        "bilgisayar-tablet",
        "yazicilar",
        "telefon",
        "tv-ses",
        "beyaz-esya",
        "ev-aletleri",
        "foto-kamera",
        "klima",
        "oyun-konsollari"
    ];

    function headerSubmenuMouseover(miniMenu, header){
        return function(){
            // TL;DR: while the pop-up menu is hovered on, act like all its parents are hovered on too

            header.style.color = "rgb(253, 87, 26)";
            miniMenu.style.display = "block";

            var rightArrow = header.querySelector('i.electronic-custom-dropdown-right-arrow');
            var rightIndicator = header.querySelector("div.right-border-indicator");

            // note: used .css instead of .style.color because !important doesn't work in the latter
            rightArrow.style.css = "color: rgb(253, 87, 26) !important";
            rightIndicator.style.display = "inline-block";
            
            document.getElementById("electronic-custom-dropdown").style.display = "block";
            document.getElementById("electronic-custom-dropdown").style.width = "100%";

            document.getElementById("electronic-custom-dropdown").style.height = miniMenu.style.height;
            document.getElementById("electronic-custom-dropdown").style.paddingBottom = "50px";
        };
    }

    function headerSubmenuMouseout(miniMenu, header){
        return function(){
            header.style.color = "rgb(63, 63, 63)";
            miniMenu.style.display = "none";

            var rightIndicator = header.querySelector("div.right-border-indicator");
            rightIndicator.style.display = "none";
            
            document.getElementById("electronic-custom-dropdown").style.display = "none";
            document.getElementById("electronic-custom-dropdown").style.width = "auto";

            document.getElementById("electronic-custom-dropdown").style.height = "auto";
            document.getElementById("electronic-custom-dropdown").style.paddingBottom = "0";

        };
    }

    function headerMouseover(header, name){
        return function(){
            miniMenu = document.getElementById("electronic-" + name);
            miniMenu.style.display = "block";

            header.querySelector(".right-border-indicator").style.display = "inline-block";

            /* whenever a miniMenu is onscreen, the width of the dropdown menu
                goes up to 100%*/
            document.getElementById("electronic-custom-dropdown").style.width = "100%";

            /* I've set it up so dropdown menu's height = miniMenu + some padding */
            document.getElementById("electronic-custom-dropdown").style.height = miniMenu.style.height;
            document.getElementById("electronic-custom-dropdown").style.paddingBottom = "50px";

        }
    }

    function headerMouseout(header, name){
        return function(){
            miniMenu = document.getElementById("electronic-" + name);
            miniMenu.style.display = "none";

            header.querySelector(".right-border-indicator").style.display = "none";
            document.getElementById("electronic-custom-dropdown").style.width = "auto";

            document.getElementById("electronic-custom-dropdown").style.height = "auto";
            document.getElementById("electronic-custom-dropdown").style.paddingBottom = "0";

        }
    }

    for (name of cat_names){
        // get header by its ID
        var currentId = "electronic-mini-header-" + name;
        var header = document.getElementById(currentId);

        // create the header's event catcher functions
        const onMouseover = headerMouseover(header, name);
        const onMouseout = headerMouseout(header, name);
        
        // add said function to the event listener
        header.addEventListener("mouseover", onMouseover);
        header.addEventListener("mouseout", onMouseout);


        /* add an event listener for the pop-up menu 
        that comes out when you mouseover the header */
        var miniMenu = miniMenu = document.getElementById("electronic-" + name);

        // again with custom event catcher functions
        const subMouseover = headerSubmenuMouseover(miniMenu, header);
        const subMouseout = headerSubmenuMouseout(miniMenu, header);
        
        // and assign them
        miniMenu.addEventListener("mouseover", subMouseover);
        miniMenu.addEventListener("mouseout", subMouseout);

    }

})();

//#endregion adding custom event listeners for the electronics menu

