// Selecting Elements from HTML (1)
const form = document.querySelector(".contact-app__form");
const firstnameInput = form.querySelector("[name='firstname']"); // Bruker name til å hente element, siden den ikke har spesifikk classname
const lastnameInput = form.querySelector("[name='lastname']");
const phoneInput = form.querySelector("[name='phone-number']");
const addressInput = form.querySelector("[name='address']");
const submitButton = form.querySelector(".form__sumbmit-button");
const contactList = document.querySelector(".contacts__list"); // (14)
const searchInput = document.querySelector(".search__input"); // (24)
const searchOption = document.querySelector(".search__filter"); // (26)

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
let editContactId = null; // (31)

// Rendering COM when the page first loaded (18)
document.addEventListener("DOMContentLoaded", () => renderContacts(contacts));

// Adding Users Function (3)
const addContacts = (e) => {
  e.preventDefault();
  const contact = {
    // Create contacts (make an object)
    id: editContactId || Date.now(), // Adding an unique identifier // (35)
    contactFirstname: firstnameInput.value, // Creating an object that collects data from the form in HTML
    contactLastname: lastnameInput.value,
    contactPhonenumber: phoneInput.value,
    contactAddress: addressInput.value,
    // Etter dette må man decleare en tom array for å lagre informasjonen i ^
  };

  if (editContactId) {
    // (36)
    const contactIndex = contacts.findIndex(
      (contact) => contact.id === editContactId
    ); // Bruker method findIndex for å finne index og ikke verdi som vi fant tidligere
    if (contactIndex !== -1) {
      contacts[contactIndex] = contact;
    }
    editContactId = null; // (38)
  } else {
    // Dersom du ikke vil redigere, men skap en kontakt. Pushe kontakten inn i arrey. (37)
    contacts.push(contact);
  }

  contacts.push(contact); // Contact er det man dytter inn i den tomme arreyen contacts som vi lage over. Legger seg sist i arrayen. Trenger nå en event listener. Legges lenger ned på siden.
  storeContacts(contacts); // Calling function after push, contacts er argument (8)
  renderContacts(contacts); // (17)
  console.log(contacts); // Logge for å sjekke at det logges ulike brukere i array (6)
};

// Store Contacts in Local Storage Function (7)
const storeContacts = (contactsArrey) => {
  // Legger tom arrey som parameter i funksjonen, for at funksjonen skal vite hva den skal lagre.
  localStorage.setItem("contacts", JSON.stringify(contactsArrey)); // Key er contacts, value er JSON og stringify er method gjør det om til string, contactsArrey er det som skal gjøres om til string. Calling function etter contact er pushet i arrey. Key skaper en ny arrey som erstatter den forrige.
};

// Function for deleting contacts from the list (22)
const deleteContacts = (id) => {
  // Legger id inn i parentes her, fordi det er den vi har brukt som argument i punkt 21, der vi la på event listener på knappen for å slette
  const contacts = JSON.parse(localStorage.getItem("contacts")); // Alt man får fra local storage er JSON, så må konvertere til string.
  const remainingContacts = contacts.filter((contact) => contact.id !== id); // Lager en ny arrey som lagrer alle kontaktene som IKKE er slettet, slik at vi aldri erstatter den originale. Bruker filter som metode fordi den itererer over arrey, og muterer ikke orginalen. Ønsker en arrey som ikke !== inneholder id som ble slettet i funksjoneen på linjen over, som heter deletecContacts. (23).
  storeContacts(remainingContacts); // Må calle fumksjonen for å få den nye arreyen som ikke har elementet som ble slettet. Da er local storage oppdatert. (24).
  renderContacts(remainingContacts); // Oppdatere DOM
  form.reset(); // Reset the form (31)
};

// Function for editing contacts
const editContacts = (e, id) => {
  const contactToEdit = contacts.find((contact) => contact.id === id); // Loope gjennom kontakter, bruker metode som heter find (30)
  const contactRow = e.target.closest(".contacts-item"); // (34). Closest method søker den nærmeste elementet som har denne classen, lagrer den i denne variabelen.
  if (contactToEdit) {
    // Vil kunne redigere form når man klikker på edit
    firstnameInput.value = contactToEdit.contactFirstname;
    lastnameInput.value = contactToEdit.contactLastname;
    phoneInput.value = contactToEdit.contactPhonenumber;
    addressInput.value = contactToEdit.contactAddress;

    editContactId = id; // (32)
    submitButton.textContent = "Update Contact"; // (33) Endre innholdet i knappen submit når man har trykket på rediger
    contactRow.style.backgroundColor = "#FFFED3";
  } else {
    submitButton.textContent = "Add Contact";
    contactRow.style.backgroundColor = "#FFFED3";
  }
};

