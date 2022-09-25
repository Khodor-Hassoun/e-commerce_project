const popupContainer3 = document.querySelector('.popup-container')
const backButton = document.querySelector('.close-btn-pop-three')
const discountButton = document.querySelector('.discount-btn')


discountButton.addEventListener('click',()=>{
    popupContainer3.classList.add('show')
})
backButton.addEventListener('click',()=>{
    popupContainer3.classList.remove('show')
})
