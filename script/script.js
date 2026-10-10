const botoesCategoria = document.querySelectorAll(".botao-categoria");
const cards = document.querySelectorAll(".card");
const tituloCategoria = document.querySelector("#titulo-categoria");

const playerImagem = document.querySelector("#player-imagem");
const playerTitulo = document.querySelector("#player-titulo");
const playerArtista = document.querySelector("#player-artista");
const playerAudio = document.querySelector("#player-audio");

const nomesCategorias = {
    todas: "Todas as músicas",
    metal: "Metal",
    rock: "Rock",
    pop: "Pop",
    eletronica: "Eletrônica"
};

// Filtra as músicas conforme a categoria escolhida.
botoesCategoria.forEach((botao) => {
    botao.addEventListener("click", () => {
        const categoria = botao.dataset.categoria;

        botoesCategoria.forEach((item) => item.classList.remove("ativo"));
        botao.classList.add("ativo");

        tituloCategoria.textContent = nomesCategorias[categoria];

        cards.forEach((card) => {
            const deveExibir =
                categoria === "todas" || card.dataset.categoria === categoria;

            card.hidden = !deveExibir;
        });
    });
});

// Atualiza o player ao clicar em "Tocar".
document.querySelectorAll(".botao-tocar").forEach((botao) => {
    botao.addEventListener("click", () => {
        const card = botao.closest(".card");

        playerImagem.src = card.dataset.imagem;
        playerImagem.alt = `Capa do álbum ${card.dataset.album}`;
        playerTitulo.textContent = card.dataset.titulo;
        playerArtista.textContent = card.dataset.artista;
        playerAudio.src = card.dataset.audio;

        playerAudio.play();
    });
});
