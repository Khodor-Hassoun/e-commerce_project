const addCategory = document.getElementById('category');
const backBtn = document.querySelector('.close-btn-pop');
const popupContainer = document.querySelector('.popup-container');

addCategory.addEventListener('click',()=>{
    popupContainer.classList.add('show')
})

backBtn.addEventListener('click',()=>{
    popupContainer.classList.remove('show')
})