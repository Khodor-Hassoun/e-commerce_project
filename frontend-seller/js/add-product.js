const addProduct = document.querySelector('.add-icon');
const backBtn = document.querySelector('.close-btn-pop');
const popupContainer = document.querySelector('.popup-container');
const thumbDiv = document.querySelector('.thumbnail-div');
const gridContainer = document.querySelector(".grid-container")

const getCategory = "http://localhost/e-commerce_project/backend/getCategories.php"
const addpProductApi = 'http://localhost/e-commerce_project/backend/addProductByCategory.php'
const getProductsApi = 'http://localhost/e-commerce_project/backend/getProductsOfSeller.php'
const getProductLikes = 'http://localhost/e-commerce_project/backend/getProductLikes.php'
const thumbnail = document.getElementById('thumbnail');
const prodName = document.querySelector('#name');
const description = document.querySelector('#desc')
const catName = document.getElementById("category");
const quantity = document.getElementById("quantity");
const price = document.getElementById('price')
let image64= ''
const productForm = document.querySelector('.popup-form')

const catNameArray = []
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

        // insert in categories in array of objects to use later
        let id = object.id
        let objName = object.name
        // const catObj = {id :objName}
        // const catObj = {objName}
        catNameArray[objName] = id

    }
})
.catch(e=>{
    console.log(e)
})


// Get the products
axios.get(getProductsApi,{
    params:{
        seller_id:9
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

        const gridItem = document.createElement('div')
        gridItem.classList.add("grid-item")

        const image = document.createElement('img')
        image.src = `../../backend/${object.thumbnail})`

        const gridItemText = document.createElement('div')
        gridItemText.classList.add("grid-item-text")

        for( let i=0;i<3;i++){
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

        }
        // Get likes
        const likeDiv = document.querySelector('.like-icon')
        const p = document.createElement('p')

        axios.get(getProductLikes,{
            params:{
                product_id: parseInt(object.id)
            }
        })
        .then(res=>{
            p.textContent = `Likes: ${res.data.likes}`
            likeDiv.append(p)
            gridItemText.append(likeDiv)
            
        })
        .catch(e=>{
            console.log(e)
        })
        gridItem.append(image)
        gridItem.append(gridItemText)
        gridContainer.append(gridItem)

        
        gridItemText.append(likeDiv)
        gridItem.append(gridItemText)
        gridContainer.append(gridItem)
    }
    
})
.catch(e=>{
    console.log(e)
})

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

addProduct.addEventListener('click',()=>{
    popupContainer.classList.add('show')
})

backBtn.addEventListener('click',()=>{
    popupContainer.classList.remove('show')
})

// Add a product
productForm.addEventListener("submit",(e)=>{
    e.preventDefault()
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

