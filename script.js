/* Elemento HTML referente a categoria */
const categoria = document.querySelector("#category");
/* Elemento HTML referente a lista das letras erradas*/
const letrasErradas = document.querySelector(".wrongLetters");
/* Elemento HTML referente a palavra oculta
   Utilizaremos esse mesmo elemento para exibir as mensagens do jogo*/
   const palavraInterface = document.querySelector(".dashes");
/* Array com elementos HTML referentes aos olhos do personagem */
const olhos = Array.from(document.querySelectorAll(".eyes"));
/* Array com elementos HTML referentes as partes do corpo */
let partesBoneco = Array.from(document.querySelectorAll("#person div"));
partesBoneco = partesBoneco.slice(2, partesBoneco.length);
/* Palavra corrente */
let palavraProposta;
/* Lista das letras erradas */
let letrasErradasArray = [];
/* Index da parte do corpo corrente */
let indiceBoneco;
/* Numero de chances do jogador */
const numTentativas = 7;
/* Valor para opacidade dos olhos */
const opacidadeOlhos = 0.3;
/* Objeto que armazena as categorias */
const categorias = {
    frutas: ["maça","banana","pessego"],
    profissoes: ["advogado","medico","engenheiro"],
    cores: ["azul","amarelo","laranja"]
}

function retornaArrayCategorias(){
    return Object.keys(categorias);
}

function escolheCategoria(){
    const arrayCategorias = retornaArrayCategorias();
    const indiceCategorias = escolheNumAleatorio(arrayCategorias.length);
    return arrayCategorias[indiceCategorias];
}

function exibeCategoria(){
    categoria.innerHTML = escolheCategoria();
}

function definePalavra(){
    const arrayPalavras = categorias[categoria.innerHTML];
    const indicePalavras = escolheNumAleatorio(arrayPalavras.length);
    palavraProposta = arrayPalavras[indicePalavras];
    console.log(palavraProposta);
    escondePalavra(palavraProposta);
}

function escondePalavra(palavraProposta){
    palavraOcultada = "";
    for(let i = 1; i <= palavraProposta.length; i++){
        palavraOcultada += "-";
    }
    exibePalavra(palavraOcultada);
}

function exibePalavra(palavraOcultada){
    palavraInterface.innerHTML = palavraOcultada;
}

function escolheNumAleatorio(max){
    return Math.floor(Math.random() * max);
}

function tentativa(letra){
    if(palavraProposta.includes(letra)){
        alteraPalavra(letra);
    }else{
        letrasErradasArray.push(letra);
        letrasErradas.innerHTML = "Letras erradas: " + letrasErradasArray;
        if(indiceBoneco < partesBoneco.length){
            desenhaBoneco();
        }
    }
    verificaFimdeJogo();
}

function alteraPalavra(letra){
    let palavraAux = '';
    for(let i = 0; i < palavraProposta.length; i++){
        if(palavraProposta[i] == letra){
            palavraAux += letra;
        }else if(palavraInterface.innerHTML[i] != '-'){
            palavraAux += palavraInterface.innerHTML[i];
        }else{
            palavraAux += '-';
        }
    }

    exibePalavra(palavraAux);
}

function verificaFimdeJogo(){
    if(!palavraInterface.innerHTML.includes('-')){
        palavraInterface.innerHTML = 'Você Venceu !!!';
        removeEventListener('keypress', retornaLetra);
    }else{
        if(letrasErradasArray.length >= numTentativas){
            palavraInterface.innerHTML = 'Você Perdeu !!!';
            desenhaOlhos();
            removeEventListener('keypress', retornaLetra);
        }
    }
}

/*
Recebe o evento do teclado e passa apenas o valor da letra para a função tentativa
*/
function retornaLetra(e){ 
    tentativa(e.key);
}

/*
Desenha a parte do corpo corrente
*/
function desenhaBoneco(){
    partesBoneco[indiceBoneco].classList.remove("hide");
    indiceBoneco++; 
}

/* 
Desenha os olhos do personagem
*/
function desenhaOlhos(){
    olhos.forEach((olho => {
        olho.style.opacity = 1;
        olho.style.zIndex = 10;
    }));
}

/*
Oculta as partes do corpo do personagem
*/
function ocultaBoneco(){
    olhos.forEach((olho => {
        olho.style.opacity = opacidadeOlhos; 
    }));
    partesBoneco.forEach(parteBoneco => {
        parteBoneco.classList.add("hide");
    });
}

/*
Inicia as configurações do jogo
*/
function iniciaJogo(){
    ocultaBoneco();
    indiceBoneco = 0;
    letrasErradasArray = [];
    exibeCategoria();
    definePalavra();   
    letrasErradas.innerHTML = "Letras erradas: ";
    window.addEventListener("keypress", retornaLetra);
}
window.addEventListener("load", iniciaJogo);
