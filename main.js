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

// notes  Перша секція section-geography

// * Міста та мапа

// Фолбек для старих браузерів
document.addEventListener("DOMContentLoaded", () => {
    const iframes = document.querySelectorAll("iframe[loading='lazy']");
    iframes.forEach(iframe => {
        if (!("loading" in iframe)) {
            const dataSrc = iframe.getAttribute("src");
            iframe.setAttribute("data-src", dataSrc);
            iframe.removeAttribute("src");

            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        iframe.setAttribute("src", iframe.getAttribute("data-src"));
                        observer.unobserve(iframe);
                    }
                });
            });
            observer.observe(iframe);
        }
    });
});


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


// * Вартість виклику

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


// Обмеження textarea

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


// notes Друга секція section-order

// * Обрання активної картки клієнта

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


// * Форматуванян дати народження

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

        function updatePadding() {
        const elements = document.querySelectorAll('.section-order__numder-analyz');
        
        elements.forEach((el, index) => {
            if (index < 9) {
                el.style.paddingLeft = '7.5px';
            } else {
                el.style.paddingLeft = ''; // Скидаємо стиль для решти
            }
        });
    }
    
    // Викликаємо після додавання нового аналізу
    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('section-order__add-analyz')) {
            setTimeout(updatePadding, 50); // Додаємо затримку, щоб елемент встиг додатися
        }
    });
    
    // Викликаємо при завантаженні сторінки
    document.addEventListener('DOMContentLoaded', updatePadding);


// * Додати картку клієнта

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
    const addButton = document.querySelector('.section-order__btn-add');
    const customerController = document.querySelector('.section-order__controller');
    const carousel = document.querySelector('.carousel');

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
                                <label class="section-order__label" for="Name_of_the_client_${customerCount}">ПІБ клієнта</label>
                                <input class="section-order__input" type="text" name="name" id="Name_of_the_client_${customerCount}" placeholder="Піліпенко Віктор Дмитрович">
                            </div>
                            <div class="section-order__date">
                                <label class="section-order__label" for="date_of_birth_${customerCount}">Дата народження</label>
                                <input class="section-order__input section-order__birth" type="text" name="birth" id="date_of_birth_${customerCount}" placeholder="31.12.2000">
                            </div>
                            <div class="section-order__tel">
                                <label class="section-order__label" for="phone_number_${customerCount}">Номер телефону</label>
                                <input class="section-order__input section-order__phone_number" type="tel" name="phone" id="phone_number_${customerCount}" placeholder="+38">
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
                        <div class="section-order__type-of-biomaterial">Вид біоматеріалу
                            <form class="section-order__form-checkbox" action="">
                                <div class="checkbox-wrapper">
                                    <input type="checkbox" name="blood" id="blood_${customerCount}" class="custom-checkbox section-order__custom-checkbox">
                                    <label for="blood_${customerCount}" class="custom-checkbox-label"></label>
                                    <label for="blood_${customerCount}" class="custom-checkbox-label-2">Кров</label>
                                </div>
                                <div class="checkbox-wrapper">
                                    <input type="checkbox" name="smear" id="smear_${customerCount}" class="custom-checkbox section-order__custom-checkbox">
                                    <label for="smear_${customerCount}" class="custom-checkbox-label"></label>
                                    <label for="smear_${customerCount}" class="custom-checkbox-label-2">Мазок</label>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>`;

            carousel.appendChild(newCarouselItem);

            // Оновлюємо обробники подій для всіх кнопок (включаючи нову)
            addClickEventToButtons();
        } else {
            alert('Максимальна кількість клієнтів досягнута. Для оформлення цього виклику - повідомте Яну Володимирівну або Юлія Володимирівну!');
        }
    });
});



// * Додати Блок

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
                        <input class="section-order__input1" type="text" name="" id="searchInput" autocomplete="off" aria-label="Назва аналізу">
                        <button class="section-order__button--remove" type="button">
                            <img class="section-order__img--remove" src="assets/img/Remove.png" alt="Remove">
                        </button>
                    </div>
                    <button class="section-order__btn-cost" type="button" aria-label="Вартість"></button>
                    <div class="section-order__discount">
                        <label for="priceOutput"></label>
                        <input class="section-order__input3" type="text" name="" id="priceOutput" placeholder="" aria-label="Ціна">
                        <div class="section-order__block">
                            <button class="section-order__btn" type="button">грн</button>
                            <img src="assets/img/Icons.svg" alt="Icons">
                        </div>
                    </div>
                </div>`;
        }
        return analyzesHTML;
    }


