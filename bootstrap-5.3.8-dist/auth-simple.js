// Упрощенная система аутентификации - всегда авторизован
class SimpleAuth {
    constructor() {
        this.currentUser = {
            id: 1,
            firstName: 'Иван',
            lastName: 'Петров',
            email: 'user@example.com',
            phone: '+7 (999) 123-45-67',
            city: 'Москва'
        };
        this.init();
    }

    init() {
        this.updateUI();
    }

    // Вход пользователя (всегда успешен)
    login(email, password) {
        // Просто обновляем интерфейс
        this.updateUI();
        return this.currentUser;
    }

    // Выход пользователя
    logout() {
        if (confirm('Вы уверены, что хотите выйти?')) {
            // Просто перезагружаем страницу
            window.location.reload();
        }
    }

    // Проверка, авторизован ли пользователь (всегда true)
    isAuthenticated() {
        return true;
    }

    // Получение текущего пользователя
    getCurrentUser() {
        return this.currentUser;
    }

    // Обновление интерфейса
    updateUI() {
        const guestButtons = document.getElementById('guestButtons');
        const userButtons = document.getElementById('userButtons');

        // Всегда показываем кнопки для авторизованного пользователя
        if (guestButtons) guestButtons.style.display = 'none';
        if (userButtons) userButtons.style.display = 'flex';
    }
}

// Создаем глобальный экземпляр системы аутентификации
window.simpleAuth = new SimpleAuth();

// Глобальная функция для выхода
window.logout = function() {
    window.simpleAuth.logout();
}