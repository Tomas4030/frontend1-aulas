import { getNews } from "../lib/Api.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const dados = await getNews();
    console.log(dados);

    const pathname = window.location.pathname;
    const isIndex = pathname === "/" || pathname.endsWith("index.html");
    const isNews = pathname.endsWith("News.html");
    const isLeaks = pathname.endsWith("Leaks.html");

    if (isLeaks) {
      carregarConteudo(dados[0], 'leaks');
    } else if (isNews) {
      carregarConteudo(dados[0], 'noticias');
    } else if (isIndex) {
      carregarUltimasNoticiasELeaks(dados[0]);
    }

  } catch (erro) {
    console.log('Erro ao carregar os dados da API:', erro);
  }
});

// Função principal para carregar conteúdo
async function carregarConteudo(dados, tipo) {
  try {
    let conteudo = tipo === 'noticias' ? dados.noticias : dados.leaks;

    if (!Array.isArray(conteudo)) return;

    // Ordena por data decrescente
    conteudo.sort((a, b) => new Date(b.data) - new Date(a.data));

    // Detecta qual container usar
    const pathname = window.location.pathname;
    const isIndex = pathname === "/" || pathname.endsWith("index.html");

    let container;

    if (isIndex) {
      // homepage
      container = tipo === 'noticias'
        ? document.getElementById('noticias-container')
        : document.getElementById('leaks-container');
    } else {
      // páginas News.html e Leaks.html
      container = document.getElementById('info-container');
    }

    if (!container) return;

    container.innerHTML = '';
    conteudo.forEach(item => criarCard(item, container, tipo, isIndex));
  } catch (erro) {
    console.log('Erro ao carregar conteúdo:', erro);
  }
}

// Função para criar os cards de notícias/leaks
function criarCard(item, container, tipo, isIndex) {
  const card = document.createElement('div');
  card.classList.add('card');

  const cardContent = document.createElement('div');
  cardContent.classList.add('card-content');

  if (item.image) {
    const img = document.createElement('img');
    img.src = corrigirCaminhoImagem(item.image);
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

  if (isIndex) {
    // Na homepage, redireciona para News ou Leaks
    botaoLeiaMais.addEventListener('click', () => {
      if (tipo === 'noticias') {
        window.location.href = "./HTML/News.html";
      } else if (tipo === 'leaks') {
        window.location.href = "./HTML/Leaks.html";
      }
    });
  } else {
    // Nas páginas individuais, abre modal
    botaoLeiaMais.addEventListener('click', () => abrirModalNoticia(item));
  }

  textContent.appendChild(titulo);
  textContent.appendChild(data);
  textContent.appendChild(descricao);
  textContent.appendChild(botaoLeiaMais);
  cardContent.appendChild(textContent);
  card.appendChild(cardContent);
  container.appendChild(card);
}

// Função para abrir modal de notícia
function abrirModalNoticia(item) {
  const modal = document.createElement('div');
  modal.classList.add('noticia-modal');

  const modalContent = document.createElement('div');
  modalContent.classList.add('noticia-modal-content');

  if (item.image) {
    const img = document.createElement('img');
    img.src = corrigirCaminhoImagem(item.image);
    img.alt = item.titulo;
    img.classList.add('noticia-modal-img');
    modalContent.appendChild(img);
  }

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

  // Remove modais ativos antes de abrir outro
  document.querySelectorAll('.noticia-modal').forEach(m => m.remove());

  modal.appendChild(modalContent);
  document.body.appendChild(modal);
}

function fecharModalNoticia(modal) {
  modal.remove();
}

// Função específica para homepage: mostrar só as últimas 2 notícias/leaks
function carregarUltimasNoticiasELeaks(dados) {
  const noticiasContainer = document.getElementById('noticias-container');
  const leaksContainer = document.getElementById('leaks-container');

  if (!noticiasContainer || !leaksContainer) return;

  const ultimasNoticias = dados.noticias
    .sort((a, b) => new Date(b.data) - new Date(a.data))
    .slice(0, 2);

  const ultimosLeaks = dados.leaks
    .sort((a, b) => new Date(b.data) - new Date(a.data))
    .slice(0, 2);

  noticiasContainer.innerHTML = '';
  leaksContainer.innerHTML = '';

  ultimasNoticias.forEach(item => criarCard(item, noticiasContainer, 'noticias', true));
  ultimosLeaks.forEach(item => criarCard(item, leaksContainer, 'leaks', true));
}

// Corrige caminhos de imagens para funcionar em todas as páginas
function corrigirCaminhoImagem(caminho) {
  if (!caminho.startsWith("/")) {
    return "/" + caminho.replace(/^(\.\.\/)+/, "");
  }
  return caminho;
}
