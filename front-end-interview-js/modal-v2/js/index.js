(function () {
    function EventEmitter () {
        this._observers = new Map();
    }

    EventEmitter.prototype.addEventListener = function (type, listener) {
        const hasType = !!type;
        const isFunction = typeof listener === 'function';
        const isEventListener = typeof listener === 'object' && typeof listener.handleEvent === 'function';

        if (!hasType || (!isFunction && !isEventListener)) {
            return;
        }

        if (!this._observers.has(type)) {
            this._observers.set(type, new Set());
        }

        this._observers.get(type).add(listener);
    }

    EventEmitter.prototype.removeEventListener = function (type, listener) {
        if (!this._observers.has(type)) {
            return;
        }

        const listeners = this._observers.get(type);

        listener.delete(listener);
    }

    EventEmitter.prototype.emit = function (type, data) {
        if (!this._observers.has(type)) {
            return;
        }

        const listeners = this._observers.get(type);

        listeners.forEach(listener => {
            const isFunction = typeof listener === 'function';
            const isEventListener = typeof listener === 'object' && typeof listener.handleEvent === 'function';

            if (isFunction) {
                listener(data);
                return;
            }

            if (isEventListener) {
                listener.handleEvent(data);
            }
        });
    }

    function State (initialState) {
        State.prototype.constructor.call(this);
        this._state = Object.assign({}, initialState);
    }

    State.prototype = Object.create(EventEmitter.prototype);
    State.prototype.setState = function (newState) {
        this._state = Object.assign({}, this._state, newState);
        this.emit('stateChange', this._state);
    }
    State.prototype.addListener = function (listener) {
        this.addEventListener('stateChange', listener);
    }
    State.prototype.removeListener = function (listener) {
        this.removeEventListener('stateChange', listener);
    }
    State.prototype.getState = function () {
        return this._state;
    }

    function OfferForm (state, selector) {
        this.state = state;
        this.selector = selector;

        this.render = () => {
            const markup = this.createMarkup();
            const parent = document.getElementById(this.selector);

            parent.innerHTML = markup;

            this.bindEvents();
        }

        this.getProps = () => {
            const data = (this.state.getState() || {});
            const { offer = {} } = data;
            const { accepted } = offer;
            return {
                accepted
            };
        };

        this.createMarkup = () => {
            const { accepted } = this.getProps();
            return !accepted ? `
                <form id="offer-form">
                    <button class='Btn submit' type="submit">Show Offer</button>
                </form>
            ` : `
                <div>
                    Offer was Accepted!
                </div>
            `;
        }

        this.bindEvents = () => {
            const form = document.getElementById('offer-form');
            form?.addEventListener('submit', e => {
                e.preventDefault();

                const modalState = this.state.getState().modal;
                const newState = {
                    modal: {
                        ...modalState,
                        show: true,
                        message: 'This offer is awesome! You will want to accept it.'
                    }
                };
                this.state.setState(newState);
            });
        }

        this.handleEvent = (data) => {
            console.log('handleEvent', data);
            this.render();
        }
    };

    function Modal (state, selector) {
        this.state = state;
        this.selector = selector;

        this.render = () => {
            const markup = this.createMarkup();
            const parent = document.getElementById(this.selector);

            parent.innerHTML = markup;

            this.bindEvents();
        };

        this.getProps = () => {
            const data = (this.state.getState() || {});
            const { modal = {} } = data;
            const { show, message } = modal;
            return {
                show,
                message
            };
        };

        this.createMarkup = () => {
            const { show, message } = this.getProps();
            return show ? `
                <div class="modal-wrapper">
                    <div class="modal">
                        <div class="modal-section">
                            <div class="close-button">
                                X
                            </div>
                        </div>
                        <div class="modal-section">
                            <div class="modal-message">
                                ${message}
                            </div>
                        </div>
                        <div class="modal-section">
                            <button class="accept-button">
                                Accept
                            </button>
                        </div>
                    </div>
                </div>
            ` : '';
        }

        this.bindEvents = () => {
            document.querySelector('.close-button')?.addEventListener('click', () => {
                const modalState = this.state.getState().modal;
                const newState = {
                    modal: {
                        ...modalState,
                        show: false
                    }
                };
                this.state.setState(newState);
            });

            document.querySelector('.accept-button')?.addEventListener('click', () => {
                const offerState = this.state.getState().offer;
                const modalState = this.state.getState().modal;
                const newState = {
                    offer: {
                        ...offerState,
                        accepted: true
                    },
                    modal: {
                        ...modalState,
                        show: false
                    }
                };
                this.state.setState(newState);
            });
        }

        this.handleEvent = (data) => {
            console.log('handleEvent', data);
            this.render();
        }
    }

    function init () {
        const AppState = new State({});

        const offerForm = new OfferForm(AppState, 'offer-container');
        const modal = new Modal(AppState, 'modal-container');

        offerForm.render();
        modal.render();

        AppState.addListener(modal);
        AppState.addListener(offerForm);

        window._test_app_state = AppState;
    }

    document.addEventListener('DOMContentLoaded', () => {
        init();
    })
})();
