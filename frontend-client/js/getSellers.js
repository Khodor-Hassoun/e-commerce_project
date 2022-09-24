const sellerContainer=document.querySelector(".sellers");
const getSellerAPI="http://localhost/backend/getSellers.php";
const getSellerCategoriesAPI="http://localhost/backend/getSellers.php";
const getSellers=()=>{
    axios.get(getSellerAPI)
    .then(response =>  {
        //Show error
        if (response.error != null) {
            console.log("error")
            return
        }
        //Loop over the response
        for(let i = 0; i < response.data.length; i++){
            const img=document.createElement("img");
            img.classList.add("seller");
            img.src = '';
            sellerContainer.appendChild(img);
            img.addEventListener("click",function(){
                getSellerCategories(response.data[i].id)
            },false)
        }
    });
}

const getSellerCategories=(id)=>{
    axios.get(getSellerAPI)
    .then(response =>  {
        //Show error
        if (response.error != null) {
            console.log("error")
            return
        }
        //Loop over the response
        for(let i = 0; i < response.data.length; i++){
            const img=document.createElement("img");
            img.classList.add("seller");
            img.src = '';
            sellerContainer.appendChild(img);
            img.addEventListener("click",function(){
                getSellerCategories(response.data[i].id)
            },false)
        }
    });
    
}
window.addEventListener("load",getSellers);