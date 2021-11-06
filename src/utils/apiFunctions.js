

export function renderLoading(isLoading){
    const openedPopup = document.querySelector('.popup_opened');
    if(isLoading && openedPopup){
        openedPopup.querySelector('input[type=submit]').value = `${openedPopup.querySelector('input[type=submit]').value}...`;
    }else if(!isLoading) {
        Array.from(document.forms).forEach(form => {
            form.querySelector('input[type=submit]').value = form.querySelector('input[type=submit]').value.split('...')[0];
        });
    }
}

export function renderResponse(responsePromise, callback){

        renderLoading(true);

    responsePromise
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

