const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toast-message");

let toastTimer;

export function showToast(message, type = "success") {
    clearTimeout(toastTimer);

    toastMessage.textContent = message;

    toast.classList.remove(
        "hidden",
        "bg-green-600",
        "bg-red-600",
        "bg-blue-600"
    );

    if (type === "success") {
        toast.classList.add("bg-green-600");
    } else if (type === "error") {
        toast.classList.add("bg-red-600");
    } else {
        toast.classList.add("bg-blue-600");
    }

    toast.classList.remove("hidden");

    toastTimer = setTimeout(() => {
        toast.classList.add("hidden");
    }, 3000);
}