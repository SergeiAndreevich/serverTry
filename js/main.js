ыwindow.addEventListener('DOMContentLoaded', ()=>{

//Tabs

	//по клику меню должны меняться картинка, текст и подсветка пункта меню
	const tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');

		//скроем все табы, чтобы было проще работать
		function hideTabsContent (){
			tabsContent.forEach(item => {
				item.classList.add('hide');
				item.classList.remove('show', 'fade');
			});

			tabs.forEach(item => {
				item.classList.remove('tabheader__item_active');
			});
			console.log('hide');
		}
		
		function showTabContent (i = 0) {
			tabsContent[i].classList.add('show', 'fade');
			tabsContent[i].classList.remove('hide');
			tabs[i].classList.add('tabheader__item_active');
			console.log('show');

		}

		hideTabsContent();
		showTabContent();
		//мы написали функцию, что скрывает все табы и затем добавили функцию, что показывает конкретный таб
		//по умолчанию должен показываться первый таб


		tabsParent.addEventListener('click', (event) => {
			//если придется много раз использовать event.target
			// то можно поместить ее в константу 
			const target = event.target;

			if(target && target.classList.contains('tabheader__item')){
				tabs.forEach((item,i) =>{
					//forEach - 1аргумент это элемент, 2й - это порядковый номер
					if(target == item){
						hideTabsContent();
						showTabContent(i);
					}					
				});
			};
		});

//Timer

	const deadLine = '2022-09-15';
	setClock('.timer', deadLine);

	//функция, что будет определять разницу между дедлайном и нашем теккущам временем
	function getTimeRemaining(endTime){
		const t = Date.parse(endTime) - Date.parse(new Date()),  //тут оно покажет в милисекундах
			days = Math.floor(t / (1000*60*60*24)),
			hours = Math.floor((t/(1000*60*60))%24),
			minutes = Math.floor((t/(1000*60))%60),
			seconds= Math.floor((t/1000)%60);
		return {
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	}
	//доп функция для нуля впереди
	function getZero(num){
		if(num>=0 && num<10){
			return `0${num}`;
		} else{
			return num;
		}
	}	
	function setClock(selector, endtime){
		const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			timeInterval = setInterval(updateClock, 1000);
			updateClock();
	//теперь прям тут пишем автообновление
	function updateClock(){
		const t = getTimeRemaining(endtime);
		days.innerHTML = getZero(t.days);
		hours.innerHTML = getZero(t.hours);
		minutes.innerHTML = getZero(t.minutes);
		seconds.innerHTML = getZero(t.seconds);

		if(t.total <= 0){
			clearInterval(timeInterval);
		}
	}
	}
	

//modal
	//const btns = document.querySelectorAll('.modal-btn'),
	const btns = document.querySelectorAll('[data-modal]'),
		//modalWindow = document.querySelector('.modal__content'),
		modal = document.querySelector('.modal');

		//modalCloseBtn = document.querySelector('[data-close]');

//алгоритм работы модального окна:
//жмем по кнопке, затемняется весь скрин и по центру появляется окно
//окно спозиционировано относительно текущаго положения экрана, чтобы было четко посередине
//я так понимаю это нужно вспомнить позиционирование css


	btns.forEach(item=>{
		item.addEventListener('click', ()=>{
			console.log('modal');
			//document.documentElement.style.backgroundColor= 'black';
			//document.documentElement.opacity = '50%';	
			openModal();
		})
	});

	function openModal (){
		modal.classList.add('show');
		modal.classList.remove('hide');
		document.body.style.overflow = 'hidden'; //запрет скролла
		//modal.classList.toggle('show');	
		clearInterval(modalTimer);	
	}

	// modalCloseBtn.addEventListener('click', ()=>{
	// 	closeModal();
	// 	//modal.classList.toggle('show');
	// 	//либо вручную переклюяаем, либо через тогл
	// });	

	function closeModal (){
		modal.classList.remove('show');
		modal.classList.add('hide');
		document.body.style.overflow = '';
	}
	
	//как сделать закрытие модалки по экрану или клавишу esc?
	modal.addEventListener('click', (e)=>{
		if(e.target === modal || e.target.getAttribute('data-close') == ''){
			closeModal();
		}
	}); //это закрытие по экрану
	//а теперь как закрыть по клавише
	document.addEventListener('keydown', (e)=>{
		if(e.code === 'Escape' && modal.classList.contains('show')){
			closeModal();
		}
	});

//тперь нужно, чтобы модалка всплывала, когда мы долистали до конца или же до определенного момента
	const modalTimer = setTimeout(openModal, 15000); //по времени есть
	//теперь по скроллу
	// window.addEventListener('scroll', ()=>{
	// 	//как понять что пользователь долистал до конца?
	// 	//сложи размер ползунка(видимой части экрана) с уже проскроленным путем и сравни с общим скроллом
	// 	if(document.documentElement.clientHeight + window.pageYOffset >= document.documentElement.scrollHeight){
	// 		openModal();
	// 	}
	// } //,{once: true} //здесь не сработает, тк скролл работает на единичку при прокрутке на 1px. а до низу листать далеко не один пиксель
	// );
	function showModalByScroll(){
		if(document.documentElement.clientHeight + window.pageYOffset >= document.documentElement.scrollHeight){
			openModal();
			window.removeEventListener('scroll', showModalByScroll);
		}
	}
	window.addEventListener('scroll', showModalByScroll);

//Классы и плашки
	class MenuCard{
		constructor(src, alt, title, descr, price, parentSelector, ...classes){
			//рест оператор всегда формирует массив.
			//и тчоб проверить, пустой он или нет, проверь его длину
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.parent = document.querySelector(parentSelector);
			this.classes = classes; //помни, что это массив
			this.transfer = 27;
			this.changeToUAC();
		}

		changeToUAC(){
			this.price = this.price * this.transfer;
		}

		render(){
			//нужно создать элемент, добавить версткку, дополнить входными данными, закинуть в html
			const element = document.createElement('div');
			
			if(this.classes.length === 0){
				this.classes = 'menu__item';
				element.classList.add(this.classes);
			} else{
				this.classes.forEach(item => element.classList.add(item));

			}

			element.innerHTML = `
			        <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
         			`;
			this.parent.append(element);
		}
	};

	//можно вот так вызывать
	//const div = new MenuCard();
	//div.render();

	//а можно совершенно иначе
	//new MenuCard().render();
	//но этот способ не имеет ссылок на объект и просто пропадет. Мы его вызвать никак не сможем
	const div1 = new MenuCard(
		'img/tabs/vegy.jpg',
		'vegy',
		'Меню "Фитнес"',
		'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
		9,
		'.menu .container',
		'menu__item',  //нужно придумать способность прописать дефолтный класс
		'big');
	const div2 = new MenuCard(
		'img/tabs/elite.jpg',
		'elite',
		'Меню “Премиум”',
		'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
		13,
		'.menu .container',
		// вот мы не передали аргумент и он заполнился по умолчанию
		);
	const div3= new MenuCard(
		'img/tabs/post.jpg',
		'post',
		'Меню "Постное"',
		'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
		6,
		'.menu .container',
		'menu__item');
	div1.render();
	div2.render();
	div3.render();


//работа с сервером
	//forms
	const forms = document.querySelectorAll('form');

	const message = {
		loading: 'img/spinner.svg',
		success: 'Успешно. Мы перезвоним Вам через минуту',
		error: 'Ошибка. Попробуйте снова'
	}

	forms.forEach(item=>{
		postData(item);
	});

	function postData (form) {
		form.addEventListener('submit', (e)=>{
			e.preventDefault();

			const statusMessage = document.createElement('img');
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
				display: block;
				margin: 0 auto;
			`;
			form.insertAdjacentElement('afterend', statusMessage);
			//нам при успехе нужно выводить какое-то сообщение. 
			//Для этого создаем динамически окно
			//туда записываем текст и добавляем его в html

////		// const request = new XMLHttpRequest();
////		// request.open('POST','server.php');

//			request.setRequestHeader('Content-type', 'multipart/form-data');
			const formData = new FormData(form);
			//такой объект мы создаем, чтобы сгруппировать всю информацию в объект и отправить на сервер. 
			//это гораздо проще, чем поштучно доставать значения и формитровать их в объект

////		//request.send(formData);

			/// request.addEventListener('load', ()=>{
			/// 	if(request.status === 200){
			/// 	 showThanksModal(message.success);
			///	 console.log(request.response);
			/// 	 form.reset();
			/// 	 statusMessage.remove();
				
			// 	} else { showThanksModal(message.error);}
			// });
			const object = {};
			formData.forEach((value, key) =>{
				object[key] = value;
			});
//////////////////////////////////////////////////////////
			fetch('server.php', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json'
				}
				body: JSON.stringify(object);
			})
			.then(data=> data.text()) //если данные точно текстовые, то таким способом мы говорим серверу, ято нам их нужно показать 
			.then(data=>{
				console.log(data);
				showThanksModal(message.success);
				statusMessage.remove();
			})
			.catch(()=>{
				showThanksModal(message.error);
			})
			.finally(()=>{
				form.reset();
			})
//////////////////////////////////////////////////////////

//			для фетча важно помнить!
// он не считает код ошибки 404, 502 и тп за ошибку
// это лишь код статуса, но по факту ведь общение с сервером идет? идет
//фетч выкидывает ошибку только при сбои сети или еще чет,
//т.е. если обшение с сервером не произошло или нарушено

//вот если отрубить интернет, то выкинет ошибку



		});
	}

	function showThanksModal(message){
		const previousModal = document.querySelector('.modal__dialog');
		previousModal.classList.add('hide'); //скрываем, а не удаляем, потому что он нам потом может пригодиться
		openModal();

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
			<div class='modal__content'>
				<div class='modal__close' data-close>&times;</div>
				<div class='modal__title'>${message}</div>
			</div>
		`;

		document.querySelector('.modal').append(thanksModal);
		setTimeout(()=>{
			thanksModal.remove(); 
			previousModal.classList.add('show');
			previousModal.classList.remove('hide');
			closeModal();
		}, 4000);
	}
});