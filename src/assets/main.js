const content = null || document.querySelector('#content')

const API ='https://youtube-v31.p.rapidapi.com/search?channelId=UC44q6Vyg4APWHH9N93ZVoow&part=snippet%2Cid&order=date&maxResults=9'

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '6feb8dd911msh82caa10b2aff609p125dcdjsn44ea58e4a4ec',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};
/*
fetch(API, options)
	.then(response => response.json()) //Obtenemos respuesta y la transformamos a JSON
	.then(response => console.log(response)) // Respuesta la transferimos al console.log
	.catch(err => console.error(err));
*/
async function fetchData(urlAPI){
    const response = await fetch(urlAPI, options);
    const data = await response.json();
    return data
}

// Se crea una función que se llama a si misma, significa que cuando está agregando a memoria lo lee de arriba hacia abajo. Usando try y catch se hace el llamado a la API, se obtienen elementos y se muestran en nuestro html
(async()=>{
    try{
        const videos = await fetchData(API);
        //Crear template de html
        let view = `
        ${videos.items.map(video =>`
            <div class="group relative">
                <div
                    class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                    <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
                </div>
                <div class="mt-4 flex justify-between">
                    <h3 class="text-sm text-gray-700">
                    <span aria-hidden="true" class="absolute inset-0"></span>
                        ${video.snippet.title}       
                    </h3>
                </div>                
            </div>        
        `).slice(0,8).join('')}
        `;

        content.innerHTML = view;

    } catch(error){
        console.error(error);

        let viewError = `
        ${videos.items.map(video =>`
            <div class="group relative">
                <p>Lo siento! La API no está disponible</p>
            </div>        
        `)}
        `;
        content.innerHTML = viewError;
    }
})();