type StatusPedido = 'aguardando' | 'enviado' | 'entregue';

interface Pedido {
  id: number;
  produto: string;
  status: StatusPedido;
  codigoRastreio?: string;
}

class RepositorioPedidos {
  protected pedidos: Pedido[] = [];

  protected buscarPorApiFake(nomeFonte: string, delayMs: number): Promise<Pedido[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Pedido ${nomeFonte} encontrado`);
        resolve(this.pedidos);
      }, delayMs);
    });
  }
}

class RepositorioPedidosExpress extends RepositorioPedidos {
  constructor() {
    super();
    this.pedidos = [
      { id: 1, produto: "Teclado Mecânico RGB", status: 'enviado', codigoRastreio: "BR123456789BR" },
      { id: 2, produto: "Mouse Gamer Sem Fio", status: 'aguardando' },
      { id: 3, produto: "Monitor 144Hz IPS", status: 'entregue', codigoRastreio: "BR123446789BR" },
    ];
  }

  // NOVO: método público que "destranca" o protected pra quem está fora da classe
  async listarTodos(): Promise<Pedido[]> {
    return this.buscarPorApiFake('Pedidos Express', 1000);
  }

  // CORRIGIDO: sem setTimeout/Promise manual — .filter() já é síncrono,
  // e uma função "async" embrulha o retorno numa Promise sozinha
  async buscarUrgentes(): Promise<Pedido[]> {
    return this.pedidos.filter((p) => p.status === 'aguardando');
  }

  async buscarPorId(id: number): Promise<Pedido | undefined> {
    return this.pedidos.find((t) => t.id === id);
  }
}

function buscarEstoqueFake(delayMs: number): Promise<string[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Produtos encontrados');
      resolve(['Bicicleta', 'PS5', 'Bola']);
    }, delayMs);
  });
}

async function main() {
  const repositorio = new RepositorioPedidosExpress();

  console.log('Buscando pedidos e estoque em paralelo...');

  const [pedidos, estoque] = await Promise.all([
    repositorio.listarTodos(),
    buscarEstoqueFake(1000),
  ]);

  console.log('Pedidos:', pedidos);
  console.log('Estoque:', estoque);

  const pedidoUrgente = await repositorio.buscarUrgentes();
  console.log('Urgentes:', pedidoUrgente);

  const pedidoEspecifico = await repositorio.buscarPorId(2);
  console.log('Pedido 2:', pedidoEspecifico);
}

main();