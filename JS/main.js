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

//projeto

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

