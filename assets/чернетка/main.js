const cityContainer = document.getElementById('city-container'); // div
const cityList = document.getElementById('city-list'); // ul
const cityItems = document.querySelectorAll('.section-geography__li'); // Отримуємо всі елементи <li> з класом section-geography_li
const image = document.querySelector('.section-geography__img-icons'); // Отримуємо зображення, яке потрібно перевертати
const addAnalyzesButtons = document.querySelectorAll('.section-order__add-analyz'); // Всі кнопки додавання аналізів
const addAnalyzes = document.querySelector('.section-order__add-analyz'); // Кнопка для додавання аналізу
const blockAnalyzes = document.querySelector('.section-order__block-analyzes'); // Контейнер для аналізів
const removeButtons = document.querySelectorAll('.section-order__button--remove');
const buttons = document.querySelectorAll('.section-geography__btn'); // Отримуємо всі кнопки з класом ssection-geography__btn
const textarea = document.getElementById('comment');
let activeItem = cityList.querySelector('li.active'); // Змінна для активного елемента
const cards = document.querySelectorAll('.section-order__btn-person');
const addButton = document.querySelector('.section-order__btn-add');
const customerController = document.querySelector('.section-order__controller');
const carousel = document.querySelector('.carousel')
const currencyButtons = document.querySelectorAll('.section-order__btn'); // Вибір усіх кнопок з класом

/*
? Перша секція
*/

/*
* Міста та мапа
*/

// Функція для приховування списку міст, крім активного
function hideCitiesExceptActive() {
    cityItems.forEach((item) => {
        if (!item.classList.contains('active')) {
            item.style.display = 'none';
        }
    });
}

// Перемістити активний елемент на початок списку
function moveActiveToFirst() {
    if (activeItem) {
        cityList.prepend(activeItem); // Перемістити елемент на початок списку
    }
}

function updateActiveItemBorderRadius() {
    // Скидаємо бордер-радіус для всіх елементів
    cityItems.forEach((item) => {
        item.style.borderRadius = ''; // Скидаємо стиль бордер-радіус
    });

    if (activeItem) {
        // Перевіряємо, чи всі елементи мають display: none, окрім активного
        const isOnlyActiveVisible = Array.from(cityItems).every((item) => {
            return item === activeItem || item.style.display === 'none';
        });

        if (isOnlyActiveVisible) {
            // Якщо відображається тільки активний елемент
            activeItem.style.borderRadius = '12px';
        } else {
            // Якщо відображається більше одного елемента
            activeItem.style.borderRadius = '12px 12px 0px 0px';
        }
    }
}

// Функція для відображення всіх міст
function showCities() {
    cityItems.forEach((item) => {
        item.style.display = 'block';
    });
    cityList.classList.add('show');
    updateActiveItemBorderRadius(); // Оновлюємо бордер-радіус активного елемента
}

function rotateImage() {
    // Додаємо або видаляємо клас 'rotate-180' при кожному кліку на елемент <li>
    if (image) {
        image.classList.toggle('rotate-180');
    }
}

// Обробка кліків на cityContainer
cityContainer.addEventListener('click', () => {
    if (!cityList.classList.contains('show')) {
        showCities();
        rotateImage();
    }
});

// Функція для оновлення активної карти на основі активного міста
function updateActiveMap() {

    // Перебираємо всі <li> елементи
    cityItems.forEach(item => {
        // Перевіряємо, чи має елемент клас active
        if (item.classList.contains('active')) {
            // Отримуємо ID активного міста
            const activeCityId = item.id;
            // console.log('test', activeCityId)

            // Очищаємо всі div з класом section-geography_map від класу active
            const mapItems = document.querySelectorAll('.section-geography__map');
            mapItems.forEach(map => {
                map.classList.remove('active');
            });

            // Додаємо клас active до відповідного div з класом section-geography__map
            const activeMap = document.getElementById(`map_${activeCityId}`);
            if (activeMap) {
                activeMap.classList.add('active');
            }
        }
    });
}

