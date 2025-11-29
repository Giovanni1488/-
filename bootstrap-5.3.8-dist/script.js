// Анимация счетчиков статистики
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounters(), 1);
        } else {
            counter.innerText = target;
        }
    });
}

// Запуск анимации при скролле до секции
function startCountersWhenVisible() {
    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;
    
    const sectionPosition = statsSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (sectionPosition < screenPosition) {
        animateCounters();
        window.removeEventListener('scroll', startCountersWhenVisible);
    }
}

// Обработка модального окна
function setupModal() {
    const addPetModal = document.getElementById('addPetModal');
    if (addPetModal) {
        // Очистка формы при закрытии модального окна
        addPetModal.addEventListener('hidden.bs.modal', function () {
            const form = this.querySelector('form');
            if (form) {
                form.reset();
            }
        });

        // Обработка отправки формы
        const submitBtn = addPetModal.querySelector('.btn-primary');
        if (submitBtn) {
            submitBtn.addEventListener('click', function() {
                const form = addPetModal.querySelector('form');
                if (form.checkValidity()) {
                    // Здесь будет логика отправки формы
                    alert('Объявление добавлено! В реальном приложении здесь будет AJAX запрос.');
                    const modal = bootstrap.Modal.getInstance(addPetModal);
                    modal.hide();
                } else {
                    form.reportValidity();
                }
            });
        }
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Запуск счетчиков при скролле
    window.addEventListener('scroll', startCountersWhenVisible);

    // Плавная прокрутка для навигационных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Обработка форм
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Здесь можно добавить обработку формы
            console.log('Форма отправлена');
        });
    });

    // Настройка модального окна
    setupModal();

    // Добавление класса анимации для счетчиков
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(number => {
        number.classList.add('animated');
    });
});

// Фильтрация питомцев (для страниц найденных/потерянных)
function filterPets() {
    const typeFilter = document.getElementById('typeFilter')?.value || 'all';
    const statusFilter = document.getElementById('statusFilter')?.value || 'all';
    const locationFilter = document.getElementById('locationFilter')?.value || 'all';
    
    const pets = document.querySelectorAll('.pet-card');
    
    pets.forEach(pet => {
        const petType = pet.getAttribute('data-type') || 'all';
        const petStatus = pet.getAttribute('data-status') || 'all';
        const petLocation = pet.getAttribute('data-location') || 'all';
        
        const typeMatch = typeFilter === 'all' || petType === typeFilter;
        const statusMatch = statusFilter === 'all' || petStatus === statusFilter;
        const locationMatch = locationFilter === 'all' || petLocation === locationFilter;
        
        if (typeMatch && statusMatch && locationMatch) {
            pet.style.display = 'block';
        } else {
            pet.style.display = 'none';
        }
    });
}