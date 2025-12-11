// Obtener datos desde la URL (item, img, precio, etc)
const params = new URLSearchParams(window.location.search);

document.getElementById("buyName").textContent = params.get("name");
document.getElementById("buyPrice").textContent = params.get("price");
document.getElementById("buyImg").src = params.get("img");
document.getElementById("buyDesc").textContent = params.get("desc");

// Abrir modal
document.getElementById("confirmBtn").onclick = () => {
    document.getElementById("formModal").style.display = "flex";
};

// Cerrar modal
document.getElementById("closeForm").onclick = () => {
    document.getElementById("formModal").style.display = "none";
};