// Обробка кліків на li елементи
cityItems.forEach((cityItem) => {
    cityItem.addEventListener('click', (event) => {
        // Перевіряємо, чи список уже відкритий
        if (!cityList.classList.contains('show')) {
            showCities();
            rotateImage();
        } else {
            rotateImage();
            // Знімаємо клас active з усіх міст
            cityItems.forEach((item) => item.classList.remove('active'));
            
            // Додаємо клас active обраному місту
            activeItem = event.target; // Оновлюємо активний елемент
            activeItem.classList.add('active');

            // Переміщуємо активний елемент на початок списку
            moveActiveToFirst();

            // Оновлюємо бордер-радіус активного елемента
            updateActiveItemBorderRadius();

            // Ховаємо всі міста, крім обраного
            hideCitiesExceptActive();

            // Оновлюємо бордер-радіус активного елемента
            updateActiveItemBorderRadius();

            // Викликаємо функцію для першого завантаження
            updateActiveMap();
            
            // Приховуємо список після вибору міста
            cityList.classList.remove('show');
            
            // Зупиняємо подію кліку
            event.stopPropagation();
        }
    });
});

/*
* Вартість виклику
*/

// Функція для оновлення активної кнопки
function updateActiveButton() {

    // Додаємо обробник подій для кожної кнопки
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Знімаємо клас active з усіх кнопок
            buttons.forEach(btn => btn.classList.remove('active'));
            // Додаємо клас active до кнопки, на яку клікнули
            button.classList.add('active');
        });
    });
}

updateActiveButton(); // Викликаємо функцію для активації обробників подій

/*
* Обмеження textarea
*/

document.addEventListener('DOMContentLoaded', function () {
    textarea.addEventListener('input', autoResize);

    function autoResize() {

        // Отримуємо висоту контенту
        let newHeight = this.scrollHeight;

        // Встановлюємо нову висоту, але обмежуємо її в межах мінімуму 54px і максимуму 135px
        if (newHeight < 54) {
            newHeight = 54;
        } else if (newHeight > 135) {
            newHeight = 135;
        }

        // Встановлюємо обчислену висоту
        this.style.height = `${newHeight}px`;

        // Якщо висота більше за max-height, показуємо скрол, в іншому випадку ховаємо його
        this.style.overflowY = this.scrollHeight > 135 ? 'auto' : 'hidden';
    }
});


/*
? Друга секція
*/

/*
* Обрання активної картки клієнта
*/

// Функція для оновлення активної кнопки
function updateActiveCard() {

    // Додаємо обробник подій для кожної кнопки
    cards.forEach(card => {
        card.addEventListener('click', () => {
            // Знімаємо клас active з усіх кнопок
            cards.forEach(btn => btn.classList.remove('active'));
            // Додаємо клас active до кнопки, на яку клікнули
            card.classList.add('active');
        });
    });
}

// Викликаємо функцію для активації обробників подій
updateActiveCard();

/*
! Тип знижки
*/

// document.addEventListener('DOMContentLoaded', function () {

//     currencyButtons.forEach(button => {
//         button.addEventListener('click', function () {
//             // Перевірка поточного тексту кнопки та його зміна
//             if (button.textContent === 'грн') {
//                 button.textContent = '%';
//             } else {
//                 button.textContent = 'грн';
//             }
//         });
//     });
// });


/*
* Форматуванян дати народження
*/

document.addEventListener('DOMContentLoaded', function () {
    const dateInput = document.querySelector('.section-order__birth');

    dateInput.addEventListener('input', function () {
        let value = dateInput.value.replace(/\D/g, ''); // Видаляємо всі нецифрові символи

        // Форматуємо значення як дд.мм.рррр
        if (value.length > 2 && value.length <= 4) {
            value = `${value.slice(0, 2)}.${value.slice(2)}`;
        } else if (value.length > 4) {
            value = `${value.slice(0, 2)}.${value.slice(2, 4)}.${value.slice(4, 8)}`;
        }

        dateInput.value = value; // Оновлюємо значення в полі вводу
    });
});

/*
* Додати картку клієнта
*/

