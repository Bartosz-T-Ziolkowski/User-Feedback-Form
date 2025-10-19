const form = document.getElementById("feedback-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const commentsInput = document.getElementById("comments");
const count = document.getElementById("count");
const display = document.getElementById("feedback-display");

let tooltip = null;

function showTooltip(text, x, y) {
    hideTooltip();
    tooltip = document.createElement("div");
    tooltip.className = "tooltip";
    tooltip.textContent = text;
    tooltip.style.left = x + "px";
    tooltip.style.top = y + "px";
    document.body.appendChild(tooltip);
}

function hideTooltip() {
    if (tooltip) { tooltip.remove(); tooltip = null; }
}

if (count && commentsInput) {
    count.textContent = commentsInput.value.length + " characters";
}

form.addEventListener("input", (e) => {
    if (e.target === commentsInput && count) {
        count.textContent = e.target.value.length + " characters";
    }
});

form.addEventListener("mouseover", (e) => {
    if (e.target.matches("input, textarea")) {
        showTooltip("Type here", e.pageX + 10, e.pageY + 10);
    }
});

form.addEventListener("mousemove", (e) => {
    if (tooltip) {
        tooltip.style.left = e.pageX + 10 + "px";
        tooltip.style.top = e.pageY + 10 + "px";
    }
});

form.addEventListener("mouseout", (e) => {
    if (e.target.matches("input, textarea")) {
        hideTooltip();
    }
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const comments = commentsInput.value.trim();

    if (!name || !email || !comments) {
        alert("All fields required.");
        return;
    }

    const entry = document.createElement("div");
    entry.textContent = `${name} (${email}): ${comments}`;
    display.appendChild(entry);

    form.reset();
    if (count) count.textContent = "0 characters";
});

document.addEventListener("click", () => {});
form.addEventListener("click", (e) => {
    if (e.target.matches("input, textarea, button, label")) {
        e.stopPropagation();
    }
});