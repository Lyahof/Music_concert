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

startTimer("December 30, 2023 00:00:00");


//видео

const description = document.querySelector('.description')
let watchVideo = document.getElementById('watch-video')
const video = document.getElementById('video')
const videoButton = document.querySelector('.description-buttons__play')
const poster = document.getElementById('poster'); // Новый элемент с постером
let isPlay = false;

const handleVideo = (event) => {

	isPlay = !isPlay;
	description.style.visibility = isPlay ? "hidden" : "visible"
	watchVideo.innerText = isPlay ? "Stop" : "Watch Video";
	videoButton.style.visibility = "visible"
	isPlay ? video.play() : video.pause();
}

videoButton.addEventListener('click', handleVideo)


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
let numberOfTickets = document.getElementById('ticket')
let totalSum = document.querySelector('.modal-total__text')
const btnAdd = document.querySelector('.btn-add')

const handleBuyButton = (event) => {

	modal.classList.add('opened');
	const ticketValue = +event.target.dataset.value;

	btnAdd.addEventListener('click', function () {
		let ticketNumber = +numberOfTickets.value;
		let sum = ticketNumber * ticketValue;
		totalSum.innerHTML = `YOUR TOTAL SUM: ${sum} $`;
	})
}

modalClose.addEventListener('click', function () {
	modal.classList.remove('opened')
	numberOfTickets.value = '';
	totalSum.innerHTML = `YOUR TOTAL SUM:`;
})
buyButton.forEach((btn) => btn.addEventListener('click', handleBuyButton));