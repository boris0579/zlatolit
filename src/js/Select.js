/**
 * Класс Select для управления поведением кастомного выпадающего списка.
 * Он позволяет переключать видимость выпадающего списка, выбирать вариант и закрывать список при клике вне него.
 */
class Select {
    /**
     * Создает экземпляр класса Select.
     * @param {HTMLElement} selectElement - DOM элемент, представляющий кастомный выпадающий список.
     */
    constructor (selectElement) {
        this.select = selectElement
        this.selected = this.select.querySelector('[data-trigger-selected]') // Элемент, показывающий выбранный вариант
        this.options = this.select.querySelector('[data-select-options]') // Контейнер для всех вариантов
        this.optionItems = this.select.querySelectorAll('[data-select-option]') // Все элементы вариантов внутри выпадающего списка
        this._addEventListeners() // Добавляет обработчики событий для взаимодействий
    }

    /**
     * Добавляет обработчики событий для взаимодействий с элементами.
     * - Переключает видимость вариантов при клике на выбранный элемент.
     * - Закрывает выпадающий список, если пользователь кликнул вне него.
     * - Выбирает вариант при клике на элемент списка.
     */
    _addEventListeners () {
        // Переключает видимость вариантов при клике на выбранный элемент
        this.selected.addEventListener('click', () => this.toggleOptions())

        // Закрывает варианты, если пользователь кликнул вне выпадающего списка
        document.addEventListener('click', event => {
            if (!this.select.contains(event.target)) {
                this.closeOptions()
            }
        })

        // Выбирает вариант при клике на элемент списка
        this.optionItems.forEach(option => {
            option.addEventListener('click', () => this.selectOption(option))
        })
    }

    /**
     * Переключает видимость выпадающего списка и активность выбранного элемента.
     */
    toggleOptions () {
        this.select.classList.toggle('select--open')
        this.selected.classList.toggle('select__selected--active')
    }

    /**
     * Закрывает выпадающий список, убирая активные классы.
     */
    closeOptions () {
        this.select.classList.remove('select--open')
        this.selected.classList.remove('select__selected--active')
    }

    /**
     * Устанавливает выбранный вариант и обновляет текст и значение выбранного элемента.
     * @param {HTMLElement} option - Элемент, представляющий выбранный вариант.
     */
    selectOption (option) {
        this.selected.textContent = option.textContent
        this.selected.dataset.value = option.dataset.value
        this.closeOptions()

        // Генерируем событие, которое можно поймать на родительском элементе
        const event = new CustomEvent('selectChanged', {
            detail: {
                value: option.dataset.value,
                text: option.textContent
            }
        })
        this.select.dispatchEvent(event) // Отправляем событие родительскому элементу
    }
}

export default Select
