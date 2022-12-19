(function(){
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
    
    /* Hero Section */
    const heroTrailer = document.querySelector('#hero video')
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
        toogleClassTrailer()
        heroTitle.style.transition = "all 1s ease-in-out"
        heroSinopse.style.transition = "all 1s ease-in-out"
    })
    
    heroReplay.addEventListener('click', function(){
        heroTrailer.play()
        toogleClassTrailer()
    })
    
    function toogleClassTrailer(){
        toggleClass(heroReplay, 'd-block')
        toggleClass(heroMute, 'd-none')
        toggleClass(heroTrailer, 'trailer-hide')
        toggleClass(heroTitle, 'title-hero-end')
        toggleClass(heroSinopse, 'p-hero-end')
    }
    
    
    /* Sliders Sections */ 
    const secSlider = document.querySelectorAll('.sec-slider')
    
    secSlider.forEach(categoria => criaCategorias(categoria))

    function criaCategorias(categoria){
        let liFilmes = categoria.querySelectorAll('.filmes-slider').length / getQtdSlides()
        let slider = categoria.querySelector('.slider')
        let marginSlider = parseFloat(window.getComputedStyle(slider).getPropertyValue('margin-left'))
        criaIndicSlider(categoria, liFilmes)
        criaItens(categoria, liFilmes)
        let itens = slider.querySelectorAll('.item')
        configButtons(slider, categoria, liFilmes, itens, marginSlider)
        criaClones(slider, itens)
    }

    function criaIndicSlider(secFilmes, liFilmes){
        for(let i = 1; i <= liFilmes; i++){
            let li = document.createElement('li')
            if(i === 1){
                li.className = "active"
            }
            secFilmes.querySelector('.slider-indicators').appendChild(li)
        }
    }
    
    function criaItens(secFilmes, liFilmes){
        for(let i = 0; i < liFilmes; i++){
            let filmesDiv = secFilmes.querySelectorAll('.filmes-slider')
            let divItens = document.createElement('div')
            divItens.className = "item"
            let sliderWrapper = secFilmes.querySelector('.slider')
            for(let filme = 0; filme < getQtdSlides(); filme++){
                let filmeSlide = filmesDiv[filme].cloneNode(true)
                divItens.appendChild(filmeSlide)
                sliderWrapper.removeChild(filmesDiv[filme])
            }
            sliderWrapper.appendChild(divItens)        
        }
    }

    function configButtons(slider, categoria, liFilmes, itens, marginSlider){
        const btnNext = categoria.querySelector('.next')
        const btnPrevious = categoria.querySelector('.previous')
        btnNext.addEventListener('click', x => nextSlide(slider, categoria, liFilmes, btnPrevious, marginSlider))
        btnPrevious.addEventListener('click', x => previouSlide(slider, categoria, liFilmes, itens, marginSlider))
    }
    
    function criaClones(slider, itens){
        let primeiro = itens[0].cloneNode(true)
        let segundo = itens[1].cloneNode(true)
        slider.appendChild(primeiro)
        slider.appendChild(segundo)
    }
    
    function updateIndicNext(slider, secFilmes, liFilmes){
        let dataSlider = getDataSlider(slider)
        let indicadores = secFilmes.querySelectorAll('.slider-indicators li')
        indicadores.forEach(x => x.classList.remove('active'))
        if(dataSlider === liFilmes - 1){
            slider.setAttribute('data-slider', 0)
            indicadores[0].classList.add('active')
        }else{
            slider.setAttribute('data-slider', ++dataSlider)
            indicadores[dataSlider].classList.add('active')
        }
    }
    
    function updateIndicPrev(slider, secFilmes, liFilmes){
        let dataSlider = getDataSlider(slider)
        let indicadores = secFilmes.querySelectorAll('.slider-indicators li')
        indicadores.forEach(x => x.classList.remove('active'))
        if(dataSlider <= 0){
            slider.setAttribute('data-slider', liFilmes - 1)
            indicadores[liFilmes - 1].classList.add('active')
        }else{
            slider.setAttribute('data-slider', --dataSlider)
            indicadores[dataSlider].classList.add('active')
        }
    }
    
    function getWidthCont(){
        const item = document.querySelector('.item')
        return parseFloat(window.getComputedStyle(item, null).width)
    }
    
    function getDataSlider(slider){
        return parseInt(slider.getAttribute("data-slider"))
    }
    
    function getQtdSlides(){
        let width = window.innerWidth
        if(width >= 1200) return 5
        if(width >= 800) return 4
        return 2
    }
    
    function nextSlide(slider, secFilmes, liFilmes, btnPrevious, marginSlider){
        let marginAtual = parseFloat(slider.style.marginLeft) || 0
        let tamanhoTela = getWidthCont() - marginAtual
        updateIndicNext(slider, secFilmes, liFilmes)
        moveSlider(slider, tamanhoTela, '-')
        slider.style.transform = `translateX(${marginSlider}px)`
        if(slider.getAttribute('data-repeat') === "true"){
            setTimeout(function(){
                slider.removeAttribute('style')
                slider.style.marginLeft = `-${getWidthCont()}px`
                slider.style.transform = `translateX(${marginSlider}px)`
            }, 500)
        }
        if(getDataSlider(slider) === 0){
            slider.setAttribute('data-repeat', 'true')
        }else{
            slider.setAttribute('data-repeat', 'false')
        }
        btnPrevious.classList.add('d-block')
    }
    
    function previouSlide(slider, secFilmes, liFilmes, itens, marginSlider){
        let marginAtual = parseFloat(slider.style.marginLeft)
        updateIndicPrev(slider, secFilmes, liFilmes)
        moveSlider(slider, marginAtual + getWidthCont())
        slider.addEventListener('transitionend', function(){
            if(getDataSlider(slider) === 0){
                slider.removeAttribute('style')
                slider.style.marginLeft = `-${getWidthCont() * itens.length}px`
                slider.style.transform = `translateX(${marginSlider}px)`
                slider.setAttribute('data-repeat', 'true')
            }else{
                slider.setAttribute('data-repeat', 'false')
            }
        })
    }
    
    function moveSlider(slider, move, direction = ''){
        slider.style.transition = "all .5s ease"
        slider.style.marginLeft = `${direction}${move}px`
    }
})()
