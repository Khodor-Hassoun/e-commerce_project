// Popup Variables
const addCategory = document.querySelector('.add-icon');
const backBtn = document.querySelector('.close-btn-pop');
const popupContainer = document.querySelector('.popup-container');
const thumbDiv = document.querySelector('.thumbnail-div')
// Form data variables
const addCategoryApi = 'http://localhost/e-commerce_project/backend/add_category.php'
const thumbnail = document.getElementById('thumbnail');
const catName = document.querySelector('#name');
const description = document.querySelector('#desc')
let image64= ''
const categoryForm = document.querySelector('.popup-form')

// const config={
//     headers:{
//         Authorization: localStorage.getItem("token")
//     }
// }


addCategory.addEventListener('click',()=>{
    popupContainer.classList.add('show')
})

backBtn.addEventListener('click',()=>{
    popupContainer.classList.remove('show')
})


// Add with axios
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
categoryForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const data = new FormData()
    data.append("thumbnail",'abdulalah')
    data.append("name", catName.value)
    data.append("description",description.value)
    data.append("seller_id",9)
    
    axios.post(addCategoryApi, data)
        .then(res=>{
            console.log(data)
            console.log(res)
        })
        .catch(e=>{
            console.log(e)
        })
})
