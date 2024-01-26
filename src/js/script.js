const textArea = document.querySelector('.js-textarea');
const buttonEncrypt = document.querySelector('.js-btnencrypt'); /*Criptografar*/
const buttonDecrypt = document.querySelector('.js-btndecrypt');
const resultDisplay = document.querySelector('.js-display'); /*Paragrafo */
const inicialMessage = document.querySelector('.js-initialmessage'); /*Imagem / mensagem inicial*/
const buttonCopy = document.querySelector('.js-buttoncopy');


function encryptText(capturedInput) {

    const matchingkeys = {
        'a': 'ai',
        'e': 'enter',
        'i': 'imes',
        'o': 'ober',
        'u': 'ufat'
    }

    const crypto = capturedInput.replace(/[aeiou]/g, match => matchingkeys[match]);
    displayText(crypto);
}

function captureText(action) {

    resultDisplay.classList.remove('hidden');

    const capturedInput = (textArea.value).toLowerCase();

    if (capturedInput === '') return alert('O campo não pode estar vazio. Por favor, preencha corretamente.');

    if (/[^a-z\s]/.test(capturedInput)) {
        alert('Por favor, insira apenas letras minúsculas e sem acento.');
        return false;
    }

    if (action === 'encrypt') return encryptText(capturedInput);

    if (action === 'decrypt') return decryptText(capturedInput);
}

function decryptText(capturedInput){

    const matchingkeys = {
        'ai': 'a',
        'enter': 'e',
        'imes': 'i',
        'ober': 'o',
        'ufat': 'u'
    }

    const decrypto = capturedInput.replace(/ai|enter|imes|ober|ufat/g, match => matchingkeys[match]);
    displayText(decrypto);
}

function displayText(text){
    resultDisplay.innerHTML = text;

    if (resultDisplay.innerHTML === '') {
        inicialMessage.classList.remove('hidden');
    } else {
        inicialMessage.classList.add('hidden');
    }
    
}

function copyText() {
    const paragraph = resultDisplay.innerHTML; 

    if (paragraph !== '') {
        navigator.clipboard.writeText(paragraph).then(() => {
            pasteText();
            clearParagraph();

        }).catch(error => {
            console.error('Erro ao copiar texto:', error);
        });
    }
}

async function pasteText() {
    try {
        const valor = await navigator.clipboard.readText();
        textArea.value = valor; 

    } catch (error) {
        console.error('Erro ao colar texto:', error);
    }
}

function clearParagraph(){
    resultDisplay.innerHTML = '';
    
    showInitialMesage();
}

function showInitialMesage() {
    inicialMessage.classList.remove('hidden');
    resultDisplay.classList.add('hidden');
}


buttonEncrypt.addEventListener('click', () => captureText('encrypt'));
buttonDecrypt.addEventListener('click', () => captureText('decrypt'));
buttonCopy.addEventListener('click', copyText);