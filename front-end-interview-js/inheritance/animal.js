function Animal (name) {
    const _name = name;
    Object.defineProperties(this, {
        name: {get: () => _name}
    })

    this.breathe = () => {
        console.log(`${_name} breathes`);
    }
}

function Dog (name) {
    Dog.prototype.constructor.call(this, name);
}

Dog.prototype = Object.create(Animal.prototype);
