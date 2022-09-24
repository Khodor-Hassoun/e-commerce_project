const gridContainer=document.querySelector(".grid-container");
const getAPI="http://localhost/backend/getTop5Products.php";
const getTopProducts=()=>{
    const data = new FormData();
    data.append("seller_id", 2);
    axios.post(getAPI,data)
    .then(response =>  {
        //Show error
        if (data.error != null) {
            console.log("error")
            return
        }
        //Loop over the response
        for(let i = 0; i < response.data.length; i++){
            const gridItem=document.createElement("div");
            gridItem.classList.add("grid-item");
            gridContainer.appendChild(gridItem);
            const img = new Image();
            img.src = response.data[i].thumbnail;
            gridItem.appendChild(img);
            const gridItemText=document.createElement("div");
            gridItem.classList.add("grid-item-text");
            gridItem.appendChild(gridItemText);
            const p1=document.createElement("p");
            p1.innerText="Item: "+response.data[i].name;
            gridItemText.appendChild(p1);
            const p2=document.createElement("p");
            p2.innerText="Price: "+response.data[i].price;
            gridItemText.appendChild(p2);
            const likeIcon=document.createElement("div");
            likeIcon.classList.add("like-icon");
            gridItemText.appendChild(likeIcon);
            const p3=document.createElement("p");
            p3.innerText="Views: "+response.data[i].views;
            likeIcon.appendChild(p3);
            const icon=document.createElement("i");
            icon.classList.add("fa-regular");
            icon.classList.add("fa-heart");
            likeIcon.appendChild(icon);
            const btnPosition=document.createElement("div");
            btnPosition.classList.add("button-position");
            gridItemText.appendChild(btnPosition);
            const editBtn=document.createElement("button");
            editBtn.classList.add("btn-style-1");
            editBtn.innerText="Edit";
            btnPosition.appendChild(editBtn);
            const  deleteBtn=document.createElement("button");
            deleteBtn.classList.add("btn-style-2");
            deleteBtn.innerText="Delete";
            btnPosition.appendChild(deleteBtn);
            

        }
    });
}
window.addEventListener("load",getTopProducts);