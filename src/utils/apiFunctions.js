

export function renderLoading(isLoading){
    const openedPopup = document.querySelector('.popup_opened');
    if(isLoading && openedPopup){
        openedPopup.querySelector('input[type=submit]').value = `${openedPopup.querySelector('input[type=submit]').value}...`;
    }else if(!isLoading && openedPopup) {
        openedPopup.querySelector('input[type=submit]').value = openedPopup.querySelector('input[type=submit]').value.split('...')[0];
    }
}

export function renderResponse(responsePromise, callback, evt){

        renderLoading(true);

    responsePromise
        .then((response) => {
        if(response.ok){
            return response.json();
        }

     return Promise.reject(response.status);
    })
        .then((data) => {
            callback(data);
        })
        .catch((error) => {
            console.log(`Ошибка ${error}`);
        })
        .finally(() => {

                renderLoading(false)

        });
}

