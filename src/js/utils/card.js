/**
 * Настроить обработчик кликов для всех элементов с атрибутом `data-href`.
 * При клике на элемент с атрибутом `data-href`, если клик не был на кнопке или ссылке,
 * происходит переход по адресу, указанному в `data-href`.
 *
 * @function setupCardLinks
 * @example
 * // Использование утилиты:
 * setupCardLinks();
 */
export function setupCardLinks () {
    document.querySelectorAll('[data-href]').forEach(card => {
        card.addEventListener('click', event => {
            // Проверяем, не кликнули ли на кнопке или интерактивном элементе
            const isInteractiveElement = event.target.closest('button, a')
            if (!isInteractiveElement) {
                // Получаем адрес из data-href и переходим
                const href = card.getAttribute('data-href')
                if (href) {
                    window.location.href = href
                }
            }
        })
    })
}
