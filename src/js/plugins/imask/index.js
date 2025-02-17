import IMask from 'imask'

export default function initPhoneMask (selectors) {
    const phoneInputs = document.querySelectorAll(selectors)
    if (!phoneInputs.length) return

    phoneInputs.forEach(input => {
        IMask(input, { mask: '+{7} (000) 000-00-00' })
    })
}
