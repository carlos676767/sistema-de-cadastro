const categoriaAlimentos = document.getElementById(
  "categoriaAlimentos"
) as HTMLSelectElement;

export let produtoSelecionado: any;

export const valoresSelecionados = () => {
  categoriaAlimentos.addEventListener("change", () => {
    const obterSelecao = categoriaAlimentos.options;
    if (obterSelecao[0].selected) {
      produtoSelecionado = "";
    } else if (obterSelecao[1].selected) {
      produtoSelecionado = "Frutas frescas";
    } else if (obterSelecao[2].selected) {
      produtoSelecionado = "Vegetais frescos";
    } else if (obterSelecao[3].selected) {
      produtoSelecionado = "Carnes e aves";
    } else if (obterSelecao[4].selected) {
      produtoSelecionado = "Peixes e frutos do mar";
    } else if (obterSelecao[5].selected) {
      produtoSelecionado = "Produtos lácteos";
    } else if (obterSelecao[6].selected) {
      produtoSelecionado = "Ovos";
    } else if (obterSelecao[7].selected) {
      produtoSelecionado = "Grãos e cereais";
    } else if (obterSelecao[8].selected) {
      produtoSelecionado = "Pães e produtos de panificação";
    } else if (obterSelecao[9].selected) {
      produtoSelecionado = "Massas e arroz";
    } else if (obterSelecao[10].selected) {
      produtoSelecionado = "Oleaginosas e sementes";
    } else if (obterSelecao[11].selected) {
      produtoSelecionado = "Óleos e gorduras";
    } else if (obterSelecao[12].selected) {
      produtoSelecionado = "Açúcares e adoçantes";
    } else if (obterSelecao[13].selected) {
      produtoSelecionado = "Bebidas não alcoólicas";
    } else if (obterSelecao[14].selected) {
      produtoSelecionado = "Bebidas alcoólicas";
    } else if (obterSelecao[15].selected) {
      produtoSelecionado = "Produtos processados";
    } else if (obterSelecao[16].selected) {
      produtoSelecionado = "Snacks e petiscos";
    } else if (obterSelecao[17].selected) {
      produtoSelecionado = "Condimentos e temperos";
    } else if (obterSelecao[18].selected) {
      produtoSelecionado = "Conservas e enlatados";
    } else if (obterSelecao[19].selected) {
      produtoSelecionado = "Congelados";
    } else if (obterSelecao[20].selected) {
      produtoSelecionado = "Produtos orgânicos";
    } else if (obterSelecao[21].selected) {
      produtoSelecionado = "Produtos sem glúten";
    } else if (obterSelecao[22].selected) {
      produtoSelecionado = "Produtos sem lactose";
    } else if (obterSelecao[23].selected) {
      produtoSelecionado = "Produtos vegetarianos / veganos";
    } else if (obterSelecao[24].selected) {
      produtoSelecionado = "Suplementos alimentares";
    }
  });
};

const selectPorCategorias = document.getElementById(
  "criteriaSelect"
) as HTMLSelectElement;
export let obterValorCategoria: any;
selectPorCategorias.addEventListener("change", () => {
  const obterOptions = selectPorCategorias.options;
  if (obterOptions[1].selected) {
    obterValorCategoria = "Frutas frescas";
  } else if (obterOptions[2].selected) {
    obterValorCategoria = "Vegetais frescos";
  } else if (obterOptions[3].selected) {
    obterValorCategoria = "Carnes e aves";
  } else if (obterOptions[4].selected) {
    obterValorCategoria = "Peixes e frutos do mar";
  } else if (obterOptions[5].selected) {
    obterValorCategoria = "Produtos lácteos";
  } else if (obterOptions[6].selected) {
    obterValorCategoria = "Ovos";
  } else if (obterOptions[7].selected) {
    obterValorCategoria = "Grãos e cereais";
  } else if (obterOptions[8].selected) {
    obterValorCategoria = "Pães e produtos de panificação";
  } else if (obterOptions[9].selected) {
    obterValorCategoria = "Massas e arroz";
  } else if (obterOptions[10].selected) {
    obterValorCategoria = "Oleaginosas e sementes";
  } else if (obterOptions[11].selected) {
    obterValorCategoria = "Óleos e gorduras";
  } else if (obterOptions[12].selected) {
    obterValorCategoria = "Açúcares e adoçantes";
  } else if (obterOptions[13].selected) {
    obterValorCategoria = "Bebidas não alcoólicas";
  } else if (obterOptions[14].selected) {
    obterValorCategoria = "Bebidas alcoólicas";
  } else if (obterOptions[15].selected) {
    obterValorCategoria = "Produtos processados";
  } else if (obterOptions[16].selected) {
    obterValorCategoria = "Snacks e petiscos";
  } else if (obterOptions[17].selected) {
    obterValorCategoria = "Condimentos e temperos";
  } else if (obterOptions[18].selected) {
    obterValorCategoria = "Conservas e enlatados";
  } else if (obterOptions[19].selected) {
    obterValorCategoria = "Congelados";
  } else if (obterOptions[20].selected) {
    obterValorCategoria = "Produtos orgânicos";
  } else if (obterOptions[21].selected) {
    obterValorCategoria = "Produtos sem glúten";
  } else if (obterOptions[22].selected) {
    obterValorCategoria = "Produtos sem lactose";
  } else if (obterOptions[23].selected) {
    obterValorCategoria = "Produtos vegetarianos / veganos";
  } else if (obterOptions[24].selected) {
    obterValorCategoria = "Suplementos alimentares";
  }
});