document.addEventListener('DOMContentLoaded', function () {
    let customerCount = 2; // Початкова кількість клієнтів

    // Функція для оновлення каруселі
    function updateCarousel(activeIndex) {
        // Видаляємо клас 'active' з усіх елементів каруселі
        document.querySelectorAll('.carousel__item').forEach((item, index) => {
            item.classList.toggle('active', index === activeIndex);
        });

        // Видаляємо клас 'active' з усіх кнопок і додаємо його лише до активної
        document.querySelectorAll('.section-order__btn-person').forEach((button, index) => {
            button.classList.toggle('active', index === activeIndex);
        });
    }

    // Додавання обробників подій для існуючих і нових кнопок
    function addClickEventToButtons() {
        // Видаляємо всі існуючі обробники подій (щоб уникнути дублювання)
        document.querySelectorAll('.section-order__btn-person').forEach((button, index) => {
            button.replaceWith(button.cloneNode(true)); // Клонуємо кнопку, щоб видалити старі обробники
        });

        // Додаємо нові обробники подій
        document.querySelectorAll('.section-order__btn-person').forEach((button, index) => {
            button.addEventListener('click', () => {
                updateCarousel(index);
            });
        });
    }

    // Викликаємо функцію для додавання обробників подій для початкових кнопок
    addClickEventToButtons();

    // Додавання нового клієнта
    addButton.addEventListener('click', function () {
        
        if (customerCount < 5) { // Максимум 5 клієнтів
            customerCount++;
            
            
            // Створюємо нову кнопку для нового клієнта
            const newButton = document.createElement('button');
            newButton.id = `btn-person-${customerCount}`;
            newButton.className = 'section-order__btn-person';
            newButton.textContent = `Клієнт ${customerCount}`;
            customerController.insertBefore(newButton, addButton);

            // Створюємо новий елемент каруселі
            const newCarouselItem = document.createElement('div');
            newCarouselItem.className = 'carousel__item section-order__personal-data-of-the-client';
            newCarouselItem.innerHTML = `
                <div class="section-order__personal-data-of-the-client">
                    <h2 class="section-order__hero2">Персональні дані клієнта</h2>
                    <div class="section-order__full-info">
                        <form class="section-order__form">
                            <div class="section-order__full-name">
                                <label class="section-order__label" for="Name_of_the_client">ПІБ клієнта ${customerCount}</label>
                                <input class="section-order__input" type="text" name="" id="Name_of_the_client" placeholder="Піліпенко Віктор Дмитрович">
                            </div>
                            <div class="section-order__date">
                                <label class="section-order__label" for="date_of_birth">Дата народження</label>
                                <input class="section-order__input section-order__birth" type="text" name="" id="date_of_birth" placeholder="31.12.2000">
                            </div>
                            <div class="section-order__tel">
                                <label class="section-order__label" for="phone_number">Номер телефону</label>
                                <input class="section-order__input" type="tel" name="" id="phone_number" placeholder="+38">
                            </div>
                        </form>
                    </div>
                    <div class="section-order__analyzes">
                        <form class="section-order__form-analyz">
                            <div class="section-order__block-analyzes">
                                <div class="section-order__text">
                                    <div class="section-order__elem1">Перелік аналізів</div>
                                    <div class="section-order__elem2">Вартість, грн</div>
                                    <div class="section-order__elem3">Знижка</div>
                                </div>
                                ${createAnalyzesInputs(3)}
                            </div>
                            <button class="section-order__add-analyz" type="button">ДОДАТИ АНАЛІЗ</button>
                        </form>
                    </div>
                </div>`;
            
            carousel.appendChild(newCarouselItem);

            // Оновлюємо обробники подій для всіх кнопок (включаючи нову)
            addClickEventToButtons();
        } else {
            alert('Максимальна кількість клієнтів досягнута. Для оформлення цього виклику - повідомте Яну Володимирівну, або Юлія Володимирівну!');
        }
    });
});

/*
* Додати Блок
*/

