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

// toggle hamburger menu
function toggleMenu() {
    const nav = document.querySelector('header nav');
    nav.classList.toggle('collapsed');
}

// close menu when clicking outside (optional)
document.addEventListener('click', function(e) {
    const nav = document.querySelector('header nav');
    const hamburger = document.querySelector('.hamburger');
    if (hamburger && !hamburger.contains(e.target) && !nav.contains(e.target)) {
        nav.classList.add('collapsed');
    }
});

// Quiz logic
function gradeQuiz() {
    const answers = [
        document.querySelector('input[name="q1"]:checked'),
        document.querySelector('input[name="q2"]:checked'),
        document.querySelector('input[name="q3"]:checked'),
    ];

    if (answers.some((a) => a === null)) {
        document.getElementById('result').textContent =
            'Please answer all questions.';
        return;
    }

    let score = 0;
    answers.forEach((a) => {
        if (a.value === 'yes') score += 1;
    });

    let message;
    if (score >= 2) {
        message = 'You seem to have a strong interest in STEM!';
    } else {
        message = 'STEM might not be your top choice, but explore what you like!';
    }
    document.getElementById('result').textContent = message;
}
