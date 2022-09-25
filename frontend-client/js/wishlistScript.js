//Intialize APIs
const getWishlistItemsAPI = "http://localhost/backend/getWishlistItems.php?user_id=" + localStorage.getItem("userID");
const getFavoriteItemsAPI = "http://localhost/backend/getlikedItems.php?user_id=" + localStorage.getItem("userID");

//Intialize variables
const wishlistsUl=document.querySelector(".wishlist_items");

//Get data from the server using axios
axios.get(getWishlistItemsAPI)
.then(response =>  {

    wishlistsUl.innerHTML = "";

    for(let i = 0; i < response.data.length; i++){   
        //Create a new list item and add it to the wishlist container
        const li=document.createElement("li");
        li.innerText=response.data[i].name;
        li.id = response.data[i].id;
        wishlistsUl.appendChild(li);
    }}
    )
.catch((e)=>{
    wishlistsUl.innerHTML = "";

    const li=document.createElement("li");
    li.innerText="No Items";
    wishlistsUl.appendChild(li);
});