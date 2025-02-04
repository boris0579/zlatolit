class QuantityInput {
    /**
     * Конструктор класса QuantityInput.
     * Определяет фиксированные селекторы для групп элементов, полей ввода и кнопок.
     */
    constructor () {
        this.groupSelector = '[data-quantity]' // Селектор для группы элементов
        this.fieldSelector = '[data-field]' // Селектор для поля ввода
        this.decreaseSelector = '[data-action="decrease"]' // Селектор для кнопки уменьшения
        this.increaseSelector = '[data-action="increase"]' // Селектор для кнопки увеличения
        this.init()
    }

    /**
     * Инициализация обработчиков событий.
     */
    init () {
        document.querySelectorAll(this.groupSelector).forEach(group => {
            const inputField = group.querySelector(this.fieldSelector)
            const btnMinus = group.querySelector(this.decreaseSelector)
            const btnPlus = group.querySelector(this.increaseSelector)

            if (btnMinus) {
                btnMinus.addEventListener('click', () =>
                    this.decreaseValue(inputField)
                )
            }

            if (btnPlus) {
                btnPlus.addEventListener('click', () =>
                    this.increaseValue(inputField)
                )
            }
        })
    }

    /**
     * Уменьшает значение поля ввода.
     * @param {HTMLInputElement} inputField - Поле ввода.
     */
    decreaseValue (inputField) {
        if (inputField) {
            inputField.value = Math.max(0, parseInt(inputField.value) - 1)
        }
    }

    /**
     * Увеличивает значение поля ввода.
     * @param {HTMLInputElement} inputField - Поле ввода.
     */
    increaseValue (inputField) {
        if (inputField) {
            inputField.value = parseInt(inputField.value) + 1
        }
    }
}

export default QuantityInput
