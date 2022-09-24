const addProduct = document.querySelector('.add-icon');
const backBtn = document.querySelector('.close-btn-pop');
const popupContainer = document.querySelector('.popup-container');
const thumbDiv = document.querySelector('.thumbnail-div')

const addpProductApi = 'http://localhost/e-commerce_project/backend/addProductByCategory.php.php'
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
