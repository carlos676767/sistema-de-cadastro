import Swal from "sweetalert2";
import { obterValorCategoria, produtoSelecionado, valoresSelecionados,  } from "./categoriaSelects";
import Chart from 'chart.js/auto';


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


const botaoCadastrar = document.getElementById("botaoCadastrar") as HTMLButtonElement;
botaoCadastrar.addEventListener("click", () => {
  cadastrarProdutos();
});

const mensagemCategoria = () => {
  Swal.fire({
    title: "Escolha uma Categoria",
    text: "Por favor, selecione uma categoria antes de continuar.",
  });
};


  const mensagemCategoriaNaoExiste = () => {
    Swal.fire({
      title: "Categoria Inválida",
      text: "A categoria selecionada não possui produtos disponíveis.",
      icon: "error"
    });
  }


  const buscaPorCriterio = () => {
    const thNomeProduto = document.getElementById("nomeProduto") 
    const tdExibirPreco = document.getElementById("tdExibirPreco")
    const tdQuantidadeProduto = document.getElementById("tdQuantidadeProduto")
    const dataDoMeuProduto2 = document.getElementById("dataDoMeuProduto")
    if (!obterValorCategoria) {
      mensagemCategoria();
    }else{
      fetch(`http://localhost:3000/produtos?categoriaDoproduto=${obterValorCategoria}`)
      .then(response => response.json())
      .then(data => {
        if(data == false) {
          mensagemCategoriaNaoExiste();
        }else{
          data.forEach((element: any) => {
            const nomeProduto = document.createElement("td")
            nomeProduto.classList.add("tirarBorderNone")
            nomeProduto.style.display = "block"
            if (thNomeProduto != null) {
              thNomeProduto.appendChild(nomeProduto)
              nomeProduto.innerHTML = element.nomeProduto
            }
            const precoDoMeuProduto = document.createElement("td")
            precoDoMeuProduto.style.display = "block"
            precoDoMeuProduto.classList.add("tirarBorderNone")
            if (tdExibirPreco != null) {
              tdExibirPreco.appendChild(precoDoMeuProduto)
              precoDoMeuProduto.innerHTML = element.preco
            }
            const quantidadeDoMeuProduto = document.createElement("td")
            quantidadeDoMeuProduto.classList.add("tirarBorderNone")
            quantidadeDoMeuProduto.style.display = "block"
            if (tdQuantidadeProduto != null) {
              tdQuantidadeProduto.appendChild(quantidadeDoMeuProduto)
              quantidadeDoMeuProduto.innerHTML = element.quantidade
            }
            const dataDoMeuProduto = document.createElement("td")
            dataDoMeuProduto.style.display = "block"
            dataDoMeuProduto.classList.add("tirarBorderNone")
            if (dataDoMeuProduto2 != null) {
              dataDoMeuProduto2.appendChild(dataDoMeuProduto)
              dataDoMeuProduto.innerHTML = element.data
            }
            
         });
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