// * Взаємодія з переліком аналізів аналіз

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
                    <input class="section-order__input1" type="text" name="" id="searchInput" autocomplete="off" aria-label="Назва аналізу">
                    <button class="section-order__button--remove" type="button">
                        <img class="section-order__img--remove" src="assets/img/Remove.png" alt="Remove">
                    </button>
                </div>
                <button class="section-order__btn-cost" type="button" aria-label="Вартість"></button>
                <div class="section-order__discount">
                    <label for="priceOutput"></label>
                    <input class="section-order__input3" type="text" name="" id="priceOutput" placeholder="" aria-label="Ціна">
                    <div class="section-order__block">
                        <button class="section-order__btn" type="button">грн</button>
                        <img src="assets/img/Icons.svg" alt="Icons">
                    </div>
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
                const button = event.target.closest('.section-order__button--remove'); // Кнопка видалення
                const parentDiv = button.closest('.section-order__analyz'); // Блок аналізу
                const carouselItem = button.closest('.carousel__item'); // Блок каруселі (для оновлення нумерації)
        
                if (parentDiv) {
                    parentDiv.remove(); // Видаляємо блок аналізу
                    updateAnalyzesNumbers(carouselItem); // Оновлюємо нумерацію для аналізів
                    calculateTotalCost(); // Перераховуємо загальну вартість
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


// * Автозаповнення
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
                return;
            }
        
            const foundItem = iqlabAnalyzes.find(item => 
                item.Послуга.toLowerCase() === selectedAnalysis.toLowerCase() // Точна відповідність
            ) || iqlabAnalyzes.find(item => 
                item.Послуга.toLowerCase().includes(selectedAnalysis.toLowerCase()) // Часткове співпадіння
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

// * Прорахунок вартості з урахуванням знижок

document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('.carousel'); // Контейнер для всіх карток клієнтів

    // Функція для обчислення вартості з урахуванням знижки
    function calculatePrice(searchInput, priceOutput, costButton, currencyButton) {
        const serviceName = searchInput.value.trim();
        const discountValue = parseFloat(priceOutput.value);
        const currentDiscountType = currencyButton.textContent.trim(); // Тип знижки ('грн' або '%')

        if (!serviceName) return;

        const analysis = iqlabAnalyzes.find(item => item['Послуга'] === serviceName);

        if (!analysis) return;

        const basePrice = parseFloat(analysis['Ціна, грн']);
        if (isNaN(basePrice)) {
            costButton.textContent = 'Ціна некоректна';
            return;
        }

        let finalPrice = basePrice;

        if (!isNaN(discountValue)) {
            if (currentDiscountType === 'грн') {
                const maxDiscount = basePrice * 0.5;
                const appliedDiscount = Math.min(discountValue, maxDiscount);
                finalPrice = basePrice - appliedDiscount;
            } else if (currentDiscountType === '%') {
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
        const block = event.target.closest('.section-order__block'); // Знаходимо блок для перемикання
        if (block) {
            const currencyButton = block.querySelector('.section-order__btn');
            if (currencyButton) {
                // Перемикання типу знижки
                currencyButton.textContent = currencyButton.textContent.trim() === 'грн' ? '%' : 'грн';

                // Знаходимо відповідні елементи для перерахунку
                const blockAnalyz = block.closest('.section-order__analyz');
                if (blockAnalyz) {
                    const searchInput = blockAnalyz.querySelector('.section-order__input1');
                    const priceOutput = blockAnalyz.querySelector('.section-order__input3');
                    const costButton = blockAnalyz.querySelector('.section-order__btn-cost');

                    calculatePrice(searchInput, priceOutput, costButton, currencyButton);
                }
            }
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

            calculatePrice(searchInput, priceOutput, costButton, currencyButton);
        });
    }

    // Ініціалізація для всіх існуючих клієнтів
    document.querySelectorAll('.carousel__item').forEach(initializeClient);
});


