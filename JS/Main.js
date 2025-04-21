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