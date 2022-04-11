const body = document.querySelector('body')

//li
const li = document.querySelectorAll('.header__li')
const menu = document.querySelector('.header__menu')
const menuContent = document.querySelector('.header__menu-content')
const paragraphs = document.querySelectorAll('.header__menu-content p')


const slideImg = document.querySelector('.slide__img img')
const slideWidth = slideImg.width



let activePar = 0

li.forEach((item, i) => {
    item.addEventListener('click', (e) => {
        
        e.preventDefault(); // отключаем дефолтное поведение

        //подчеркивание
        li.forEach(i => i.classList.remove('li__active'))
        if (window.screen.width > 600) { // чтобы на маленьких экранах не было подчеркивания
            item.classList.contains('li__active') ? item.classList.remove('li__active') : item.classList.add('li__active')
        }


        //появление меню
        if (activePar == i+1 || activePar == 0 || !menu.classList.contains('header__menu-active')) {
            menuContent.style.display = 'flex'
            menu.classList.toggle('header__menu-active') // двигает весь блок контента
            window.screen.width > 562 ? menu.classList.contains('header__menu-active') ? body.classList.add('body__active') : body.classList.remove('body__active') : null // делаем  1 условие,чтобы при появлении бургера при клике на li не менялся фон
            if (menuContent.style.opacity == '1') {
                menuContent.style.opacity = '0'
                item.classList.remove('li__active') // при втором клике убираем подчеркивание
                menu.style.zIndex = '1'
            } else {
                window.screen.width < 600 ? menu.style.zIndex = '500' : null
                setTimeout(() => { // задаем задержку для того чтобы тексты не наслаивались
                    menuContent.style.opacity = '1'
                }, 150)
            }
        }

        paragraphs.forEach(p => { // динамически меняем подпункты меню
            p.textContent=`Подпункт меню${i+1}`
        })
        activePar = i + 1


        if (window.screen.width < 600)  {

            if (li[i].style.marginBottom == '250px') {
                li[i].style.marginBottom = '0px'
            } else {
                li.forEach(item => item.style.marginBottom = '0px');
                li[i].style.marginBottom = '250px'
            }

            let otstup = activePar*50 + 100
            menu.style.transform = `translateY(${otstup}px)`
        }
    })
})

//slider

const sliderWrapper = document.querySelector('.slider__wrapper')
const prev = document.querySelector('.prev')
const next = document.querySelector('.next')

let counter = 0 // начальный слайд
let bias = slideWidth == 290 ? 310 : slideWidth


function Bias(i) {
    counter = counter + i
    sliderWrapper.style.transform = `translateX(${-counter * bias}px)`
    console.log('counter ', counter)
}

next.addEventListener('click', () => { //вперед
    counter > -1 ? Bias(-1) : null
})

prev.addEventListener('click', () => {
    counter < 1 ? Bias(1) : null
})
// swipe




const touchStart = sliderWrapper.addEventListener('touchstart', handleTouchStart)
const touchMove = sliderWrapper.addEventListener('touchmove', handleTouchMove)
const touchEnd = sliderWrapper.addEventListener('touchend', handleTouchEnd)

let x1 = null
let x2 = null
let xDiff = null
let variable = null

function handleTouchStart(e)  {
    const firstTouch = e.touches[0]
    x1 = firstTouch.clientX
    sliderWrapper.style.transition = 'transform .3s'
}


function handleTouchMove(e) {

    if (!x1) {
        return false
    } else {
        x2 =  e.touches[0].clientX
        xDiff = x2 -x1
        sliderWrapper.style.transform = `translateX(${xDiff + variable}px)`
    }
}

function handleTouchEnd() {
    variable = variable + xDiff
    if (variable  > 50 && variable  != 0) {
        counter == -1 ? Bias(0) : Bias(-1)
    }
    else if (variable < -50 && variable != 0) {
        counter == 1 ? Bias(0) : Bias(1)
    }  

}



// получаем аккардеон, сначала все скрыты - при нажатии вопрос получает класс активности , другие ( если есть ) этот класс теряют

