const sellerContainer=document.querySelector(".sellers");
const getSellerAPI="http://localhost/backend/getSellers.php";
const getSellers=()=>{
    axios.get(getSellerAPI)
    .then(response =>  {
        console.log(response.data)
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
        }
    });
}
window.addEventListener("load",getSellers);