async function getKeyboardRows(keyboardBody) { // функция по получению рядов для тела клавиатуры

    const keysJson = 'keys.json'; // путь к json
    const resKeys = await fetch(keysJson);
    const dataKeys = await resKeys.json(); // данные с json

    for (let i = 0; i < dataKeys.length; i++) { // цикл по рядам клавиатуры

        const keyboardRow = document.createElement('div'); // ряд клавиатуры
        keyboardRow.classList.add('row');
        keyboardBody.append(keyboardRow);

        for (keys in dataKeys[i]) { // цикл по клавишам в каждом ряду клавиатуры
            const key = document.createElement('span'); 
            key.classList.add('key');
            key.classList.add(keys);
            keyboardRow.append(key)
        }
    }

    const keyboardRows = document.querySelectorAll('.row');  // коллекция рядов клавиатуры
    for (let i = 0; i < keyboardRows.length; i++) { // цикл по рядам клавиатуры

        for (let j = 0; j < keyboardRows[i].children.length; j++ ) { // цикл по клавишам в ряде клавиатуры

            const row = dataKeys[i];
            const keyName = keyboardRows[i].children[j].classList[1];

            const rusElem = document.createElement('span'); // элемент с данными по клавишам для русской раскладки
            rusElem.classList.add('rus');
            rusElem.classList.add('hidden')
            addKeyOptions(row, keyName, 'rus', rusElem)
            keyboardRows[i].children[j].append(rusElem);
            
            const engElem = document.createElement('span'); // элемент с данными по клавишам для английской раскладки
            engElem.classList.add('eng');
            addKeyOptions(row, keyName, 'eng', engElem);
            keyboardRows[i].children[j].append(engElem);

        }
    }
} 

function addKeyOptions(row, keyName, lang, elem) { 
    /*
        Функция для добавления языковых раскладок к клавишам.
        row - это ряд клавиатуры,
        keyName - название клавиши,
        lang - язык,
        elem - элемент куда будут добавляться данные
    */

    const keys = row[keyName][lang];
    
    const caseDown = document.createElement('span');
    caseDown.innerText = keys['caseDown']
    caseDown.classList.add('caseDown');
    elem.append(caseDown);

    const caseUp = document.createElement('span');
    caseUp.innerText = keys['caseUp'];
    caseUp.classList.add('caseUp')
    caseUp.classList.add('hidden')
    elem.append(caseUp);

    const caps = document.createElement('span');
    caps.innerText = keys['caps']
    caps.classList.add('caps')
    caps.classList.add('hidden')
    elem.append(caps);

    const shiftCaps = document.createElement('span');
    shiftCaps.innerText = keys['shiftCaps'];
    shiftCaps.classList.add('shiftCaps');
    shiftCaps.classList.add('hidden')
    elem.append(shiftCaps);
}

function addCharactersToTextArea(key) {
    if (key.classList.contains('key')) {
        let langs = key.children;
    
        for (let i = 0; i < langs.length; i++) {
            if (langs[i].classList.contains('hidden')) {
                continue;
            }

            let options = langs[i].children;
            for (let j = 0; j < options.length; j++) {
                if (options[j].classList.contains('hidden')) {
                    continue;
                }
                textArea.textContent += options[j].textContent;
            }
        }
    }
}

function changeKeysWhileClickServiceKeys(defaultElem, elem) {
        for (let i = 0; i < defaultElem.length; i++) {
            defaultElem[i].classList.toggle('hidden');
            elem[i].classList.toggle('hidden');
        }
}

function handleKeystrokes(key) {
    if (key === 'Backspace') {
        textArea.textContent = textArea.textContent.slice(0, -1);
    }

    if (key === 'CapsLock') {
        let caseDown = document.querySelectorAll('.caseDown');
        let caps = document.querySelectorAll('.caps');
        let caseUp = document.querySelectorAll('.caseUp');
        let shiftCaps = document.querySelectorAll('.shiftCaps');
        if (caseUp[0].classList.contains('hidden') && shiftCaps[0].classList.contains('hidden')) {
            changeKeysWhileClickServiceKeys(caseDown, caps)
        } else {
            changeKeysWhileClickServiceKeys(caseUp, shiftCaps)
        }
        
    }

    if (key === 'ShiftLeft' || key === 'ShiftRight') {
        
        let caseDown = document.querySelectorAll('.caseDown');
        let caps = document.querySelectorAll('.caps');
        let caseUp = document.querySelectorAll('.caseUp');
        let shiftCaps = document.querySelectorAll('.shiftCaps');
        if (caps[0].classList.contains('hidden')) {
            changeKeysWhileClickServiceKeys(caseDown, caseUp);
        } else {
            changeKeysWhileClickServiceKeys(caps, shiftCaps)
        }
    }

    if (key === 'Enter') {
        textArea.textContent += '\n';
    }

    if (key === 'Tab') {
        textArea.textContent += '\t';
    }
}



const body = document.body; // тело документа

const centralizer = document.createElement('div'); // создаем контейнер-централизатор
centralizer.classList.add('centralizer');

