class ButtonPreloader {
    /**
     * Добавляет прелоадер к кнопке и устанавливает значение атрибута data-loader.
     * @param {HTMLButtonElement} button - Кнопка, к которой нужно добавить прелоадер.
     * @param {string} loadingText - Текст, отображаемый при загрузке (по умолчанию "Loading...").
     */
    static addPreloader (button, loadingText = 'Loading...') {
        if (!button || button.disabled) return

        if (
            button.hasAttribute('data-loader') &&
            button.getAttribute('data-loader') === 'false'
        ) {
            button.dataset.originalText = button.innerHTML // Сохраняем текущий текст кнопки
            button.dataset.loader = 'true' // Устанавливаем состояние атрибута data-loader на "true"

            button.innerHTML = `
                <svg class="preloader" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <path d="M8,1V2.8A5.2,5.2,0,1,1,2.8,8H1A7,7,0,1,0,8,1Z"/>
                    </g>
                </svg>${loadingText}
            `
            button.disabled = true // Делаем кнопку неактивной
        }
    }

    /**
     * Удаляет прелоадер с кнопки, сбрасывает значение data-loader и восстанавливает исходное состояние.
     * @param {HTMLButtonElement} button - Кнопка, с которой нужно удалить прелоадер.
     */
    static removePreloader (button) {
        if (!button) return

        if (
            button.hasAttribute('data-loader') &&
            button.getAttribute('data-loader') === 'true'
        ) {
            if (button.dataset.originalText) {
                button.innerHTML = button.dataset.originalText // Восстанавливаем текст кнопки
                delete button.dataset.originalText // Удаляем сохраненный текст
            }
            button.dataset.loader = 'false' // Устанавливаем значение data-loader на "false"
            button.disabled = false // Активируем кнопку
        }
    }

    /**
     * Ищет все кнопки с атрибутом data-loader.
     * @returns {NodeListOf<HTMLButtonElement>} Коллекция кнопок с атрибутом data-loader.
     */
    static getLoaderButtons () {
        return document.querySelectorAll('[data-loader="false"]')
    }
}

export default ButtonPreloader
