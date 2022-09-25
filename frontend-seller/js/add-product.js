// Variables for hiding and showinng popup / addding products
const addProduct = document.querySelector('.add-icon');
const backBtn = document.querySelector('.close-btn-pop');
const popupContainer = document.querySelector('.popup-container');
const thumbDiv = document.querySelector('.thumbnail-div');
const gridContainer = document.querySelector(".grid-container")
const submitBtn = document.getElementById('submit-btn')
const popupContainer2 = document.querySelector('.popup-container2')
const backBtn2 = document.querySelector('.close-btn-pop-two');

// Apis used in this page
const getCategory = "http://localhost/e-commerce_project/backend/getCategories.php"
const addpProductApi = 'http://localhost/e-commerce_project/backend/addProductByCategory.php'
const getProductsApi = 'http://localhost/e-commerce_project/backend/getProductsOfSeller.php'
const getProductLikes = 'http://localhost/e-commerce_project/backend/getProductLikes.php'
const deleteProductApi = 'http://localhost/e-commerce_project/backend/deleteProduct.php'
const getProductViews = 'http://localhost/e-commerce_project/backend/getProductViews.php'
const editProductApi = 'http://localhost/e-commerce_project/backend/editProduct.php'

// Variables for add product api
const thumbnail = document.getElementById('thumbnail');
const prodName = document.querySelector('#name');
const description = document.querySelector('#desc')
const catName = document.getElementById("category");
const quantity = document.getElementById("quantity");
const price = document.getElementById('price')
const thumbDiv2 = document.querySelector('.thumbnail-div-two');
const editProdId = document.getElementById("edit-prod-id")
const editSellerId = document.getElementById("seller-id")

let image64= ''
const productForm = document.getElementById('add-form')

// Variable for edit form
const editForm = document.getElementById('edit-form')
const editFormBtn = document.getElementById('edit-btn')
const thumbnail2 = document.getElementById('thumbnail-two');
const prodName2 = document.querySelector('#name-two');
const description2 = document.querySelector('#desc-two')
const catName2 = document.getElementById("category-two");
const quantity2 = document.getElementById("quantity-two");
const price2 = document.getElementById('price-two')
let image642 = ''
thumbnail2.addEventListener('change',()=>{
    const file = thumbnail.files[0]
    const reader = new FileReader()

    reader.addEventListener('load',()=>{
        console.log(reader.result)
        thumbDiv2.src= `${reader.result}`
        image642 = reader.result
    })

    reader.readAsDataURL(file)
})


// Arrays for the delete and edit buttons
const deleteBtns = document.getElementsByClassName('delete')
const editBtns = document.getElementsByClassName('edit')

// Array of objects for get category api
const catNameArray = []

// For hiding and showing the popup
addProduct.addEventListener('click',()=>{
    popupContainer.classList.add('show')
})

backBtn.addEventListener('click',()=>{
    popupContainer.classList.remove('show')
})

submitBtn.addEventListener('click',()=>{
    popupContainer.classList.remove('show')
})
backBtn2.addEventListener('click',()=>{
    popupContainer2.classList.remove('show')
})
editFormBtn.addEventListener('click',()=>{
    popupContainer2.classList.remove('show')
})

const config={
    headers:{
        Authorization: localStorage.getItem("token")
    }
}

// Get the categories from getCategory and place them in category select form
axios.get(getCategory,{
    params: {
		id: 41 // CRITICAL TO BE LOCAL STORAGE ID/////////////////////////////////////////////////////
	}
})
.then(res=>{
    // res.data returns an array of objects
    for(let object of res.data){
        const catOption = document.createElement('option')
        // get category id
        catOption.value = object.id
        // get innerText
        catOption.textContent = `${object.name}`
        catName.append(catOption)
        catName2.append(catOption)

        // insert categories into array of objects to use for products
        let id = object.id
        let objName = object.name
        catNameArray[objName] = id
    }
})
.catch(e=>{
    console.log(e)
})


