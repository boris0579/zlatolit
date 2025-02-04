/**
 * Класс для создания табов с переключением контента.
 *
 * @class Tabs
 * @param {Object} options - Конфигурация для инициализации табов.
 * @param {string} options.selector - Селектор контейнера с табами.
 * @param {number} [options.activeTabIndex=1] - Индекс активного таба (по умолчанию 1).
 */
export default class Tabs {
    constructor (options) {
        const {
            selector,
            activeTabIndex = 1 // По умолчанию активируем первый таб (индекс 1)
        } = options

        // Находим контейнер для табов по переданному селектору
        this.tabsContainer = document.querySelector(selector)

        // Если контейнер не найден, выходим
        if (!this.tabsContainer) return

        // Находим все табы и панели контента в контейнере
        this.tabs = this.tabsContainer.querySelectorAll('[data-tab-id]')
        this.panes = this.tabsContainer.querySelectorAll('[data-pane-id]')

        // Устанавливаем индекс активного таба (с учетом индекса 1-based)
        this.activeTabIndex = activeTabIndex - 1 // Преобразуем в 0-based индекс

        // Инициализируем события
        this.init()
    }

    /**
     * Инициализирует обработчики событий для табов.
     * По умолчанию активируется таб, индекс которого был передан в конфигурации.
     */
    init () {
        // Добавляем обработчик события клика на каждый таб
        this.tabs.forEach(tab => {
            tab.addEventListener('click', () => this.switchTab(tab))
        })

        // По умолчанию активируем таб с переданным индексом
        this.activateTab(this.tabs[this.activeTabIndex])
    }

    /**
     * Переключает активный таб и скрывает/показывает соответствующие панели.
     *
     * @param {HTMLElement} tab - Текущий активный таб.
     */
    switchTab (tab) {
        // Убираем активные классы у всех табов и панелей
        this.tabs.forEach(t => t.classList.remove('tabs__item--active'))
        this.panes.forEach(pane => pane.classList.remove('tabs__panel--active'))

        // Активируем текущий таб и его панель контента
        this.activateTab(tab)
    }

    /**
     * Активирует таб и показывает соответствующую панель контента.
     *
     * @param {HTMLElement} tab - Текущий активный таб.
     */
    activateTab (tab) {
        // Добавляем класс активного таба
        tab.classList.add('tabs__item--active')

        // Получаем идентификатор активного таба из data-атрибута
        const activeTabId = tab.getAttribute('data-tab-id')

        // Находим соответствующую панель контента по data атрибуту
        const activePane = this.tabsContainer.querySelector(
            `[data-pane-id="${activeTabId}"]`
        )
        activePane.classList.add('tabs__panel--active')
    }
}
