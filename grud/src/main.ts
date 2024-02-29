const nomeProdutoDoProduto = document.getElementById("productName") as HTMLInputElement
const precoProduto = document.getElementById("productPrice") as HTMLInputElement
const quantidadeProduto = document.getElementById("productQuantity") as HTMLInputElement


interface Mercadorias {
  nomeProduto: string,
  preco: string,
  quantidade: string
}

let bancoDeDados: Mercadorias[] = []

const cadastrarProdutos = () => {
  const mercadorias: Mercadorias = {
    nomeProduto: nomeProdutoDoProduto.value,
    preco: precoProduto.value,
    quantidade: quantidadeProduto.value,
  };

  bancoDeDados.push(mercadorias);
  const converter = JSON.stringify(bancoDeDados)
  localStorage.setItem("dadosClientes", converter)
  const valorSalvo = JSON.parse(localStorage.getItem("dadosClientes") ?? "{}");
  bancoDeDados.push(valorSalvo)
};

const botaoCadastrar = document
  .getElementById("botaoCadastrar")
  ?.addEventListener("click", () => {
    cadastrarProdutos();
  });