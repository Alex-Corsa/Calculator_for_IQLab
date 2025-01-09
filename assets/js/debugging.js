// iqlabAnalyzes = iqlabAnalyzes.map(item => {
//     // Перевіряємо, чи існує ключ "Ціна, грн", і чи є це рядком
//     if (item['Ціна, грн'] && typeof item['Ціна, грн'] === 'string') {
//         // Видаляємо всі пробіли і перетворюємо значення на число
//         item['Ціна, грн'] = parseFloat(item['Ціна, грн'].replace(/\s+/g, ''));
//     }
//     return item;
// });
