import Swal from "sweetalert2";

const nomeProdutoDoProduto = document.getElementById( "productName") as HTMLInputElement;
const precoProduto = document.getElementById("productPrice") as HTMLInputElement;
const quantidadeProduto = document.getElementById( "productQuantity") as HTMLInputElement;

interface Mercadorias {
  nomeProduto: string;
  preco: string;
  quantidade: string;
  data: string
  imagemProduto: any
}



const obterDataEHoraAtual = () => {
  const agora = new Date()
  const dataAtual = agora.getHours().toString().padStart(2, "0")
  const minutos = agora.getMinutes().toString().padStart(2, "0");
  const segundos = agora.getSeconds().toString().padStart(2, "0")
  const horario = `${dataAtual}:${minutos}:${segundos}`
  return horario
}


let receberTraducao: string 
const traduzirInput = () => {
  fetch(`https://api.mymemory.translated.net/get?q=${nomeProdutoDoProduto.value}&langpair=pt|en`)
  .then(response => response.json())
  .then(data => {
    receberTraducao = data.responseData.translatedText
    console.log(receberTraducao);
    
  })
  .catch(error => {
    console.error("Erro ao traduzir:", error);
  });
}


let receberUrlImagem: any

const carregarImagemProduto = () => {
  fetch(`https://api.unsplash.com/photos/random?query=apple&client_id=47jhOV5e1cn6V3CwVPBw03RP7luThokL663nIOpWheo`)
  .then(response => response.json())
  .then(data => {
   receberUrlImagem = data.urls.regular;
  })
  .catch(error => {
    console.error(error);
  })
}

carregarImagemProduto();

const cadastrarProdutos = () => {
  if (nomeProdutoDoProduto.value === "" && precoProduto.value === "" && quantidadeProduto.value === "") {
    mensagemVazio();
  } else {
    const mercadorias: Mercadorias = {
      nomeProduto: nomeProdutoDoProduto.value,
      preco: precoProduto.value,
      quantidade: quantidadeProduto.value,
      data: obterDataEHoraAtual(),
      imagemProduto: receberUrlImagem
    };
    requsicaoPostAdicionarProdutos(mercadorias);
  }
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
  const imagemDoProduto = document.querySelector("imagemDoProduto") as HTMLImageElement
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
    traduzirInput()
  });
