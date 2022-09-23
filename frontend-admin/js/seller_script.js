const getSellerAPI = "http://localhost/backend/getSellers.php";
const deleteSellerAPI = "";
const editUserModal = document.querySelector(".edit_user_modal");
const addUserModal = document.querySelector(".add_user_modal");
const addUserButton = document.getElementById("add_seller");
const editUserButton = document.getElementById("edit_seller")
const closeButton = document.getElementById("close");
const closeButton2 = document.getElementById("close2");
const config = {
  headers: {
    Authorization: localStorage.getItem("token")
  }
}

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
  addUserModal.style.display = "none";
}

// When the user clicks on <span> (x), close the modal
closeButton2.onclick = function() {
  editUserModal.style.display = "none";
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
    axios.get(getSellerAPI, config)
    .then(
        data =>  {
          console.log(data.data);
        //Show error
        if (data.data.message !== undefined) {
            //Do nothing
            return
        }

        // const table = document.getElementById('sellers_table');

        //Loop over the response
        for(let i = 0; i < Object.keys(data.data).length; i++){

            //Get original seller row and make a clone
            let originalItem = document.querySelector(".seller");
            let clone = originalItem.cloneNode(true);
            clone.id = data.data[i].id;
            clone.style.display="table-row-group";

            //Add first name
            let firstname = clone.querySelector("#firstname");
            firstname.textContent = data.data[i].first_name;

            //Add last name
            let lastname = clone.querySelector("#lastname");
            lastname.textContent = data.data[i].last_name;

            //Add email
            let email = clone.querySelector("#email");
            email.textContent = data.data[i].email;

            //Add address
            let address = clone.querySelector("#address");
            address.textContent = data.data[i].address;

            //Add phone number
            let phoneNumber = clone.querySelector("#phone_number");
            phoneNumber.textContent = data.data[i].phone_number; 
            
            //Get edit button and save the user's id in it
            let editUserBtn = clone.querySelector("#edit_seller");
            editUserBtn.setAttribute('id', data.data[i].id);
            
            //Get delete button and save the user's id in it
            let deleteUserBtn = clone.querySelector("#delete_seller");
            deleteUserBtn.setAttribute('id', data.data[i].id);

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

            originalItem.before(clone);
    }
})
}

getSellers();