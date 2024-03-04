const form = document.querySelector("#form");
const nameEl = document.forms.formValidate.name;
const emailEl = document.forms.formValidate.email;
const firstnameEl = document.forms.formValidate.firstname;
const passwordEl = document.forms.formValidate.password;
const confirmpasswordEl = document.forms.formValidate.confirmpassword;
const eyes = document.querySelector(".eyes")
const eyeOpen = document.querySelector("#eye-open")
const eyeClose = document.querySelector("#eye-close")

eyes.addEventListener("click", () => {
    if (passwordEl.type === "password") {
        passwordEl.type = "text"
        eyeOpen.style.display = "none"
        eyeClose.style.display = "block"
    } else {
        passwordEl.type = "password"
        eyeOpen.style.display = "block"
        eyeClose.style.display = "none"
    }
})

// J'ai besoin d'une fonction qui vérifie si la valeur d'un input est vide
function isRequired(elementValue){
    if(elementValue == ""){
        return false
    }else{
        return true
    }
}

function isBetween(length, min, max){
    if(length < min || length > max){
        return false
    }else{
        return true
    }
}

function isNameValid(elementValue){
    const re = new RegExp("^(?!.*\\b(puant|merde|con|sexe|debile)\\b)[a-zA-Z]+$");
    return re.test(elementValue);
}

function isEmailValid(elementValue) {
    const reg = new RegExp('^([a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\\.[a-z]{2,4})$', 'i');
    return reg.test(elementValue);
}

// j'ai besoin d'une fonction qui permet de valider le mot de passe
function isPasswordValid(elementValue){
    const rege = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
    return rege.test(elementValue);
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

const checkPassword = () => {
    let valid = false;
    const password = passwordEl.value.trim();
    if (!isRequired(password)) {
        showError(passwordEl, "Le mot de passe ne peut pas être vide");
    } else if (!isPasswordValid(password)) {
        showError(
            passwordEl,
            `Le mot de passe doit contenir au moins au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère special`
        );
    } else {
        showSuccess(passwordEl);
        valid = true;
    }
    return valid;
}

const checkConfirmPassword = () => {
    let valid = false;
    const confirmPassword = confirmpasswordEl.value.trim();
    const password = passwordEl.value.trim();
    if (!isRequired(confirmPassword)) {
        showError(confirmpasswordEl, "Le mot de passe ne peut pas être vide");
    } else if (password !== confirmPassword) {
        showError(confirmpasswordEl, "Le mot de passe ne correspond pas");
    } else {
        showSuccess(confirmpasswordEl);
        valid = true;
    }
    return valid;
};

const checkFirstName = () => {
    let valid = false;
    const firstname = firstnameEl.value.trim();
    if (!isRequired(firstname)) {
        showError(firstnameEl, "Le prénom ne peut pas être vide");
    } else {
        showSuccess(firstnameEl);
        valid = true;
    }
    return valid;
};

form.addEventListener('submit',(e) => {
    e.preventDefault();
    let nameOk = checkName();
    let emailOk = checkEmail();
    let firstnameOk = checkFirstName();
    let passwordOk = checkPassword();
    let confirmPasswordOk = checkConfirmPassword();

    let isFormValid = nameOk && emailOk && firstnameOk && passwordOk && confirmPasswordOk;
    if(isFormValid){
        console.log('Tout est Ok pour l\'envoi')
    }
});
