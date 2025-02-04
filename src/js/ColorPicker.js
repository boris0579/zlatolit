/**
 * Класс ColorPicker управляет выбором цвета из набора кнопок.
 * Он позволяет пользователю выбрать цвет и генерирует событие при выборе.
 */
export default class ColorPicker {
    /**
     * Создает экземпляр класса ColorPicker.
     * Инициализирует кнопки и устанавливает обработчики событий для выбора цвета.
     * @param {HTMLElement} pickerElement - Элемент, содержащий кнопки выбора цветов.
     */
    constructor (pickerElement) {
        this.pickerElement = pickerElement // Элемент, содержащий кнопки для выбора цветов
        this.buttons = Array.from(pickerElement.querySelectorAll('button')) // Список кнопок
        this.selectedColor = null // Текущий выбранный цвет

        this.init() // Инициализация
    }

    /**
     * Инициализация компонента. Добавляет обработчики событий на кнопки.
     */
    init () {
        // Добавляем обработчик на каждую кнопку для выбора цвета
        this.buttons.forEach(button => {
            button.addEventListener('click', () => this.selectColor(button))
        })
    }

    /**
     * Обрабатывает выбор цвета. Устанавливает атрибут 'data-selected' на выбранную кнопку
     * и генерирует событие 'colorSelected' с выбранным цветом.
     * @param {HTMLElement} button - Кнопка, на которую был кликнут пользователь.
     */
    selectColor (button) {
        // Убираем выделение со всех кнопок
        this.buttons.forEach(btn => btn.setAttribute('data-selected', 'false'))

        // Выбираем текущую кнопку
        button.setAttribute('data-selected', 'true')

        // Сохраняем выбранный цвет
        this.selectedColor = button.getAttribute('data-color')

        // Генерируем событие с выбранным цветом
        const event = new CustomEvent('colorSelected', {
            detail: { color: this.selectedColor }
        })

        // Отправляем событие на родительский элемент
        this.pickerElement.dispatchEvent(event)
    }
}
