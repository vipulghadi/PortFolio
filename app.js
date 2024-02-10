function scrollHeader() {
    const header = document.getElementById('header');
    if (this.scrollY <= 50) header.classList.add('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

let mixerPortfolio = mixitup('.work__container', {
    selectors: {
        target: '.work__card '
    },
    animation: {
        duration: 300
    }
});

//link active work
const linkWork = document.querySelectorAll('.work__item')

function activeWork() {
    linkWork.forEach(L => L.classList.remove('active-work'))
    this.classList.add('active-work')
}

linkWork.forEach(L => L.addEventListener('click', activeWork))

// scroll section active link

const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.scrollY

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive);

// dark light theme

const themeButton = document.getElementById('theme-button');
const lightTheme = 'light-theme';
const iconTheme = 'bx-sun';

// Retrieve theme preference from local storage
const selectedTheme = localStorage.getItem('selected-theme') || 'light';
const selectedIcon = localStorage.getItem('selected-icon') || 'bx-sun';

// Set initial theme and icon based on user's preference
document.body.classList.toggle(lightTheme, selectedTheme === 'dark');
themeButton.classList.toggle(iconTheme, selectedTheme === 'light' && selectedIcon === 'bx-moon');

// Function to get the current theme
const getCurrentTheme = () => (document.body.classList.contains(lightTheme) ? 'light' : 'dark');
const getCurrentIcon = () => (themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun');

// Function to toggle theme
const toggleTheme = () => {
    document.body.classList.toggle(lightTheme);
    themeButton.classList.toggle(iconTheme);
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
};

// Event listener for theme toggle button
themeButton.addEventListener('click', toggleTheme);

document.addEventListener('DOMContentLoaded', function () {
    const changeThemeElement = document.querySelector('.change-theme');

    changeThemeElement.addEventListener('click', function () {
        this.classList.toggle('rotate');
    });
});

//scrollreveal animation 

const sr = ScrollReveal({
    origin: 'top',
    distance: '40px',
    duration: 2000,
    delay: 300,
})

sr.reveal(`.home__data`)
sr.reveal(`.nav__social, .nav__logo`, { delay: 200 })
sr.reveal(`.home__handle`, { delay: 250 })

// Contact Form

const contactForm = document.querySelector('.contact__form');
let fullNameInput = document.getElementById('name');
let emailInput = document.getElementById('email');
let messageInput = document.getElementById('message');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Check if any field is empty
  if (!fullNameInput.value || !emailInput.value || !messageInput.value) {
    alert("Please fill in all fields before submitting.");
    return; // Stop the function if any field is empty
  }

  // Validation for Name (accept only strings)
  if (!/^[a-zA-Z]+$/.test(fullNameInput.value)) {
    alert("Please enter a valid name (only letters are allowed).");
    return;
  }

  // Validation for Email (check for @ sign)
  if (!/^.+@.+\..+$/.test(emailInput.value)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Validation for Message (minimum 5 characters)
  if (messageInput.value.length < 5) {
    alert("Please enter a message with a minimum of 5 characters.");
    return;
  }

  let formData = {
    fullNameInput: fullNameInput.value,
    emailInput: emailInput.value,
    messageInput: messageInput.value,
  };

  console.log(formData);

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/");
  xhr.setRequestHeader("content-type", "application/json");
  xhr.onload = function () {
    console.log(xhr.responseText);
    if (xhr.responseText == "success") {
      alert("Message sent");
      fullNameInput.value = "";
      emailInput.value = "";
      messageInput.value = "";
    } else {
      alert("Soemthing went wrong!");
    }
  };

  xhr.send(JSON.stringify(formData));
});