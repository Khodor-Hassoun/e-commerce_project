const getSellerAPI = "";
const deleteSellerAPI = "";
const editUserModal = document.querySelector(".edit_user_modal");
const addUserModal = document.querySelector(".add_user_modal");
const addUserButton = document.getElementById("add_seller");
const editUserButton = document.getElementById("edit_seller")
const closeButton = document.getElementById("close");
const closeButton2 = document.getElementById("close2");

// When the user clicks on the button, open the modal
addUserButton.onclick = function() {
  addUserModal.style.display = "block";
}

// When the user clicks on the button, open the modal
editUserButton.onclick = function() {
  editUserModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
closeButton.onclick = function() {
  editUserModal.style.display = "none";
}

// When the user clicks on <span> (x), close the modal
closeButton2.onclick = function() {
  addUserModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == editUserModal) {
    editUserModal.style.display = "none";
  }

  if (event.target == addUserModal) {
    addUserModal.style.display = "none";
  }
}

const getSellers = () =>{
    //Recieve data from server
    axios.get(getSellerAPI)
    .then(
        data =>  {
        //Show error
        if (data.message !== undefined) {
            //Do nothing
            return
        }

        //Loop over the response
        for(let i = 0; i < Object.keys(data).length; i++){
            //Make a clone of the seller table row
            let originalItem = document.querySelector(".seller");
            let clone = originalItem.cloneNode(true);
            clone.style.display ="block";
            clone.id= data[i].tweet_id;
            clone.classList.add("seller");

            //Add first name
            let firstname = clone.querySelector("#firstname");
            firstname.textContent = data[i].firstname;

            //Add last name
            let lastname = clone.querySelector("#lastname");
            lastname.textContent = data[i].lastname;

            //Add email
            let email = clone.querySelector("#email");
            email.textContent = data[i].email;

            //Add address
            let address = clone.querySelector("#address");
            address.textContent = data[i].address;

            //Add phone number
            let phoneNumber = clone.querySelector("#phone_number");
            phoneNumber.textContent = data[i].phone_number; 
            
            //Get edit button and save the user's id in it
            let editUserBtn = clone.querySelector("#edit_user");
            editUserBtn.setAttribute('id', data[i].id);
            
            //Get delete button and save the user's id in it
            let deleteUserBtn = clone.querySelector("#delete_user");
            deleteUserBtn.setAttribute('id', data[i].id);

            deleteUserBtn.addEventListener("click", (event)=>{
                const data = new FormData();
                userID = banButton.getAttribute('id');
                data.append('user_id', userID);

                axios.post(deleteSellerAPI, data)
                .then( data => {
                    if (data.error !== undefined) {
                        //Do nothing
                        return
                    }

                    window.location.replace("client_page.html"); 
                })
            })

            originalItem.after(clone);
    }
})
}

getSellers();