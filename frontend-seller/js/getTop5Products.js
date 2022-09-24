const gridContainer=document.querySelector(".grid-container");
const getAPI="http://localhost/backend/getTop5Products.php";
const getTopProducts=()=>{
    const data = new FormData();
    data.append("seller_id", 2);
    axios.post(getAPI,data)
    .then(response =>  {
        //Show error
        if (data.error != null) {
            console.log("error")
            return
        }
        //Loop over the response
        for(let i = 0; i < response.data.length; i++){
            // console.log(response.data[i].price)
            
        }
    });
}
window.addEventListener("load",getTopProducts);