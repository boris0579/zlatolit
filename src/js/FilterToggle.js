/**
 * Класс FilterToggle управляет отображением фильтров по нажатию кнопки.
 * При нажатии на кнопку фильтры открываются или закрываются.
 */
export default class FilterToggle {
    /**
     * Создает экземпляр класса FilterToggle и инициализирует обработчики событий.
     * @param {string} buttonSelector - Селектор кнопки, по которой происходит открытие/закрытие фильтров.
     * @param {string} filterSelector - Селектор блока фильтра, который будет отображаться или скрываться.
     */
    constructor (buttonSelector, filterSelector) {
        this.button = document.querySelector(buttonSelector) // Кнопка для переключения состояния фильтров
        this.filterBlock = document.querySelector(filterSelector) // Блок фильтров
        this.isOpen = false // Флаг состояния фильтра (открыт/закрыт)
        this.init() // Инициализация
    }

    /**
     * Инициализация класса. Добавляет слушатель события на кнопку.
     * При нажатии на кнопку вызывается метод toggleFilter для переключения состояния фильтра.
     */
    init () {
        if (this.button && this.filterBlock) {
            this.button.addEventListener('click', () => this.toggleFilter()) // Слушатель события на кнопку
        }
    }

    /**
     * Переключает состояние фильтра (открывает или закрывает).
     * Добавляет или удаляет класс 'active' на блоке фильтра.
     * Обновляет текст кнопки в зависимости от состояния фильтра.
     */
    toggleFilter () {
        this.isOpen = !this.isOpen // Инвертируем флаг состояния
        this.filterBlock.classList.toggle('active', this.isOpen) // Переключаем класс 'active' на блоке фильтра
        const buttonText = this.isOpen ? 'Закрыть фильтры' : 'Открыть фильтры' // Меняем текст на кнопке
        this.button.querySelector('span').nextSibling.nodeValue = buttonText // Обновляем текст кнопки
    }
}
