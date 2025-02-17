import '../scss/main.scss'
import Dropdown from './Dropdown'
import initSlider from './plugins/splidejs/initSlider'
import FilterToggle from './FilterToggle'
import NavbarScrollEffect from './NavbarScrollEffect'
import Sidebar from './Sidebar'
import ProductGallery from './ProductGallery'
import Select from './Select'
import ColorPicker from './ColorPicker'
import Tabs from './Tabs'
import Modal from './Modal'
import CatalogSidebar from './CatalogSidebar'
import HeaderDropdownMenu from './HeaderDropdownMenu'
import ButtonPreloader from './ButtonPreloader'
import QuantityInput from './QuantityInput'
import NotificationManager from './NotificationManager'
import { setupCardLinks } from './utils/card'
import PromoBlock from './PromoBlock'
import initPhoneMask from './plugins/imask'

document.addEventListener('DOMContentLoaded', () => {
    // Modals
    const modal = new Modal()

    // Для карточки товара
    setupCardLinks()

    // Промо блоки рекламные (используется '[data-promo]')
    new PromoBlock()

    // Инициализация всех dropdown'ов на странице
    const dropdowns = document.querySelectorAll('[data-dropdown-id]')

    dropdowns.forEach(dropdownElement => {
        new Dropdown(dropdownElement)
    })

    // Инициализация слайдера
    initSlider()

    // Поле number (custom)
    new QuantityInput()

    // Скрыть/показать фильтр
    new FilterToggle('[data-filter-btn]', '[data-filter-block]')

    // Добавляем тень к шапке при скроле
    new NavbarScrollEffect('.header')

    // Мобильное меню шапки
    // Получаем все кнопки
    const toggleMenu = document.querySelectorAll('[data-toggle-menu]')

    // Преобразуем NodeList в массив и передаем все кнопки в один экземпляр Sidebar
    new Sidebar(Array.from(toggleMenu))

    // Страница продукта
    new ProductGallery('[data-product-gallery]')

    // Select
    const selectElements = document.querySelectorAll('[data-select]')
    if (selectElements.length > 0) {
        selectElements.forEach(selectElement => {
            // Создаем экземпляр Select для каждого элемента
            const selectInstance = new Select(selectElement)

            // Добавляем слушатель события для каждого селекта
            selectElement.addEventListener('selectChanged', event => {
                console.log(
                    'Выбран вариант для этого select:',
                    event.detail.text
                )
                console.log('Значение:', event.detail.value)
            })
        })
    }

    // Color picker product
    const colorPickerElement = document.querySelector('[data-picker="color"]')
    if (colorPickerElement) {
        new ColorPicker(colorPickerElement)

        // Добавляем обработчик события на родительский элемент
        colorPickerElement.addEventListener('colorSelected', event => {
            const selectedColor = event.detail.color // Получаем выбранный цвет из события
            console.log(`Выбран цвет: ${selectedColor}`)
        })
    }

    // Tabs
    new Tabs({
        selector: '[data-tabs]', // Селектор контейнера с табами
        activeTabIndex: 1 // Активный таб
    })

    // Catalog sidebar
    new CatalogSidebar('[data-catalog-sidebar]', '[data-toggle-sidebar]')

    // Menu header
    new HeaderDropdownMenu()

    // Кнопки с data-loader="false" (прелоадер)
    const buttons = ButtonPreloader.getLoaderButtons()
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Добавляем прелоадер
            ButtonPreloader.addPreloader(button, 'Загрузка...')

            // Эмуляция запроса
            setTimeout(() => {
                // Удаляем прелоадер
                ButtonPreloader.removePreloader(button)
                modal.open('success') // Открываем модальное окно по значению атрибута
            }, 1000)
        })
    })

    /** ПРОСТО ДЛЯ ДЕМОНСТРАЦИИ  */
    // Найти все элементы с атрибутом data-notification
    const notificationElements = document.querySelectorAll(
        '[data-notification]'
    )

    notificationElements.forEach(element => {
        const notificationType = element.dataset.notification // Получаем тип уведомления

        // Создаем экземпляр NotificationManager
        const notificationManager = new NotificationManager(element)

        // Добавляем контент уведомления в зависимости от значения атрибута
        switch (notificationType) {
            case 'request-info':
                notificationManager.show({
                    content: `
                    <h3 class="notification__title">Ваша заявка отправлена!</h3>
                    <p class="notification__text">Мы свяжемся с вами в ближайшее время по номеру:<br>
                        <span>+7 (903) 111-11-11</span>
                    </p>
                `,
                    type: 'request-info'
                })
                break

            case 'order-info':
                notificationManager.show({
                    content: `
                    <h3 class="notification__title">Александр, ваш заказ принят!</h3>
                    <p class="notification__text notification__text--details">
                        Ваш заказ: Брусчатка из сланца квадрат, 5 м2, 30-39 мм
                    </p>
                    <p class="notification__text notification__text--summary">Сумма: 56 000 ₽</p>
                    <p class="notification__text notification__text--info">Мы свяжемся с вами в самое ближайшее время!</p>
                `,
                    image: 'assets/1.jpg',
                    type: 'order-info'
                })
                break

            case 'product-info':
                notificationManager.show({
                    content: `
                        <h3 class="notification__title">На этот товар высокий спрос!</h3>
                        <p class="notification__text notification__text--details">
                            Сегодня было заказано 50м2 этого
                            товара (Брусчатка из сланца
                            квадрат)
                        </p>
                        <p class="notification__text notification__text--info">В наличии осталось: 10 штук</p>
                    `,
                    image: '../assets/1.jpg',
                    type: 'product-info'
                })
                break

            default:
                break
        }
    })

    // Маска для телефона
    initPhoneMask('[data-mask-phone]')
})
