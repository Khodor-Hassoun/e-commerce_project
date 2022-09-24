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
let image64= ''
const categoryForm = document.querySelector('.popup-form')

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
