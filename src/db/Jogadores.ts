import { JOGADOR } from "../assets/types";
import { cartas } from "./Cartas";

const jogadores: JOGADOR[] = [
    {
        nome: "Aventureiro 1",
        email: "aventureiro1@example.com",
        pontuacao: 100,
        ranking_id: 1,
        cartas: [cartas[0], cartas[1]],
    },
    {
        nome: "Aventureiro 2",
        email: "aventureiro2@example.com",
        pontuacao: 80,
        ranking_id: 2,
        cartas: [cartas[1], cartas[2]],
    },
    {
        nome: "Aventureiro 3",
        email: "aventureiro3@example.com",
        pontuacao: 120,
        ranking_id: 3,
        cartas: [cartas[2], cartas[3]],
    },
    {
        nome: "Aventureiro 4",
        email: "aventureiro4@example.com",
        pontuacao: 90,
        ranking_id: 4,
        cartas: [cartas[3], cartas[4]],
    },
    {
        nome: "Aventureiro 5",
        email: "aventureiro5@example.com",
        pontuacao: 110,
        ranking_id: 5,
        cartas: [cartas[4], cartas[0]],
    },
];

export { jogadores }