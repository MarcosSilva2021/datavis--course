var number = 5;
let teste = true;
const name = "usuario";


var numbers = [5, 10, 15, 20, 25];
numbers[0] //retorna 5
numbers[3] //retorna 20

var names = ["Pedro", "Paulo", "Joana"];

// é possível, mas não recomendado
var multiplos = [1, 2, 3.5, "texto", true];

// add classe
var car = {
	marca: "Ford",
	modelo: "Fiesta",
	cor: "preto",
	ano: 2013
};

car.marca
car.cor

class Car {
    constructor(marca, modelo, cor, ano) {
        this.marca = marca;
        this.modelo = modelo;
        this.cor = cor;
        this.ano = ano;
    }
}

// instanciando
let car = new Car("Fiat", "Uno", "Vermelho", 2011);