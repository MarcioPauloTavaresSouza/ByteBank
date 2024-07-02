import Conta from "../types/Conta.js";
import { FormatoData } from "../types/enums/FormatoData.js";
import { formatarData, formatarMoeda } from "../utils/formatters.js";

const elementoSaldo = document.querySelector(".saldo-valor .valor") as HTMLElement;
const elementoDataAcesso = document.querySelector(".block-saldo time") as HTMLElement;

if (elementoDataAcesso != null) {
  elementoDataAcesso.textContent = formatarData(Conta.getDataAcesso(), FormatoData.DIA_SEMANA_DIA_MES_ANO);
}

rederizarSaldo();

function rederizarSaldo(): void {
  if (elementoSaldo != null) {
    elementoSaldo.textContent = formatarMoeda(Conta.getSaldo());
  }
}

const SaldoComponent = {
  atualizar(): void {
    rederizarSaldo();
  }
}

export default SaldoComponent;