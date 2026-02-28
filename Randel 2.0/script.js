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
    if (winners.length > 1) {
        message =
            'You have tied interests: ' +
            winners.join(', ') +
            '. Explore those fields!';
    } else {
        switch (winners[0]) {
            case 'A':
                message =
                    'Suggested fields: Engineering, IT, Computer Science, Architecture, Pure Sciences';
                break;
            case 'B':
                message =
                    'Suggested fields: Psychology, Education, Nursing, Law, Social Work';
                break;
            case 'C':
                message =
                    'Suggested fields: Business Admin, Accountancy, Marketing, Hospitality Management';
                break;
            case 'D':
                message =
                    'Suggested fields: Fine Arts, Multimedia Arts, Communication, Fashion Design';
                break;
        }
    }

    document.getElementById('result').textContent = message;
}