// Функція для створення аналізів
function createAnalyzesInputs(count) {
    let analyzesHTML = '';
    for (let i = 1; i <= count; i++) {
        // section-order__analyz - Блок, в якому містится: Заголовок (Перелік аналізів/ Вартість, грн / Знижка), По-три input1, input2, input3 та btn
        analyzesHTML += `
            <div class="section-order__analyz"> 
                <div class="section-order__analises">
                    <span class="section-order__numder-analyz">${i}</span>
                    <label for="searchInput"></label>
                    <input class="section-order__input1" type="text" name="" id="searchInput">
                    <button class="section-order__button--remove" type="button">
                        <img class="section-order__img--remove" src="/assets/img/Remove.png" alt="Remove">
                    </button>
                </div>
                <button class="section-order__btn-cost" type="button"></button>
                <div class="section-order__discount">
                    <label for="priceOutput"></label>
                    <input class="section-order__input3" type="text" name="" id="priceOutput">
                    <button class="section-order__btn" type="button">грн</button>
                </div>
            </div>`;
    }
    return analyzesHTML;
}

/*
* Взаємодія з переліком аналізів аналіз
*/

document.addEventListener('DOMContentLoaded', function () {
    // Функція для додавання нового аналізу всередині заданого `carouselItem`
    function addAnalyzToCarousel(carouselItem) {
        let localCount = carouselItem.dataset.analyzesCount 
            ? parseInt(carouselItem.dataset.analyzesCount, 10)
            : 0;

        localCount++; // Збільшуємо локальний лічильник
        carouselItem.dataset.analyzesCount = localCount; // Оновлюємо лічильник в атрибуті data

        const newAnalyz = document.createElement('div');
        newAnalyz.className = 'section-order__analyz';
        newAnalyz.innerHTML = `
            <div class="section-order__analises">
                <span class="section-order__numder-analyz">${localCount}</span>
                <label for="searchInput"></label>
                <input class="section-order__input1" type="text" name="" id="searchInput">
                <button class="section-order__button--remove" type="button">
                    <img class="section-order__img--remove" src="/assets/img/Remove.png" alt="Remove">
                </button>
            </div>
            <button class="section-order__btn-cost" type="button"></button>
            <div class="section-order__discount">
                <label for="priceOutput"></label>
                <input class="section-order__input3" type="text" name="" id="priceOutput">
                <button class="section-order__btn" type="button">грн</button>
            </div>
        `;
        
        carouselItem.querySelector('.section-order__block-analyzes').appendChild(newAnalyz);
        updateAnalyzesNumbers(carouselItem); // Оновлюємо нумерацію для аналізів у поточному елементі каруселі
    }

    // Делегування подій для додавання нового аналізу на всі кнопки .section-order__add-analyz
    document.body.addEventListener('click', function (event) {
        const addButton = event.target.closest('.section-order__add-analyz');
        
        if (addButton) {
            const carouselItem = addButton.closest('.carousel__item');
            addAnalyzToCarousel(carouselItem);
        }
    });

    // Видалення аналізу з делегуванням подій
    document.body.addEventListener('click', function (event) {
        if (event.target.closest('.section-order__button--remove')) {
            const button = event.target.closest('.section-order__button--remove');
            const parentDiv = button.closest('.section-order__analyz');
            const carouselItem = button.closest('.carousel__item');
            
            if (parentDiv) {
                parentDiv.remove();
                updateAnalyzesNumbers(carouselItem); // Оновлюємо нумерацію в поточному елементі каруселі
            }
        }
    });

    // Функція для оновлення номерів аналізів в межах одного carousel__item
    function updateAnalyzesNumbers(carouselItem) {
        const allAnalyzes = carouselItem.querySelectorAll('.section-order__analyz');
        allAnalyzes.forEach((analyz, index) => {
            const numberSpan = analyz.querySelector('.section-order__numder-analyz');
            numberSpan.textContent = index + 1;
        });
        // Оновлюємо значення лічильника відповідно до кількості аналізів у поточному carousel__item
        carouselItem.dataset.analyzesCount = allAnalyzes.length;
    }
});

/*
? Оновити інформацію по аналізам (вартість, термін, від забору, тощо)
*/

/*
* Додавання оновленої інформації по аналізам
*/

