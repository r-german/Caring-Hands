// Бургер-меню
const menuIcon = document.querySelector('.menu__icon');
const menuNav = document.querySelector('nav');

menuIcon.addEventListener('click', function() {
    document.body.classList.toggle('_lock');
    menuIcon.classList.toggle('_active');
	menuNav.classList.toggle('_active');
});

const menuLinks = document.querySelectorAll('[data-goto]');
menuLinks.forEach(menuLink => {
    menuLink.addEventListener("click", clickOnLink);
});
function clickOnLink(e) {
    const menuLink = e.target;
    const gotoBlock = document.querySelector(menuLink.dataset.goto);
    const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY -
    document.querySelector('header').offsetHeight;
    if (menuIcon.classList.contains('_active')) {
        document.body.classList.remove('_lock');
        menuIcon.classList.remove('_active');
        menuNav.classList.remove('_active');
    }
	window.scrollTo({
		top: gotoBlockValue
	});
    e.preventDefault();
}

// IntersectionObserver (ссылки в шапке)
const aboutUsLink = document.querySelector('.nav__about-us');
const advantagesLink = document.querySelector('.nav__advantages');
const servicesLink = document.querySelector('.nav__services');
const costLink = document.querySelector('.nav__cost');
const reviewsLink = document.querySelector('.nav__reviews');
const questionsLink = document.querySelector('.nav__questions');
const contactsLink = document.querySelector('.nav__contacts');

var options = {threshold: 0.12};
var callback = function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('_in-viewport')
        }
        else {
            entry.target.classList.remove('_in-viewport')
        }
    });
    if (document.querySelector('.block2').classList.contains('_in-viewport')) {
        aboutUsLink.classList.add('_active');
    }
    else {aboutUsLink.classList.remove('_active');}
    if (document.querySelector('.block3').classList.contains('_in-viewport')) {
        aboutUsLink.classList.remove('_active');
        advantagesLink.classList.add('_active');
    }
    else {advantagesLink.classList.remove('_active');}
    if (document.querySelector('.block4').classList.contains('_in-viewport')) {
        advantagesLink.classList.remove('_active');
        servicesLink.classList.add('_active');
    }
    else {servicesLink.classList.remove('_active');}
    if (document.querySelector('.block5').classList.contains('_in-viewport')) {
        servicesLink.classList.remove('_active');
        costLink.classList.add('_active');
    }
    else {costLink.classList.remove('_active');}
    if (document.querySelector('.block6').classList.contains('_in-viewport')) {
        costLink.classList.remove('_active');
        reviewsLink.classList.add('_active');
    }
    else {reviewsLink.classList.remove('_active');}
    if (document.querySelector('.block7').classList.contains('_in-viewport')) {
        reviewsLink.classList.remove('_active');
        questionsLink.classList.add('_active');
    }
    else {questionsLink.classList.remove('_active');}
    if (document.querySelector('footer').classList.contains('_in-viewport')) {
        questionsLink.classList.remove('_active');
        contactsLink.classList.add('_active');
    }
    else {contactsLink.classList.remove('_active');}
};
var observer = new IntersectionObserver(callback, options);
var animItems = document.querySelectorAll('.anim-item');
animItems.forEach(animItem => {
    observer.observe(animItem);
});

// IntersectionObserver (заголовок h2)
if (window.matchMedia("(max-width: 480.9px), (max-height: 480.9px)").matches) {
    var options2 = {threshold: 0.5};
}
else {
    options2 = {threshold: 0.99};
}
var callback2 = function(entries2) {
    entries2.forEach(entry2 => {
        if (entry2.isIntersecting) {
            entry2.target.classList.add('_transform');
            observer2.unobserve(document.querySelector('.anim-item2'));
        }
    });
};
var observer2 = new IntersectionObserver(callback2, options2);
observer2.observe(document.querySelector('.anim-item2'));

// IntersectionObserver (заголовки h3)
var options3 = {threshold: 0.99};
var callback3 = function(entries3) {
    entries3.forEach(entry3 => {
        if (entry3.isIntersecting) {
            entry3.target.classList.add('_transform');
        }
    });
};
var observer3 = new IntersectionObserver(callback3, options3);
var animItems3 = document.querySelectorAll('.anim-item3');
animItems3.forEach(animItem3 => {
    observer3.observe(animItem3);
});

// Спойлер (Блок5)
document.querySelector(".block5__price-list div").addEventListener("click", function() {
    this.classList.toggle("_open");
    let spContent = this.parentElement.previousElementSibling;
    if (this.classList.contains("_open")){
        spContent.style.maxHeight = spContent.scrollHeight + "px";
    } else {
        spContent.style.maxHeight = "";
    }
});

// Слайдер (Блок6)
new Swiper('.swiper', {
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    freeMode: {
        enabled: true,
        sticky: true
    },
    keyboard: true,
    speed: 600,
    slidesPerView: 1,
    spaceBetween: 30,
    breakpoints: {
        992: {
            slidesPerView: 3,
            spaceBetween: 20
        }
    }
});

// Спойлеры - ответы на вопросы (Блок7)
const spButtons = document.querySelectorAll(".spoiler__title");
const hiddenQuestions = document.querySelector('.hidden-questions');

