const sellersDiv=document.querySelector("#getSellers");
const chatDiv=document.querySelector("#chat");
chatDiv.style.backgroundColor="brown";
const getSellerAPI="http://localhost/messenger/getSellers.php";
const getMessagesAPI="http://localhost/messenger/getMessages.php";
const getSellers=()=>{
    axios.get(getSellerAPI)
    .then(response =>  {
        //Show error
        if (response.error != null) {
            console.log("error")
            return
        }
        //Loop over the response
        for(let i = 0; i < response.data.length; i++){
           const seller=document.createElement("div");
           sellersDiv.appendChild(seller);
           seller.innerText=response.data[i].username;
           seller.style.backgroundColor="#1F7A8C";
           seller.style.margin="1px";
           seller.addEventListener("click",function(){
            startChat(response.data[i].id);
           })
        }
    });
}

const startChat=(id)=>{
    const data = new FormData();
    data.append("seller_id", id);
    data.append("user_id", 41);
    axios.post(getMessagesAPI,data)
    .then(response =>  {
        //Show error
        if (response.error != null) {
            console.log("error")
            return
        }
        if(response.data.length==0){
            chatDiv.innerText=" "
            chatDiv.innerText="No messages"
    }
        //Loop over the response
        else{
            
            for(let i = 0; i < response.data.length; i++){
                const message=document.createElement("div");
                if((response.data[i].sender_id==id && response.data[i].reciever_id==41) || (response.data[i].sender_id==41 && response.data[i].reciever_id==id)){
                    message.innerText=response.data[i].message;
                    chatDiv.appendChild(message)
                    
                }
                else{
                    message.innerText=" "
                    console.log(response.data[i].message)
                    message.innerText=response.data[i].message;
                    chatDiv.appendChild(message)
                }
                
            } 
            }
        
        
    });

}
window.addEventListener("load",getSellers)