// Функція для обробки завантаження файлу
function handleFileUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Додай дані до iqlabAnalyzes
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        
        iqlabAnalyzes.push(...json); // Додаємо дані до масиву
        // console.log(iqlabAnalyzes); // Переконайся, що дані завантажуються

        // Включаємо кнопку після завантаження даних
        document.getElementById('downloadBtn').disabled = false;
    };

    reader.readAsArrayBuffer(file);
}

// Функція для експорту даних у файл
function downloadData() {
    if (!iqlabAnalyzes || iqlabAnalyzes.length === 0) {
        alert('Немає даних для завантаження.');
        return;
    }

    // Перетворення масиву в формат JSON
    const dataStr = `const iqlabAnalyzes = ${JSON.stringify(iqlabAnalyzes, null, 2)};`;

    // Створення Blob з даними
    const blob = new Blob([dataStr], { type: 'application/javascript' });

    // Створення URL для Blob
    const url = URL.createObjectURL(blob);

    // Створення елемента <a> для скачування файлу
    const a = document.createElement('a');
    a.href = url;
    a.download = 'analyses.js'; // Ім'я файлу для завантаження

    // Додавання <a> до DOM, клік для завантаження, та видалення з DOM
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Очищення URL
    URL.revokeObjectURL(url);
}

// Додаємо обробник події для <input>
document.getElementById('upload').addEventListener('change', handleFileUpload);

/*
? Автозаповнення
*/

// console.log(iqlabAnalyzes);

