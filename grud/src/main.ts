const nomeProdutoDoProduto = document.getElementById("productName") as HTMLInputElement
const precoProduto = document.getElementById("productPrice") as HTMLInputElement
const quantidadeProduto = document.getElementById("productQuantity") as HTMLInputElement

interface Mercadorias {
  nomeProduto: string;
  preco: string;
  quantidade: string;
}

let contador = 0


const cadastrarProdutos = () => {
  const mercadorias: Mercadorias = {
    nomeProduto: nomeProdutoDoProduto.value,
    preco: precoProduto.value,
    quantidade: quantidadeProduto.value,
  };
  requsicaoPost(mercadorias);
};

const requsicaoPost = (objeto: {}) => {
  fetch("http://localhost:3000/produtos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(objeto),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
};

const botaoCadastrar = document
  .getElementById("botaoCadastrar")
  ?.addEventListener("click", () => {
    cadastrarProdutos();
  });