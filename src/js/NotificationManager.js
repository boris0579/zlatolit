/**
 * Класс для управления уведомлениями на странице.
 * Позволяет добавлять, закрывать и показывать уведомления с анимацией.
 */
class NotificationManager {
    /**
     * Создаёт экземпляр класса NotificationManager.
     * @param {string|HTMLElement} selector - CSS-селектор или элемент контейнера для уведомлений.
     */
    constructor (selector) {
        this.container = selector

        if (!this.container) {
            return
        }

        this.initCloseHandlers()
    }

    /**
     * Инициализирует обработчики для кнопок закрытия уведомлений.
     * Слушает клик по кнопкам с атрибутом data-notification-close.
     * Закрывает уведомление при клике по кнопке.
     */
    initCloseHandlers () {
        this.container.addEventListener('click', event => {
            // Проверяем, что клик произошёл по кнопке с атрибутом data-notification-close
            if (event.target.closest('[data-notification-close]')) {
                const notification = event.target.closest('.notification')
                if (notification) {
                    this.close(notification)
                } else {
                    console.warn('Уведомление для закрытия не найдено')
                }
            }
        })
    }

    /**
     * Добавляет уведомление в контейнер.
     * @param {Object} options - Параметры уведомления.
     * @param {string} options.content - Контент уведомления.
     * @param {string|null} [options.image=null] - URL изображения для уведомления.
     * @param {string} [options.type=''] - Тип уведомления (например, success, error и т.д.).
     * @param {number|null} [options.delay=null] - Задержка для автоматического закрытия уведомления в миллисекундах.
     * @returns {HTMLElement} - Элемент уведомления.
     */
    addNotification ({ content, image = null, type = '', delay = null }) {
        const notification = document.createElement('div')
        notification.className = `notification${
            type ? ` notification--${type}` : ''
        }`
        notification.innerHTML = `
        ${
            image
                ? `<img class="notification__image" src="${image}" alt="Уведомление">`
                : ''
        }
        <div class="notification__content">${content}</div>
        <button class="btn-close notification__btn-close" title="Закрыть" aria-label="Закрыть окно" data-notification-close></button>
      `

        this.container.appendChild(notification)

        // Установить автоматическое закрытие, если передана задержка
        if (delay) {
            setTimeout(() => this.close(notification), delay)
        }

        return notification
    }

    /**
     * Закрывает уведомление с анимацией.
     * @param {HTMLElement} notification - Элемент уведомления для закрытия.
     */
    close (notification) {
        if (!notification) return

        // Добавляем класс для анимации исчезновения
        notification.classList.add('notification--hide')

        // Удаляем элемент после завершения анимации
        notification.addEventListener(
            'animationend',
            () => {
                notification.remove()
            },
            { once: true }
        )
    }

    /**
     * Программно открывает уведомление.
     * @param {Object} options - Параметры уведомления.
     * @param {string} options.content - Контент уведомления.
     * @param {string|null} [options.image=null] - URL изображения для уведомления.
     * @param {string} [options.type=''] - Тип уведомления.
     * @param {number|null} [options.delay=null] - Задержка для автоматического закрытия уведомления в миллисекундах.
     * @returns {HTMLElement} - Элемент уведомления.
     */
    show ({ content, image, type, delay }) {
        return this.addNotification({ content, image, type, delay })
    }
}

export default NotificationManager
