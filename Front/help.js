
        function toggleFAQ(button) {
            const faqItem = button.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't already active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        }
 