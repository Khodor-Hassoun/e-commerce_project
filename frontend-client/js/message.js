const sellersDiv=document.querySelector("#getSellers");
const chatDiv=document.querySelector("#chat");
const getSellerAPI="http://localhost/backend/getSellers.php";
const getMessagesAPI="http://localhost/backend/getMessages.php";

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
           seller.classList.add("seller-row");
           seller.addEventListener("click",function(){
            startChat(response.data[i].id);
           });
           sendBtn.addEventListener("click",function(){
            sendMessage(response.data[i].id)
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
        const btmDiv=document.createElement("div");
        btmDiv.classList.add("input-msg")
        
        const inputMessage=document.createElement("input");
        inputMessage.classList.add("message-input");
        inputMessage.placeholder="Type Your Message Here..";
        btmDiv.appendChild(inputMessage);
        const sendBtn=document.createElement("button");
        sendBtn.classList.add("send-btn");
        sendBtn.innerText="Send";
        btmDiv.appendChild(sendBtn);
        
        if(response.data.length==0){
            chatDiv.innerText=" "
            chatDiv.innerText="No messages"
            chatDiv.style.color="white"
            chatDiv.appendChild(btmDiv)
    }
        //Loop over the response
        else{
            
            chatDiv.innerText=" ";
            for(let i = 0; i < response.data.length; i++){
                sendBtn.addEventListener("click",function(){
                    sendMessage(response.data[i].id)
                });
                const message=document.createElement("div");
                message.classList.add("message");
                if((response.data[i].sender_id==id && response.data[i].reciever_id==41) || (response.data[i].sender_id==41 && response.data[i].reciever_id==id)){
                     message.innerText=response.data[i].message;
                    chatDiv.appendChild(message)
                }
                
            } 
            chatDiv.appendChild(btmDiv)
            }
    });

}

const sendMessage=(id)=>{
    console.log(id)
}
window.addEventListener("load",getSellers)