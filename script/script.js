const botoesCategoria = document.querySelectorAll(".botao-categoria");
const cards = document.querySelectorAll(".card");
const tituloCategoria = document.querySelector("#titulo-categoria");
const catalogo = document.querySelector(".catalogo");

const playerImagem = document.querySelector("#player-imagem");
const playerTitulo = document.querySelector("#player-titulo");
const playerArtista = document.querySelector("#player-artista");
const playerAudio = document.querySelector("#player-audio");

const nomesCategorias = {
    todas: "Todas as músicas",
    rock: "Rock",
    metal: "Metal",
    pop: "Pop",
    eletronica: "Eletrônica"
};

// Cria as tags dentro de cada card usando os atributos data-*.
cards.forEach((card) => {
    const imagem = document.createElement("img");
    imagem.src = card.dataset.imagem;
    imagem.alt = `Capa do álbum ${card.dataset.album}`;

    const titulo = document.createElement("h2");
    titulo.textContent = card.dataset.titulo;

    const artista = document.createElement("p");
    artista.textContent = card.dataset.artista;

    const botao = document.createElement("button");
    botao.classList.add("botao-tocar");
    botao.textContent = "Tocar";
    botao.type = "button";

    card.append(imagem, titulo, artista, botao);
});

// Filtra as músicas conforme a categoria escolhida.
botoesCategoria.forEach((botao) => {
    botao.addEventListener("click", () => {
        const categoria = botao.dataset.categoria;

        botoesCategoria.forEach((item) => {
            item.classList.remove("ativo");
        });

        botao.classList.add("ativo");
        tituloCategoria.textContent = nomesCategorias[categoria];

        cards.forEach((card) => {
            const deveExibir =
                categoria === "todas" ||
                card.dataset.categoria === categoria;

            card.hidden = !deveExibir;
        });
    });
});

// Reproduz a música ao clicar no botão do card.
catalogo.addEventListener("click", (evento) => {
    const botao = evento.target.closest(".botao-tocar");

    if (!botao || !catalogo.contains(botao)) return;

    const card = botao.closest(".card");

    playerImagem.src = card.dataset.imagem;
    playerImagem.alt = `Capa do álbum ${card.dataset.album}`;
    playerTitulo.textContent = card.dataset.titulo;
    playerArtista.textContent = card.dataset.artista;
    playerAudio.src = card.dataset.audio;

    playerAudio.play().catch((erro) => {
        console.error("Erro ao reproduzir a música:", erro);
    });
});

// Player no footer
const playButton = document.querySelector("#play-button");

playButton.addEventListener("click", async () => {
    if (playerAudio.paused) {
        try {
            await playerAudio.play();
            playButton.textContent = "⏸";
        } catch (erro) {
            console.error("Erro ao reproduzir a música:", erro);
        }
    } else {
        playerAudio.pause();
        playButton.textContent = "▶";
    }
});

playerAudio.addEventListener("play", () => {
    playButton.textContent = "⏸";
});

playerAudio.addEventListener("pause", () => {
    playButton.textContent = "▶";
});

playerAudio.addEventListener("ended", () => {
    playButton.textContent = "▶";
});