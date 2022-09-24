const addProduct = document.querySelector('.add-icon');
const backBtn = document.querySelector('.close-btn-pop');
const popupContainer = document.querySelector('.popup-container');
const thumbDiv = document.querySelector('.thumbnail-div')

const getCategory = "http://localhost/e-commerce_project/backend/getCategories.php"
const addpProductApi = 'http://localhost/e-commerce_project/backend/addProductByCategory.php'
const thumbnail = document.getElementById('thumbnail');
const prodName = document.querySelector('#name');
const description = document.querySelector('#desc')
const catName = document.getElementById("category");
const quantity = document.getElementById("quantity");
const price = document.getElementById('price')
let image64= ''
const productForm = document.querySelector('.popup-form')

const config={
    headers:{
        Authorization: localStorage.getItem("token")
    }
}

// Get the categories from getCategory and place them in category select form
axios.get(getCategory,{
    params: {
		id: 9
	}
})
.then(res=>{
    // res.data returns an array of objects
    console.log(res.data)
    for(let object of res.data){
        const catOption = document.createElement('option')
        // get category id
        catOption.value = object.id

        // get innerText
        catOption.textContent = `${object.name}`
        catName.append(catOption)
    }
})


thumbnail.addEventListener('change',()=>{
    const file = thumbnail.files[0]
    const reader = new FileReader()

    reader.addEventListener('load',()=>{
        console.log(reader.result)
        thumbDiv.src= `${reader.result}`
        image64 = reader.result
    })

    reader.readAsDataURL(file)
    // thumbDiv.src= `${reader.result}`
})

addProduct.addEventListener('click',()=>{
    popupContainer.classList.add('show')
})

backBtn.addEventListener('click',()=>{
    popupContainer.classList.remove('show')
})

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

