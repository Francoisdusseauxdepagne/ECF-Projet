// // formulaire contact
const form = document.querySelector("#form");
const nameEl = document.forms.formValidate.name;
const emailEl = document.forms.formValidate.email;
const messageEl = document.forms.formValidate.message;

function isRequired(elementValue) {
    return elementValue.trim() !== "";
}

function isNameValid(elementValue){
    const re = new RegExp("^(?!.*\\b(puant|merde|con|sexe|debile)\\b)[a-zA-Z]+$");
    return re.test(elementValue);
}

// j'ai besoin d'une fonction qui valide que l'adresse email a un format valide
function isEmailValid(elementValue) {
    const reg = new RegExp('^([a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\\.[a-z]{2,4})$', 'i');
    return reg.test(elementValue);
}

// J'ai besoin d'une fonction qui permette d'afficher les erreurs en rouge
function showError(input,message){
    const formField = input.parentElement;
    formField.classList.remove("success")// class css
    formField.classList.add("error")// class css
    const errorEl = formField.querySelector("small")
    errorEl.textContent = message
}

// // J'ai besoin d'une fonction qui permette d'afficher l'element valide en vert
function showSuccess(input){
    const formField = input.parentElement;
    formField.classList.remove("error")// class css
    formField.classList.add("success")// class css
    const errorEl = formField.querySelector("small")
    errorEl.textContent = ""
}

const checkName = () => {
    let valid = false;
    const name = nameEl.value.trim();
    if (!isRequired(name)) {
        showError(nameEl, "Le nom ne peut pas être vide");
    } else if (!isNameValid(name)) {
        showError(
            nameEl,
            `Le nom ne doit pas comporter des mots abstraits ou des nombres.`
        );
    } else {
        showSuccess(nameEl);
        valid = true;
    }
    return valid; 
}

const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
        showError(emailEl, "L'email ne peut pas être vide");
    } else if (!isEmailValid(email)) {
        showError(
            emailEl,
            `L'email doit avoir un format valide.`
        );
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid; 
}



const checkMessage = () => {
    let valid = false;
    const message = messageEl.value.trim();
    if (!isRequired(message)) {
        showError(messageEl, "Le message ne peut pas être vide");
    } else if (!isNameValid(message)) {
        showError(
            messageEl,
            `Le message ne doit pas comporter des mots abstraits ou des nombres.`
        );
    } else {
        showSuccess(messageEl);
        valid = true;
    }
    return valid; 
}

form.addEventListener('submit',(e) => {
    e.preventDefault();
    let nameOk = checkName();
    let emailOk = checkEmail();
    let messageOk = checkMessage();

    let isFormValid = nameOk && emailOk && messageOk;
    if(isFormValid){
        console.log('Tout est Ok pour l\'envoi')
    }
});