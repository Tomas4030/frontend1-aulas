import { getNews } from "../lib/Api.js";

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const dados = await getNews();
        console.log(dados);

        if (window.location.pathname.includes("Leaks.html")) {
            carregarConteudo(dados[0], 'leaks'); // Corrigido para 'leaks'
        } else if (window.location.pathname.includes("News.html")) {
            carregarConteudo(dados[0], 'noticias'); // Corrigido para 'noticias'
        }

    } catch (erro) {
        console.log('Erro ao carregar os dados da API:', erro);
    }
});

async function carregarConteudo(dados, tipo) {
    try {
        let conteudo = [];

        if (tipo === 'noticias') {
            conteudo = dados.noticias; // Corrigido para acessar 'noticias'
        } else if (tipo === 'leaks') {
            conteudo = dados.leaks; // Corrigido para acessar 'leaks'
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

            const textContent = document.createElement('div');
            textContent.classList.add('text-content');

            const titulo = document.createElement('h2');
            titulo.textContent = item.titulo;

            const data = document.createElement('p');
            data.classList.add('date');
            data.textContent = `Publicado em ${item.data}`;

            const descricao = document.createElement('p');
            descricao.textContent = item.descricao;

            textContent.appendChild(titulo);
            textContent.appendChild(data);
            textContent.appendChild(descricao);
            cardContent.appendChild(textContent);
            card.appendChild(cardContent);
            container.appendChild(card);
        });
    } catch (erro) {
        console.log('Erro ao carregar conteúdo:', erro);
    }
}
