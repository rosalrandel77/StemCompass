// Animate sections when they scroll into view
const sections = document.querySelectorAll('.page-section');

function onScroll() {
    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
            section.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', onScroll);
window.addEventListener('load', onScroll);

function toggleMenu() {
    const nav = document.querySelector('header nav');
    nav.classList.toggle('active');
}

document.addEventListener('click', function(e) {
    const nav = document.querySelector('header nav');
    const hamburger = document.querySelector('.hamburger');

    if (window.innerWidth <= 768) {
        if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
            nav.classList.remove('active');
        }
    }
});

// Quiz logic
function gradeQuiz() {
    const form = document.getElementById('stemQuiz');
    const formData = new FormData(form);

    // Expect answers for questions 1 through 10
    const totals = {A: 0, B: 0, C: 0, D: 0};

    for (let i = 1; i <= 10; i++) {
        const val = formData.get('q' + i);
        if (!val) {
            document.getElementById('result').textContent =
                'Please answer all questions.';
            return;
        }
        if (totals.hasOwnProperty(val)) {
            totals[val]++;
        }
    }

    let maxCount = 0;
    let winners = [];
    for (const key in totals) {
        if (totals[key] > maxCount) {
            maxCount = totals[key];
            winners = [key];
        } else if (totals[key] === maxCount) {
            winners.push(key);
        }
    }

let message = '';

const suggestions = {
    A: 'Engineering, IT, Computer Science, Architecture, Pure Sciences',
    B: 'Psychology, Education, Nursing, Law, Social Work',
    C: 'Business Admin, Accountancy, Marketing, Hospitality Management',
    D: 'Fine Arts, Multimedia Arts, Communication, Fashion Design'
};

if (winners.length > 1) {
    message = 'You have multiple strong interests:<br><br>';

    winners.forEach(letter => {
        message += `<strong>${letter}:</strong> Suggested fields: ${suggestions[letter]}<br><br>`;
    });

} else {
    const win = winners[0];
    message = `Suggested fields: ${suggestions[win]}`;
}

document.getElementById('result').innerHTML = message;
}


/* COURSE CARD CLICK SYSTEM */

const cards = document.querySelectorAll(".card");
const modal = document.getElementById("courseModal");
const closeBtn = document.querySelector(".close-btn");

cards.forEach(card => {

card.addEventListener("click", () => {

document.getElementById("modalTitle").innerText = card.dataset.title;

document.getElementById("modalDesc").innerText = card.dataset.about;

document.getElementById("modalJob").innerText = card.dataset.desc;

document.getElementById("modalSalaryEntry").innerText = card.dataset.salaryEntry;

document.getElementById("modalSalaryExp").innerText = card.dataset.salaryExp;

document.getElementById("modalWork").innerText = card.dataset.workplaces;

document.getElementById("modalTraits").innerText = card.dataset.traits;

modal.style.display = "flex";

});

});

closeBtn.onclick = function(){
modal.style.display = "none";
}

window.onclick = function(event){
if(event.target == modal){
modal.style.display = "none";
}
}