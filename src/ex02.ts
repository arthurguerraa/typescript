// exercicio2.ts
// Faça: rode e repare que "Buscando..." aparece na hora, e só 1 segundo depois aparece o nome. O await "pausa" a função até a Promise resolver.
// Você entendeu esse exercício quando: conseguir explicar por que sem o await (só chamando buscarNomeFake(1000) sem nada) o console.log mostraria Promise { <pending> } em vez do nome.

function buscarNomeFake(delayMs: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Maria');
    }, delayMs);
  });
}

async function main() {
  console.log('Buscando...');
  const nome = await buscarNomeFake(1000);
  console.log('Nome encontrado:', nome);
}

main();

// uma função async sempre retorna uma promise, elas executam uma tarefa demorada em segundo plano sem travar o resto do código
// o await é o responsável por fazer a função assíncrona "esperar" o retorno da Promise para dar seguimento ao código
// o código não traz a Promise sem o await porque está sendo executado tudo de uma vez em vez de esperar a busca da Promise