// Render Contacts on Page Function (10)
const renderContacts = (contactsArrey) => {
  // Må gi funksjonen tilgang til arrey med contacts. Legger som parameter.
  contactList.textContent = ""; // (19) Tømmer container så den ikke rendres to ganger
  contactsArrey.forEach((contact, index) => {
    // Må lage en separat row for hver kontakt (vet ikke hvor mange. Gjør dette med en for each loop)(11)
    // Creating elements for li til hver kontakt (12)
    const contactItem = document.createElement("li"); // Selve kontakten som en li
    const contactListNumber = document.createElement("span"); // Nummer på kontakt
    const contactFullname = document.createElement("span"); // Fullt navn
    const contactPhonenumber = document.createElement("span"); // Telefonnummer
    const contactAddress = document.createElement("span"); // Addresse
    const contactTools = document.createElement("span"); // Tools
    const deleteButton = document.createElement("button"); // Knapp for å slette
    const editButton = document.createElement("button"); // Knapp for å redigere

    // Append Elements (13) Selected først elementet øverst (se 14)
    contactList.append(contactItem);
    contactItem.append(
      contactListNumber,
      contactFullname,
      contactPhonenumber,
      contactAddress,
      contactTools
    );

    // Appending contact tools (15)
    contactTools.append(deleteButton, editButton);

    // Insert Content Into Elements (16)
    contactListNumber.textContent = `${index + 1}`; // Adding index number of this contact. Rekkefølgen bør bli beholdt selv om man fjerner en. Første kolonne.
    contactFullname.textContent = `${contact.contactFirstname} ${contact.contactLastname}`; // Viser fornavn og etternavn sammen i kollonnen som har fullt navn
    contactPhonenumber.textContent = contact.contactPhonenumber; // Kolonne for telefonnummer
    contactAddress.textContent = contact.contactAddress; // Kolonne for addresse ( i header )
    deleteButton.innerHTML = "<i class= 'fa-solid fa-trash-can'></i>"; // (21) Legge til ikoner. Endre fra textContent til innerHTML.
    editButton.innerHTML = "<i class= 'fa-solid fa-pencil'></i>";
    // Neste steg er å calle function. Hvor gjør man dette? Add contacts er den funksjonen som gjøres. Må rendre inne i add contacts funksjonen. Se punkt 17.

    // Adding Class to Elements (laget classnames i css) (20)
    contactItem.classList.add("contacts-item");
    contactListNumber.classList.add("contacts-item__list-number");
    contactFullname.classList.add("contacts-item__fullname");
    contactPhonenumber.classList.add("contacts-item__phone");
    contactAddress.classList.add("contacts-item__address");
    contactTools.classList.add("contacts-item__controls");

    // Add Event Listeners to Delete and Edit Buttons (21)
    deleteButton.addEventListener("click", () => deleteContacts(contact.id));
    editButton.addEventListener("click", (e) => editContacts(e, contact.id)); // (39) Add event listener
  });
};

// Add Event Listener To The Form To Add Contacts (5)
form.addEventListener("submit", addContacts); //Legger en event listener på submit knappen. Legger da inn addContacts Funksjonen.

// Add event listeners to help the search functionality (24). Selected også elementet search__input øverst (24).
searchInput.addEventListener("input", (e) => {
  // Elementet er input, e er for event.
  const searchQuery = e.target.value.toLowerCase(); // Creating a variable for the search (25).
  const searchOptionValue = searchOption.value; // Creating a variable for the select elememt options, selecter også dette elementet øverst (26).
  //   console.log(searchOptionValue); // Logger for å sjekke at console i chrome viser hvilket filter man søker i når man skriver i søkefeltet og har valgt en option fra select elementet.
  filteredArrey = contacts.filter((contact) => {
    // Creating a new arrey (27)
    if (searchOptionValue === "firstname") {
      // Basert på den som vises som aktiv, kan man begynne å filtrere (28)
      return contact.contactFirstname.toLowerCase().startsWith(searchQuery); // Søket skjer dersom search element har firstname selected. Trenger else if dersom man har valgt last name eller noe annet filter.
    } else if (searchOptionValue === "lastname") {
      return contact.contactLastname.toLowerCase().startsWith(searchQuery);
    } else if (searchOptionValue === "phone-number") {
      return contact.contactPhonenumber.toLowerCase().startsWith(searchQuery);
    } else {
      return;
    }
  });
  renderContacts(filteredArrey); // Render (29). Dette gjør at den kun viser de kontaktene som starter på det man skriver inn, i den kategorien man har valgt i options i select.
});
