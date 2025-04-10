import { createPost } from "../lib/Api.js";

document.addEventListener("DOMContentLoaded", function () {
    const addPostForm = document.getElementById("add-post-form");

    if (!addPostForm) {
        console.error("Formulário não encontrado.");
        return;
    }

    addPostForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const newPost = {
            title: document.getElementById("post-title").value,
            content: document.getElementById("post-content").value,
            image: document.getElementById("post-image").value,
            author: document.getElementById("post-author").value,
            avatar: document.getElementById("post-avatar").value,
            createdAt: new Date().toISOString(),
        };

        try {
            // Envia o novo post para a API
            const postResponse = await createPost(newPost);
            console.log("Post criado com sucesso:", postResponse);
            addPostForm.reset();
            window.location.href = "Community.html";
        } catch (error) {
            console.error("Erro ao adicionar o post:", error);
            alert("Falha ao adicionar o post. Tente novamente.");
        }
    });
});
