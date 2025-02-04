/**
 * Класс Dropdown управляет поведением выпадающего меню.
 * Он открывает и закрывает меню при клике на стрелку и меняет состояние стрелки.
 */
export default class Dropdown {
    /**
     * Создает экземпляр класса Dropdown.
     * Инициализирует меню и стрелку, добавляет обработчики событий.
     * @param {HTMLElement} dropdownElement - Элемент, который содержит выпадающее меню и стрелку.
     */
    constructor (dropdownElement) {
        this.dropdown = dropdownElement // Элемент контейнера dropdown
        this.menu = dropdownElement.querySelector('[data-dropdown-menu]') // Меню
        this.arrow = dropdownElement.querySelector('[data-dropdown-arrow]') // Стрелка с атрибутом data-dropdown-arrow

        // Проверка наличия необходимых элементов
        if (!this.menu || !this.arrow) {
            console.error('Dropdown elements are missing.')
            return
        }

        this.init() // Инициализация
    }

    /**
     * Инициализация компонента. Открывает меню по умолчанию и добавляет обработчик на стрелку.
     */
    init () {
        // Меню открыто по умолчанию
        this.menu.style.display = 'block' // Меню будет отображаться сразу

        // Добавляем обработчик на стрелку для переключения состояния меню
        this.arrow.addEventListener('click', () => this.toggleDropdown())
    }

    /**
     * Переключает состояние меню (открытие/закрытие).
     * Меняет видимость меню и меняет состояние стрелки.
     */
    toggleDropdown () {
        // Проверяем, открыто ли меню
        const isOpen = this.menu.style.display === 'block'

        // Переключаем видимость меню
        this.menu.style.display = isOpen ? 'none' : 'block'

        // Поворачиваем стрелку в зависимости от состояния меню
        this.arrow.classList.toggle('opened', !isOpen)
    }
}
