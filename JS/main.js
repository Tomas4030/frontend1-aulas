//Main Page

async function fetchJSON() {
    try {
        const response = await fetch("./JSON/data.json");
        const data = await response.json();
        
        updateContent("latest_news1", data.latest_news.latest_news1);
        updateContent("latest_news2", data.latest_news.latest_news2);
        updateContent("latest_leaks1", data.latest_leaks.latest_leaks1);
        updateContent("latest_leaks2", data.latest_leaks.latest_leaks2);
    } catch (error) {
        console.log(error);
    }
}

function updateContent(prefix, content) {
    document.getElementById(`${prefix}_title`).textContent = content.title;
    document.getElementById(`${prefix}_text`).textContent = content.text;
    document.getElementById(`${prefix}_image`).src = content.image;
}

fetchJSON();


//New Page
async function carregarNoticias() {
    try {
        const resposta = await fetch('/JSON/data.json');
        const dados = await resposta.json();

        const noticias = dados.noticias;
        
        noticias.sort((a, b) => new Date(b.data) - new Date(a.data));

        const container = document.getElementById('noticias-container');
        noticias.forEach(noticia => {
            const card = document.createElement('div');
            card.classList.add('card');

            const cardContent = document.createElement('div');
            cardContent.classList.add('card-content');

            const textContent = document.createElement('div');
            textContent.classList.add('text-content');

            const titulo = document.createElement('h2');
            titulo.textContent = noticia.titulo;

            const data = document.createElement('p');
            data.classList.add('date');
            data.textContent = `Publicado em ${noticia.data}`;

            const descricao = document.createElement('p');
            descricao.textContent = noticia.descricao;

            textContent.appendChild(titulo);
            textContent.appendChild(data);
            textContent.appendChild(descricao);
            cardContent.appendChild(textContent);
            card.appendChild(cardContent);
            container.appendChild(card);
        });
    } catch (erro) {
        console.log('Erro ao carregar notícias:', erro);
    }
}

carregarNoticias();
