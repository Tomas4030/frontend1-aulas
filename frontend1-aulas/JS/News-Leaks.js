//News-Leaks Pages
async function carregarConteudo(tipo) {
    try {
        const resposta = await fetch('/JSON/data.json'); 
        const dados = await resposta.json();

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

            const textContent = document.createElement('div');
            textContent.classList.add('text-content');

            const titulo = document.createElement('h2');
            titulo.textContent = item.titulo;

            const data = document.createElement('p');
            data.classList.add('date');
            data.textContent = `Publicado em ${item.data}`;

            const descricao = document.createElement('p');
            descricao.textContent = item.descricao || item.text; 

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

if (window.location.pathname.includes("Leaks.html")) {
    carregarConteudo('leaks'); 
} else if (window.location.pathname.includes("News.html")) {
    carregarConteudo('noticias');
}