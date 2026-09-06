// exercicio4.ts
//Faça: rode. Depois tente remover o super(nome) e veja o erro que o TS te dá — ele obriga você a chamar o constructor do pai antes de usar this em uma subclasse.
// Você entendeu esse exercício quando: conseguir explicar o que super(nome) está fazendo e por que Cachorro "ganha" a propriedade nome sem precisar redeclarar ela.
class Animal {
  nome: string;

  constructor(nome: string) {
    this.nome = nome;
  }

  emitirSom(): string {
    return `${this.nome} faz um som genérico`;
  }
}

class Cachorro extends Animal {
  raca: string;

  constructor(nome: string, raca: string) {
    super(nome); // chama o constructor de Animal, que seta this.nome
    this.raca = raca;
  }

  // sobrescrevendo o método do pai
  emitirSom(): string {
    return `${this.nome} (${this.raca}) late: Au au!`;
  }
}

const bicho = new Animal('Bicho');
const rex = new Cachorro('Rex', 'Labrador');

console.log(bicho.emitirSom());
console.log(rex.emitirSom());

// super seria a herança que a subclasse tem da classe base/superclasse, sem ele o construtor não é chamado e a classe não é inicializada. Como Animal exige um nome para criar o objeto, qualquer classe que herde dela também irá precisar, o super chamao o construtor da classe base para criar a propriedade nome na subclasse.