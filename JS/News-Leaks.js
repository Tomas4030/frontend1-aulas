import { getNews } from "../lib/Api.js";

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const dados = await getNews();
        console.log(dados);

        if (window.location.pathname.includes("Leaks.html")) {
            carregarConteudo(dados[0], 'leaks');
        } else if (window.location.pathname.includes("News.html")) {
            carregarConteudo(dados[0], 'noticias');
        }

    } catch (erro) {
        console.log('Erro ao carregar os dados da API:', erro);
    }
});

async function carregarConteudo(dados, tipo) {
    try {
        let conteudo = [];

        if (tipo === 'noticias') {
            conteudo = dados.noticias;
        } else if (tipo === 'leaks') {
            conteudo = dados.leaks;
        }

        if (Array.isArray(conteudo)) {
            conteudo.sort((a, b) => new Date(b.data) - new Date(a.data));
        }

        const container = document.getElementById('info-container');
        container.innerHTML = '';

        conteudo.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('card');

            const cardContent = document.createElement('div');
            cardContent.classList.add('card-content');

            if (item.image) {
                const img = document.createElement('img');
                img.src = item.image;
                img.alt = item.titulo;
                img.classList.add('card-img');
                cardContent.appendChild(img);
            }

            const textContent = document.createElement('div');
            textContent.classList.add('text-content');

            const titulo = document.createElement('h2');
            titulo.textContent = item.titulo;

            const data = document.createElement('p');
            data.classList.add('date');
            data.textContent = item.data;

            const descricao = document.createElement('p');
            descricao.textContent = item.resumo;

            const botaoLeiaMais = document.createElement('button');
            botaoLeiaMais.classList.add('button-leia-mais');
            botaoLeiaMais.textContent = 'LEIA MAIS';
            botaoLeiaMais.addEventListener('click', () => abrirModalNoticia(item));

            textContent.appendChild(titulo);
            textContent.appendChild(data);
            textContent.appendChild(descricao);
            cardContent.appendChild(textContent);
            card.appendChild(cardContent);
            container.appendChild(card);
            textContent.appendChild(botaoLeiaMais);
        });
    } catch (erro) {
        console.log('Erro ao carregar conteúdo:', erro);
    }
}

function abrirModalNoticia(item) {
    const modal = document.createElement('div');
    modal.classList.add('noticia-modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('noticia-modal-content');

    const img = document.createElement('img');
    img.src = item.image;
    img.alt = item.titulo;
    img.classList.add('noticia-modal-img');
    modalContent.appendChild(img);

    const titulo = document.createElement('h2');
    titulo.textContent = item.titulo;
    modalContent.appendChild(titulo);

    const data = document.createElement('p');
    data.classList.add('noticia-modal-date');
    data.textContent = item.data;
    modalContent.appendChild(data);

    const descricao = document.createElement('p');
    descricao.textContent = item.descricao;
    modalContent.appendChild(descricao);

    const botaoFechar = document.createElement('button');
    botaoFechar.textContent = 'Minimizar';
    botaoFechar.classList.add('noticia-modal-close');
    botaoFechar.addEventListener('click', () => fecharModalNoticia(modal));
    modalContent.appendChild(botaoFechar);

    const modaisAtivos = document.querySelectorAll('.noticia-modal');
    if (modaisAtivos.length > 0) {
        modaisAtivos.forEach(modal => modal.remove());
    }

    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

function fecharModalNoticia(modal) {
    modal.remove();
}
