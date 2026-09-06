// tarefas.ts

// TYPE: union type pra status — só pode ser um desses 3 valores
type StatusTarefa = 'pendente' | 'em-andamento' | 'concluida';

// INTERFACE: formato de uma tarefa (isso é o "avô" do DTO que você vai criar no Dia 3)
interface Tarefa {
  id: number;
  titulo: string;
  status: StatusTarefa;
  responsavel?: string; // propriedade opcional (pode não vir)
}

// CLASSE BASE
class Repositorio {
  protected tarefas: Tarefa[] = [];

  protected buscarPorApiFake(nomeFonte: string, delayMs: number): Promise<Tarefa[]> {
    // Simula uma chamada de API/banco que demora um tempo pra responder
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`✅ ${nomeFonte} respondeu`);
        resolve(this.tarefas);
      }, delayMs);
    });
  }
}

// HERANÇA: RepositorioComLog "estende" Repositorio e adiciona comportamento extra
class RepositorioComLog extends Repositorio {
  constructor() {
    super(); // chama o construtor da classe pai
    this.tarefas = [
      { id: 1, titulo: 'Estudar NestJS', status: 'em-andamento', responsavel: 'Você' },
      { id: 2, titulo: 'Revisar JWT', status: 'pendente' },
      { id: 3, titulo: 'Ler sobre Angular', status: 'concluida', responsavel: 'Você' },
    ];
  }

  // Função tipada: recebe number, retorna Promise<Tarefa | undefined>
  async buscarPorId(id: number): Promise<Tarefa | undefined> {
    return this.tarefas.find((t) => t.id === id);
  }

  async listarTodas(): Promise<Tarefa[]> {
    return this.buscarPorApiFake('Banco de Tarefas', 1000);
  }
}

// Função separada que simula outra fonte de dados (ex: um serviço de "usuários")
function buscarUsuariosFake(delayMs: number): Promise<string[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('✅ Serviço de usuários respondeu');
      resolve(['Você', 'Maria', 'João']);
    }, delayMs);
  });
}

// MAIN: aqui usamos Promise.all pra buscar as duas coisas AO MESMO TEMPO
async function main() {
  const repositorio = new RepositorioComLog();

  console.log('Buscando tarefas e usuários em paralelo...');

  const [tarefas, usuarios] = await Promise.all([
    repositorio.listarTodas(),
    buscarUsuariosFake(1000),
  ]);

  console.log('Tarefas:', tarefas);
  console.log('Usuários:', usuarios);

  const tarefaEspecifica = await repositorio.buscarPorId(2);
  console.log('Tarefa 2:', tarefaEspecifica);
}

main();