/* header */ 
const header = document.querySelector('header')
const navegar = document.querySelector('.navegar')
const mainMenu = document.querySelector('.main-menu')
const mainMenuLi = mainMenu.querySelectorAll('li')
const account = document.querySelector('#account')
const accountMenu = document.querySelector('#account-menu')
const displayNone = el => el.removeAttribute('style')
const displayFlex = el => el.style.display = 'flex'
const displayBlock = el => el.style.display = 'block'

this.addEventListener('scroll', function(e){
    window.scrollY > 0 ? header.classList.add('header-scrolled') : header.classList.remove('header-scrolled')
})

this.addEventListener('resize', function(){
    this.innerWidth <= 884 ? displayNone(mainMenu) : displayFlex(mainMenu)
})

navegar.addEventListener('mouseenter', function (e) {
    displayFlex(mainMenu)
})

navegar.addEventListener('mouseleave', x =>{
    if(window.innerWidth <= 884) hideMenus(mainMenu)
})

mainMenuLi.forEach(x => {
    x.addEventListener('mouseenter', function () {
        mainMenu.setAttribute('data-active', 'true')
    })
})

mainMenuLi.forEach(x => {
    x.addEventListener('mouseleave', x =>{
        if(window.innerWidth <= 884) hideMenus(mainMenu)
    })
})

account.addEventListener('mouseenter', function (e) {
    displayBlock(accountMenu)
})

account.addEventListener('mouseleave', function(e){
    hideMenus(accountMenu)
})

function hideMenus(el) {
    el.setAttribute('data-active', 'false')
    setTimeout(x => {
        if (el.getAttribute('data-active') === 'false') {
            displayNone(el)
        }
    }, 1000)
}

/* hero-section */

const heroTrailer = document.querySelector('#hero .trailer')
const heroTitle = document.querySelector('#hero h2')
const heroSinopse = document.querySelector('#hero .sinopese')
const heroReplay = document.querySelector('#hero .replay')
const heroMute = document.querySelector('#hero .mute')

heroTitle.addEventListener('animationend', function(){
    toggleClass(this, 'title-hero-end')
})

heroSinopse.addEventListener('animationend', function(){
    toggleClass(this, 'p-hero-end')
})

function toggleClass(el, clase){
    el.classList.toggle(clase)
}

heroMute.addEventListener('click', function(){
    muted(heroMute, heroTrailer)
})

function muted(btn, video){
    if(video.muted){
        video.muted = false
        btn.firstChild.className = "fas fa-volume-up"
    }else{
        video.muted = true
        btn.firstChild.className = "fas fa-volume-mute"
    }
}

heroTrailer.addEventListener('pause', function(){
    toggleClass(heroReplay, 'd-block')
    toggleClass(heroMute, 'd-none')
    toggleClass(heroTrailer, 'trailer-hide')
    toggleClass(heroTitle, 'title-hero-end')
    toggleClass(heroSinopse, 'p-hero-end')
    heroTitle.style.transition = "all 1s ease-in-out"
    heroSinopse.style.transition = "all 1s ease-in-out"
})

heroReplay.addEventListener('click', function(){
    heroTrailer.play()
    toggleClass(heroReplay, 'd-block')
    toggleClass(heroMute, 'd-none')
    toggleClass(heroTrailer, 'trailer-hide')
    toggleClass(heroTitle, 'title-hero-end')
    toggleClass(heroSinopse, 'p-hero-end')
})
