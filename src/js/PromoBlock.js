/**
 * Класс PromoBlock управляет функциональностью промо-блока с возможностью его скрытия.
 */
export default class PromoBlock {
    /**
     * Создаёт экземпляр PromoBlock.
     * @param {string} [selector='[data-promo]'] - Селектор элемента промо-блока. По умолчанию '[data-promo]'.
     */
    constructor (selector = '[data-promo]') {
        /**
         * Селектор элемента промо-блока.
         * @type {string}
         */
        this.selector = selector

        /**
         * DOM-элемент промо-блока.
         * @type {HTMLElement|null}
         */
        this.block = document.querySelector(this.selector)

        // Если блок не найден, выходим из конструктора.
        if (!this.block) return

        /**
         * Кнопка закрытия промо-блока.
         * @type {HTMLElement|null}
         */
        this.closeButton = this.block.querySelector('[data-close-button]')

        /**
         * Класс, который добавляется для скрытия блока.
         * @type {string}
         */
        this.hiddenClass = 'promo-block--hide'

        this.init()
    }

    /**
     * Инициализирует обработчики событий для кнопки закрытия.
     */
    init () {
        if (this.closeButton) {
            this.closeButton.addEventListener(
                'click',
                this.handleClose.bind(this)
            )
        }
    }

    /**
     * Обработчик закрытия промо-блока. Добавляет класс `hidden` для скрытия.
     */
    handleClose () {
        this.block.classList.add(this.hiddenClass)
    }
}
