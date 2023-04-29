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