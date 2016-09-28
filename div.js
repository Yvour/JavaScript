'use strict';
var walter_scott = document.createElement('div');
var walter = document.createElement('div');
var scott = document.createElement('scott');
walter_scott.id = 'walter_scott';
walter.id = 'walter';
scott.id = 'scott';
walter.innerHTML = 'Walter';
scott.innerHTML = 'Scott';
walter.style.display = 'inline-block';
scott.style.display = 'inline-block';
document.body.innerHTML = '';
document.body.appendChild(walter_scott);
walter_scott.appendChild(walter);
walter_scott.appendChild(document.createTextNode(' '));
walter_scott.appendChild(scott);
var books = 'Ivanhoe, Rob Roy, Old Mortality, The Lady of the Lake, Waverley, The Heart of Midlothian, The Bride of Lammermoor, Kenilworth'
		.split(/,\s{0,1}/g);
walter_scott.setAttribute('data-books', JSON.stringify(books));
walter_scott.setAttribute('data-name', 'Walter');
try {
	walter_scott.dataset.surname = 'Scott';
} catch (e) {
	walter_scott.setAttribute('data-surname', 'Scott');
	walter_scott.classList.addClass('dataset_attr_error');
}
walter_scott.setAttribute('data-birth--date', '1771-08-15');
walter_scott.setAttribute('isSir', 'true');
walter_scott
		.setAttribute(
				'data-occupation',
				JSON
						.stringify('Historical novelist, poet, Advocate, Sheriff-Depute, Clerk of Session'
								.split(/,\s{0,1}/g)));
walter_scott.setAttribute('data-birt--place',
		'third-floor flat on College Wynd in the Old Town of Edinburgh');
walter_scott.setAttribute('data-information--source',
		'https://en.wikipedia.org/wiki/Walter_Scott');
walter_scott.setAttribute('data-noble-title', 'baronet');
walter_scott.setAttribute('data-noble-title-since', '1820-03-**');
walter_scott.setAttribute('data-manor-name', 'Abbotsford');