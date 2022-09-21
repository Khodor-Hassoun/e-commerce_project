const getClientsAPI = "";
const banClientAPI = "";

const getClients = () =>{
    //Recieve data from the server
    axios.get(getClientsAPI)
    .then(
        data =>  {
        if (data.message !== undefined) {
            //Do nothing
            return
        }

        //Loop over the response
        for(let i = 0; i < Object.keys(data).length; i++){
            //Make a clone of the client table row
            let originalItem = document.querySelector(".client");
            let clone = originalItem.cloneNode(true);
            clone.style.display ="block";
            clone.id= data[i].tweet_id;
            clone.classList.add("client");

            //Add the first name
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
            
            //Get ban button and save the user's id in it
            let banButton = clone.querySelector("#ban_user");
            banButton.setAttribute('id', data[i].id);

            likeButton.addEventListener("click", (event)=>{
                const data = new FormData();
                userID = banButton.getAttribute('id');
                data.append('user_id', userID);

                axios.post(banClientAPI, data)
                .then( data => {
                    if (data.error !== undefined) {
                        //Do nothing
                        return
                    }

                    window.location.replace("client_page.html"); 
                })

            })
    }
})
}

getClients();