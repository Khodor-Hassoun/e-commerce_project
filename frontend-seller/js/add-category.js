// Popup Variables
const addCategory = document.getElementById('category');
const backBtn = document.querySelector('.close-btn-pop');
const popupContainer = document.querySelector('.popup-container');

// Form data variables
const addCategoryApi = 'localhost/e-commerce_project/backend/add_category.php'
const thumbnail = document.getElementById('thumbnail');
const prodName = document.querySelector('.name');
const description = document.querySelector('.description')
let image64= ''


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
    })

    image64 = reader.readAsDataURL(file)
})

const data = new FormData()
data.append("thumbnail",image64)
data.append("name", prodName)
data.append("description",description)

axios.post(addCategoryApi, data)
    .then(res=>{
        console.log(res)
    })
    .catch(e=>{
        console.log(e)
    })