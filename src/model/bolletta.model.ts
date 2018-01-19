export interface Bolletta {
    id: number,
    utenza: string,
    importo: string,
    inizioFatturazione: string,
    fineFatturazione: string,
	scadenza: string,
    pagata: boolean,
    dataPagamento: string,
    icona: string
}