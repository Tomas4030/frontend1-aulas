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
                    <img class="post-author-avatar" src="${post.avatar}" alt="${post.author
      }"/>
                    <div class="post-author-name">${post.author}</div>
                </div>
                <div class="post-date">${new Date(
        post.createdAt
      ).toLocaleDateString("pt-PT", {
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

  document.querySelectorAll(".delete-post").forEach((button) => {
    button.addEventListener("click", async (e) => {
      const postId = e.target.dataset.id;

      const result = await Swal.fire({
        title: "Tens a certeza?",
        text: "Esta ação não pode ser revertida!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#e53935",
        cancelButtonColor: "#bdbdbd",
        confirmButtonText: "Sim, apagar!",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        try {
          await deletePost(postId);

          Swal.fire({
            title: "Apagado!",
            text: "O post foi removido com sucesso.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });

          const posts = await getPosts();
          displayPosts(posts);
        } catch (err) {
          console.error("Erro ao apagar post:", err);
          Swal.fire("Erro!", "Não foi possível apagar o post.", "error");
        }
      }
    });
  });

  let currentEditingPostId = null;

  document.querySelectorAll(".edit-post").forEach((button) => {
    button.addEventListener("click", (e) => {
      const postItem = e.target.closest(".post-item");
      currentEditingPostId = e.target.dataset.id;

      const title = postItem.querySelector(".post-title").textContent;
      const content = postItem.querySelector(".post-content").textContent;
      const image = postItem.querySelector(".post-image").src;

      document.getElementById("modal-title").value = title;
      document.getElementById("modal-content").value = content;
      document.getElementById("modal-image").value = image;
      document.getElementById("modal-preview").src = image;

      document.getElementById("edit-modal").classList.remove("hidden");
    });
  });

  document.getElementById("modal-image").addEventListener("input", (e) => {
    document.getElementById("modal-preview").src = e.target.value;
  });

  document.getElementById("save-post").addEventListener("click", async () => {
    const result = await Swal.fire({
      title: "Queres guardar as alterações?",
      icon: "question",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Sim, guardar",
      denyButtonText: "Não guardar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      const newTitle = document.getElementById("modal-title").value;
      const newContent = document.getElementById("modal-content").value;
      const newImage = document.getElementById("modal-image").value;

      try {
        await updatePost(currentEditingPostId, {
          title: newTitle,
          content: newContent,
          image: newImage,
        });

        await Swal.fire({
          title: "Alterações guardadas com sucesso!",
          icon: "success",
          timer: 1800,
          showConfirmButton: false,
        });

        document.getElementById("edit-modal").classList.add("hidden");
        const posts = await getPosts();
        displayPosts(posts);
      } catch (err) {
        console.error("Erro ao guardar:", err);
        Swal.fire({
          icon: "error",
          title: "Erro ao guardar alterações",
          text: "Verifica a consola para mais detalhes.",
        });
      }
    } else if (result.isDenied) {
      Swal.fire("Alterações descartadas.", "", "info");
      document.getElementById("edit-modal").classList.add("hidden");
      const posts = await getPosts();
      displayPosts(posts);
    }
  });

  document.getElementById("cancel-edit").addEventListener("click", async () => {
    const result = await Swal.fire({
      title: "Descartar alterações?",
      text: "Vais perder as mudanças feitas.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, descartar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      document.getElementById("edit-modal").classList.add("hidden");
      const posts = await getPosts();
      displayPosts(posts);
    }
  });
}