const title = document.createElement('p'); // создаем параграф с классом title
title.innerText = "RSS Virtual Keyboard";
title.classList.add('title');
centralizer.append(title);

const textArea = document.createElement('textarea'); // создаем textarea, область которая будет модифицироваться при взаимодействии с клавиатурой
textArea.classList.add('textarea');
textArea.id = "textarea"
textArea.rows = "5"
textArea.cols = "50";
centralizer.append(textArea);

const keyboardBody = document.createElement('div'); // создаем тело для клавиатуры
keyboardBody.classList.add('keyboard');
centralizer.append(keyboardBody)

getKeyboardRows(keyboardBody); // получаем ряды для тела клавиатуры

const description = document.createElement('p');
description.innerText = "Keyboard created in Linux";
description.classList.add('description');
centralizer.append(description);

const language = document.createElement('p');
language.innerText = "For change language layout: ctrl + alt";
language.classList.add('language');
centralizer.append(language);


body.append(centralizer);

setTimeout(() => {
    if (localStorage.getItem('rus')) {
        let rus = document.querySelectorAll('.rus'); 
        let eng = document.querySelectorAll('.eng');
        if (!localStorage.getItem('rus').includes('hidden')) {
            for (let i = 0; i < rus.length; i++) {
                
                rus[i].classList.toggle('hidden');
                eng[i].classList.toggle('hidden');
            } 
        }
    }
}, 200);
    




let shiftClicked = false;

// клавиши подсвечиваются во время клика на них
document.addEventListener('keyup', (event) => { // обработчик события, когда палец убирается с клавиши
    let key = document.querySelector('.' + event.code);
    
    if (key && !key.classList.contains('CapsLock')) {
        key.classList.remove('active');
    }

    if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
        let caseDown = document.querySelectorAll('.caseDown');
        let caps = document.querySelectorAll('.caps');
        let caseUp = document.querySelectorAll('.caseUp');
        let shiftCaps = document.querySelectorAll('.shiftCaps');
        
        
        if (!document.querySelector('.CapsLock').classList.contains('active')) {
            changeKeysWhileClickServiceKeys(caseDown, caseUp);
        } else {
            changeKeysWhileClickServiceKeys(caps, shiftCaps)
        }
       
    }
    
});

document.addEventListener('keydown', (event) => { // во время зажатия на клавишу
    event.preventDefault()
    let key = document.querySelector('.' + event.code);
    let keysNotToText = ['Tab', 'Backspace', 'Delete', 'CapsLock', 'Enter', 'ShiftLeft', 'ShiftRight', 'ControlLeft', 'MetaLeft', 'AltLeft', 'AltRight', 'ControlRight'];
    if (key) {
        if (!key.classList.contains('active') && !key.classList.contains('CapsLock')) {
            key.classList.add('active');
        } else if (key.classList.contains('CapsLock')) {
            key.classList.toggle('active')
        }
        
        if (!keysNotToText.includes(event.code)) {
            addCharactersToTextArea(key); 
        }
       
        
    }

    if (event.ctrlKey && event.altKey) {
        let rus = document.querySelectorAll('.rus'); 
        let eng = document.querySelectorAll('.eng');
        
        for (let i = 0; i < rus.length; i++) {
            rus[i].classList.toggle('hidden');
            eng[i].classList.toggle('hidden')
        } 

        localStorage.setItem('rus', rus[0].classList);
        localStorage.setItem('eng', eng[0].classList);
        
    }

    handleKeystrokes(event.code);

    
})

keyboardBody.addEventListener('mousedown', (event) => {
    let key = event.target.parentNode.parentNode;
    let keysNotToText = ['Tab', 'Backspace', 'Delete', 'CapsLock', 'Enter', 'ShiftLeft', 'ShiftRight', 'ControlLeft', 'MetaLeft', 'AltLeft', 'AltRight', 'ControlRight'];
    key.classList.toggle('active'); 
    if (!keysNotToText.includes(key.classList[1])) {
        addCharactersToTextArea(key); 
    }
    handleKeystrokes(key.classList[1]);

})

keyboardBody.addEventListener('mouseup', (event) => {
    let key = event.target.parentNode.parentNode;
    
    if (key.classList[1] === 'ShiftLeft' || key.classList[1]  === 'ShiftRight') {
        let caseDown = document.querySelectorAll('.caseDown');
        let caps = document.querySelectorAll('.caps');
        let caseUp = document.querySelectorAll('.caseUp');
        let shiftCaps = document.querySelectorAll('.shiftCaps');
        
        
        if (!document.querySelector('.CapsLock').classList.contains('active')) {
            changeKeysWhileClickServiceKeys(caseDown, caseUp);
        } else {
            changeKeysWhileClickServiceKeys(caps, shiftCaps)
        }
        key.classList.toggle('active'); 
       
    } else if (!key.classList.contains('CapsLock')) {
        key.classList.toggle('active'); 
        handleKeystrokes(key.classList[1]);
    }
    
})