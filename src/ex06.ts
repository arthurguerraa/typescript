// exercicio6.ts
// Faça: rode. Depois mude o find pra procurar um nome que não existe (ex: 'Livro') e veja o que aparece (undefined).
// Você entendeu esse exercício quando: conseguir explicar a diferença entre o que filter retorna (array, pode ser vazio) e o que find retorna (um item ou undefined, nunca array).
interface Produto {
  id: number;
  nome: string;
  emEstoque: boolean;
}

const produtos: Produto[] = [
  { id: 1, nome: 'Caneta', emEstoque: true },
  { id: 2, nome: 'Caderno', emEstoque: false },
  { id: 3, nome: 'Mochila', emEstoque: true },
];

// filter: retorna um NOVO ARRAY com os itens que passam no teste
const disponiveis = produtos.filter((p) => p.emEstoque);

// find: retorna o PRIMEIRO item que passa no teste (ou undefined)
const mochila = produtos.find((p) => p.nome === 'Mochila');

console.log('Disponíveis:', disponiveis);
console.log('Achou:', mochila);

// filter retorna um array mesmo que seja vazio já o find procura o item de acordo com o parâmetro passado, se esse parâmetro não existir, find irá retornar undefined.