// < Admain section-info

// * Оновити інформацію по аналізам (вартість, термін, від забору, тощо)

document.addEventListener('DOMContentLoaded', function () {
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
document.getElementById('upload').addEventListener('change', handleFileUpload);

});

