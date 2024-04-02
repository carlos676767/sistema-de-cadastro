import Swal from "sweetalert2";
import {obterValorCategoria,produtoSelecionado,valoresSelecionados,} from "./categoriaSelects";

const nomeProdutoDoProduto = document.getElementById( "productName") as HTMLInputElement;
const precoProduto = document.getElementById( "productPrice") as HTMLInputElement;
const quantidadeProduto = document.getElementById("productQuantity") as HTMLInputElement;
const descricaoProduto = document.getElementById("descricao") as HTMLTextAreaElement;
interface Mercadorias {
  nomeProduto: string;
  preco: string;
  quantidade: string;
  data: string;
  categoriaDoproduto: string;
  descricao: string;
}

const obterDataEHoraAtual = () => {
  const agora = new Date();
  const dataAtual = agora.getHours().toString().padStart(2, "0");
  const minutos = agora.getMinutes().toString().padStart(2, "0");
  const segundos = agora.getSeconds().toString().padStart(2, "0");
  const horario = `${dataAtual}:${minutos}:${segundos}`;
  return horario;
};

const cadastrarProdutos = () => {
  if (nomeProdutoDoProduto.value === "" && precoProduto.value === "" && quantidadeProduto.value === "") {
    mensagemVazio();
  } else {
    const mercadorias: Mercadorias = {
      nomeProduto: nomeProdutoDoProduto.value,
      preco: precoProduto.value,
      quantidade: quantidadeProduto.value,
      data: obterDataEHoraAtual(),
      categoriaDoproduto: produtoSelecionado,
      descricao: descricaoProduto.value,
    };
    requsicaoPostAdicionarProdutos(mercadorias);
  }
};

valoresSelecionados();




const quantidadeProdutos = document.querySelector(".quantidadeProdutos") as HTMLParagraphElement
const requsicaoPostAdicionarProdutos = async (objeto: {}) => {
  try {
    const data = await fetch("http://localhost:3000/produtos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objeto),
    });
    const response = await data.json();
    mensagemProdutoCadastrado();
    mostrarProdutosTotais()
  } catch (error) {
    console.error(error);
  }
};

const mostrarProdutosTotais = async() => {
  try {
    const data = await fetch("http://localhost:3000/produtos", {
      method: 'GET'
    })
    const response = await data.json()
    console.log(response);
    quantidadeProdutos.innerHTML = `${response.length}`
  } catch (error) {
    console.error(error)
  }
  
}
mostrarProdutosTotais()



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

const botaoPesquisar = document.getElementById("botao-pesquisar") as HTMLButtonElement;
const deltarProduto = document.getElementById( "deltar-produto") as HTMLButtonElement;
const buscarProdutoInput = document.getElementById("searchInput") as HTMLInputElement;
let produtosSelecionados: any;

const mostrarTabela = (data: any) => {
  const exibir = document.getElementById("exibir") as HTMLTextAreaElement;
  let produtos: any = [];
  data.forEach((element: any) => {
    let produto = `
        ${(tabela[0].innerHTML = JSON.stringify(element.nomeProduto).replace(  /"/g,   "" ))}
        ${(tabela[1].innerHTML = JSON.stringify(element.preco).replace(/"/g,  ""))}
        ${(tabela[2].innerHTML = JSON.stringify(element.quantidade).replace(/"/g,"" ))}
        ${(tabela[3].innerHTML = JSON.stringify(element.data).replace( /"/g, ""))}
        ${(exibir.innerHTML = JSON.stringify(element.descricao).replace( /"/g,""))}`;
         produtos.push(produto);
  });
  produtosSelecionados = data[0];
};

const valorNaoEncontrado = (data: any) => {
  if (data == false) {
    mensagemValorNaoEncontrado();
  }
};

const tabela = document.querySelectorAll("td");
const buscarProdutoPorNome = async () => {
  if (buscarProdutoInput.value === "") {
    mensagemVazio();
  } else {
    try {
      const response = await fetch(
        `http://localhost:3000/produtos?nomeProduto=${buscarProdutoInput.value}`,{
          method:"GET"
        });
      const data = await response.json();
      valorNaoEncontrado(data)
      mostrarTabela(data);
    } catch (error) {
      console.error(error);
    }
  }
};

