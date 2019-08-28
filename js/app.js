//1.- El título “Match Game” cambia de color alternando 
function colorBlink(selector) {
	$(selector).animate({
			opacity: '1',
		}, {
			step: function () {
				$(this).css('color', 'white');
			},
			queue: true
		})
		.animate({
			opacity: '1'
		}, {
			step: function () {
				$(this).css('color', 'red');
			},
			queue: true
		}, 600)
		.delay(2000)
		.animate({
			opacity: '1'
		}, {
			step: function () {
				$(this).css('color', 'white');
			},
			queue: true
		})
		.animate({
			opacity: '1'
		}, {
			step: function () {
				$(this).css('color', 'red');
				colorBlink('h1.main-titulo');
			},
			queue: true
		});
}

//2.- Generando números aleatorios
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

function giveCaramArrays(arrayType, index) {

	var CaramCol1 = $('.col-1').children();
	var CaramCol2 = $('.col-2').children();
	var CaramCol3 = $('.col-3').children();
	var CaramCol4 = $('.col-4').children();
	var CaramCol5 = $('.col-5').children();
	var CaramCol6 = $('.col-6').children();
	var CaramCol7 = $('.col-7').children();

	var CaramColumns = $([CaramCol1, CaramCol2, CaramCol3, CaramCol4,
		CaramCol5, CaramCol6, CaramCol7
	]);

	if (typeof index === 'number') {
		var CaramRow = $([CaramCol1.eq(index), CaramCol2.eq(index), CaramCol3.eq(index),
			CaramCol4.eq(index), CaramCol5.eq(index), CaramCol6.eq(index),
			CaramCol7.eq(index)
		]);
	} else {
		index = '';
	}

	if (arrayType === 'columns') {
		return CaramColumns;
	} else if (arrayType === 'rows' && index !== '') {
		return CaramRow;
	}
}

function CaramRows(index) {
	var CaramRow = giveCaramArrays('rows', index);
	return CaramRow;
}

function CaramColumns(index) {
	var CaramColumn = giveCaramArrays('columns');
	return CaramColumn[index];
}

//3.- Validar si exiten dulces que se eliminarán en una columna
function columnValidation() {
	for (var j = 0; j < 7; j++) {
		var counter = 0;
		var CaramPosition = [];
		var extraCaramPosition = [];
		var CaramColumn = CaramColumns(j);
		var comparisonValue = CaramColumn.eq(0);
		var gap = false;
		for (var i = 1; i < CaramColumn.length; i++) {
			var srcComparison = comparisonValue.attr('src');
			var srcCaram = CaramColumn.eq(i).attr('src');

			if (srcComparison != srcCaram) {
				if (CaramPosition.length >= 3) {
					gap = true;
				} else {
					CaramPosition = [];
				}
				counter = 0;
			} else {
				if (counter == 0) {
					if (!gap) {
						CaramPosition.push(i - 1);
					} else {
						extraCaramPosition.push(i - 1);
					}
				}
				if (!gap) {
					CaramPosition.push(i);
				} else {
					extraCaramPosition.push(i);
				}
				counter += 1;
			}
			comparisonValue = CaramColumn.eq(i);
		}
		if (extraCaramPosition.length > 2) {
			CaramPosition = $.merge(CaramPosition, extraCaramPosition);
		}
		if (CaramPosition.length <= 2) {
			CaramPosition = [];
		}
		CaramCount = CaramPosition.length;
		if (CaramCount >= 3) {
			eliminarColumnCaram(CaramPosition, CaramColumn);
			setScore(CaramCount);
		}
	}
}

function eliminarColumnCaram(CaramPosition, CaramColumn) {
	for (var i = 0; i < CaramPosition.length; i++) {
		CaramColumn.eq(CaramPosition[i]).addClass('eliminar');
	}
}

function rowValidation() {
	for (var j = 0; j < 6; j++) {
		var counter = 0;
		var CaramPosition = [];
		var extraCaramPosition = [];
		var CaramRow = CaramRows(j);
		var comparisonValue = CaramRow[0];
		var gap = false;
		for (var i = 1; i < CaramRow.length; i++) {
			var srcComparison = comparisonValue.attr('src');
			var srcCaram = CaramRow[i].attr('src');

			if (srcComparison != srcCaram) {
				if (CaramPosition.length >= 3) {
					gap = true;
				} else {
					CaramPosition = [];
				}
				counter = 0;
			} else {
				if (counter == 0) {
					if (!gap) {
						CaramPosition.push(i - 1);
					} else {
						extraCaramPosition.push(i - 1);
					}
				}
				if (!gap) {
					CaramPosition.push(i);
				} else {
					extraCaramPosition.push(i);
				}
				counter += 1;
			}
			comparisonValue = CaramRow[i];
		}
		if (extraCaramPosition.length > 2) {
			CaramPosition = $.merge(CaramPosition, extraCaramPosition);
		}
		if (CaramPosition.length <= 2) {
			CaramPosition = [];
		}
		CaramCount = CaramPosition.length;
		if (CaramCount >= 3) {
			eliminarHorizontal(CaramPosition, CaramRow);
			setScore(CaramCount);
		}
	}
}

