// alert(this);


class People {
    constructor(name) {
        this.name = name;
    }
    say() {
        alert(`${this.name} say something`)
    }
}

class Student extends People {
    constructor(name, classes) {
        super(name);
        this.classes = classes;
    }
    getClass() {
        console.log(this.classes);
    }
    say() {
        console.log(`${this.name} at ${this.classes} say something`)
    }
}


let tom = new Student('tom', 'one');

tom.getClass();
tom.say();