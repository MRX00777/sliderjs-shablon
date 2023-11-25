class Slider {
    constructor(options) {
        this.slider = document.querySelector(options.slider); // подключаем общий родитель всего слайдера
        this.sliderLine = this.slider.querySelector('.slider__line') // подключение родителя слайдеров
        this.slides = this.sliderLine.children // возвращает все дочерние элементы в типе HTML collection , данно случае все слайды
        this.next = this.slider.querySelector('.slider__next') // кнопка следущая
        this.prev = this.slider.querySelector('.slider__prev') // кнопка предыдущая
        this.dir = options.direction.toUpperCase() == 'X' ? 'X' : 'Y'
        this.timeMove = options.time != undefined ? options.time : 1000 // Это типа transition для плавного пер-мещение
        this.width = this.slider.clientWidth // ширина общего слайдера
        this.height = this.slider.clientHeight // высота общего слайдера
        this.moveSize = this.dir === 'X' ? this.width : this.height // Размер движение
        this.interval = isNaN(options.interval) == true ? this.timeMove + 1000 : options.interval // интервал autoplay


        this.activeSlide = 0 // ячейка который будет выдавать активный слайд

        // даем стили для родителя всех слайдов
        this.sliderLine.style = `position: relative; height: ${this.height}px; overflow: hidden;`

        // Чтобы каждему слайду дать стилей используем цикл 
        for (let i = 0; i < this.slides.length; i++) {
            const sl = this.slides[i];
            sl.style = `position: absolute; width: ${this.width}px; height: ${this.height}px` // даем высоту и ширену родителя
            if (i != this.activeSlide) { //  Убираем всех слайдеров кроме первого в правую сторону
                sl.style.transform = `translate${this.dir}(${this.moveSize}px)`
            }
            if (i === this.slides.length - 1) { //  а последний слайд убираем в левую сторону
                sl.style.transform = `translate${this.dir}(${-this.moveSize}px)`
            }
        }


        if(options.autoplay === true){ // autoplay
            let interval = setInterval(() => {
                this.move(this.next)
            }, this.interval);
            this.slider.addEventListener('mouseenter', () => {
                clearInterval(interval)
            })
            this.slider.addEventListener('mouseleave',  () => {
                interval = setInterval(() => {
                    this.move(this.next)
                }, this.interval);
            })
        }

        this.next.addEventListener('click', () => this.move(this.next)) // нажатие на кнопку следущая
        this.prev.addEventListener('click', () => this.move(this.prev)) // нажатие на кнопку предыдущая
    }

    move(btn) { // если в btn приходит кнопка 'следущая' то переменную присваевается -размер движение (данном случае размер ширины) иначе (то есть если кнопка "предыдущая")  +рамер движения (данном случае размер ширины) 

        this.next.disabled = true
        this.prev.disabled = true
        setTimeout(() => {
            this.next.disabled = false
            this.prev.disabled = false
        }, this.timeMove)


        let btnLeftOrRight = btn == this.next ? this.moveSize * -1 : this.moveSize

        for (let i = 0; i < this.slides.length; i++) {
            const slide = this.slides[i];
            slide.style.transition = '0ms'
            if (i != this.activeSlide) {
                slide.style.transform = `translate${this.dir}(${btnLeftOrRight * -1}px)`
            }
        }
        this.slides[this.activeSlide].style.transform = `translate${this.dir}(${btnLeftOrRight}px)`
        this.slides[this.activeSlide].style.transition = this.timeMove + 'ms'
        if (btn == this.next) {
            this.activeSlide++
            if (this.activeSlide >= this.slides.length) {
                this.activeSlide = 0
            }
        } else if (btn == this.prev) {
            this.activeSlide--
            if (this.activeSlide < 0) {
                this.activeSlide = this.slides.length - 1
            }
        }
        this.slides[this.activeSlide].style.transform = `translate${this.dir}(0px)`
        this.slides[this.activeSlide].style.transition = this.timeMove + 'ms'
    }


}

const slider = new Slider({
    slider: '.slider',
    direction: 'X',
    time: 1000,
    interval: 2000, 
    autoplay: true
})

const slider2 = new Slider({
    slider: '.slider-2',
    direction: 'Y',
    time: 1000,
    interval: 2000, 
    autoplay: true
})