function eliminarHorizontal(CaramPosition, CaramRow) {
	for (var i = 0; i < CaramPosition.length; i++) {
		CaramRow[CaramPosition[i]].addClass('eliminar');
	}
}

//5.- Muestra los datos del contador
function setScore(CaramCount) {
	var score = Number($('#score-text').text());
	switch (CaramCount) {
		case 3:
			score += 25;
			break;
		case 4:
			score += 50;
			break;
		case 5:
			score += 75;
			break;
		case 6:
			score += 100;
			break;
		case 7:
			score += 200;
	}
	$('#score-text').text(score);
}

function checkBoard() {
	fillBoard();
}

function fillBoard() {
	var top = 6;
	var column = $('[class^="col-"]');

	column.each(function () {
		var Carams = $(this).children().length;
		var agrega = top - Carams;
		for (var i = 0; i < agrega; i++) {
			var CaramType = getRandomInt(1, 5);
			if (i === 0 && Carams < 1) {
				$(this).append('<img src="image/' + CaramType + '.png" class="element"></img>');
			} else {
				$(this).find('img:eq(0)').before('<img src="image/' + CaramType + '.png" class="element"></img>');
			}
		}
	});
	addCaramEvents();
	setValidations();
}

function setValidations() {
	columnValidation();
	rowValidation();
	
	if ($('img.eliminar').length !== 0) {
		eliminarCaramAnimation();
	}
}

//7.- La interacción del usuario con el elemento dulce debe ser de drag & drop.
//Movimiento con efecto entre los caramelos
function addCaramEvents() {
	$('img').draggable({
		containment: '.panel-tablero',
		droppable: 'img',
		revert: true,
		revertDuration: 500,
		grid: [100, 100],
		zIndex: 10,
		drag: constrainCaramMovement
	});
	$('img').droppable({
		drop: swapCaram
	});
	enableCaramEvents();
}

function disableCaramEvents() {
	$('img').draggable('disable');
	$('img').droppable('disable');
}

function enableCaramEvents() {
	$('img').draggable('enable');
	$('img').droppable('enable');
}

function constrainCaramMovement(event, ArrastrarCaram) {
	ArrastrarCaram.position.top = Math.min(100, ArrastrarCaram.position.top);
	ArrastrarCaram.position.bottom = Math.min(100, ArrastrarCaram.position.bottom);
	ArrastrarCaram.position.left = Math.min(100, ArrastrarCaram.position.left);
	ArrastrarCaram.position.right = Math.min(100, ArrastrarCaram.position.right);
}

function swapCaram(event, ArrastrarCaram) {
	var ArrastrarCaram = $(ArrastrarCaram.draggable);
	var dragSrc = ArrastrarCaram.attr('src');
	var SoltarCaram = $(this);
	var dropSrc = SoltarCaram.attr('src');
	ArrastrarCaram.attr('src', dropSrc);
	SoltarCaram.attr('src', dragSrc);

	setTimeout(function () {
		checkBoard();
		if ($('img.eliminar').length === 0) {
			ArrastrarCaram.attr('src', dragSrc);
			SoltarCaram.attr('src', dropSrc);
		} else {
			updateMoves();
		}
	}, 500);
}

function checkBoardPromise(result) {
	if (result) {
		checkBoard();
	}
}

function updateMoves() {
	var actualValue = Number($('#movimientos-text').text());
	var result = actualValue += 1;
	$('#movimientos-text').text(result);
}

function eliminarCaramAnimation() {
	disableCaramEvents();
	$('img.eliminar').effect('pulsate', 400);
	$('img.eliminar').animate({
			opacity: '0'
		}, {
			duration: 300
		})
		.animate({
			opacity: '0'
		}, {
			duration: 400,
			complete: function () {
				eliminarCaram()
					.then(checkBoardPromise)
					.catch(showPromiseError);
			},
			queue: true
		});
}
 
function showPromiseError(error) {
	console.log(error);
}

function eliminarCaram() {
	return new Promise(function (resolve, reject) {
		if ($('img.eliminar').remove()) {
			resolve(true);
		} else {
			reject('No se pudo eliminar Caram...');
		}
	})
}

//4 y 6.- Temporizador y boton reiniciar
//cambia el aspecto de la página, fin del juego
function endGame() {
	$('div.panel-tablero, div.time').effect('fold');
	$('h1.main-titulo').addClass('title-over')
		.text('Juego Terminado... Gracias por jugar!');
	$('div.score, div.moves, div.panel-score').width('100%');
}

//Inicia el juego
function initGame() {

	colorBlink('h1.main-titulo');

	$('.btn-reinicio').click(function () {
		if ($(this).text() === 'Reiniciar') {
			location.reload(true);
		}
		checkBoard();
		$(this).text('Reiniciar');
		$('#timer').startTimer({
			onComplete: endGame
		})
	});
}

//Prepara el juego
$(function() {
	initGame();
});