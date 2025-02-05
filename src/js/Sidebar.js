/**
 * Класс Sidebar для управления боковой панелью (меню).
 */
class Sidebar {
    /**
     * Создает экземпляр класса Sidebar.
     * @param {HTMLElement[]} toggleMenuElements - Массив элементов, которые переключают меню.
     */
    constructor (toggleMenuElements) {
        // Элементы, которые переключают меню
        this.toggleMenuElements = toggleMenuElements
        this.sidePanel = document.querySelector('[data-panel]') // Панель
        this.overlay = document.querySelector('[data-overlay]') // Наложение
        this.activeButton = null // Текущая активная кнопка
        this.panelPosition = null // Проверка на атрибут data-panel-position

        // Привязываем обработчики событий
        this.addEventListeners()
    }

    /**
     * Добавляет обработчики событий для взаимодействия с боковой панелью.
     */
    addEventListeners () {
        // Открытие/закрытие панели при клике на любую из кнопок
        this.toggleMenuElements.forEach(button => {
            button.addEventListener('click', () => this.toggleSidePanel(button))
        })

        // Закрытие панели при клике вне ее области
        document.addEventListener('click', event =>
            this.handleOutsideClick(event)
        )

        // Закрытие панели при изменении размера экрана
        window.addEventListener('resize', () => this.handleResize())
    }

    /**
     * Переключает состояние боковой панели.
     * @param {HTMLElement} button - Кнопка, на которую был клик.
     */
    toggleSidePanel (button) {
        // Проверка на атрибут data-panel-position
        this.panelPosition = button.hasAttribute('data-panel-position')

        const isPanelOpen = this.sidePanel.getAttribute('data-panel') === 'open'
        if (isPanelOpen) {
            this.closeSidePanel()
        } else {
            this.openSidePanel(button)
        }
    }

    /**
     * Открывает боковую панель.
     * @param {HTMLElement} button - Кнопка, открывающая панель.
     */
    openSidePanel (button) {
        // Устанавливает позицию боковой панели относительно кнопки
        // если у кнопки есть атрибут data-panel-position
        this.setSidePanelPosition(button)

        this.sidePanel.setAttribute('data-panel', 'open')

        // Меняем иконку, если она есть
        const menuIcon = button.querySelector('[data-icon-menu]')
        if (menuIcon) {
            menuIcon.setAttribute('data-icon', 'close')
        }

        // Устанавливаем цвет кнопки
        button.classList.add('btn--menu-active');
        this.activeButton = button;

        // Показываем наложение, если оно существует
        if (this.overlay) {
            this.overlay.classList.add('active-sidebar')
        }

        document.body.classList.add('no-scroll') // Отключаем скролл
    }

    /**
     * Закрывает боковую панель.
     */
    closeSidePanel () {
        this.sidePanel.setAttribute('data-panel', 'closed')

        if (this.activeButton) {
            this.activeButton.classList.remove('btn--menu-active');

            // Меняем иконку обратно, если она есть
            const menuIcon = this.activeButton.querySelector('[data-icon-menu]')
            if (menuIcon) {
                menuIcon.setAttribute('data-icon', 'menu')
            }

            this.activeButton = null // Убираем ссылку на активную кнопку
        }

        // Скрываем наложение
        if (this.overlay) {
            this.overlay.classList.remove('active-sidebar')
        }

        document.body.classList.remove('no-scroll') // Включаем скролл
    }

    /**
     * Устанавливает позицию боковой панели.
     * @param {HTMLElement} button - Кнопка, на основе которой устанавливается позиция.
     */
    setSidePanelPosition (button) {
        this.sidePanel.style.left = 0
        if (this.panelPosition) {
            const leftPosition = button.offsetLeft
            this.sidePanel.style.left = `${leftPosition}px`
        }
    }

    /**
     * Обрабатывает клик вне панели.
     * @param {Event} event - Событие клика.
     */
    handleOutsideClick (event) {
        const isPanelOpen = this.sidePanel.getAttribute('data-panel') === 'open'
        if (isPanelOpen) {
            const isClickInside =
                this.sidePanel.contains(event.target) ||
                this.toggleMenuElements.some(btn => btn.contains(event.target))
            if (!isClickInside) {
                this.closeSidePanel()
            }
        }
    }

    /**
     * Закрывает панель при изменении размера экрана.
     */
    handleResize () {
        if (window.innerWidth > 834) {
            this.closeSidePanel()
        }
    }
}

export default Sidebar