// * Функція для прорахунку вартості виклика
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


// * Функція для прорахунку вартості забору біоматеріала

document.addEventListener('DOMContentLoaded', function () {

    // Отримуємо елемент для відображення вартості біоматеріалу
    const biomaterialPriceSpan = document.querySelector('.section-order__price-for-biomaterial');

    // Функція для оновлення вартості біоматеріалу
    function updateBiomaterialPrice() {
        let total = 0;

        // Отримуємо всі чекбокси з класом .section-order__custom-checkbox
        const checkboxes = document.querySelectorAll('.section-order__custom-checkbox');
        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                total += 70; // Для кожного вибраного чекбоксу додаємо 60 грн
            }
        });

        // Оновлюємо значення в span
        biomaterialPriceSpan.textContent = `${total} грн`;
    }

    // Використовуємо делегування подій для обробки змін в будь-якому чекбоксі
    document.body.addEventListener('change', (event) => {
        if (event.target.classList.contains('section-order__custom-checkbox')) {
            updateBiomaterialPrice();
        }
    });

    // Початкове оновлення вартості, якщо чекбокси вже вибрані
    updateBiomaterialPrice();
});


// * Функція для прорахунку вартості усіх аналізів 

document.addEventListener('DOMContentLoaded', function () {
    const totalCostElement = document.querySelector('.section-order__cost-for-analyses'); // Елемент для відображення суми
    const carousel = document.querySelector('.carousel'); // Контейнер каруселі

    // Функція для обчислення загальної вартості
    function calculateTotalCost() {
        let total = 0;

        // Отримуємо всі кнопки з класом section-order__btn-cost
        const costButtons = carousel.querySelectorAll('.section-order__btn-cost'); // Вибираємо кнопки тільки в каруселі

        costButtons.forEach(button => {
            const costText = button.textContent.replace(/[^\d.]/g, ''); // Видаляємо всі символи, крім чисел і крапки
            const cost = parseFloat(costText); // Перетворюємо текст у число
            if (!isNaN(cost)) {
                total += cost; // Додаємо до загальної суми
            }
        });

        // Оновлюємо значення у <span>
        totalCostElement.textContent = `${total.toFixed(0)} грн`;
    }

    // Відслідковуємо всі можливі зміни у DOM всередині каруселі
    const observer = new MutationObserver(() => {
        calculateTotalCost(); // Викликаємо функцію при додаванні/видаленні елементів
    });

    observer.observe(carousel, { childList: true, subtree: true });

    // Оновлення суми при зміні полів введення
    carousel.addEventListener('input', function (event) {
        const target = event.target;

        if (target.classList.contains('section-order__input1') || target.classList.contains('section-order__input3')) {
            calculateTotalCost();
        }
    });

    // Оновлення суми при кліку на кнопки
    carousel.addEventListener('click', function (event) {
        const target = event.target;

        if (target.classList.contains('section-order__btn')) {
            calculateTotalCost();
        }
    });

    // Початковий підрахунок вартості при завантаженні сторінки
    calculateTotalCost();
});


// notes Третя секція section-info

// * Функція для прорахунку загальної вартосі 
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

// * Форматування номера телефону