const questions = document.querySelectorAll('.question')
const answers = document.querySelectorAll('.answer')

questions.forEach((ques, i) => {
    ques.addEventListener('click', (e) => {
        e.preventDefault();
        if (answers[i].style.transform === 'translateY(52px)' || answers[i].style.transform === 'translateY(75px)' || answers[i].style.transform === 'translateY(120px)') { // 2 условие для экранов < 600
            answers[i].style.transform = 'translateY(0px)'

            window.screen.width < 600 && answers[i].textContent.length < 50 ? ques.style.paddingBottom = '60px' : null
            window.screen.width < 562 && answers[i].textContent.length < 50 ? ques.style.paddingBottom = '20px' : null

            window.screen.width < 517 && answers[i].textContent.length > 50 ? ques.style.paddingBottom = '80px' : ques.style.paddingBottom = '15px'
            window.screen.width < 517 && answers[i].textContent.length < 50 ? ques.style.paddingBottom = '80px' : null

            
            answers[i].style.opacity = '0'

        } else {

            answers.forEach(ans => {
                ans.style.transform = 'translateY(0px)'
                ans.style.opacity = '0'
            })

            questions.forEach((ques, i) => {
                
                window.screen.width < 600 && answers[i].textContent.length < 50 ? ques.style.paddingBottom = '60px' : ques.style.paddingBottom = '15px'
                window.screen.width < 562 && answers[i].textContent.length < 50 ? ques.style.paddingBottom = '20px' : null

                window.screen.width < 517 && answers[i].textContent.length > 50 ? ques.style.paddingBottom = '80px' : null
                window.screen.width < 517 && answers[i].textContent.length < 50 ? ques.style.paddingBottom = '80px' : null
            })
            answers[i].style.transform = 'translateY(52px)'
            answers[i].style.opacity = '1'
            
            window.screen.width < 562 && answers[i].textContent.length > 50 ? ques.style.paddingBottom = '130px' : ques.style.paddingBottom = '100px' // отступ для 1 вопроса при экране < 562 но больше 517

            if (window.screen.width < 517 && answers[i].textContent.length > 50) {
                ques.style.paddingBottom = '240px' 
                answers[i].style.transform = 'translateY(75px)'
            }

            if (answers[i].textContent.length < 50) {
                ques.style.paddingBottom = '30px'
                if (window.screen.width < 600) { // текст становится в 2 линии
                    ques.style.paddingBottom = '60px'
                    // answers[i].style.transform = 'translateY(75px)'
                    window.screen.width < 562 ? answers[i].style.transform = 'translateY(52px)' : answers[i].style.transform = 'translateY(75px)'
                    if (window.screen.width < 517) {
                        answers[i].style.transform = 'translateY(75px)';
                        ques.style.paddingBottom = '100px'
                        if (i == 2) {
                           answers[i].style.transform = 'translateY(120px)' 
                           ques.style.paddingBottom = '140px'
                        }  
                    }
                }
            }
            //else
        }
    })

})


if (window.screen.width < 600 ) { // сработает на экранах < 600
    questions[1].style.paddingBottom = '60px'
    questions[2].style.paddingBottom = '60px'
    if (window.screen.width < 562) {
        questions[1].style.paddingBottom = '20px'
        questions[2].style.paddingBottom = '20px'
    } 
    if (window.screen.width < 516) {
        questions.forEach(i => i.style.paddingBottom = '80px')
    }
}

//burger

const burger = document.querySelector('.burger')
const headerUl = document.querySelector('.header__ul')

burger.addEventListener('click', () => {
    headerUl.style.transition = 'transform .2s'
    headerUl.classList.toggle('header__ul-toggle')

    burger.classList.toggle('burger__active')

    body.classList.toggle('body__active')

    if (!burger.classList.contains('burger__active')) {
        menuContent.style.opacity = '0';
        li.forEach(item => item.style.marginBottom = '0px');
        activePar = 0
        menu.classList.remove('header__menu-active')
        menuContent.style.display = 'none'
    } 
})