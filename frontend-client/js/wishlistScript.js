//Intialize APIs
const getWishlistItemsAPI = "http://localhost/backend/getWishlistItems.php?user_id=" + localStorage.getItem("userID");
const getFavoriteItemsAPI = "http://localhost/backend/getlikedItems.php?user_id=" + localStorage.getItem("userID");

//Intialize variables
const wishlistsUl = document.querySelector(".wishlist_items");
const favoritessUl = document.querySelector(".favorite_items");
const homeButton = document.querySelector(".header_cart");
const config = {
    headers: {
      Authorization: localStorage.getItem("token")
    }
}

//Click on the title to go back to the landing page
homeButton.onclick = function() {
    window.location.replace("landingPage.html");
}

//Get data from the server using axios
axios.get(getWishlistItemsAPI, config)
.then(response =>  {

    wishlistsUl.innerHTML = "";

    for(let i = 0; i < response.data.length; i++){   
        //Create a new list item and add it to the wishlist container
        const li=document.createElement("li");
        li.innerHTML= response.data[i].name + "<br/>" + "Price:" + response.data[i].price + "$";
        li.id = response.data[i].id;
        wishlistsUl.appendChild(li);
    }}
    )
.catch((e)=>{
    wishlistsUl.innerHTML = "";

    //If there was an error, send back a message that there are no items
    const li=document.createElement("li");
    li.innerText="No Items";
    wishlistsUl.appendChild(li);
});

//Get data from the server using axios
axios.get(getFavoriteItemsAPI, config)
.then(response =>  {

    favoritessUl.innerHTML = "";

    for(let i = 0; i < response.data.length; i++){   
        //Create a new list item and add it to the favorites container
        const li=document.createElement("li");
        li.innerHTML= response.data[i].name + "<br/>" + "Price:" + response.data[i].price + "$";
        li.id = response.data[i].id;
        favoritessUl.appendChild(li);
    }}
    )
.catch((e)=>{
    favoritessUl.innerHTML = "";

    //If there was an error, send back a message that there are no items
    const li=document.createElement("li");
    li.innerText="No Items";
    favoritessUl.appendChild(li);
});