const parentElement = document.querySelector('.section-order'); // Батьківський елемент, що існує

parentElement.addEventListener('input', (event) => {
    if (event.target.classList.contains('section-order__phone_number')) {
        const phoneInput = event.target;
        const rawValue = phoneInput.value.replace(/\D/g, ''); // Видаляємо все, окрім цифр

        if (rawValue.length > 10) {
            phoneInput.style.backgroundColor = '#FEF8F8';
            phoneInput.style.border = '2px solid red';
            phoneInput.title = "Номер телефону має містити 10 цифр";
        } else {
            phoneInput.style.backgroundColor = '';
            phoneInput.style.border = '';
            phoneInput.title = '';
        }

        if (rawValue.length === 10) {
            const formattedValue = `${rawValue.slice(0, 3)} ${rawValue.slice(3, 6)} ${rawValue.slice(6)}`;
            phoneInput.value = formattedValue;
            phoneInput.style.backgroundColor = '';
        }
    }
});



// * Форматування дати народження

// const parentElement = document.querySelector('.section-order'); // Батьківський елемент, що існує

parentElement.addEventListener('input', (event) => {
    if (event.target.classList.contains('section-order__birth')) { // Перевірка, чи це потрібний інпут
        const birthInput = event.target;
        let rawValue = birthInput.value.replace(/\D/g, ''); // Видаляємо все, окрім цифр

        // Форматуємо дату
        let formattedValue = '';
        if (rawValue.length > 0) {
            formattedValue += rawValue.slice(0, 2); // День
            if (rawValue.length > 2) {
                formattedValue += '.' + rawValue.slice(2, 4); // Місяць
            }
            if (rawValue.length > 4) {
                formattedValue += '.' + rawValue.slice(4, 8); // Рік
            }
        }

        // Оновлюємо значення інпуту
        birthInput.value = formattedValue;

        // Валідація тільки для повної дати
        if (formattedValue.length === 10) {
            let isValid = true;

            const day = parseInt(rawValue.slice(0, 2), 10);
            const month = parseInt(rawValue.slice(2, 4), 10);
            const year = parseInt(rawValue.slice(4, 8), 10);

            // Перевірка дня, місяця та року
            if (day < 1 || day > 31) isValid = false;
            if (month < 1 || month > 12) isValid = false;
            if (year < 1900 || year > 2099) isValid = false;

            // Відображення результату перевірки
            if (!isValid) {
                birthInput.style.backgroundColor = '#FEF8F8';
                birthInput.style.border = '2px solid red';
                birthInput.title = "Неправильний формат дати";
            } else {
                birthInput.style.backgroundColor = '';
                birthInput.style.border = '';
                birthInput.title = '';
            }
        } else {
            // Якщо дата не завершена, знімаємо підсвічування помилки
            birthInput.style.backgroundColor = '';
            birthInput.title = '';
        }
    }
});


// * Валідація на порожні значення

const streetInput = document.getElementById('street');
const houseInput = document.getElementById('house');

const validateEmptyInput = (input) => {
    input.addEventListener('blur', () => { // Подія при втраті фокуса
        if (input.value.trim() === '') {
            input.style.backgroundColor = '#FEF8F8';
            input.style.border = '2px solid red';
            input.title = "Поле не може бути порожнім";
        } else {
            input.style.backgroundColor = '';
            input.style.border = '';
            input.title = '';
        }
    });
};

validateEmptyInput(streetInput);
validateEmptyInput(houseInput);


// notes Admain section-info

