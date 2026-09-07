// exercicio5.ts
//Faça: rode. Repare que buscarComDelay é protected — tente chamar repo.buscarComDelay(1000) direto no main() (fora da classe) e veja o erro.
//Você entendeu esse exercício quando: conseguir explicar por que o erro acontece — protected significa "só a classe e suas subclasses podem usar isso, ninguém de fora".

class Repositorio {
  protected itens: string[] = ['item A', 'item B'];

  protected buscarComDelay(delayMs: number): Promise<string[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.itens), delayMs);
    });
  }
}

class RepositorioComListagem extends Repositorio {
  async listarTodos(): Promise<string[]> {
    return this.buscarComDelay(1000);
  }
}

async function main() {
  const repo = new RepositorioComListagem();
  const itens = await repo.listarTodos();
  console.log(itens);
}

main();

// protected é literalmente proteger alguma propriedade de uma classe para que ela não acessada fora do escopo da superclasse e das subclasses. Serve para impedir que a propriedade seja chamada direto no main de forma errada.a