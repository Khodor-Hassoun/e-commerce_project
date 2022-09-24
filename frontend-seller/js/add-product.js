// Variables for hiding and showinng popup / addding products
const addProduct = document.querySelector('.add-icon');
const backBtn = document.querySelector('.close-btn-pop');
const popupContainer = document.querySelector('.popup-container');
const thumbDiv = document.querySelector('.thumbnail-div');
const gridContainer = document.querySelector(".grid-container")

// Apis used in this page
const getCategory = "http://localhost/e-commerce_project/backend/getCategories.php"
const addpProductApi = 'http://localhost/e-commerce_project/backend/addProductByCategory.php'
const getProductsApi = 'http://localhost/e-commerce_project/backend/getProductsOfSeller.php'
const getProductLikes = 'http://localhost/e-commerce_project/backend/getProductLikes.php'
const deleteProductApi = 'http://localhost/e-commerce_project/backend/deleteProduct.php'

// Variables for add product api
const thumbnail = document.getElementById('thumbnail');
const prodName = document.querySelector('#name');
const description = document.querySelector('#desc')
const catName = document.getElementById("category");
const quantity = document.getElementById("quantity");
const price = document.getElementById('price')
let image64= ''
const productForm = document.querySelector('.popup-form')

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

const config={
    headers:{
        Authorization: localStorage.getItem("token")
    }
}

// Get the categories from getCategory and place them in category select form
axios.get(getCategory,{
    params: {
		id: 9 // CRITICAL TO BE LOCAL STORAGE ID
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
        seller_id:9   //CRITICAL TO BE LOCALSTORAGE userID
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
        image.src = `../../backend/${object.thumbnail})`

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
        const likeDiv = document.querySelector('.like-icon')
        const p = document.createElement('p')

        axios.get(getProductLikes,{
            params:{
                product_id: parseInt(object.id)
            }
        })
        .then(res=>{
            p.textContent = `Likes: ${res.data.likes}`
            // likeDiv.append(p)
            // gridItemText.append(likeDiv)
            
        })
        .catch(e=>{
            console.log(e)
        })
        likeDiv.append(p)
        gridItem.append(image)
        gridItemText.append(likeDiv)

        // Edit and delete buttons
        const btnDiv = document.createElement('div')
        btnDiv.classList.add("butoon-position")

        const editBtn = document.createElement("input")
        editBtn.classList.add("btn-style-1")
        editBtn.classList.add('edit')
        editBtn.setAttribute('type', 'button')
        editBtn.value = 'Edit'
        btnDiv.append(editBtn)

        const deleteBtn = document.createElement("input")
        deleteBtn.classList.add("btn-style-2")
        deleteBtn.classList.add('delete')
        deleteBtn.setAttribute('type', 'button')
        deleteBtn.value = 'Delete'

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
const prodIds = document.getElementsByClassName('productID')

for( let i=0; i<deleteBtns.length;i++){
    deleteBtns[i].addEventListener("submit",()=>{
        axios.get(deleteProductApi,{
            params:{
                product_id: parseInt(prodIds[i].textContent)
            }
        })
        .then(res=>{
            console.log(res.data)
        })
        .catch(e=>{
            console.log(e)
        })
    })
}
// let i = 0
// for( let button of deleteBtns){
//     button.addEventListener("click",()=>{
//         axios.get(deleteProductApi,{
//             params:{
//                 product_id: parseInt(prodIds[i].textContent)
//             }
//         })
//         .then(res=>{
//             console.log(res.data)
//         })
//         .catch(e=>{
//             console.log(e)
//         })
//     })
// }

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
    data.append('seller_id',9)
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

