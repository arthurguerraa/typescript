// exercicio3.ts
// Faça: rode e compare os dois tempos no console.
// Você entendeu esse exercício quando: conseguir explicar por que paralelo() é quase 2x mais rápido, e em que situação você não poderia usar Promise.all (dica: quando uma busca depende do resultado da outra).

function buscarNomeFake(delayMs: number): Promise<string> {
  return new Promise((resolve) => setTimeout(() => resolve("Maria"), delayMs));
}

function buscarIdadeFake(delayMs: number): Promise<number> {
  return new Promise((resolve) => setTimeout(() => resolve(25), delayMs));
}

async function sequencial() {
  console.time("sequencial");
  const nome = await buscarNomeFake(1000);
  const idade = await buscarIdadeFake(1000);
  console.log(nome, idade);
  console.timeEnd("sequencial"); // deve dar ~2000ms
}

async function paralelo() {
  console.time("paralelo");
  const [nome, idade] = await Promise.all([
    buscarNomeFake(1000),
    buscarIdadeFake(1000),
  ]);
  console.log(nome, idade);
  console.timeEnd("paralelo"); // deve dar ~1000ms
}

async function main() {
  await sequencial();
  await paralelo();
}

main();

// funções paralelas são mais rápidas porque elas só dependem delas mesmas para o prosseguimento do código, enquanto as sequenciais a 2ª depende da 1ª terminar, o que pode causar um travamento no código caso a anterior demore muito
// não é recomendado usar Promise.all justamente quando uma função depende do que a anterior a ela trás, pois no Promise all elas trabalham em paralelo e não em sequência