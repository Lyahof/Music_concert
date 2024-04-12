import "../styles/reset.scss"
import "../styles/styles.scss"
import "../styles/colors.scss"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Swiper from 'swiper'
import { Navigation, Pagination } from 'swiper/modules';
Swiper.use([Navigation]);


//Перемещение по якорям

const menuLink = document.querySelectorAll('.menu-link')
const buttons = document.querySelectorAll('.header-button')

const scrollToSection = (event) => {

	event.preventDefault();
	const href = event.currentTarget.getAttribute("href").slice(1);
	const top = document.getElementById(href)?.offsetTop || 0;
	window.scrollTo({ top, behavior: "smooth" });
}

menuLink.forEach((link) => link.addEventListener('click', scrollToSection));
buttons.forEach((button) => button.addEventListener('click', scrollToSection));


// Слайдер Testimonials
const swiper = new Swiper('.swiper', {

	direction: 'horizontal',
	loop: false,
	slidesPerView: 2.3,
	centeredSlides: true,
	initialSlide: 1,
	freeMode: true,
});


// Слайдер Instagram
const slider = new Swiper('.slider', {

	direction: 'horizontal',
	loop: true,
	slidesPerView: 4.5,
	centeredSlides: true,
	initialSlide: 3,

	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
});


//Таймер

const formatValue = (value) => (value < 10 ? `0${value}` : value);

const getTimerValues = (diff) => ({
	seconds: (diff / 1000) % 60,
	minutes: (diff / (1000 * 60)) % 60,
	hours: (diff / (1000 * 3600)) % 24,
	days: (diff / (1000 * 3600 * 24)) % 30,
});

const setTimerValues = (values) => {
	Object.entries(values).forEach(([key, value]) => {
		const timerValue = document.getElementById(key);
		timerValue.innerText = formatValue(Math.floor(value));
	});
};

const startTimer = (date) => {
	const id = setInterval(() => {
		const diff = new Date(date).getTime() - new Date().getTime();

		if (diff < 0) {
			clearInterval(id);
			return;
		}

		setTimerValues(getTimerValues(diff));
	}, 1000);
};

startTimer("December 30, 2024 00:00:00");


//видео

const description = document.querySelector('.description');
let watchVideo = document.getElementById('watch-video');
const video = document.getElementById('video');
const videoButton = document.querySelector('.description-buttons__play');
let isPlay = false;

function handleVideo () {
	isPlay = !isPlay;
	isPlay ? video.play() : video.load();

	description.style.visibility = isPlay ? "hidden" : "visible";
	watchVideo.innerText = isPlay ? "Stop Video" : "Play Video";
	videoButton.style.visibility = "visible";
}

videoButton.addEventListener('click', handleVideo);


//=============== Переключение дней в Event Schedule

const eventDays = document.querySelectorAll('.event-day');
const eventDaysContainer = document.querySelectorAll('.days-table');

eventDays.forEach((eventDay, index) => {

	eventDay.addEventListener('click', () => {
		eventDays.forEach(day => day.classList.remove('active'));
		eventDay.classList.add('active');

		eventDaysContainer.forEach(table => table.classList.remove('opened'))
		eventDaysContainer[index].classList.add('opened')
	});
});


//=============== Модальное окно покупки билетов

const buyButton = document.querySelectorAll(".buy-button");
const modal = document.querySelector('.modal')
const modalClose = document.querySelector('.modal-close')
const numberOfTickets = document.getElementById('ticket')
const totalSum = document.querySelector('.modal-total__text')
const btnAdd = document.querySelector('.btn-add')

function handleBuyButton (e) {

	modal.classList.add('opened');
	const ticketValue = Number(e.target.dataset.value);

	btnAdd.addEventListener('click', function () {
		const ticketNumber = Number(numberOfTickets.value);
		const sum = ticketNumber * ticketValue;
		totalSum.innerHTML = `YOUR TOTAL SUM: ${sum} $`;
	})
}

buyButton.forEach((btn) => btn.addEventListener('click', handleBuyButton));

function closeModal(){
	modal.classList.remove('opened')
	numberOfTickets.value = '';
	totalSum.innerHTML = `YOUR TOTAL SUM:`;
}

modalClose.addEventListener('click', closeModal)

 document.addEventListener('click', (e) => {
	if (!e.target.closest('.modal-wrapper') && modal.classList.contains('opened')) {
		 closeModal();
	}
}, true); 