// * Оновити інформацію по аналізам (вартість, термін, від забору, тощо)

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
        const rawData = XLSX.utils.sheet_to_json(worksheet);

        // Очищення та форматування даних
        const formattedData = rawData.map(item => {
            // Видалення пробілів у "Ціна, грн" та перетворення на число
            if (item['Ціна, грн'] && typeof item['Ціна, грн'] === 'string') {
                item['Ціна, грн'] = parseFloat(item['Ціна, грн'].replace(/\s+/g, '').replace(',', '.'));
            }

            // Інші перевірки та форматування (за необхідності)
            if (!item['Послуга']) {
                item['Послуга'] = 'Невідомий аналіз'; // Встановлення значення за замовчуванням
            }

            return item; // Повертаємо очищений об'єкт
        });

        iqlabAnalyzes.push(...formattedData); // Додаємо відформатовані дані до масиву
        console.log('Дані успішно завантажено:', iqlabAnalyzes); // Перевірка очищених даних

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
// document.getElementById('upload').addEventListener('change', handleFileUpload);

// * Модальне вікно

document.addEventListener('DOMContentLoaded', () => {
    const downloadButton = document.querySelector('.section-info__download');
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('close-modal');
    const modalData = document.getElementById('modal-data');

    if (!downloadButton || !modal || !closeModal || !modalData) {
        console.error('Не вдалося знайти необхідні елементи для модального вікна');
        return;
    }

    // Збір даних для модального вікна
    function collectData() {
        const city = document.querySelector('.section-geography__li.active')?.textContent || null;
        const street = document.getElementById('street')?.value || null;
        const house = document.getElementById('house')?.value || null;
        const entrance = document.getElementById('entrance')?.value || null;
        const apartment = document.getElementById('apartment')?.value || null;
        const floor = document.getElementById('floor')?.value || null;
        const intercom = document.getElementById('intercom')?.value || null;

        // Формуємо рядок адреси
        let address = `<p class="modal__address">Адреса:<br>`;
        if (city) address += ` ${city}`;
        if (street) address += `, ${street}`;
        if (house) address += `, будинок ${house}`;
        if (entrance) address += `, під'їзд ${entrance}`;
        if (apartment) address += `, квартира ${apartment}`;
        if (floor) address += `, поверх ${floor}`;
        if (intercom) address += `, домофон ${intercom}`;
        address += `</p>`;

        // Збір даних про клієнтів
        const clients = document.querySelectorAll('.carousel__item');
        let clientsData = '';
        const uniqueClients = new Set(); // Для унікальності клієнтів
        let phones = new Set(); // Для збору унікальних телефонів

        clients.forEach((client, index) => {
            const name = client.querySelector('.section-order__input[name="name"]')?.value || null;
            const birth = client.querySelector('.section-order__birth')?.value || null;
            const phone = client.querySelector('.section-order__phone_number')?.value || null;
            const analyses = Array.from(client.querySelectorAll('.section-order__input1'))
                .map(input => input.value)
                .filter(value => value) // Фільтруємо порожні значення
                .join(', ') || null;

            // Пропускаємо клієнтів без інформації
            if (!name && !birth && !phone && !analyses) return;

            // Додаємо телефон до списку унікальних телефонів
            if (phone) phones.add(phone);

            // Створюємо унікальний ключ для клієнта
            const clientKey = `${name}-${birth}-${phone}-${analyses}`;
            if (uniqueClients.has(clientKey)) return; // Пропускаємо дублі

            uniqueClients.add(clientKey); // Додаємо клієнта до набору

            // Створюємо інформацію про клієнта
            clientsData += `<p class="modal__card"><span style="color: red;">Клієнт ${index + 1}</span><br>`;
            if (name) clientsData += ` ${name}`;
            if (birth) clientsData += `, ${birth}`;
            if (analyses) clientsData += `<br><br><strong>Аналізи:</strong><br> ${analyses}`;
            clientsData += `</p>`;
        });

        // Формуємо блок із телефонами
        let phonesData = '';
        if (phones.size > 0) {
            phonesData = `<p class="modal__phone">Телефон: ${[...phones].join(', ')}</p>`;
        }

        // Збір загальної вартості виклику
        const totalCostElement = document.querySelector('.section-info__currency');
        const totalCost = totalCostElement ? totalCostElement.textContent.trim() : '0';
        const totalCostData = `<h3 class="modal__total-cost">Загальна вартість виклику: ${totalCost} грн</h3>`;

        // Повертаємо зібрану інформацію
        return `${address}${phonesData}${clientsData}${totalCostData}`;
    }

    // Відкрити модальне вікно
    downloadButton.addEventListener('click', () => {
        const data = collectData();
        if (!data.trim()) {
            alert('Немає даних для відображення');
            return;
        }
        modalData.innerHTML = data;
        modal.classList.remove('none');
    });

    // Закрити модальне вікно
    closeModal.addEventListener('click', () => {
        modal.classList.add('none');
    });

    // Закрити модальне вікно при кліку поза його межами
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.add('none');
        }
    });
});

