export interface IMoney {
  amount: number;
  currency: string;
}

export interface IMoneyRange {
  start: IMoney;
  stop: IMoney;
}

export interface ITaxedMoney {
  net?: IMoney;
  gross?: IMoney;
}

export interface ITaxedMoneyRange {
  start: ITaxedMoney;
  stop: ITaxedMoney;
}
