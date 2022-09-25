const getSellerAPI="http://localhost/backend/getSellers.php";
const getSellerCategoriesAPI="http://localhost/backend/getCategories.php";
const getRandomProductsAPI="http://localhost/backend/getRandProducts.php";
const getProductsByCatAPI = "http://localhost/backend/getProductsByCat.php";
const sellerContainer=document.querySelector(".sellers");
const categoriesUl=document.querySelector(".categories_list");
const productsDiv=document.querySelector(".products");
const imagesGenertor = ["https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSla-p7MqWVSLL2rpSQHlxEO6mKceKYPvZjo4oslefoeXE7-oMcRHP5IfT3qgllHC8kKvQ&usqp=CAU",
"https://www.w3schools.com/howto/img_avatar.png",
"https://www.w3schools.com/w3images/avatar6.png",
"https://www.w3schools.com/howto/img_avatar2.png",
"https://st2.depositphotos.com/1006318/5909/v/450/depositphotos_59094961-stock-illustration-businesswoman-profile-icon.jpg",
"https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-businessman-avatar-icon-flat-style-png-image_1917273.jpg",
"https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"];
let data;

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
            img.src = imagesGenertor[Math.floor(Math.random()*imagesGenertor.length)];;
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
    axios.get(getSellerCategoriesAPI + "?id=" + id)
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
                li.classList.add("categoriesItem");
                categoriesUl.appendChild(li);
            
        }
        else{
            categoriesUl.innerHTML = "";

            const header =document.createElement("h4");
            header.innerText= "Categories";
            header.classList.add("categoriesHeader");
            categoriesUl.appendChild(header);
            for(let i = 0; i < response.data.length; i++){   
                const li=document.createElement("li");
                li.innerText=response.data[i].name;
                li.id = response.data[i].id;
                li.classList.add("categoriesItem");
                li.classList.add("hover-underline-animation");
                categoriesUl.appendChild(li);

                li.addEventListener("click", (event) => {
                    productsDiv.innerHTML = "";
                    const data = new FormData();
                    data.append("seller_id", id);
                    data.append("category_id", response.data[i].id);

                    axios.post(getProductsByCatAPI, data)
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

                })
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