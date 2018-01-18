export interface Bolletta {
    id: number,
    utenza: string,
    importo: string,
	scadenza: string,
    pagata: boolean,
    dataPagamento: string,
    icona: string
}