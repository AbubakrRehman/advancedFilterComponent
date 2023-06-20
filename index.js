let selectedFilters = [];
let filteredItems = [];
const filter__btn__container = document.getElementById("filter__btn__container");
const items__container = document.getElementById("items__container");


//listner for click event on filter button
filter__btn__container.addEventListener("click", (e) => {
    console.log(e.target.classList);
    if (e.target.classList.contains("filter__btn") && !selectedFilters.includes(e.target.innerText)) {
        e.target.classList.add("btn-active");
        console.log("first time filter select");
        selectedFilters = [...selectedFilters, e.target.innerText];
        let filteredItemsTemp = [];
        selectedFilters.forEach((category) => {
            const categoryWiseItems = items.filter((item) => {
                return item.category === category;
            })
            filteredItemsTemp = [...filteredItemsTemp, ...categoryWiseItems];
        });

        filteredItems = [...filteredItemsTemp];

        // console.log(filteredItems);
        renderFilteredItems();
    } else if(e.target.classList.contains("filter__btn")) {
        console.log("first time filter select nai h ");
        e.target.classList.remove("btn-active");
        selectedFilters = selectedFilters.filter((category) => {
            return category !== e.target.innerText;
        });
        console.log(selectedFilters);

        let filteredItemsTemp = [];
        selectedFilters.forEach((category) => {
            const categoryWiseItems = items.filter((item) => {
                return item.category === category;
            });
            console.log("categoryWiseItems", categoryWiseItems);
            filteredItemsTemp = [...filteredItemsTemp, ...categoryWiseItems];
        });

        filteredItems = [...filteredItemsTemp];

        // console.log(filteredItems);
        renderFilteredItems();
    }


});


//function to empty childreen of a parent node.
function emptyNode(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

//function to render filteredItems---DOM manipulation 
function renderFilteredItems() {
    emptyNode(items__container);
    if (filteredItems.length > 0) {
        filteredItems.forEach((filteredItem) => {
            let item = document.createElement("div");
            item.classList.add("item");
            item.innerHTML = `<div class="item__name">${filteredItem.name}</div>
            <div class="item__category">${filteredItem.category}</div>`
            items__container.appendChild(item);
        });
    } else {
        items.forEach((original_item) => {
            let item = document.createElement("div");
            item.classList.add("item");
            item.innerHTML = `<div class="item__name">${original_item.name}</div>
            <div class="item__category">${original_item.category}</div>`
            items__container.appendChild(item);
        });
    }

}

//listner for load event on window
window.addEventListener("load", (e) => {
    renderFilteredItems();
})