import {openedPopup} from "./data.js";

function renderLoading(isLoading, evt){
    if(isLoading){

        evt.target.value = `${evt.target.value}...`;
    }else if(!isLoading) {
        evt.target.value = `${evt.target.value.split('.')[0]}`;
    }
}

export function renderResponse(responsePromise, callback, evt){
    if(evt){
        renderLoading(true, evt);
    }
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
            if (evt) {
                renderLoading(false, evt)
            }
        });
}

