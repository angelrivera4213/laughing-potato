(function () {
    let elements = {};
    function init () {
        elements = {
            modal: document.querySelector('.modal'),
            main: document.querySelector('.main'),
            showOfferBtn: document.querySelector('.show-offer'),
            lightBox: document.querySelector('.light-box'),
            closeBtn: document.querySelector('.close-container button'),
            acceptBtn: document.querySelector('.accept-container button')
        };

        elements.lightBox.addEventListener('click', (e) => {
            elements.lightBox.classList.add('hidden');
        });

        elements.modal.addEventListener('click', (e) => {
            e && e.stopPropagation();
        });

        elements.showOfferBtn.addEventListener('click', (e) => {
            elements.lightBox.classList.remove('hidden');
        });

        elements.closeBtn.addEventListener('click', (e) => {
            elements.lightBox.classList.add('hidden');
        });

        elements.acceptBtn.addEventListener('click', (e) => {
            elements.lightBox.classList.add('hidden');
            elements.showOfferBtn.style.display = 'none';
            const acceptMessage = document.createElement('p');
            acceptMessage.innerText = 'Offer Accepted';
            elements.main.appendChild(acceptMessage);
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        init();
    });
})();
