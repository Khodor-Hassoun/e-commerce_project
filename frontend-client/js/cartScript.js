//Intialize APIs
const getCartItemsAPI = "http://localhost/e-commerce_project/backend/getCartItems.php?user_id=" + localStorage.getItem("userID");

//Intialize variables
const cartUl = document.querySelector(".cart_items");
const homeButton = document.querySelector(".header_cart");
const config = {
    headers: {
      Authorization: localStorage.getItem("token")
    }
}
let total = 0;

//Click on the title to go back to the landing page
homeButton.onclick = function() {
    window.location.replace("landingPage.html");
}

//Get data from the server using axios
axios.get(getCartItemsAPI, config)
.then(response =>  {

    cartUl.innerHTML = "";

    for(let i = 0; i < response.data.length; i++){   
        //Create a new list item and add it to the cart container
        const li=document.createElement("li");
        li.innerHTML= response.data[i].name + "<br/>" + "Price:" + response.data[i].price + "$";
        li.id = response.data[i].id;
        cartUl.appendChild(li);

        total += response.data[i].price;
    }

    const h4=document.createElement("h4");
    h4.textContent = "Total price: " + total + "$";
    cartUl.appendChild(h4);

}
)
.catch((e)=>{
    cartUl.innerHTML = "";

    //If there was an error, send back a message that there are no items
    const li=document.createElement("li");
    li.innerText="No Items";
    cartUl.appendChild(li);
});