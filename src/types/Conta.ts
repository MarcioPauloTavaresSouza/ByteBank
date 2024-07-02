import { GrupoTransacao } from "./GrupoTransacao.js";
import { Transacao } from "./Transacao.js";
import { TipoTransacao } from "./enums/TipoTransacao.js";

let saldo: number = JSON.parse(localStorage.getItem("saldo")) || 0;
const transacoes: Transacao[] = JSON.parse(localStorage.getItem("transacoes"), (key: string, value: string) => {
  if (key === "data") return new Date(value);
  return value;
}) || [];

function debitar(valor: number): void {
  if (valor <= 0) throw new Error("O valor a ser debitado deve ser maior que zero!");
  else if (valor > saldo) throw new Error("Saldo insuficiente!");
  saldo -= valor;
  localStorage.setItem("saldo", saldo.toString());
}

function depositar(valor: number): void {
  if (valor <= 0) throw new Error("O valor a ser depositado deve ser maior que zero!");
  saldo += valor;
  localStorage.setItem("saldo", saldo.toString());
}

const Conta = {
  getSaldo() {
    return saldo;
  },

  getDataAcesso() {
    return new Date();
  },

  getGruposTransacoes(): GrupoTransacao[] {
    const grupoTransacoes: GrupoTransacao[] = [];
    const listaTransacoes: Transacao[] = structuredClone(transacoes);
    const transacoesOrdenadas: Transacao[] = listaTransacoes.sort((t1, t2) => t2.data.getTime() - t1.data.getTime());
    let labelAtualGrupoTransacao: string = "";

    for (let transacao of transacoesOrdenadas) {
      let labelGrupoTransacoes: string = transacao.data.toLocaleDateString("pt-br", { month: "long", year: "numeric" });
      if (labelAtualGrupoTransacao !== labelGrupoTransacoes) {
        labelAtualGrupoTransacao = labelGrupoTransacoes;
        grupoTransacoes.push({
          label: labelGrupoTransacoes,
          transacoes: []
        });
      }
      grupoTransacoes.at(-1).transacoes.push(transacao);
    }

    return grupoTransacoes;
  },

  registrarTransacao(novaTransacao: Transacao): void {
    switch (novaTransacao.tipo) {
      case TipoTransacao.DEPOSITO:
        depositar(novaTransacao.valor);
        break;
      case TipoTransacao.TRANSFERENCIA:
      case TipoTransacao.PAGAMENTO_BOLETO:
        debitar(novaTransacao.valor);
        novaTransacao.valor *= -1;
        break;
      default:
        throw new Error("Tipo de Transação é invalido!");
    }
    transacoes.push(novaTransacao);
    console.log(this.getGruposTransacoes());
    localStorage.setItem("transacoes", JSON.stringify(transacoes));
  },
};

export default Conta;
