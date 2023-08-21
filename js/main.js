
// tabs
    
const tabsBtn = document.querySelectorAll('.tabs__btn');
const tabsItem = document.querySelectorAll('.tabs__item');

tabsBtn.forEach((item) =>
    item.addEventListener('click', function () {

        let currentBtn = item;
        let tabId = item.getAttribute('data-tab');
        let currentTab = document.querySelector(tabId);
        

        if (! currentBtn.classList.contains('active')) {
            tabsBtn.forEach( (item) => 
                item.classList.remove('active')
            );
            tabsItem.forEach( (item) => 
                item.classList.remove('active')
            );

            currentBtn.classList.add('active');
            currentTab.classList.add('active');
        }

    })
);

// document.querySelector('.tabs__btn').click();


// popup

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
        const popupLink = popupLinks[index];
        popupLink.addEventListener('click', function (e) {
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const curentPopup = document.getElementById(popupName);
            popupOpen(curentPopup);
            e.preventDefault();
        });
    }
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];
        el.addEventListener('click', function (e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
        });
    }
}

function popupOpen(curentPopup) {
    if (curentPopup && unlock) {
        const popupActive = document.querySelector('.popup.open');
        if (popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock()
        }
        curentPopup.classList.add('open');
        curentPopup.addEventListener('click', function (e) {
            if (!e.target.closest('.popup__content')) {
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}

function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open');
        if (doUnlock) {
            bodyUnLock();
        }
    }
}

function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

    if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = lockPaddingValue;
        }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

function bodyUnLock() {
    setTimeout(function () {
        if (lockPadding.length > 0) {
            for (let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index];
                el.style.paddingRight = '0px';
            }
        }
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
    }, timeout);

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

document.addEventListener('keydown', function (e) {
    if (e.which === 27) {
        const popupActive = document.querySelector('.popup.open');
        popupClose(popupActive);
    }
});


// counter

const counter = document.querySelector(".product-item__counter-counter");
const decreaseBtn = document.querySelector(".product-item__counter-decrease");
const increaseBtn = document.querySelector(".product-item__counter-increase");

const cost = document.getElementById("final-cost").textContent;

finalCost = Number(cost);
let count = 1;



decreaseBtn.addEventListener("click", function () {
  
  if (count <= 1) {
    counter.textContent = 1 + ' шт.';
  } 
  else {
    count--;
    counter.textContent = count + ' шт.';
    finalCost = finalCost - Number(cost);
  }

  document.getElementById("final-cost").textContent = finalCost;
  
});

increaseBtn.addEventListener("click", function () {
  count++;
  counter.textContent = count + ' шт.';
  finalCost = finalCost + Number(cost);

  document.getElementById("final-cost").textContent = finalCost;
});
