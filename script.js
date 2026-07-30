/* Vladimirs Spelsajt – startsida */

// Byt till namnet på din hemliga sida om den heter något annat.
var HEMLIG_SIDA = 'hemlig.html';
var HEMLIG_KOD = 'VLAD';

document.getElementById('ar').textContent = new Date().getFullYear();

var modal = document.getElementById('kodModal');
var form = document.getElementById('kodForm');
var input = document.getElementById('kodInput');
var fel = document.getElementById('kodFel');

function oppnaModal() {
  modal.hidden = false;
  fel.hidden = true;
  input.value = '';
  input.focus();
}

function stangModal() {
  modal.hidden = true;
}

// Tryck G för att öppna rutan (men inte medan man skriver i ett fält).
document.addEventListener('keydown', function (e) {
  var skriverText = /^(input|textarea|select)$/i.test(e.target.tagName) || e.target.isContentEditable;

  if (e.key === 'Escape' && !modal.hidden) {
    stangModal();
    return;
  }

  if (skriverText || e.ctrlKey || e.altKey || e.metaKey) return;

  if (e.key === 'g' || e.key === 'G') {
    if (modal.hidden) {
      e.preventDefault();
      oppnaModal();
    }
  }
});

// Stäng via krysset eller genom att klicka utanför rutan.
Array.prototype.forEach.call(modal.querySelectorAll('[data-stang]'), function (el) {
  el.addEventListener('click', stangModal);
});

form.addEventListener('submit', function (e) {
  e.preventDefault();

  if (input.value.trim().toUpperCase() === HEMLIG_KOD) {
    window.location.href = HEMLIG_SIDA;
  } else {
    fel.hidden = false;
    input.value = '';
    input.focus();
    modal.querySelector('.modal__box').classList.remove('skaka');
    void modal.querySelector('.modal__box').offsetWidth; // starta om animationen
    modal.querySelector('.modal__box').classList.add('skaka');
  }
});

input.addEventListener('input', function () {
  fel.hidden = true;
});
