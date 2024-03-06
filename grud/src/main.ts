import Swal from "sweetalert2";

const nomeProdutoDoProduto = document.getElementById("productName") as HTMLInputElement;
const precoProduto = document.getElementById("productPrice") as HTMLInputElement;
const quantidadeProduto = document.getElementById("productQuantity") as HTMLInputElement;

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

const botaoPesquisar = document.getElementById("botao-pesquisar") as HTMLButtonElement;
const deltarProduto = document.getElementById("deltar-produto") as HTMLButtonElement;
const buscarProdutoInput = document.getElementById("searchInput") as HTMLInputElement;
let produtosSelecionados: any
const productList = document.querySelector("ul") as HTMLUListElement; 
const buscarProdutoPorNome = () => {
  if (buscarProdutoInput.value === "") {
    mensagemVazio();
  } else {
    fetch(`http://localhost:3000/produtos?nomeProduto=${buscarProdutoInput.value}`)
      .then((response) => response.json())
      .then((data: Array<any>) => {
        let produtos: any = []
        console.log(data[0].nomeProduto);
        data.forEach(element => {
        let produto = `
        <div>
             <i class="fa-solid fa-cube"></i>${JSON.stringify(element.nomeProduto).replace(/"/g, "")}
           </div>
           <div>
               <i class="fa-solid fa-sack-dollar"></i>${JSON.stringify(element.preco).replace(/"/g, "")}
           </div>
           <div>
               <i class="fa-solid fa-chart-column"></i>${JSON.stringify(element.quantidade).replace(/"/g, "")}
           </div>
           <div>
           <button id="deltar-produto">Deletar</button>
       </div>
        `
        produtos.push(produto)
        })
        productList.innerHTML = produtos
        produtosSelecionados = data[0]
        deltarProduto.style.display = "block";
      })
      .catch((error) => {
        (productList.textContent = "Produto não encontrado"), error;
      });
  }
};

const deletarProduto = () => {
  fetch(
    `http://localhost:3000/produtos/${produtosSelecionados.id}`,
    { method: "DELETE", })
    .then((response) => {
      if (response.ok) {
        console.log("Item excluído com sucesso");
        productList.textContent = ""
      } else {
        console.error("Erro ao excluir o item");
      }
    })
    .catch((error) => {
      console.error("Erro na solicitação DELETE:", error);
    });
};

deltarProduto.addEventListener("click", () => {
  deletarProduto();
});

botaoPesquisar.addEventListener("click", () => {
  buscarProdutoPorNome();
});

const botaoCadastrar = document
  .getElementById("botaoCadastrar")
  ?.addEventListener("click", () => {
    cadastrarProdutos();
  });
