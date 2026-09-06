// exercicio1.ts
type StatusTarefa = 'pendente' | 'em-andamento' | 'concluida';

interface Tarefa {
  id: number;
  titulo: string;
  status: StatusTarefa;
  responsavel?: string; // o "?" significa que pode não existir
}

const t1: Tarefa = {
  id: 1,
  titulo: 'Estudar TS',
  status: 'pendente',
  // repare: não coloquei "responsavel" e não deu erro
};

const t2: Tarefa = {
  id: 2,
  titulo: 'Fazer prova',
  status: 'em-andamento',
  responsavel: 'Você',
};

console.log(t1, t2);

// Descomente a linha abaixo e veja o erro que o TS te dá:
//errado
// const t3: Tarefa = { id: 3, titulo: 'Erro', status: 'atrasada' };
//certo
 const t3: Tarefa = { id: 3, titulo: 'Erro', status: 'pendente' };

 //o status estava como 'atrasado' o que não é aceito porque no type foi definida a palavra 'pendente' então só essa palavra é aceita para informar que uma tarefa está fora do prazo

 // o type é um tipo de dado customizado onde podemos informar o que é exatamente aceito, pode ser combinado com o union onde você definir mais um tipo aceito  