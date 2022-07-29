import '/app/libs/swiper/swiper-bundle.min.js'
import '/app/libs/selectize/dist/js/standalone/selectize.min.js'
import '/app/libs/jquery.maskedinput/dist/jquery.maskedinput.min.js'

// Обновить страницу при смене ширины экрана
var windowWidth = window.innerWidth;
window.onresize = function () {
	var newWindowWidth = window.innerWidth;
	if (newWindowWidth != windowWidth) {
		windowWidth = newWindowWidth;
		location.reload();
	}
};

document.addEventListener('DOMContentLoaded', () => {

	$(".button__pop-up").click(function () {
		$('.form_modul #pop-up_name').val($(this).attr('data-name'));
	});

	$('#house-type').selectize({
		placeholder: 'Выбрать...'
	});

	$('#project').selectize({
		placeholder: 'Выбрать...'
	});

	$('#type-roof').selectize({
		placeholder: 'Выбрать...'
	});

	function checkWidth() {
		var windowWidth = $('body').innerWidth(),
			elem = $(".middle__screen");
		if (windowWidth <= 1349) {
			elem.addClass('hide-content');
		} else {
			elem.removeClass('hide-content');
		}
	}

	checkWidth(); // проверит при загрузке страницы

	$(".portfolio__container").each(function () {
		let more = $(this).find(".portfolio__more");
		let hide = $(this).find(".hide-content");
		hide.hide();
		more.click(function () {
			hide.slideToggle();
			more.text(more.text() == "Скрыть" ? "Смотреть еще" : "Скрыть");
		});
	});

	var saleSwiper = new Swiper('#sale-slider', {
		slidesPerView: 'auto',
		speed: 1200,
		freeMode: true,
		watchSlidesProgress: true,
		scrollbar: {
			el: '.swiper-scrollbar',
			draggable: true,
		},
		breakpoints: {
			320: {
				spaceBetween: 10,
			},
			450: {
				spaceBetween: 15,
			},
			993: {
				spaceBetween: 30,
			}
		}
	});

	var portfolioSwiper = new Swiper('#portfolio-slider', {
		slidesPerView: 'auto',
		speed: 1200,
		freeMode: true,
		scrollbar: {
			el: '.swiper-scrollbar',
			draggable: true,
		},
		breakpoints: {
			320: {
				spaceBetween: 8,
			},
			577: {
				spaceBetween: 1,
			}
		}
	})

	//Закрепленное меню
	var $menu = $(".main-header__bottom");

	$(window).scroll(function () {
		if ($(this).scrollTop() > 100 && $menu.hasClass("default")) {
			$menu.removeClass("default").addClass("fixed");
		} else if ($(this).scrollTop() <= 100 && $menu.hasClass("fixed")) {
			$menu.removeClass("fixed").addClass("default");
		}
	});

	$('.button__pop-up').click(function () { // Вызываем функцию по нажатию на кнопку
		var popup_id = $('#' + $(this).attr("rel")); // Связываем rel и popup_id
		$('.main-header__mobile-menu').removeClass('active');
		$('body').removeClass('shading');
		$('.main-header__mobile-burger').removeClass('cross');
		$('.main-header').removeClass('fixed');
		$(popup_id).show(); // Открываем окно
		$('.overlay_popup').show(); // Открываем блок заднего фона
	})
	$('.pop_up_close').click(function () { // Обрабатываем клик по заднему фону
		$('.overlay_popup, .pop_up').hide(); // Скрываем затемнённый задний фон и основное всплывающее окно
	})

	jQuery(window).scroll(function () {
		var $sections = $('section');
		$sections.each(function (i, el) {
			var top = $(el).offset().top - 100;
			var bottom = top + $(el).height();
			var scroll = $(window).scrollTop();
			var id = $(el).attr('id');
			if (scroll > top && scroll < bottom) {
				$('a.active').removeClass('active');
				$('a[href="#' + id + '"]').addClass('active');
			}
		})
	});

	$(".main-header__menu").on("click", "a", function (event) {
		event.preventDefault();
		var id = $(this).attr('href'),
			top = $(id).offset().top;
		$('body,html').animate({
			scrollTop: top
		}, 100);
	});

	$('.mask-phone').mask('+375 (99) 999-99-99');

	var serviceSwiper = new Swiper('#service-slider', {
		slidesPerView: 'auto',
		speed: 1200,
		freeMode: true,
		watchSlidesProgress: true,
		scrollbar: {
			el: '.service-scrollbar',
			draggable: true,
		}
	});

	$(window).scroll(function () {
		if ($(this).scrollTop() > $(this).height()) {
			$('.top').addClass('active');
		} else
			$('.top').removeClass('active');
	});

	$('.top').click(function () {
		$('html, body').stop().animate({
			scrollTop: 0
		}, 'slow', 'swing');
	});

	$('a[href*="#"]').click(function () {
		$('html, body').animate({
			scrollTop: $($.attr(this, 'href')).offset().top
		}, 1000);
		return false;
	});

	$('.main-header__link').click(function () {
		$('.main-header__mobile-menu').toggleClass('active');
		$('body').toggleClass('shading');
		$('.main-header__mobile-burger').toggleClass('cross');
		$('.main-header').toggleClass('fixed');
	});

	$('.main-header__mobile-burger').click(function () {
		$('.main-header').toggleClass('fixed');
		$('.main-header__mobile-menu').toggleClass('active');
		$('.burder__icon').toggleClass('hidden');
		$('.main-header__mobile-burger').toggleClass('cross');
		$('body').toggleClass('shading');
	});

	$('html').on('submit', '.form_modul', function (e) {
		e.preventDefault();
		var form = $(this);
		$.ajax({
			url: '/form_plagin.php',
			type: 'POST',
			data: form.serialize(),
			dataType: 'html',
			success: function (data) {
				console.log('success');
				$(".pop_up_close").trigger("click");
				$(".accepted__hidden").trigger("click");
			}
		});
	});

	$('html').on('submit', '.form_modul2', function (e) {
		e.preventDefault();
		var form = $(this);
		$.ajax({
			url: '/form_plagin2.php',
			type: 'POST',
			data: form.serialize(),
			dataType: 'html',
			success: function (data) {
				console.log('success');
				$(".pop_up_close").trigger("click");
				$(".accepted__hidden").trigger("click");
			}
		});
	});
})