document.addEventListener('DOMContentLoaded', function() {
    const carouselContainer = document.querySelector('.carousel'); // Загальний контейнер для всіх карток клієнтів

    // Делегування події input на всі картки
    carouselContainer.addEventListener('input', (event) => {
        if (event.target.classList.contains('section-order__input1')) {
            const searchTerm = event.target.value.toLowerCase();
            const foundItem = iqlabAnalyzes.find(item => item.Послуга.toLowerCase().includes(searchTerm));

            // Знаходимо кнопку, яка відповідає цьому інпуту
            const priceButton = event.target.closest('.section-order__analyz').querySelector('.section-order__btn-cost');

            if (foundItem) {
                priceButton.textContent = foundItem['Ціна, грн'];
            } else {
                priceButton.textContent = 'ціна';
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const carouselContainer = document.querySelector('.carousel'); // Загальний контейнер для всіх карток клієнтів

    // Функція для створення списку підказок
    function createAutocompleteList(input, suggestions) {
        // Видаляємо старий список підказок, якщо він існує
        let autocompleteList = input.parentNode.querySelector('.autocomplete-list');
        if (autocompleteList) {
            autocompleteList.remove(); // Видаляємо старий контейнер
        }

        // Створюємо новий список підказок
        autocompleteList = document.createElement('div');
        autocompleteList.classList.add('autocomplete-list');
        input.parentNode.appendChild(autocompleteList);

        // Додаємо кожну підказку до списку, без дублювання
        const uniqueSuggestions = [...new Set(suggestions)];
        uniqueSuggestions.forEach(suggestion => {
            const suggestionItem = document.createElement('div');
            suggestionItem.textContent = suggestion;
            suggestionItem.classList.add('autocomplete-item');

            // При кліку на підказку, заповнюємо інпут, оновлюємо вартість і видаляємо список підказок
            suggestionItem.addEventListener('click', () => {
                input.value = suggestion;
                autocompleteList.remove();

                // Оновлюємо вартість після вибору підказки
                updateAnalysisCost(input, suggestion);
            });

            autocompleteList.appendChild(suggestionItem);
        });
    }

    // Функція для оновлення вартості аналізу
    function updateAnalysisCost(input, selectedAnalysis) {
        if (!selectedAnalysis || typeof selectedAnalysis !== 'string') {
            // console.error('Неправильний selectedAnalysis:', selectedAnalysis);
            return;
        }
    
        const foundItem = iqlabAnalyzes.find(item => 
            item.Послуга && item.Послуга.toLowerCase().includes(selectedAnalysis.toLowerCase())
        );
    
        // Знаходимо кнопку, яка відповідає цьому інпуту
        const priceButton = input.closest('.section-order__analyz').querySelector('.section-order__btn-cost');
    
        if (foundItem) {
            priceButton.textContent = foundItem['Ціна, грн'];
        } else {
            priceButton.textContent = 'ціна';
        }
    }

    // Обробка події input для автозаповнення
    carouselContainer.addEventListener('input', (event) => {
        if (event.target.classList.contains('section-order__input1')) {
            const input = event.target;
            const searchTerm = input.value.toLowerCase();
            // console.log("Пошук за терміном:", searchTerm);

            // Фільтруємо послуги, які містять введений текст
            const suggestions = iqlabAnalyzes
                .filter(item => item.Послуга && item.Послуга.toLowerCase().includes(searchTerm))
                .map(item => item.Послуга);
            // console.log("Знайдені підказки:", suggestions);

            // Створюємо список підказок, якщо є співпадіння
            if (suggestions.length > 0) {
                createAutocompleteList(input, suggestions);
            } else {
                // Видаляємо список підказок, якщо немає відповідностей
                const existingList = input.parentNode.querySelector('.autocomplete-list');
                if (existingList) existingList.remove();
            }
        }
    });

    // Закриваємо список підказок, якщо клік відбувається поза ним
    document.addEventListener('click', (event) => {
        const openLists = document.querySelectorAll('.autocomplete-list');
        openLists.forEach(list => {
            if (!list.contains(event.target)) {
                list.remove();
            }
        });
    });
});

/*
!!!!!!!!!!!!!!!!!!!
*/

document.addEventListener('DOMContentLoaded', function () {

    const carousel = document.querySelector('.carousel'); // Контейнер для всіх карток клієнтів

    // Функція для обчислення вартості з урахуванням знижки
    function calculatePrice(searchInput, priceOutput, costButton, currencyButton) {
        const serviceName = searchInput.value.trim();
        const discountValue = parseFloat(priceOutput.value);
        const currentDiscountType = currencyButton.textContent.trim(); // Тип знижки ('грн' або '%')

        if (!serviceName) {
            costButton.textContent = 'Вкажіть послугу';
            return;
        }

        const analysis = iqlabAnalyzes.find(item => item['Послуга'] === serviceName);

        if (!analysis) {
            costButton.textContent = 'Послугу не знайдено';
            return;
        }

        const basePrice = parseFloat(analysis['Ціна, грн']); // Базова ціна
        if (isNaN(basePrice)) {
            costButton.textContent = 'Ціна некоректна';
            return;
        }

// Корекція

        function calculatePrice(analyze) {
            if (!analyze || !analyze['Ціна, грн']) {
                console.error('Некоректний аналіз або відсутня ціна:', analyze);
                return 0; // Повертаємо 0 або інше значення за замовчуванням
            }
        
            // Ваш код обчислення ціни
            const price = analyze['Ціна, грн'];
            return price; // Повертаємо розраховану ціну
        }

        let finalPrice = basePrice;

        if (!isNaN(discountValue)) {
            if (currentDiscountType === 'грн') {
                // Знижка в гривнях: максимум 50% від базової вартості
                const maxDiscount = basePrice * 0.5;
                const appliedDiscount = Math.min(discountValue, maxDiscount);
                finalPrice = basePrice - appliedDiscount;
            } else if (currentDiscountType === '%') {
                // Знижка у відсотках: максимум 50% вартості
                const maxPercentage = 50; // Максимальний відсоток знижки
                const discountPercentage = Math.min(discountValue, maxPercentage);
                finalPrice = basePrice - (basePrice * discountPercentage / 100);
            }

            finalPrice = Math.max(finalPrice, 0); // Ціна не може бути менше 0
        }

        costButton.textContent = `${finalPrice.toFixed(0)}`; // Виводимо остаточну ціну
    }

    // Делегування подій для введення значень
    carousel.addEventListener('input', function (event) {
        const target = event.target;

        if (target.classList.contains('section-order__input1') || target.classList.contains('section-order__input3')) {
            const block = target.closest('.section-order__analyz'); // Знаходимо блок аналізу
            const searchInput = block.querySelector('.section-order__input1');
            const priceOutput = block.querySelector('.section-order__input3');
            const costButton = block.querySelector('.section-order__btn-cost');
            const currencyButton = block.querySelector('.section-order__btn');

            calculatePrice(searchInput, priceOutput, costButton, currencyButton);
        }
    });

    // Делегування подій для зміни типу знижки
    carousel.addEventListener('click', function (event) {
        const target = event.target;

        if (target.classList.contains('section-order__btn')) {
            const block = target.closest('.section-order__analyz'); // Знаходимо блок аналізу
            const searchInput = block.querySelector('.section-order__input1');
            const priceOutput = block.querySelector('.section-order__input3');
            const costButton = block.querySelector('.section-order__btn-cost');
            const currencyButton = target;

            // Перемикання типу знижки
            currencyButton.textContent = currencyButton.textContent.trim() === 'грн' ? '%' : 'грн';
            calculatePrice(searchInput, priceOutput, costButton, currencyButton); // Перерахунок
        }
    });

    // Функція для ініціалізації клієнтів
    function initializeClient(client) {
        const analyzes = client.querySelectorAll('.section-order__analyz');
        analyzes.forEach(block => {
            const searchInput = block.querySelector('.section-order__input1');
            const priceOutput = block.querySelector('.section-order__input3');
            const costButton = block.querySelector('.section-order__btn-cost');
            const currencyButton = block.querySelector('.section-order__btn');

            // Додаємо обробник кліку для кнопки типу знижки
            // currencyButton.addEventListener('click', () => {
            //     currencyButton.textContent = currencyButton.textContent.trim() === 'грн' ? '%' : 'грн';
            //     calculatePrice(searchInput, priceOutput, costButton, currencyButton); // Перерахунок після зміни типу
            // });

            // Початковий розрахунок
            calculatePrice(searchInput, priceOutput, costButton, currencyButton);
        });
    }

    // Ініціалізація для всіх існуючих клієнтів
    document.querySelectorAll('.carousel__item').forEach(initializeClient);
});


/*
? Функція для прорахунку вартості виклика
*/

document.addEventListener('DOMContentLoaded', function () {
    // Функція для оновлення вартості за виклик
    function updateCostPerCall() {
        // Знайдемо активну кнопку
        const activeButton = document.querySelector('.section-geography__btn.active');
        
        // Якщо активна кнопка є
        if (activeButton) {
            // Отримаємо текст з активної кнопки
            const cost = activeButton.textContent.trim(); // Наприклад, "300 грн"
            
            // Оновимо текст в span
            const costPerCallSpan = document.querySelector('.section-order__cost-per-call');
            if (costPerCallSpan) {
                costPerCallSpan.textContent = cost; // Встановлюємо суму
            }
        }
    }

    // Додаємо обробник події на кнопку вибору
    const buttons = document.querySelectorAll('.section-geography__btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            // Видаляємо клас 'active' у всіх кнопок
            buttons.forEach(btn => btn.classList.remove('active'));
            
            // Додаємо клас 'active' до натиснутої кнопки
            this.classList.add('active');
            
            // Оновлюємо суму в span
            updateCostPerCall();
        });
    });

    // Початкове оновлення суми при завантаженні сторінки
    updateCostPerCall();
});

/*
? Функція для прорахунку вартості забору біоматеріала
*/

document.addEventListener('DOMContentLoaded', function () {

    // Отримуємо всі чекбокси
    const bloodCheckbox = document.querySelector('#blood'); // Кров
    const smearCheckbox = document.querySelector('#smear'); // Мазок
    // const otherCheckbox = document.querySelector('#other'); // Інше (якщо потрібно)

    // Отримуємо елемент для відображення вартості біоматеріалу
    const biomaterialPriceSpan = document.querySelector('.section-order__price-for-biomaterial');

    // Функція для оновлення вартості біоматеріалу
    function updateBiomaterialPrice() {
        let total = 0;

        // Перевіряємо, чи вибрано Кров або Мазок
        if (bloodCheckbox.checked) {
            total += 60;
        }

        if (smearCheckbox.checked) {
            total += 60;
        }

        // Якщо вибрано Кров і Мазок, то додаємо разом 120
        if (bloodCheckbox.checked && smearCheckbox.checked) {
            total = 120; // Оскільки це сума для обох
        }

        // Якщо вибрано "Інше", можна додати додаткову вартість (якщо потрібно)
        // if (otherCheckbox.checked) {
        //     // Наприклад, додати якусь вартість для "Інше"
        //     total += 30; // Це можна змінити на потрібну суму
        // }

        // Оновлюємо значення в span
        biomaterialPriceSpan.textContent = `${total} грн`;
    }

    // Додаємо обробники подій на зміну чекбоксів
    bloodCheckbox.addEventListener('change', updateBiomaterialPrice);
    smearCheckbox.addEventListener('change', updateBiomaterialPrice);
    // otherCheckbox.addEventListener('change', updateBiomaterialPrice);
});

/*
? Функція для прорахунку вартості усіх аналізів 
*/

document.addEventListener('DOMContentLoaded', function () {
    const totalCostElement = document.querySelector('.section-order__cost-for-analyses'); // Елемент для відображення суми

    // Функція для обчислення загальної вартості
    function calculateTotalCost() {
        let total = 0;

        // Отримуємо всі кнопки з класом section-order__btn-cost
        const costButtons = document.querySelectorAll('.section-order__btn-cost');

        costButtons.forEach(button => {
            const cost = parseFloat(button.textContent); // Отримуємо текст і перетворюємо в число
            if (!isNaN(cost)) {
                total += cost; // Додаємо до загальної суми
            }
        });

        // Оновлюємо значення у <span>
        totalCostElement.textContent = `${total.toFixed(0)} грн`;
    }

    // Викликаємо цю функцію після кожного перерахунку ціни
    const carousel = document.querySelector('.carousel');

    // Оновлення суми при зміні ціни
    carousel.addEventListener('input', function (event) {
        const target = event.target;

        if (target.classList.contains('section-order__input1') || target.classList.contains('section-order__input3')) {
            // Викликаємо функцію для оновлення загальної вартості
            calculateTotalCost();
        }
    });

    // Оновлення суми при зміні типу знижки
    carousel.addEventListener('click', function (event) {
        const target = event.target;

        if (target.classList.contains('section-order__btn')) {
            // Викликаємо функцію для оновлення загальної вартості
            calculateTotalCost();
        }
    });

    // Початковий підрахунок вартості при завантаженні сторінки
    calculateTotalCost();
});

/*
? Функція для прорахунку загальної вартосі 
*/

document.addEventListener('DOMContentLoaded', function () {
    const totalCostSpan = document.querySelector('.section-info__currency'); // Елемент для загальної вартості
    const analysesCostSpan = document.querySelector('.section-order__cost-for-analyses'); // Вартість аналізів
    const callCostSpan = document.querySelector('.section-order__cost-per-call'); // Вартість виклику
    const biomaterialCostSpan = document.querySelector('.section-order__price-for-biomaterial'); // Вартість біоматеріалу

    // Функція для обчислення загальної вартості виклику
    function calculateTotalCallCost() {
        // Зчитуємо значення трьох компонентів
        const analysesCost = parseFloat(analysesCostSpan.textContent) || 0;
        const callCost = parseFloat(callCostSpan.textContent) || 0;
        const biomaterialCost = parseFloat(biomaterialCostSpan.textContent) || 0;

        // Розраховуємо загальну суму
        const totalCost = analysesCost + callCost + biomaterialCost;

        // Оновлюємо текст в <span>
        totalCostSpan.textContent = totalCost.toFixed(0);
    }

    // Оновлення загальної вартості при зміні будь-якого компонента
    function addEventListenersForCostUpdates() {
        [analysesCostSpan, callCostSpan, biomaterialCostSpan].forEach(span => {
            const observer = new MutationObserver(calculateTotalCallCost); // Слідкуємо за змінами тексту
            observer.observe(span, { childList: true }); // Спрацьовує при зміні текстового контенту
        });
    }

    // Ініціалізуємо
    calculateTotalCallCost(); // Початковий розрахунок
    addEventListenersForCostUpdates(); // Додаємо спостереження
});


/*
! #############################################
*/
