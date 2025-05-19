
function changeWelcomeText() {
    const welcomeText = document.getElementById("welcome-text");
    welcomeText.textContent = "Welcome to the Future of Tailoring!";
    welcomeText.style.color = "#007bff";
    welcomeText.style.fontWeight = "bold";
}

function addParagraph() {
    const dynamicContent = document.getElementById("dynamic-content");
    const paragraph = document.createElement("p");
    paragraph.textContent = "This is a dynamically added paragraph. Stay stylish!";
    paragraph.style.backgroundColor = "#f9f9f9";
    paragraph.style.padding = "10px";
    paragraph.style.marginTop = "10px";
    paragraph.style.borderRadius = "8px";
    paragraph.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
    dynamicContent.appendChild(paragraph);
}

function removeParagraph() {
    const dynamicContent = document.getElementById("dynamic-content");
    if (dynamicContent.lastChild) {
        dynamicContent.removeChild(dynamicContent.lastChild);
    }
}
