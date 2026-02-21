let releases = "https://api.github.com/repos/stikundra-murtsi/zsh-komander/releases";

let raw_data = {};
let fth_error = 0;

fetch(releases)
	.then(response => {
		if (!response.ok) {
			throw new Error(`HTTP: ${response.status}`);
		}

		return response.json();
	})
	.then(data => {
		raw_data = data;

		set_oth_ver();
		set_latest_ver();
	})
	.catch(error => {
		fth_error = 1;
		alert(`Error: ${error}`);
	})

// Функция открытия сайта "за кадром"
function opening(url) {	
	// Создание ссылки
	const dwn_attr = document.createElement("a");
	dwn_attr.href = url;
	dwn_attr.download = "";
	dwn_attr.style.display = "none";
	
	// Программное нажатие на ссылку
	document.body.appendChild(dwn_attr);
	dwn_attr.click();
	document.body.removeChild(dwn_attr);
}

// Функция скачивания программы из контейнера с другими версиями
function dwn_oth(dwn_num) {	
	// Получение ссылки на файл из github
	let dwn_url = raw_data[dwn_num].assets[0].browser_download_url;
	
	// Открытие ссылки
	opening(dwn_url);
}

// Функция скачивания последней версии программы
function dwn_latest() {	
	let dwn_url = raw_data[0].assets[0].browser_download_url;

	opening(dwn_url);
}

// Функция настройки контейнера с последней версией
function set_latest_ver() {
	// Кнопка установки
	let dwn_btn = document.getElementById("dwn_latest");
	dwn_btn.onclick = () => dwn_latest(); // установка скрипта скачивания на кнопку

	// Текст с версией
	let text_latest_ver = document.getElementById("latest_ver");
	
	// Получение имени версии
	text_latest_ver.textContent = raw_data[0].name;
}

// Функция настройки контейнера с другими верссиями
function set_oth_ver() {	
	// Создание списка с версиями
	let oth_card = document.getElementById("oth_dwn_card");
	let oth_det = document.createElement("details");
	oth_card.appendChild(oth_det);

	let sumchik = document.createElement("summary");
	oth_det.appendChild(sumchik);
	
	// Устанвка базового текста оглавления ссылки
	sumchik.textContent = "Все версии";

	// Создание контейнера с версиями
	let gen_oth_div = document.createElement("div");
	gen_oth_div.id = "apop_vers";
	oth_det.appendChild(gen_oth_div);
	
	// Создание содержимого спискатс версиями
	for (let i = 0; i != raw_data.length; i++) {
		// Создание констейнера версии
		let option = document.createElement("div");
		option.classList.add("dwn_btn_div");
		gen_oth_div.appendChild(option);
		
		// Создание названия версии
		let opt_text = document.createElement("p");
		opt_text.textContent = raw_data[i].name;
		option.appendChild(opt_text);
		
		// Создание кнопки загрузки
		let btn_oth = document.createElement("button");
		btn_oth.type = "button";
		btn_oth.textContent = "Скачать";
		btn_oth.classList.add("dwn_button");
		btn_oth.onclick = () => dwn_oth(i); // Установка скрипта загрузки версии с указанием номера релиза
		btn_oth.id = `oth_btn_${i}`; // Установка паспорта "oth_btn_'номер релиза'"
		option.appendChild(btn_oth);
	}
}