console.log('Скрипт завантажено');


// comment LocalStorage та SessionStorage

// document.addEventListener('DOMContentLoaded', function () {
//     // Відновлення даних при завантаженні сторінки
//     function restoreData() {
//         // Відновлення вибраного міста
//         const savedCity = localStorage.getItem('selectedCity');
//         if (savedCity) {
//             const cityElement = document.getElementById(savedCity);
//             if (cityElement) {
//                 cityElement.classList.add('active');
//                 updateActiveMap(savedCity); // Виклик функції для оновлення карти
//             }
//         }

//         // Відновлення типу знижки
//         const savedDiscounts = JSON.parse(localStorage.getItem('discounts')) || {};
//         Object.keys(savedDiscounts).forEach((blockId) => {
//             const block = document.getElementById(blockId);
//             if (block) {
//                 const discountButton = block.querySelector('.section-order__btn');
//                 if (discountButton) {
//                     discountButton.textContent = savedDiscounts[blockId];
//                 }
//             }
//         });

//         // Відновлення введених даних
//         const savedInputs = JSON.parse(sessionStorage.getItem('inputs')) || {};
//         Object.keys(savedInputs).forEach((inputId) => {
//             const input = document.getElementById(inputId);
//             if (input) {
//                 input.value = savedInputs[inputId];
//             }
//         });
//     }

//     // Збереження введених даних
//     function saveInputData(input) {
//         const savedInputs = JSON.parse(sessionStorage.getItem('inputs')) || {};
//         savedInputs[input.id] = input.value;
//         sessionStorage.setItem('inputs', JSON.stringify(savedInputs));
//     }

//     // Збереження типу знижки
//     function saveDiscount(blockId, discountType) {
//         const savedDiscounts = JSON.parse(localStorage.getItem('discounts')) || {};
//         savedDiscounts[blockId] = discountType;
//         localStorage.setItem('discounts', JSON.stringify(savedDiscounts));
//     }

//     // Збереження вибраного міста
//     function saveCity(cityId) {
//         localStorage.setItem('selectedCity', cityId);
//     }

//     // Слухачі подій
//     document.body.addEventListener('input', (event) => {
//         if (event.target.tagName === 'INPUT' && event.target.id) {
//             saveInputData(event.target);
//         }
//     });

//     document.body.addEventListener('click', (event) => {
//         const discountBlock = event.target.closest('.section-order__block');
//         if (discountBlock) {
//             const discountButton = discountBlock.querySelector('.section-order__btn');
//             if (discountButton) {
//                 const newDiscountType = discountButton.textContent.trim() === 'грн' ? '%' : 'грн';
//                 discountButton.textContent = newDiscountType;
//                 saveDiscount(discountBlock.id, newDiscountType);
//             }
//         }

//         const cityElement = event.target.closest('.section-geography__li');
//         if (cityElement) {
//             const cityId = cityElement.id;
//             document.querySelectorAll('.section-geography__li').forEach((el) => el.classList.remove('active'));
//             cityElement.classList.add('active');
//             saveCity(cityId);
//         }
//     });

//     // Відновлення даних при завантаженні сторінки
//     restoreData();
// });
