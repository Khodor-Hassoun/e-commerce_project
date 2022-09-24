const sellerContainer=document.querySelector(".sellers");
const getSellerAPI="http://localhost/backend/getSellers.php";
const getSellerCategoriesAPI="http://localhost/backend/getCategories.php";
const getRandomProductsAPI="http://localhost/backend/getRandProducts.php";
const categoriesUl=document.querySelector(".categories_list");
const productsDiv=document.querySelector(".products");
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
    const data = new FormData();
    data.append("id", id);
    axios.post(getSellerCategoriesAPI,data)
    .then(response =>  {
        //Show error
        if (response.error != null) {
            console.log("error")
            return
        }
        if(response.data.length==0){
                categoriesUl.innerHTML = "";
                const li=document.createElement("li");
                li.innerText="No Categories";
                li.style.fontSize="smaller";
                categoriesUl.appendChild(li);
            
        }
        else{
            categoriesUl.innerHTML = "";
            for(let i = 0; i < response.data.length; i++){   
                    const li=document.createElement("li");
                    li.innerText=response.data[i].name;
                    li.style.fontSize="smaller";
                    categoriesUl.appendChild(li);
            }
        }
    });
    
}

const getRandomProducts=()=>{
    axios.get(getRandomProductsAPI)
    .then(response =>  {
        //Show error
        if (response.error != null) {
            console.log("error")
            return
        }
        //Loop over the response
        for(let i = 0; i < response.data.length; i++){
            const product=document.createElement("div");
            product.classList.add("product");
            productsDiv.appendChild(product);
            const image=document.createElement("img");
            image.classList.add("product_image");
            image.src = response.data[i].thumbnail;
            product.appendChild(image);
            const productDesc=document.createElement("div");
            productDesc.classList.add("product_desc");
            product.appendChild(productDesc);
            const h4=document.createElement("h4");
            h4.innerText=response.data[i].name;
            const span=document.createElement("span");
            span.innerText=response.data[i].price;
            productDesc.appendChild(h4);
            productDesc.appendChild(span);

        }
    });
}
const loadPage=()=>{
    getSellers();
    getRandomProducts();
}
window.addEventListener("load",loadPage);