document.addEventListener('DOMContentLoaded', function () {
    const mealForm = document.getElementById('meal-form');
    const mealInput = document.getElementById('meal-input');
    const resultDiv = document.getElementById('result');
    const charCount = document.getElementById('char-count');

    // Character counter
    mealInput.addEventListener('input', function () {
        charCount.textContent = this.value.length;

        if (this.value.length > 500) {
            this.value = this.value.substring(0, 500);
            charCount.textContent = 500;
        }
    });

    // Form submission with API call
    mealForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const parentId = localStorage.getItem('userID');
        const meals = mealInput.value.trim();

        if (!meals) {
            showResult('Please enter your meal recommendations', false);
            return;
        }

        try {
            showResult('Submitting your meal plan...', true);

            const API_URL = 'https://kerols77-nutrition.hf.space/process';

            // ✅ Build form data
            const formData = new FormData();
            formData.append('parentId', parentId);
            formData.append('description', meals);
            

            const response = await fetch(API_URL, {
                method: 'POST',
                body: formData
                // ✅ DO NOT manually set Content-Type — browser does it automatically for FormData
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            const successMessage = data.message || 'Your meal plan was submitted successfully!';
            showResult(successMessage, true, meals);

        } catch (error) {
            console.error('Error submitting meal plan:', error);
            showResult(`Failed to submit: ${error.message}`, false);
        } finally {
            mealInput.value = '';
            charCount.textContent = '0';
        }
    });

    // Helper function to show results
    function showResult(message, isSuccess, submittedContent = '') {
        const icon = isSuccess ? 'fa-check-circle' : 'fa-exclamation-circle';
        const iconColor = isSuccess ? '#38b000' : '#ff006e';

        let content = `
            <div class="success-message">
                <i class="fas ${icon}" style="color: ${iconColor}"></i>
                <h3>${isSuccess ? 'Success!' : 'Error'}</h3>
                <p>${message}</p>
        `;

        if (submittedContent) {
            content += `
                <div class="submitted-content">
                    <p><strong>You shared:</strong></p>
                    <pre>${submittedContent}</pre>
                </div>
            `;
        }

        content += `</div>`;

        resultDiv.innerHTML = content;
        resultDiv.style.display = 'block';

        // Hide after 8 seconds
        setTimeout(() => {
            resultDiv.style.display = 'none';
        }, 8000);
    }
});


// Toggle sidebar function
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('closed');

    // Save state to localStorage
    localStorage.setItem('sidebarClosed', sidebar.classList.contains('closed'));
}

// Logout functionality
document.getElementById('logout-btn').addEventListener('click', function (e) {
    e.preventDefault();

    // Add your logout logic here
    // For example, redirect to home page:
    window.location.href = '../../index.html'; // Change to your home page URL

    // If you need to clear session/local storage:
    // localStorage.clear();
    // sessionStorage.clear();
});







