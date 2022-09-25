//Initialize APIs
const loginAPI = "http://localhost/backend/signin.php";
const signupAPI = "http://localhost/backend/signup.php";
const resetPassAPI = "http://localhost/backend/resetClientPw.php";
const getRandAdsAPI = "http://localhost/backend/getRandAds.php";
const searchAPI = "";

//Initialize variables
const button = document.getElementById("login_btn");
const email = document.getElementById("email");
const password = document.getElementById("password");
const error = document.getElementById("error");
const signinModal = document.getElementById("signin_modal");
const signinButton = document.getElementById("signin_btn");
const resetPassModal = document.getElementById("reset_modal");
const close = document.getElementById("close");
const close2 = document.getElementById("close2");
const close3 = document.getElementById("close3");
const open_signup = document.getElementById("open_signup");
const signupModal = document.getElementById("signup_modal");
const new_email = document.getElementById("new_email");
const new_username = document.getElementById("new_username");
const new_password = document.getElementById("new_password");
const new_firstName = document.getElementById("new_first_name");
const new_lastName = document.getElementById("new_last_name");
const new_address = document.getElementById("new_address");
const new_phoneNumber = document.getElementById("new_phone_number");
const signupButton = document.getElementById("create_account");
const resetPassButton = document.getElementById("forgot_pass");
const resetPassEmail = document.getElementById("reset_email");
const resetStatus = document.getElementById("email_status");
const resetEmail = document.getElementById("reset_password");
const adElement = document.querySelector('#ad');
const ads = [];
const config = {
    headers: {
      Authorization: localStorage.getItem("token")
    }
}
let index = 0;

function changeImage(){
    //Go over the array and change the image
    adElement.src = ads[index];
    index > ads.length ? index = 0 : index++;
}

window.onload = function () {
    if(ads.length == 0){
        //If the array is empty, do nothing
        return;
    }
    else{
        //Change the image every 5 seconds
        setInterval(changeImage, 5000);
    }
};

//When the user clicks on reset password, a new modal appears
resetPassButton.onclick = function() {
    signinModal.style.display = "none";
    resetPassModal.style.display = "block";
}

//When the user clicks on the sign in button, a modal appears
signinButton.onclick = function() {
    signinModal.style.display = "block";
}

//Open sign up modal instead of sign in
open_signup.onclick = function() {
    signinModal.style.display = "none";
    signupModal.style.display = "block";
}

//Close modals
close.onclick = function() {
    signinModal.style.display = "none";
}

close2.onclick = function() {
    signupModal.style.display = "none";
}
close3.onclick = function() {
    resetPassModal.style.display = "none";
}

//Close modals if clicked outside of them
window.onclick = function(event) {
  if (event.target == signinModal) {
    signinModal.style.display = "none";
  }
  if (event.target == signupModal) {
    signupModal.style.display = "none";
  }
  if (event.target == resetPassModal) {
    resetPassModal.style.display = "none";
  }
}

const getRandomAds=()=>{
    axios.get(getRandAdsAPI)
    .then(response =>  {
       
        //Loop over the response
        for(let i = 0; i < response.data.length; i++){
            ads.push(response.data[i].content);
        }
    });
}

const search = () => {
    //Get search input and filter it
    filteredUsername = searchInput.value.toLowerCase().trim();

    //Send data to the server using fetch
    axios.get(searchAPI + filteredUsername)
    .then(response=>response.json())
    .then(data => {
        //Check if there's an error
        if(data.message !== undefined){
            //Do nothing
            return
        }

        //Create a list item and add it results
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(data.username));
        li.id = data.id
        searchResult.innerHTML = '';
        searchResult.appendChild(li);
    })
}

const login = () => {
    //Save data
    const data = new FormData();
    data.append("email", email.value);
    data.append("password", password.value);

    //Send request to the server using axios
    axios.post(loginAPI, data)
    .then(function (response) {
    if(response.message != null ){
        error.textContent = "Invalid input";
        return;
    }

    //Check if the user is banned
    if(response.data.is_banned == 1){
        error.textContent = "Banned account";
        return;
    }

    //Save the token and the user ID on login
    localStorage.setItem("userID", response.data.id)
    localStorage.setItem("token", response.data.token)

    //Check the type of the user and redirect accordingly
    if(response.data.type == "client"){
        window.location.replace("landingPage.html");
    }
    else if (response.data.type == "seller"){
        window.location.replace("/../frontend-seller/main_page_seller.html");
    }
    else{
        error.textContent = "Invalid input";
    }
 }
);
}

const createNewAccount = () => {
    //Save user's data
    const data = new FormData();
    data.append("email", new_email.value);
    data.append("username", new_username.value);
    data.append("password", new_password.value);
    data.append("firstName", new_firstName.value);
    data.append("lastName", new_lastName.value);
    data.append("address", new_address.value);
    data.append("phoneNumber", new_phoneNumber.value);

    //Send data to the server using axios
    axios.post(signupAPI, data)
    .then(
        response =>  {

        //Save token and ID in the local storage
        localStorage.setItem("userID", response.data.id)
        localStorage.setItem("token", response.data.token)

        //refresh page
        window.location.replace("landingPage.html");
    })
}

const resetPass = () =>{
    //Get the email from the user
    const data = new FormData();
    data.append("email", resetPassEmail.value);

    //Send data to the server using axios
    axios.post(resetPassAPI, data, config)
    .then(response =>  {
        //On response, show message
        resetStatus.textContent = "Email sent!";
     })
}

//search once the user type on the search bar
searchInput.onkeyup = function() {
    search();

    if(searchInput.value == ""){
        searchResult.style.display = "none";
        searchResult.innerHTML = '';
    }
}

signupButton.addEventListener("click", createNewAccount)
button.addEventListener("click", login);
resetEmail.addEventListener("click", resetPass);
getRandomAds();