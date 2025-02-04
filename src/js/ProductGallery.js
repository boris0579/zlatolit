class ProductGallery {
    /**
     * Конструктор галереи
     * @param {string} gallerySelector - Селектор контейнера галереи
     */
    constructor (gallerySelector) {
        // Находим элемент галереи по селектору
        this.gallery = document.querySelector(gallerySelector)

        // Если галерея не найдена, выходим из конструктора
        if (!this.gallery) {
            return
        }

        // Находим все миниатюры в галерее
        this.thumbnails = this.gallery.querySelectorAll(
            '[data-thumbnail-image]'
        )

        // Находим главное изображение в галерее
        this.mainImage = this.gallery.querySelector('[data-main-image]')

        // Проверяем наличие миниатюр и главного изображения
        if (this.thumbnails.length === 0 || !this.mainImage) {
            console.warn(
                `Gallery structure is incomplete for selector: ${gallerySelector}`
            )
            return
        }

        // Инициализируем обработчики событий
        this.init()
    }

    /**
     * Инициализация обработчиков событий для миниатюр
     */
    init () {
        this.thumbnails.forEach(thumbnail => {
            // Добавляем обработчик клика на каждую миниатюру
            thumbnail.addEventListener('click', () =>
                this.updateMainImage(thumbnail)
            )
        })
    }

    /**
     * Обновление главного изображения при клике на миниатюру
     * @param {HTMLElement} thumbnail - Миниатюра, по которой был выполнен клик
     */
    updateMainImage (thumbnail) {
        // Удаляем активный класс со всех миниатюр
        this.thumbnails.forEach(thumb =>
            thumb.parentElement.classList.remove('product__thumbnail--active')
        )

        // Добавляем активный класс к выбранной миниатюре
        thumbnail.parentElement.classList.add('product__thumbnail--active')

        // Добавляем класс для скрытия главного изображения
        this.mainImage.classList.add('product__image--hidden')

        // Обновляем главное изображение после небольшого таймера
        setTimeout(() => {
            this.mainImage.src = thumbnail.src
            this.mainImage.alt = thumbnail.alt

            // Убираем класс скрытия после обновления
            this.mainImage.classList.remove('product__image--hidden')
        }, 100) // Таймер соответствует времени анимации (0.1s)
    }
}

export default ProductGallery
