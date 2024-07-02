import { TipoTransacao } from "./enums/TipoTransacao.js";

export type Transacao = {
  tipo: TipoTransacao,
  valor: number,
  data: Date;
}