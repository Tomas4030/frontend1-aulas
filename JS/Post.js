import { getPosts, deletePost, updatePost } from "../lib/Api.js";

document.addEventListener("DOMContentLoaded", async () => {
    const posts = await getPosts();
    displayPosts(posts);
});

function displayPosts(posts) {
    const postList = document.getElementById("post-list");
    postList.innerHTML = "";

    posts.forEach((post) => {
        const postItem = document.createElement("div");
        postItem.classList.add("post-item");

        postItem.innerHTML = `
            <img class="post-image" src="${post.image}" alt="${post.title}">
            <h3 class="post-title">${post.title}</h3>
            <p class="post-content">${post.content}</p>
            <div class="post-author">
                <div class="post-author-info">
                    <img class="post-author-avatar" src="${post.avatar}" alt="${post.author}"/>
                    <div class="post-author-name">${post.author}</div>
                </div>
                <div class="post-date">${new Date(post.createdAt).toLocaleDateString("pt-PT", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        })}</div>
            </div>
            <div class="post-actions">
                <button class="edit-post" data-id="${post.id}">Editar</button>
                <button class="delete-post" data-id="${post.id}">Apagar</button>
            </div>
        `;

        postList.prepend(postItem);
    });

    document.querySelectorAll(".delete-post").forEach(button => {
        button.addEventListener("click", async (e) => {
            const postId = e.target.dataset.id;
            console.log("A apagar post com ID:", postId);

            if (confirm("Tens a certeza que queres apagar este post?")) {
                try {
                    await deletePost(postId);
                    const posts = await getPosts();
                    displayPosts(posts);
                } catch (err) {
                    console.error("Erro ao apagar post:", err);
                    alert("Erro ao apagar o post. Verifica a consola para mais detalhes.");
                }
            }
        });
    });


    document.querySelectorAll(".edit-post").forEach(button => {
        button.addEventListener("click", (e) => {
            const postId = e.target.dataset.id;
            const postItem = e.target.closest(".post-item");
    
            const titleEl = postItem.querySelector(".post-title");
            const contentEl = postItem.querySelector(".post-content");
            const imageEl = postItem.querySelector(".post-image");
            const actionsContainer = postItem.querySelector(".post-actions");
    
            const currentTitle = titleEl.textContent;
            const currentContent = contentEl.textContent;
            const currentImage = imageEl.src;
    
            titleEl.innerHTML = `<input type="text" class="edit-title-input" value="${currentTitle}">`;
            contentEl.innerHTML = `<textarea class="edit-content-textarea">${currentContent}</textarea>`;
            imageEl.outerHTML = `
                <div class="edit-image-wrapper">
                    <input type="text" class="edit-image-input" value="${currentImage}" />
                    <img src="${currentImage}" alt="Pré-visualização" class="preview-image" />
                </div>
            `;
    
            actionsContainer.innerHTML = `
                <button class="save-post" data-id="${postId}">Guardar</button>
                <button class="cancel-edit">Cancelar</button>
            `;
    
            actionsContainer.querySelector(".save-post").addEventListener("click", async () => {
                const newTitle = postItem.querySelector(".edit-title-input").value;
                const newContent = postItem.querySelector(".edit-content-textarea").value;
                const newImage = postItem.querySelector(".edit-image-input").value;
    
                try {
                    await updatePost(postId, {
                        title: newTitle,
                        content: newContent,
                        image: newImage
                    });
    
                    const posts = await getPosts();
                    displayPosts(posts);
                } catch (err) {
                    console.error("Erro ao guardar:", err);
                    alert("Erro ao guardar alterações.");
                }
            });
    
            actionsContainer.querySelector(".cancel-edit").addEventListener("click", async () => {
                const posts = await getPosts();
                displayPosts(posts); 
            });
        });
    });
    
    
}
