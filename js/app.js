//variables
const form = document.querySelector("#formulario");
const result = document.querySelector("#resultado");
const paginationDiv = document.querySelector("#paginacion");

const paginationCant = 40;
let totalPag;
let iterador;
let pagecurrent = 1;

window.onload = () => {
  form.addEventListener("submit",valideForm)
}

function valideForm (e){
  e.preventDefault();
  const termino = document.querySelector("#termino").value
  if (termino === "") {
    viewAlert("El campo esta vacio")
    return
  }
  consultingAPI()
  form.reset()
  
}

function viewAlert(message){
  isAlert = document.querySelector(".alert")
  if(!isAlert){
    const alertNote = document.createElement("p");
    alertNote.classList.add("bg-red-100","text-color-red","borde-red-400","text-center","py-3","px-4","max-w-lg",
    "rounded","text-red-700","mx-auto","mt-6","alert")
    alertNote.innerHTML = `<strong> Error!!</strong>
                            <span class="block">${message}</span>                        
                            `

    result.appendChild(alertNote)     
    setTimeout(() => {
      alertNote.remove()
    }, 2500);                      
  }
  
}

function consultingAPI(){
  const termino = document.querySelector("#termino").value
  const key ="13306358-9908c6c25f1d87061a0998dff";
  const url =`https://pixabay.com/api/?key=${key}&q=${termino}&per_page=${paginationCant}&image_type=photo&page=${pagecurrent}`;
  
  fetch(url)
    .then (respons => respons.json())
    .then (result =>{ 
                    totalPag = calculatePag(result.totalHits)
                    viewSearch(result.hits)

})
}

// crear generador para las paginas

function *pagination(total){

  for (let i = 1; i <= total; i++) {
    yield i
    
  }
}

function calculatePag(total){
  return parseInt(Math.ceil(total/paginationCant)) 
 
}

function viewSearch(searchs){

  while (result.firstChild){
    result.removeChild(result.firstChild)
  }
  searchs.forEach(search => {
    const {largeImageURL,likes,downloads,previewURL}= search

    result.innerHTML += 
    
      `<div class="w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4" >
          <div class="bg-white">
          <img class="w-full" src="${previewURL}"/>
          <div class="p-4">
            <p class="font-bold">${likes}<span class="font-light"> me gustas</span></p>
            <p class="font-bold">${downloads}<span class="font-light"> descargas</span></p>
            <button  class=" mt-5 m-auto bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            <a href="${largeImageURL}" target ="_blank" rel="noopener noreferrer"> ver imagen </a> 
           </button>
          </div>
     
          </div>
      </div>

      `
  });

  while(paginationDiv.firstChild){
    paginationDiv.removeChild(paginationDiv.firstChild)
  }

  paginationIterador()
  

 
}
function paginationIterador(){
  iterador = pagination(totalPag);

  while(true){
    const {done,value} = iterador.next();
    if(done)return;
    
      //crear boton de la paginacion
      const btnpag = document.createElement("A");
      btnpag.dataset.pagina = value;
      btnpag.textContent = value
      btnpag.href ="#"
      btnpag.classList.add("siguiente","bg-yellow-400","px-4","py-2","rounded","text-center","mr-2","mt-3")
      btnpag.onclick =()=>{
        pagecurrent = value
        consultingAPI()
      }
      paginationDiv.appendChild(btnpag)

    
      
   
  }
  
}