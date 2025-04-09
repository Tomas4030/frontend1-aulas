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