spButtons.forEach(pressedSpButton => {
    pressedSpButton.addEventListener("click", function() {
        if (!hiddenQuestions.style.maxHeight == "") {
            hiddenQuestions.style.maxHeight = "max-content";
        }
        this.classList.toggle("_open");
        let spContent = this.nextElementSibling;
        if (this.classList.contains("_open")) {
            spContent.style.maxHeight = spContent.scrollHeight + "px";
        } else {
            spContent.style.maxHeight = "";
        }
        spButtons.forEach(anySpButton => {
            let spContent = anySpButton.nextElementSibling;
            if (anySpButton != this) {
                spContent.style.maxHeight = "";
                anySpButton.classList.remove("_open");
            }
        });
    });
});

// Спойлер - скрытые вопросы (Блок7)
document.querySelector(".hidden-questions-button").addEventListener("click", function() {
    this.classList.toggle("_open");
    if (this.classList.contains("_open")){
        hiddenQuestions.style.maxHeight = hiddenQuestions.scrollHeight + "px";
    } else {
        if (hiddenQuestions.style.maxHeight = "max-content") {
            hiddenQuestions.style.maxHeight = hiddenQuestions.scrollHeight + "px";
            void hiddenQuestions.offsetHeight;
        }
        hiddenQuestions.style.maxHeight = "";
    }
});

// Яндекс-карта
function init(){
    let map = new ymaps.Map('map', {
        center: [60.00945601216404, 30.245775519573492],
        zoom: 8,
        controls: ['geolocationControl', 'routeButtonControl', 'fullscreenControl']
    }, {
        geolocationControlFloat: 'right',
        routeButtonControlFloat: 'right'
    });
    map.controls.get('routeButtonControl').routePanel.state.set({
        to: "проспект Авиаконструкторов, 2"
    });
    map.controls.add('zoomControl', {
        size: 'small',
        position: {
            top: '140px',
            right: '10px'
        }
    });
    let placemark = new ymaps.Placemark([60.00945601216404, 30.245775519573492], {}, {
        iconLayout: 'default#image',
        iconImageHref: 'img/footer_map-icon.svg',
        iconImageSize: [97, 130],
        iconImageOffset: [-48, -117]
    });
    map.geoObjects.add(placemark)
}

ymaps.ready(init);

// Фиксированная панель (появление / исчезновение)
var options4 = {
    threshold: 0.01
};
var callback4 = function(entries4) {
    entries4.forEach(entry4 => {
        if (!entry4.isIntersecting) {
            document.querySelector('.fixed-panel').classList.add('_visible');
        } else {
            document.querySelector('.fixed-panel').classList.remove('_visible');
        }
    });
};
var observer4 = new IntersectionObserver(callback4, options4);
observer4.observe(document.querySelector('.block1'));

// Фиксированная панель => ссылки
document.querySelector('.fixed-panel__fp-contacts').addEventListener('click', function() {
    this.classList.toggle('_active');
});

// Форма2 и полоса прокрутки
const showForm2Buttons = document.querySelectorAll('.show-form2');
const fixedBlock1 = document.querySelector('.fixed-block');
const header = document.querySelector('header');
const wrapper = document.querySelector('.wrapper');
const fixedPanel = document.querySelector('.fixed-panel');

let scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
window.addEventListener("resize", function() {
    scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
});

showForm2Buttons.forEach(showForm2Button => {
    showForm2Button.addEventListener("click", function() {
        fixedBlock1.style.cssText = `padding-right: ${scrollbarWidth}px; opacity: 1; visibility: visible;`;
        header.style.cssText = `padding-right: ${scrollbarWidth}px;`;
        wrapper.style.cssText = `padding-right: ${scrollbarWidth}px;`;
        fixedPanel.style.cssText = `padding-right: ${scrollbarWidth}px;`;
        document.body.classList.add('_lock');
    });
});

document.querySelector('.form-box__cross').addEventListener("click", function() {
    fixedBlock1.style.cssText = '';
    header.style.cssText = '';
    wrapper.style.cssText = '';
    fixedPanel.style.cssText = '';
    if(!menuIcon.classList.contains('_active')) {
        document.body.classList.remove('_lock');
    }
});

// Сообщение "Данные отправлены"
const fixedBlock2 = document.querySelector('.fixed-block2');
const forms = document.querySelectorAll('form');

forms.forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if(fixedBlock1.style.opacity == 0) {
            fixedBlock2.style.cssText = `padding-right: ${scrollbarWidth}px; opacity: 1; visibility: visible;`;
            header.style.cssText = `padding-right: ${scrollbarWidth}px;`;
            wrapper.style.cssText = `padding-right: ${scrollbarWidth}px;`;
            fixedPanel.style.cssText = `padding-right: ${scrollbarWidth}px;`;
            document.body.classList.add('_lock');
            function closeFixedBlock2() {
                fixedBlock2.style.cssText = '';
                header.style.cssText = '';
                wrapper.style.cssText = '';
                fixedPanel.style.cssText = '';
                document.body.classList.remove('_lock');
            }
            setTimeout(closeFixedBlock2, 3000);
        }
        else{
            fixedBlock2.style.cssText = `padding-right: ${scrollbarWidth}px; opacity: 1; visibility: visible;`;
            function closeFixedBlock2() {
                fixedBlock2.style.cssText = `padding-right: ${scrollbarWidth}px;`
            }
            setTimeout(closeFixedBlock2, 3000);
        }
    });
});

document.querySelector('.data-sent__cross').addEventListener("click", function() {
    if(fixedBlock1.style.opacity == 0) {
        fixedBlock2.style.cssText = '';
        header.style.cssText = '';
        wrapper.style.cssText = '';
        fixedPanel.style.cssText = '';
        document.body.classList.remove('_lock');
    }
    else{
        fixedBlock2.style.cssText = `padding-right: ${scrollbarWidth}px;`
    }
});