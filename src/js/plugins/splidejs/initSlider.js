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
        perPage: 4,
        autoplay: true,
        gap: '2rem',
        live: false,
        pagination: true,
        arrows: true,
        breakpoints: {
            1150: {
                perPage: 3,
                gap: '1rem'
            },
            768: {
                perPage: 1,
                gap: '0.3125rem'
            }
        }
    })

    // Слайдер для категорий
    // const categoriesSlider = new SplideSlider('categories', {
    //     autoWidth: true,
    //     arrows: false,
    //     pagination: false,
    //     drag: 'free',
    //     live: false,
    //     // waitForTransition: true,
    //     wheel: true,
    //     breakpoints: {
    //         768: {
    //             type: 'loop'
    //         },
    //         450: {
    //             focus: 'center'
    //         }
    //     }
    // })

    // Карточки каталога
    const catalogCard = new SplideSlider('catalog-card', {
        live: false, // Отключение живого обновления
        // type: 'loop', // Включаем циклический слайдер
        pagination: false, // Убираем пагинацию
        arrows: true, // Включаем стрелки для навигации
        rewind: true, // Переключение в начало после последнего слайда
        perPage: 3, // Количество карточек на одном экране
        gap: '2.5rem', // Отступы между карточками (40px)
        breakpoints: {
            1350: {
                arrows: false // Скрываем стрелки на экранах до 1350px
            },
            768: {
                perPage: 4, // Увеличиваем количество карточек на экранах до 768px
                gap: '0.5rem', // Уменьшаем отступы между карточками
                padding: { left: '1rem', right: '1rem' }, // Добавляем внутренние отступы
                focus: 'right' // Смещаем фокус слайдера вправо
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
    // categoriesSlider.init()
}
