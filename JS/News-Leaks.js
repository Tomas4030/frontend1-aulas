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
            botaoLeiaMais.addEventListener('click', () => abrirModal(item));

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

function abrirModal(item) {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const img = document.createElement('img');
    img.src = item.image;
    img.alt = item.titulo;
    img.classList.add('modal-img');
    modalContent.appendChild(img);

    const titulo = document.createElement('h2');
    titulo.textContent = item.titulo;
    modalContent.appendChild(titulo);

    const data = document.createElement('p');
    data.classList.add('modal-date');
    data.textContent = item.data;
    modalContent.appendChild(data);

    const descricao = document.createElement('p');
    descricao.textContent = item.descricao;
    modalContent.appendChild(descricao);

    const botaoMinimizar = document.createElement('button');
    botaoMinimizar.textContent = 'Minimizar';
    botaoMinimizar.classList.add('modal-close');
    botaoMinimizar.addEventListener('click', () => fecharModal(modal));
    modalContent.appendChild(botaoMinimizar);

    const modaisAtivos = document.querySelectorAll('.modal');
    if (modaisAtivos.length > 0) {
        modaisAtivos.forEach(modal => modal.remove());
    }

    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

function fecharModal(modal) {
    modal.remove();
}
