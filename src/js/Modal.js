/**
 * Класс для управления модальными окнами на странице.
 * Реализует открытие, закрытие и управление overlay.
 */
class Modal {
    /**
     * Создаёт экземпляр Modal.
     * Инициализирует overlay, модальные окна, кнопки открытия и закрытия.
     */
    constructor () {
        /**
         * Элемент overlay, используемый для затемнения фона.
         * @type {HTMLElement}
         */
        this.overlay = document.querySelector('[data-overlay]')

        /**
         * Коллекция всех модальных окон.
         * @type {NodeListOf<HTMLElement>}
         */
        this.modals = document.querySelectorAll('[data-modal]')

        /**
         * Кнопки, открывающие модальные окна.
         * @type {HTMLElement[]}
         */
        this.modalButtons = Array.from(
            document.querySelectorAll('[data-modal-target]')
        )

        /**
         * Кнопки закрытия модальных окон.
         * @type {NodeListOf<HTMLElement>}
         */
        this.closeButtons = document.querySelectorAll('[data-close-button]')

        this.init()
    }

    /**
     * Открывает модальное окно по переданному идентификатору.
     * @param {string} modalId - Идентификатор модального окна (атрибут data-modal).
     */
    open (modalId) {
        const modal = document.querySelector(`[data-modal="${modalId}"]`)
        if (modal) {
            this.overlay.classList.add('active-modal') // Добавляем класс active-modal для overlay
            this.overlay.style.zIndex = '1000' // Устанавливаем z-index для overlay
            modal.style.zIndex = '1010' // z-index модального окна выше overlay
            modal.style.display = 'block' // Показываем модальное окно
            document.body.classList.add('no-scroll') // Отключаем скролл
        }
    }

    /**
     * Закрывает указанное модальное окно.
     * @param {HTMLElement} modal - HTML-элемент модального окна.
     */
    close (modal) {
        if (modal) {
            modal.style.display = 'none' // Прячем модальное окно
            modal.style.zIndex = '' // Сбрасываем z-index модального окна
        }
        this.overlay.classList.remove('active-modal') // Убираем класс active-modal для overlay
        this.overlay.style.zIndex = '' // Сбрасываем z-index overlay
        document.body.classList.remove('no-scroll') // Включаем скролл
    }

    /**
     * Инициализирует обработчики событий для открытия и закрытия модальных окон.
     * Скрывает все модальные окна при загрузке страницы.
     */
    init () {
        if (!this.overlay) return
        // Скрываем все модальные окна при загрузке страницы
        this.modals.forEach(modal => (modal.style.display = 'none'))
        this.overlay.classList.remove('active-modal')
        this.overlay.style.zIndex = '' // Сбрасываем z-index при инициализации

        // Добавляем обработчики событий для кнопок открытия модальных окон
        this.modalButtons.forEach(button => {
            button.addEventListener('click', e => {
                const targetButton = e.target.closest('[data-modal-target]')
                if (!targetButton) return

                const modalId = targetButton.dataset.modalTarget
                if (modalId) {
                    this.open(modalId)
                }
            })
        })

        // Добавляем обработчики событий для кнопок закрытия модальных окон
        this.closeButtons.forEach(button => {
            button.addEventListener('click', e => {
                const modal = e.target.closest('[data-modal]')
                this.close(modal)
            })
        })

        // Закрываем окно, если клик на overlay
        this.overlay.addEventListener('click', e => {
            if (e.target === this.overlay) {
                this.modals.forEach(modal => this.close(modal))
            }
        })
    }
}

export default Modal
