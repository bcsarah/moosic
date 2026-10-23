const barraProgresso = document.querySelector("#barra-progresso");
const tempoAtual = document.querySelector("#tempo-atual");
const duracaoTotal = document.querySelector("#duracao-total");
const botoesCategoria = document.querySelectorAll(".botao-categoria");
const cards = document.querySelectorAll(".card");
const tituloCategoria = document.querySelector("#titulo-categoria");
const catalogo = document.querySelector(".catalogo");

const playerImagem = document.querySelector("#player-imagem");
const playerTitulo = document.querySelector("#track-name");
const playerArtista = document.querySelector("#artist-name");
const playerAudio = document.querySelector("#audio");
const playButton = document.querySelector("#play-button");

const nomesCategorias = {
    todas: "Todas as músicas",
    rock: "Rock",
    metal: "Metal",
    pop: "Pop",
    eletronica: "Eletrônica"
};

// Cria os elementos de cada card usando os atributos data-*.
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

// Filtra as músicas pela categoria selecionada.
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

// Atualiza o ícone conforme o estado real do áudio.
playerAudio.addEventListener("play", () => {
    playButton.textContent = "⏸";
    playButton.setAttribute("aria-label", "Pausar");
});

playerAudio.addEventListener("pause", () => {
    playButton.textContent = "▶";
    playButton.setAttribute("aria-label", "Reproduzir");
});

playerAudio.addEventListener("ended", () => {
    playButton.textContent = "▶";
    playButton.setAttribute("aria-label", "Reproduzir");
});

// Reproduz a música selecionada no catálogo.
catalogo.addEventListener("click", async (evento) => {
    const botao = evento.target.closest(".botao-tocar");

    if (!botao || !catalogo.contains(botao)) return;

    const card = botao.closest(".card");

    playerImagem.src = card.dataset.imagem;
    playerImagem.alt = `Capa do álbum ${card.dataset.album}`;
    playerTitulo.textContent = card.dataset.titulo;
    playerArtista.textContent = card.dataset.artista;

    // Atualiza o áudio somente se a faixa for diferente.
    if (playerAudio.getAttribute("src") !== card.dataset.audio) {
        playerAudio.src = card.dataset.audio;
    }

    try {
        await playerAudio.play();
    } catch (erro) {
        console.error("Erro ao reproduzir a música:", erro);
    }
});

// Botão de play/pause do footer.
playButton.addEventListener("click", async () => {
    if (!playerAudio.src) {
        console.warn("Selecione uma música primeiro.");
        return;
    }

    if (playerAudio.paused) {
        try {
            await playerAudio.play();
        } catch (erro) {
            console.error("Erro ao reproduzir a música:", erro);
        }
    } else {
        playerAudio.pause();
    }
});

function formatarTempo(segundos) {
    if (!Number.isFinite(segundos)) {
        return "0:00";
    }

    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = Math.floor(segundos % 60);

    return `${minutos}:${String(segundosRestantes).padStart(2, "0")}`;
}

playerAudio.addEventListener("loadedmetadata", () => {
    barraProgresso.max = playerAudio.duration;
    duracaoTotal.textContent = formatarTempo(playerAudio.duration);
});

playerAudio.addEventListener("timeupdate", () => {
    barraProgresso.value = playerAudio.currentTime;
    tempoAtual.textContent = formatarTempo(playerAudio.currentTime);
});

barraProgresso.addEventListener("input", () => {
    playerAudio.currentTime = Number(barraProgresso.value);
});