import Splide from '@splidejs/splide'

export default class SplideSlider {
    /**
     * Создаёт экземпляр слайдера
     * @param {string} attribute - Атрибут для поиска элемента с слайдером
     * @param {Object} options - Опции для конфигурации слайдера
     */
    constructor (attribute, options) {
        this.attribute = attribute // Атрибут для поиска элементов
        this.options = options // Опции конфигурации Splide
        this.splide = null // Для хранения экземпляра Splide
    }

    /**
     * Метод для инициализации слайдера
     */
    init () {
        // Находим все элементы с данным атрибутом
        const elements = document.querySelectorAll(
            `[data-splide="${this.attribute}"] .splide`
        )

        // Если слайдеров не найдено, выводим предупреждение и завершаем выполнение
        if (elements.length === 0) {
            console.warn(`Элемент с атрибутом "${this.attribute}" не найден.`)
            return
        }

        // Инициализация массива для хранения экземпляров слайдеров
        this.sliders = []

        // Если найден только один слайдер
        if (elements.length === 1) {
            try {
                // Инициализируем слайдер
                const splide = new Splide(elements[0], this.options)
                splide.mount()
                this.splide = splide // Сохраняем экземпляр в this.splide для дальнейшего использования
            } catch (error) {
                console.error(
                    'Ошибка при инициализации слайдера Splide:',
                    error
                )
            }
        } else {
            // Если найдено несколько слайдеров
            elements.forEach((element, index) => {
                try {
                    // Инициализируем каждый слайдер
                    const splide = new Splide(element, this.options)
                    splide.mount()
                    this.sliders.push(splide) // Добавляем экземпляр слайдера в массив
                    console.log(
                        `Слайдер #${index + 1} успешно инициализирован.`
                    )
                } catch (error) {
                    console.error(
                        `Ошибка при инициализации слайдера #${index + 1}:`,
                        error
                    )
                }
            })
        }
    }

    /**
     * Метод для синхронизации слайдера с другим слайдером
     * @param {SplideSlider} secondarySlider - Второй слайдер для синхронизации
     */
    sync (secondarySlider) {
        if (!(secondarySlider instanceof SplideSlider)) {
            console.error(
                'Переданный слайдер не является экземпляром SplideSlider.'
            )
            return
        }

        if (!this.splide || !secondarySlider.splide) {
            console.warn('Один или оба слайдера не инициализированы.')
            return
        }

        try {
            this.splide.sync(secondarySlider.splide)
        } catch (error) {
            console.error('Ошибка при синхронизации слайдеров Splide:', error)
        }
    }
}
