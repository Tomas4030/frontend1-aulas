const post = {
  id: 1,
  title: "post1",
  body: "body1",
  author: "author1",
  createAt: new Date(),
  updateAT: new Date(),
}

const postList = [post];

const navmenu = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 2,
    title: "News",
    url: "/news",
  },
  {
    id: 3,
    title: "Leaks",
    url: "/Leaks",
  },
]


//ex 2
const Pessoas = {
  name: "Tomas",
  email: "tomas@gmail.com",
  idade: 20,
}



//ex 4

function loadName() {
  const storedName = localStorage.getItem("userName");
  if (storedName) {
    document.getElementById('user_username').textContent = storedName;
    console.log("Nome carregado:", storedName);
  }
}

function saveName(event) {
  event.preventDefault();
  const newName = document.getElementById('name').value;
  localStorage.setItem("userName", newName);
  document.getElementById('user_username').textContent = newName;
  console.log("Nome salvo:", newName);
  document.getElementById('name').value = ''; 
}

function loadTheme() {
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme) {
    document.body.classList.add(storedTheme);
    document.getElementById('theme').value = storedTheme;
    console.log("Tema carregado:", storedTheme);
  }
}

function saveTheme() {
  const selectedTheme = document.getElementById('theme').value;
  localStorage.setItem("theme", selectedTheme);
  document.body.classList.remove("light", "dark");
  document.body.classList.add(selectedTheme);
  console.log("Tema salvo:", selectedTheme);
}

document.getElementById('nameForm').addEventListener('submit', saveName);
document.getElementById('theme').addEventListener('change', saveTheme);

loadName();
loadTheme();


///aula do mock api


const Api = "https://67f5684e913986b16fa47719.mockapi.io/api/:endpoint";

export const getPost = async () => {
  const response = await fetch(Api + "Posts");
  const data = await response.json();
  return data;
};

document.getElementById("buscar-imagem").addEventListener("click", buscarImagem);

function buscarImagem() {
  
  const breed = document.getElementById("breed").value.trim().toLowerCase();
  const api = `https://dog.ceo/api/breed/${breed}/images/random`;

  fetch(api)
    .then(response => {
      if (!response.ok) throw new Error("Raça não encontrada");
      return response.json();
    })
    .then(data => {
      const img = document.getElementById("dog-image");
      img.src = data.message;
    })
    .catch(error => {
      console.error(error);
      alert("Erro ao buscar imagem: " + error.message);
    });
}

document.addEventListener(
  "keydown",
  (e) => {
    if (e.key === "Enter") {
      toggleFullScreen();
    }
  },
  false,
);
function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}

//canvas

const testCanvas = document.getElementById("test-canvas");
const testCtx = testCanvas.getContext("2d");

testCtx.fillStyle = "black"; // Set background color
testCtx.fillRect(0, 0, testCanvas.width, testCanvas.height); // Fill entire canvas

testCtx.fillStyle = "red";
testCtx.fillRect(100, 100, 100, 100);

testCtx.beginPath();
testCtx.arc(300, 300, 50, 0, Math.PI * 2);
testCtx.fillStyle = "blue";
testCtx.fill();

testCtx.beginPath();
testCtx.moveTo(400, 100);
testCtx.lineTo(300, 200);
testCtx.strokeStyle = "green";
testCtx.lineWidth = 5;
testCtx.stroke();

const animateCanvas = document.getElementById("animate-canvas");
const animateCtx = animateCanvas.getContext("2d");

let x = 0;
function animate() {
  animateCtx.clearRect(0, 0, animateCanvas.width, animateCanvas.height);
  animateCtx.fillRect(x, 100, 100, 100);
  x += 1;
  requestAnimationFrame(animate);
}
animate();

navigator.geolocation.getCurrentPosition(function(position) {
  console.log("Latitude: " + position.coords.latitude + ", Longitude: " + position.coords.longitude);
});



class CartaoUtilizador extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ['nome', 'idade'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'nome' || name === 'idade') {
      this.updateCard();
    }
  }

  connectedCallback() {
    this.updateCard();
  }

  updateCard() {
    const nome = this.getAttribute('nome');
    const idade = this.getAttribute('idade');

    this.shadowRoot.innerHTML = `
      <style>
        .cartao {
          border: 1px solid #ccc;
          padding: 20px;
          border-radius: 8px;
          font-family: Arial, sans-serif;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          background-color: #fff;
          max-width: 200px;
          text-align: center;
        }
        .nome {
          font-size: 1.5em;
          font-weight: bold;
        }
        .idade {
          font-size: 1.2em;
          color: #555;
        }
      </style>
      <div class="cartao">
        <div class="nome">${nome}</div>
        <div class="idade">${idade} anos</div>
      </div>
    `;
  }
}

customElements.define('cartao-utilizador', CartaoUtilizador);
