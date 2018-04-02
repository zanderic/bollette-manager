export interface Bolletta {
	key?: any,
    utenza: string,
    importo: string,
    inizioFatturazione: string,
    fineFatturazione: string,
	scadenza: string,
    pagata: boolean,
    dataPagamento: string,
    icona: string
}