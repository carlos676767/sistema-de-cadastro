import Swal from 'sweetalert2';

const nomeProdutoDoProduto = document.getElementById("productName") as HTMLInputElement
const precoProduto = document.getElementById("productPrice") as HTMLInputElement
const quantidadeProduto = document.getElementById("productQuantity") as HTMLInputElement

interface Mercadorias {
  nomeProduto: string;
  preco: string;
  quantidade: string;
}




const cadastrarProdutos = () => {
  const mercadorias: Mercadorias = {
    nomeProduto: nomeProdutoDoProduto.value,
    preco: precoProduto.value,
    quantidade: quantidadeProduto.value,
  };
  requsicaoPostAdicionarProdutos(mercadorias);
};

const requsicaoPostAdicionarProdutos = (objeto: {}) => {
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

const mensagemVazio = () => {
  Swal.fire({
    title: "Campo vazio",
    text: "Por favor, preencha o campo antes de prosseguir.",
    icon: "error",
    confirmButtonText: "ok",
  });
};


const botaoPesquisar = document.getElementById("botao-pesquisar")as HTMLButtonElement;

const buscarProdutoPorNome = () => {
  const productList = document.querySelector("ul") as HTMLUListElement; //exibe os produtos
  const buscarProdutoInput = document.getElementById("searchInput") as HTMLInputElement;
  if (buscarProdutoInput.value === "") {
    mensagemVazio()
  } else {
    fetch(`http://localhost:3000/produtos?nomeProduto=${buscarProdutoInput.value}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data[0].nomeProduto);
        productList.innerHTML = `
        <div><i class="fa-solid fa-cube"></i>${JSON.stringify( data[0].nomeProduto ).replace(/"/g, "")}</div> <div><i class="fa-solid fa-sack-dollar"></i>${JSON.stringify( data[0].preco  ).replace(/"/g, "")}</div> <div><i class="fa-solid fa-chart-column"></i>${JSON.stringify(data[0].quantidade ).replace(/"/g, "")}</div> `;
      })
      .catch((error) => {
        (productList.textContent = "Produto não encontrado"), error;
      });
  }
};

botaoPesquisar.addEventListener("click", () => {
  buscarProdutoPorNome();
});

const botaoCadastrar = document
  .getElementById("botaoCadastrar")
  ?.addEventListener("click", () => {
    cadastrarProdutos();
  });