// Get the products of the seller
axios.get(getProductsApi,{
    params:{
        seller_id:41  //CRITICAL TO BE LOCALSTORAGE userID//////////////////////////////////////////
    }
})
.then(res =>{
    console.log(res.data)
    let categoryName
    for(let object of res.data){
        // get object category name
        for(let catname in catNameArray){
            if(catNameArray[catname] == object.category_id){
                categoryName = catname
            }
        }
        // Start with building the product card
        const gridItem = document.createElement('div')
        gridItem.classList.add("grid-item")

        const image = document.createElement('img')
        image.src = `../backend/${object.thumbnail})`

        const gridItemText = document.createElement('div')
        gridItemText.classList.add("grid-item-text")

        // The loop is for item name, category name and price
        for( let i=0;i<4;i++){
            const p =document.createElement('p')
            if(i == 0){
                p.textContent = `Item: ${object.name}`
                gridItemText.appendChild(p)
            }
            if(i == 1){
                p.textContent = `Category: ${categoryName}`
                gridItemText.appendChild(p)
            }
            if(i == 2){
                p.textContent = `Price: ${object.price} $`
                gridItemText.appendChild(p)
            }
            // Insert ID for deletion later- CRITICAL TO BE HIDDEN
            if(i==3){
                p.textContent= `${object.id}`
                p.setAttribute('class','productID')
                gridItemText.append(p)
            }

        }
        // Get likes from '''''favourite_items''''''' table in db
        const likeDiv = document.createElement('div')
        likeDiv.classList.add("like-icon")
        const likes = document.createElement('p')
        const views = document.createElement('p')
        
        // Get the views api
        axios.get(getProductViews,{
            params:{
                product_id: parseInt(object.id)
            }
        })
        .then(res=>{
            views.textContent = `Views: ${res.data.views}`
        })
        .catch(e=>{
            console.log(e)
        })

        // Get the likes api
        axios.get(getProductLikes,{
            params:{
                product_id: parseInt(object.id)
            }
        })
        .then(res=>{
            likes.textContent = `Likes: ${res.data.likes}`
            // gridItemText.append(likeDiv)
            
        })
        .catch(e=>{
            console.log(e)
        })
        likeDiv.append(views)
        likeDiv.append(likes)
        gridItem.append(image)
        gridItemText.append(likeDiv)

        // Edit and delete buttons
        const btnDiv = document.createElement('div')
        btnDiv.classList.add("button-position")

        const editBtn = document.createElement("button")
        editBtn.classList.add("btn-style-1")
        editBtn.classList.add('edit')
        // editBtn.setAttribute('type', 'button')
        editBtn.innerHTML = 'Edit'
        editBtn.addEventListener('click', ()=>{
            popupContainer2.classList.add('show')
            editProdId.value = parseInt(object.id)
            editSellerId.value = parseInt(object.user_id)

        })
        btnDiv.append(editBtn)

        const deleteBtn = document.createElement("button")
        deleteBtn.classList.add("btn-style-2")
        deleteBtn.classList.add('delete')
        // deleteBtn.setAttribute('type', 'button')
        deleteBtn.textContent = 'Delete'
        //
        deleteBtn.addEventListener('click',()=>{
            axios.get(deleteProductApi,{
                params:{
                    product_id: parseInt(`${object.id}`)
                }
            })
            .then(res=>{
                window.location.replace('add-product.html')
            })
            .catch(e=>{
                console.log(e)
            })
        })



        btnDiv.append(deleteBtn)
        
        gridItemText.append(btnDiv)

        // append all to grid item card. append grid item card to the container
        gridItem.append(gridItemText)
        gridContainer.append(gridItem)
    } 
})
.catch(e=>{
    console.log(e)
})

// For deleting products

// For adding a product 
// Get base64 from image
thumbnail.addEventListener('change',()=>{
    const file = thumbnail.files[0]
    const reader = new FileReader()

    reader.addEventListener('load',()=>{
        console.log(reader.result)
        thumbDiv.src= `${reader.result}`
        image64 = reader.result
    })

    reader.readAsDataURL(file)
})

// Add a product
productForm.addEventListener("submit",(e)=>{
    e.preventDefault() //THIS SHOULD GO WHEN GOING LIVE. USED WHEN TESTING THE APIS
    const data =new FormData()
    data.append('thumbnail', image64)
    data.append('category_id',parseInt(catName.value))
    data.append('seller_id',41)
    data.append('quantity', parseInt(quantity.value))
    data.append('name', prodName.value)
    data.append('description',description.value)
    data.append('price',parseInt(price.value))

    axios.post(addpProductApi, data)
    .then(res=>{
        console.log(data)
        console.log(res)
    })
    .catch(e=>{
        console.log(e)
    })
    
})
editForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const data = new FormData()
    data.append('thumbnail', image642)
    data.append('id', editProdId)
    data.append('name', prodName2.value)
    data.append('description', description2.value)
    data.append("category_id",parseInt(catName2.value))
    data.append('price', parseInt(price2.value))
    data.append("user_id", editSellerId);
    axios.post(editProductApi, data)
      .then((res) => {
        console.log(data);
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
    });
})

// Press on edit button open popup
// Press on submit button send data
// const editProduct = ()=>{
//     const data = new FormData()
//     data.append('thumbnail', image64)
//     data.append('id', parseInt(object.id))
//     data.append('name', object.name)
//     data.append('description', object.description)
//     data.append("category_id", object.category_id)
//     data.append('price', object.price)
//     data.append('user_id',object.user_id)

//     axios.post(editProductApi, data)
//     .then(res=>{
//         console.log(data)
//         console.log(res)
//     })
//     .catch(e=>{
//         console.log(e)
//     })
// }