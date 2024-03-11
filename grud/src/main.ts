import Swal from "sweetalert2";
import { obterValorCategoria, produtoSelecionado, valoresSelecionados,  } from "./categoriaSelects";


const nomeProdutoDoProduto = document.getElementById( "productName") as HTMLInputElement;
const precoProduto = document.getElementById("productPrice") as HTMLInputElement;
const quantidadeProduto = document.getElementById( "productQuantity") as HTMLInputElement;
interface Mercadorias {
  nomeProduto: string;
  preco: string;
  quantidade: string;
  data: string
  categoriaDoproduto: string
}


const obterDataEHoraAtual = () => {
  const agora = new Date()
  const dataAtual = agora.getHours().toString().padStart(2, "0")
  const minutos = agora.getMinutes().toString().padStart(2, "0");
  const segundos = agora.getSeconds().toString().padStart(2, "0")
  const horario = `${dataAtual}:${minutos}:${segundos}`
  return horario
}

const cadastrarProdutos = () => {
  if (nomeProdutoDoProduto.value === "" && precoProduto.value === "" && quantidadeProduto.value === "") {
    mensagemVazio();
  } else {
    const mercadorias: Mercadorias = {
      nomeProduto: nomeProdutoDoProduto.value,
      preco: precoProduto.value,
      quantidade: quantidadeProduto.value,
      data: obterDataEHoraAtual(),
      categoriaDoproduto: produtoSelecionado
    };
    requsicaoPostAdicionarProdutos(mercadorias);
  }
};


valoresSelecionados()

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
      mensagemProdutoCadastrado();
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

const mensagemValorNaoEncontrado = () => {
  Swal.fire({
    title: "Oops...",
    text: "Produto não encontrado",
    icon: "error",
  });
};

const mensagemProdutoDeletado = () => {
  Swal.fire({
    title: "Sucesso!",
    text: "Produto deletado com sucesso",
    icon: "success",
  });
};

const mensagemProdutoCadastrado = () => {
  Swal.fire({
    title: "Sucesso!",
    text: "Produto cadastrado com sucesso",
    icon: "info",
  });
};

const botaoPesquisar = document.getElementById( "botao-pesquisar") as HTMLButtonElement;
const deltarProduto = document.getElementById( "deltar-produto") as HTMLButtonElement;
const buscarProdutoInput = document.getElementById("searchInput") as HTMLInputElement;
let produtosSelecionados: any;

const tabela = document.querySelectorAll("td");
const buscarProdutoPorNome = () => {
  if (buscarProdutoInput.value === "") {
    mensagemVazio();
  } else {
    fetch(`http://localhost:3000/produtos?nomeProduto=${buscarProdutoInput.value}`)
      .then((response) => response.json())
      .then((data: Array<any>) => {
        let produtos: any = [];
        data.forEach((element) => {
        let produto = `
        ${(tabela[0].innerHTML = JSON.stringify(element.nomeProduto).replace( /"/g,"" ))}
        ${(tabela[1].innerHTML = JSON.stringify(element.preco).replace( /"/g,""))}
        ${(tabela[2].innerHTML = JSON.stringify(element.quantidade).replace( /"/g,  "" ))}
        ${tabela[3].innerHTML = JSON.stringify(element.data).replace( /"/g, "")}`;
        produtos.push(produto);
        });
        produtosSelecionados = data[0];
      
      })
      .catch((error) => {
        console.log(error);
        mensagemValorNaoEncontrado();
      });
  }
};

const limparResultados = () => {
  tabela[0].innerHTML = "";
  tabela[1].innerHTML = "";
  tabela[2].innerHTML = "";
  tabela[3].innerHTML = "";
  tabela[4].innerHTML = "";
};


const deletarProduto = () => {
  fetch(`http://localhost:3000/produtos/${produtosSelecionados.id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        mensagemProdutoDeletado();
        limparResultados();
        console.log("Item excluído com sucesso");
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


  const mensagemCategoria = () => {
    Swal.fire({
      title: "Escolha uma Categoria",
      text: "Por favor, selecione uma categoria antes de continuar.",
      icon: "warning"
    });
  }


  const mensagemCategoriaNaoExiste = () => {
    Swal.fire({
      title: "Categoria Inválida",
      text: "A categoria selecionada não possui produtos disponíveis.",
      icon: "error"
    });
  }
  const buscaPorCriterio = () => {
    if (!obterValorCategoria) {
      mensagemCategoria();
    }else{
      fetch(`http://localhost:3000/produtos?categoriaDoproduto=${obterValorCategoria}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data == false) {
          mensagemCategoriaNaoExiste();
        }
      })
      .catch(error => {
        console.error(error)
      })
    }
   
  }
  const botaoPequisarCriterios = document.getElementById("botao-pequisar-criterios") as HTMLButtonElement
  botaoPequisarCriterios.addEventListener("click", () => {
    buscaPorCriterio()
  })