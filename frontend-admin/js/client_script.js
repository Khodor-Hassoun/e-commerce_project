const getClientsAPI = "";

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

            //Get the tweet text and modify on it
            let firstname = clone.querySelector("#firstname");
            firstname.textContent = data[i].firstname;

            //Get username
            let lastname = clone.querySelector("#lastname");
            lastname.textContent = data[i].lastname;

            //Get email
            let email = clone.querySelector("#email");
            email.textContent = data[i].email;

            //Get address
            let address = clone.querySelector("#address");
            address.textContent = data[i].address;

            //Get phone number
            let phoneNumber = clone.querySelector("#phone_number");
            phoneNumber.textContent = data[i].phone_number;            
    }
})
}

getClients();