export type CARTA = {
    id?: number,
    nome: string,
    tipo?: string,
    descricao?: string,
    ataque: number,
    vida: number,
}

export type JOGADOR_CARTAS = {
    jogador_id?: number,
    carta_id?: number,
}

export type JOGADOR = {
    id?: number,
    nome: string,
    email: string,
    pontuacao?: number,
    divisao?: number,
    ranking_id?: number,
    cartas?: CARTA[];
}