const limparResultados = () => {
  tabela[0].innerHTML = "";
  tabela[1].innerHTML = "";
  tabela[2].innerHTML = "";
  tabela[3].innerHTML = "";
  tabela[4].innerHTML = "";
};

const deletarProduto = async() => {
  try {
    const data = await fetch(`http://localhost:3000/produtos/${produtosSelecionados.id}`, {
      method:"DELETE"
    })
    const response = await data.json()
    mensagemProdutoDeletado();
    limparResultados();
    mostrarProdutosTotais();
    console.log("Item excluído com sucesso", response);
  } catch (error) {
    console.error(error)
  }
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
    icon: "error",
  });
};


const thNomeProduto = document.getElementById("nomeProduto") as HTMLElement;
const tdExibirPreco = document.getElementById("tdExibirPreco") as HTMLElement;
const tdQuantidadeProduto = document.getElementById("tdQuantidadeProduto") as HTMLElement;
const dataDoMeuProduto2 = document.getElementById("dataDoMeuProduto") as HTMLElement
const deletarValorTabela = document.getElementById("deletarValorTabela") as HTMLElement



const buscaPorCriterio = () => {
  if (!obterValorCategoria) {
    mensagemCategoria();
  } else {
    buscarProdutosPorCriteriosEspefificos();
  }
};


const buscarProdutosPorCriteriosEspefificos = async ()  => {
  try {
    const data = await fetch(`http://localhost:3000/produtos?categoriaDoproduto=${obterValorCategoria}`, {
      method: "GET"
    })
    const response = await data.json()
    if (response == false) {
      mensagemCategoriaNaoExiste();
    } 
    valores(response)
  } catch (error) {
    console.error("nao foi possivel buscar pelo criterio.")
  }
}


let pegarIdTabela: string = ""


const valores = (data: any) => {
  data.forEach((element: any) => {
    const nomeProduto = document.createElement("td");
    nomeProduto.classList.add("tirarBorderNone");
    nomeProduto.style.display = "block";
    if (thNomeProduto != null) {
      thNomeProduto.appendChild(nomeProduto);
      nomeProduto.innerHTML = element.nomeProduto;
    }
    const precoDoMeuProduto = document.createElement("td");
    precoDoMeuProduto.style.display = "block";
    precoDoMeuProduto.classList.add("tirarBorderNone");
    if (tdExibirPreco != null) {
      tdExibirPreco.appendChild(precoDoMeuProduto);
      precoDoMeuProduto.innerHTML = element.preco;
    }
    const quantidadeDoMeuProduto = document.createElement("td");
    quantidadeDoMeuProduto.classList.add("tirarBorderNone");
    quantidadeDoMeuProduto.style.display = "block";
    if (tdQuantidadeProduto != null) {
      tdQuantidadeProduto.appendChild(quantidadeDoMeuProduto);
      quantidadeDoMeuProduto.innerHTML = element.quantidade;
    }
    const dataDoMeuProduto = document.createElement("td");
    dataDoMeuProduto.style.display = "block";
    dataDoMeuProduto.classList.add("tirarBorderNone");
    if (dataDoMeuProduto2 != null) {
      dataDoMeuProduto2.appendChild(dataDoMeuProduto);
      dataDoMeuProduto.innerHTML = element.data;
    }
    const button = document.createElement("button") as HTMLButtonElement
    button.style.display = "block";
    if (button != null) {
      deletarValorTabela.appendChild(button);
      pegarIdTabela = element.id;
      botaoQuevaiDeletar(button)
    }
  });
}

const botaoQuevaiDeletar = (button: HTMLButtonElement) => {
  button.innerHTML = "deletar"
  button.addEventListener("click", () => {
    deletarDaTabela();
  });
};

const deletarDaTabela = async() => {
  try {
    const data = await fetch(`http://localhost:3000/produtos/${pegarIdTabela}`, {
      method: "DELETE"
    })
    const response = await data.json()
    alert(`o id ${pegarIdTabela} deletado ${response}`)
    mostrarProdutosTotais();
  } catch (error) {
    console.error(error)
  }
}


const botaoPequisarCriterios = document.getElementById("botao-pequisar-criterios") as HTMLButtonElement;
botaoPequisarCriterios.addEventListener("click", () => {
  buscaPorCriterio();
});