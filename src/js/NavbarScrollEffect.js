/**
 * Класс NavbarScrollEffect для добавления эффекта прокрутки на навигационную панель.
 * Изменяет внешний вид навигационной панели при прокрутке страницы, добавляя или удаляя класс.
 */
class NavbarScrollEffect {
    /**
     * Создает экземпляр класса NavbarScrollEffect.
     * Находит элемент навигационной панели и сохраняет ее высоту для дальнейшей проверки прокрутки.
     * @param {string} navbarSelector - Селектор навигационной панели для поиска элемента на странице.
     */
    constructor (navbarSelector) {
        this.navbar = document.querySelector(navbarSelector) // Находим элемент навбара

        if (!this.navbar) return
        this.navbarHeight = this.navbar.offsetHeight // Высота навбара

        this.init() // Инициализация
    }

    /**
     * Проверяет текущую прокрутку страницы.
     * Добавляет или удаляет класс 'scrolled' на навигационной панели в зависимости от прокрутки.
     */
    checkScroll () {
        if (window.scrollY > this.navbarHeight) {
            this.navbar.classList.add('scrolled') // Добавление класса, если прокручено больше высоты навбара
        } else {
            this.navbar.classList.remove('scrolled') // Удаление класса, если прокручено меньше высоты навбара
        }
    }

    /**
     * Инициализирует обработчики событий и выполняет проверку прокрутки при загрузке страницы.
     * Добавляет событие прокрутки, чтобы проверять положение страницы при каждом изменении прокрутки.
     */
    init () {
        // Проверка прокрутки при загрузке страницы
        this.checkScroll()

        // Добавление события прокрутки, вызывающего метод checkScroll
        window.addEventListener('scroll', () => this.checkScroll())
    }
}

export default NavbarScrollEffect
