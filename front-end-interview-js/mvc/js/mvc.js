(function () {
    function HeadingState () {
        this.state = new HelloState(this);
        this.changeState = () => this.state.next();
        this.getValue = () => this.state.value();
    }

    function View (controller) {
        this._controller = controller;
        this._header = document.getElementById('heading');
        this._header.innerText = controller.getModelHeading();
        this._header.addEventListener('click', controller);
        this.update = function (data) {
            this._header.innerText = data.heading;
        }
        this._controller._model.registerObserver(this);
    }

    function Model () {
        let _heading = "Hello";

        this._observers = [];
        this.registerObserver = (observer) => {
            this._observers.push(observer);
        };

        this.notifyAll = () => {
            this._observers.forEach((obs) => {
                obs.update(this);
            })
        }

        Object.defineProperties(this, {
            heading: {
                get: () => _heading,
                set: (value) => {
                    _heading = value;
                    this.notifyAll();
                }
            }
        });

    }

    function Controller (model) {
        this._model = model;


        this.handleEvent = (e) => {
            e.stopPropagation();
            switch (e.type) {
                case 'click':
                    this._clickHandler(e.target);
                    break;
                default:
                    console.log(e.target);
            }
        }

        this.getModelHeading = () => this._model.heading;

        this._clickHandler = (target) => {
            this._model.heading = 'World';
        }
    }

    function init () {
        const model = new Model();
        const controller = new Controller(model);
        const view = new View(controller);
    }

    document.addEventListener('DOMContentLoaded', (e) => {
        init();
    });
})();
