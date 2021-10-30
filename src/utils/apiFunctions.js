export function renderResponse(responsePromise, callback){
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
}

