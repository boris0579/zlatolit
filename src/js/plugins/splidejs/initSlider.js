import SplideSlider from './SplideSlider'

export default function initSlider () {
    // Слайдер для карточки товара
    const cardSlider = new SplideSlider('card-slider', {
        type: 'loop',
        perPage: 1,
        //autoplay: true,
        gap: '10px',
        live: false,
        pagination: true,
        arrows: false,
        waitForTransition: true,
        wheel: true
    })

    // Слайдер для отзывов
    const reviewSlider = new SplideSlider('reviews', {
        type: 'loop',
        perPage: 3,
        autoplay: true,
        gap: '40px',
        live: false,
        pagination: true,
        arrows: true,
        breakpoints: {
            900: {
                perPage: 2,
                gap: '10px'
            },
            768: {
                perPage: 1,
                gap: '5px'
            }
        }
    })

    // Слайдер для категорий
    const categoriesSlider = new SplideSlider('categories', {
        autoWidth: true,
        arrows: false,
        pagination: false,
        drag: 'free',
        live: false,
        // waitForTransition: true,
        wheel: true,
        breakpoints: {
            768: {
                type: 'loop'
            },
            450: {
                focus: 'center'
            }
        }
    })

    // Карточки каталог
    const catalogCard = new SplideSlider('catalog-card', {
        live: false, // Отключение живого обновления
        width: 'auto', // Автоматическая ширина слайдера
        type: 'loop', // Включаем циклический слайдер
        pagination: false, // Убираем пагинацию
        arrows: true, // Включаем стрелки
        rewind: true, // Переключение в начало после последнего слайда
        perPage: 3, // Количество карточек на одном экране
        gap: '2.5rem', // Отступы между карточками (40px)
        breakpoints: {
            // При ширине экрана <= 1350px
            1350: {
                arrows: false, // Скрываем стрелки
                fixedWidth: '18.75rem' // Фиксированная ширина карточки (300px = 18.75rem)
            },
            // При ширине экрана <= 1200px
            1200: {
                fixedWidth: '16.25rem', // Фиксированная ширина карточки (260px)
                gap: '1rem' // Отступы между карточками (16px)
            },
            // При ширине экрана <= 450px
            450: {
                fixedWidth: '10.8rem', // Фиксированная ширина карточки (173px)
                gap: '0'
            },
            425: {
                focus: 'center',
                gap: '0.75rem' // 12px
            }
        }
    })

    // Основной слайдер для продукта
    const mainImage = new SplideSlider('main-image', {
        type: 'fade', // Плавное переключение между изображениями
        rewind: true, // Переключение в начало после последнего слайда
        pagination: false, // Отключаем пагинацию
        arrows: false, // Отключаем стрелки
        live: false // Отключаем live-обновление для оптимизации
    })

    // Слайдер миниатюр продукта
    const thumbnails = new SplideSlider('thumbnails', {
        direction: 'ttb', // Вертикальный режим
        height: 'auto', // Автоматическая высота
        autoHeight: true, // Включаем авто-высоту
        drag: 'free', // Свободное перетаскивание
        live: false, // Отключаем live-обновление
        pagination: false, // Отключаем пагинацию
        arrows: true, // Включаем стрелки
        isNavigation: true, // Включаем режим навигации
        breakpoints: {
            1024: {
                type: 'loop',
                direction: 'ltr', // Горизонтальное направление
                autoWidth: true,
                isNavigation: false, // Включаем навигацию
                pagination: true
            }
        }
    })

    // Сначала инициализируем слайдеры
    mainImage.init()
    thumbnails.init()

    // Затем синхронизируем основной слайдер с миниатюрами
    mainImage.sync(thumbnails)

    //
    catalogCard.init()
    cardSlider.init()
    reviewSlider.init()
    categoriesSlider.init()
}
