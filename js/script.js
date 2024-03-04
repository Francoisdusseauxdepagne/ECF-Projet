// letter H1
document.addEventListener("DOMContentLoaded", () => {
    const title = document.querySelector('#background_text');
    function animateText() {
        const text = title.innerText;
        title.innerText = '';
        for(let i = 0; i < text.length; i++) {
            const letter = document.createElement('span');
            letter.innerText = text[i];
            letter.classList.add('letter');
            title.appendChild(letter);
            setTimeout(() => {
                letter.style.opacity = '1';
            }, i * 100);
        }
    }
    animateText();
});

// page connexion

