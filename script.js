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