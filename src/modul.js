


function popupAdd(e){
    e.classList.add('popup_is-opened')};

    function popupRemove(e){
        e.classList.remove('popup_is-opened')
        };


       

          function deleteCard(event) {
            const card = event.target.closest(".places__item");
            card.remove();
          };

        
export{popupAdd, deleteCard, popupRemove,}