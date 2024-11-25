// Selecting Elements from HTML (1)
const form = document.querySelector(".contact-app__form");
const firstnameInput = form.querySelector("[name='firstname']"); // Bruker name til å hente element, siden den ikke har spesifikk classname
const lastnameInput = form.querySelector("[name='lastname']");
const phoneInput = form.querySelector("[name='phone-number']");
const addressInput = form.querySelector("[name='address']");
const submitButton = form.querySelector(".form__sumbmit-button");

// Logging to check status (2)
// console.log(form);
// console.log(firstnameInput);
// console.log(lastnameInput);
// console.log(phoneInput);
// console.log(addressInput);
// console.log(submitButton);

// Declearing Variables (4)
// const contacts = [];

const contacts = JSON.parse(localStorage.getItem("contacts")) || []; // Sjekker om det finnes noe i local Storage eller ikke. dersom det ikke er det, ser den det som en tom array. Siden vi gjorde den om til en string med stringify, må vi konvertere den tilbake. (9). Kan gjøres på steg 4 linje, men lagde ny nå for å dokumentere kommentarer.

// Adding Users Function (3)
const addContacts = (e) => {
  e.preventDefault();
  const contact = {
    // Create contacts (make an object)
    id: Date.now(), // Adding an unique identifier
    contactFirstname: firstnameInput.value, // Creating an object that collects data from the form in HTML
    contactLastname: lastnameInput.value,
    contactPhonenumber: phoneInput.value,
    contactAddress: addressInput.value,
    // Etter dette må man decleare en tom array for å lagre informasjonen i ^
  };
  contacts.push(contact); // Contact er det man dytter inn i den tomme arreyen contacts som vi lage over. Legger seg sist i arrayen. Trenger nå en event listener. Legges lenger ned på siden.
  storeContacts(contacts); // Calling function after push, contacts er argument (8)
  console.log(contacts); // Logge for å sjekke at det logges ulike brukere i array (6)
};

// Store Contacts Function (7)
const storeContacts = (contactsArrey) => {
  // Legger tom arrey som parameter i funksjonen, for at funksjonen skal vite hva den skal lagre.
  localStorage.setItem("contacts", JSON.stringify(contactsArrey)); // Key er contacts, value er JSON og stringify er method gjør det om til string, contactsArrey er det som skal gjøres om til string. Calling function etter contact er pushet i arrey. Key skaper en ny arrey som erstatter den forrige.
};

// Add Event Listener To The Form To Add Contacts (5)
form.addEventListener("submit", addContacts); //Legger en event listener på submit knappen. Legger da inn addContacts Funksjonen.

console.log(contacts);
