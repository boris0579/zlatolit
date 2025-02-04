/**
 * Класс CatalogSidebar для управления боковой панелью каталога.
 * Позволяет открывать и закрывать панель, а также реагирует на клики вне панели.
 */
class CatalogSidebar {
    /**
     * Создаёт экземпляр класса CatalogSidebar.
     * @param {string} sidebarSelector - Селектор элемента боковой панели.
     * @param {string} toggleSelector - Селектор кнопок для управления панелью.
     */
    constructor (sidebarSelector, toggleSelector) {
        /**
         * @property {HTMLElement|null} sidebarElement - Элемент боковой панели.
         */
        this.sidebarElement = document.querySelector(sidebarSelector)

        /**
         * @property {NodeListOf<HTMLElement>} toggleButtons - Коллекция кнопок для управления боковой панелью.
         */
        this.toggleButtons = document.querySelectorAll(toggleSelector)

        /**
         * @property {HTMLElement|null} overlay - Элемент наложения (если есть).
         */
        this.overlay = document.querySelector('[data-overlay]')

        // Проверка на существование элементов и добавление обработчиков событий
        if (this.sidebarElement && this.toggleButtons.length > 0) {
            this.addEventListeners()
        } else {
            console.error(
                'CatalogSidebar: Элементы не найдены. Проверьте селекторы.'
            )
        }
    }

    /**
     * Добавляет обработчики событий:
     * - Клик на кнопки для открытия/закрытия панели.
     * - Клик вне панели для её закрытия.
     */
    addEventListeners () {
        // Назначить обработчики на все кнопки управления панелью
        this.toggleButtons.forEach(button => {
            button.addEventListener('click', () => this.toggleSidebar())
        })

        // Закрытие панели при клике вне её области
        document.addEventListener('click', event =>
            this.handleOutsideClick(event)
        )

        // Закрытие панели при изменении размера экрана (если экран больше 834px)
        window.addEventListener('resize', () => this.handleResize())
    }

    /**
     * Переключает состояние боковой панели (открытие/закрытие).
     */
    toggleSidebar () {
        const isOpen = this.sidebarElement.classList.contains('open')
        if (isOpen) {
            this.closeSidebar()
        } else {
            this.openSidebar()
        }
    }

    /**
     * Открывает боковую панель.
     * Добавляет класс для отображения панели и отключает скролл страницы.
     */
    openSidebar () {
        this.sidebarElement.classList.add('open') // Добавить класс для открытия
        document.body.classList.add('no-scroll') // Отключить скролл
        if (this.overlay) this.overlay.classList.add('active-catalog') // Показать наложение
    }

    /**
     * Закрывает боковую панель.
     * Убирает класс отображения панели и включает скролл страницы.
     */
    closeSidebar () {
        this.sidebarElement.classList.remove('open') // Убрать класс для закрытия
        document.body.classList.remove('no-scroll') // Включить скролл
        if (this.overlay) this.overlay.classList.remove('active-catalog') // Скрыть наложение
    }

    /**
     * Обрабатывает клик вне области боковой панели.
     * Закрывает панель, если клик был вне панели и всех кнопок управления.
     * @param {MouseEvent} event - Событие клика.
     */
    handleOutsideClick (event) {
        const isClickInside =
            this.sidebarElement.contains(event.target) ||
            Array.from(this.toggleButtons).some(button =>
                button.contains(event.target)
            )

        if (!isClickInside && this.sidebarElement.classList.contains('open')) {
            this.closeSidebar()
        }
    }

    /**
     * Закрывает боковую панель при изменении размера окна, если ширина больше 834px.
     */
    handleResize () {
        // Если ширина окна больше 1024px, то закрываем панель
        if (window.innerWidth > 1024) {
            this.closeSidebar()
        }
    }
}

export default CatalogSidebar
