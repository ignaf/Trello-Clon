const BtnAddCard = document.getElementById("add-card");
const cardContainer = document.getElementById("card-container");

BtnAddCard.addEventListener("click",AddNewCard);

function AddNewCard(){
   
    const card = document.createElement("div");
    card.classList.add("card");
    
    const cardHeader = document.createElement("div");
    cardHeader.classList.add("card__header");
    cardHeader.innerHTML="<h3 contenteditable>Nueva Lista</h3><i class='bi bi-three-dots nav-secondary-icon collapsible-menu'></i>";

    const cardContent = document.createElement("div");
    cardContent.classList.add("card__content");

    const list = document.createElement("ul");
    list.classList.add("list");

    const button = document.createElement("button");
    button.classList.add("btn__add-item");
    button.setAttribute("Type","button");
    button.innerHTML="<i class='bi bi-plus'></i>Añada una tarjeta";

    // const botonborrar = document.createElement("button");
    // botonborrar.classList.add("btn__borrar-lista");
    // botonborrar.setAttribute("Type","button");
    // botonborrar.innerHTML="Eliminar Lista";

    // cardContainer.appendChild(card);
    cardContainer.querySelector(".listas").appendChild(card)
    card.appendChild(cardHeader);
    card.appendChild(cardContent);
    cardContent.appendChild(list);
    card.appendChild(button);
    // card.appendChild(botonborrar);


    button.onclick=function(){
        const newItem = document.createElement("li");
        newItem.classList.add("drag");
        newItem.setAttribute("draggable","true");
        newItem.setAttribute("contenteditable","true");
        newItem.innerHTML="Introduzca el título para ésta tarjeta"
        button.parentElement.querySelector(".list").appendChild(newItem);

        newItem.addEventListener('dragstart',()=>{
            newItem.classList.add('dragging')
        })
        newItem.addEventListener('dragend',()=>{
            newItem.classList.remove('dragging')
        })

        const cards = document.querySelectorAll('.card')
        cards.forEach(card=>{
            card.addEventListener('dragover',e=>{
                e.preventDefault()
                const afterElement = getDragAfterElement(card, e.clientY)
                // console.log(afterElement)
                const drag = document.querySelector('.dragging')
                if(afterElement==null){
                    card.querySelector("ul").appendChild(drag)
                }else{
                    card.querySelector("ul").insertBefore(drag, afterElement)
                }
            })
        })
        function getDragAfterElement(card, y) {
            const draggableElements = [...card.querySelectorAll('.drag:not(.dragging)')]
        
          return draggableElements.reduce((closest, child)=>{
                const box = child.getBoundingClientRect()
                 const offset = y - box.top - box.height / 2
                console.log(offset)
                 if(offset < 0 && offset > closest.offset){
                     return {
                       offset: offset, element: child 
                     }
                 }else{
                   return closest
                 }
            },{offset: Number.NEGATIVE_INFINITY}).element
    }
    }

    // botonborrar.onclick=function(){
    //     const lista = botonborrar.parentElement

    //     lista.remove()
    // }
}
