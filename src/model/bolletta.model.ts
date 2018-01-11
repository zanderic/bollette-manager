export interface Bolletta {
    id: number,
    utenza: string,
    importo: number,
	scadenza: string,
    pagata: boolean,
    dataPagamento: string,
    icona: string
}