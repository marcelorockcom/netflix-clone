const navegar = document.querySelector('.navegar')
const mainMenu = document.querySelector('.main-menu')
const mainMenuLi = mainMenu.querySelectorAll('li')
const displayNone = el => el.style.display = 'none'
const displayFlex = el => el.style.display = 'flex'

this.addEventListener('resize', function(){
    this.innerWidth <= 884 ? displayNone(mainMenu) : displayFlex(mainMenu)
})

navegar.addEventListener('mouseenter', function (e) {
    displayFlex(mainMenu)
})

navegar.addEventListener('mouseleave', hideMainMenu)

mainMenuLi.forEach(x => {
    x.addEventListener('mouseenter', function () {
        mainMenu.setAttribute('data-active', 'true')
    })
})

mainMenuLi.forEach(x => {
    x.addEventListener('mouseleave', hideMainMenu)
})

function hideMainMenu() {
    if(window.innerWidth <= 884){
        mainMenu.setAttribute('data-active', 'false')
        setTimeout(x => {
            if (mainMenu.getAttribute('data-active') === 'false') {
                displayNone(mainMenu)
            }
        }, 1000)
    }
}
