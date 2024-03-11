 const categoriaAlimentos = document.getElementById("categoriaAlimentos") as HTMLSelectElement

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
 
