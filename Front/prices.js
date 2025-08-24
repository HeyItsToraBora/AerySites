     // Exchange rates (base: USD)
        const exchangeRates = {
            USD: 1,
            EUR: 0.85,
            GBP: 0.73,
            JPY: 110,
            CAD: 1.25,
            AUD: 1.35
        };

        // Currency symbols
        const currencySymbols = {
            USD: '$',
            EUR: '€',
            GBP: '£',
            JPY: '¥',
            CAD: 'C$',
            AUD: 'A$'
        };

        // All available options (same for all plans)
        const allOptions = [
            '🌐 Option 1',
            '🔒 Option 2', 
            '💾 Option 3',
            '📧 Option 4',
            '🎨 Option 5',
            '📊 Option 6',
            '⚡ Option 7',
            '🚀 Option 8',
            '🔧 Option 9',
            '📱 Option 10',
            '🛒 Option 11',
            '☁️ Option 12',
            '🛡️ Option 13',
            '🔗 Option 14',
            '⚙️ Option 15',
            '🎯 Option 16',
            '📞 Option 17',
            '💰 Option 18',
            '👥 Option 19',
            '👑 Option 20',
            'option zee'
        ];

        // Plan definitions with feature availability
        const plans = [
            {
                name: 'Starter',
                basePrice: 19,
                includedFeatures: 4 // First 4 features included
            },
            {
                name: 'Professional',
                basePrice: 39,
                includedFeatures: 10 // First 10 features included
            },
            {
                name: 'Business',
                basePrice: 79,
                includedFeatures: 15 // First 15 features included
            },
            {
                name: 'Enterprise',
                basePrice: 149,
                includedFeatures: 20 // All features included
            }
        ];

        let currentDuration = 12;

        function calculatePrice(basePrice, duration, currency) {
            let totalPrice;

            if (duration === 'lifetime') {
                // Lifetime = flat fee (2 years worth)
                totalPrice = basePrice * 24;
            } else {
                // Ensure duration is treated as number
                const months = Number(duration);

                totalPrice = basePrice * months;

                // Apply discounts
                if (months >= 12) totalPrice *= 0.65; // 35% discount for 12+ months
                else if (months >= 6) totalPrice *= 0.75; // 25% discount for 6+ months
                else if (months >= 3) totalPrice *= 0.85; // 15% discount for 3+ months
            }

            // Convert to target currency
            totalPrice *= exchangeRates[currency];

            // Round properly
            if (currency === 'JPY') {
                return Math.round(totalPrice);
            } else {
                return Math.round(totalPrice * 100) / 100;
            }
        }



        function formatPrice(price, currency) {
            const symbol = currencySymbols[currency];
            if (currency === 'JPY') {
                return `${symbol}${price.toLocaleString()}`;
            }
            return `${symbol}${price.toFixed(2)}`;
        }

        function getDurationText(duration) {
            if (duration === 'lifetime') return 'one-time payment';
            if (duration === 1) return 'per month';
            if (duration === 12) return 'per year';
            return `per ${duration} months`;
        }

        function getSavingsText(duration) {
            if (duration >= 12) return 'Save 35%';
            if (duration >= 6) return 'Save 25%';
            if (duration >= 3) return 'Save 15%';
            return null;
        }

        function generateFeaturesList(includedFeatures) {
            let html = '';
            
            // Show all options with check/cross based on plan
            allOptions.forEach((option, index) => {
                const isIncluded = index < includedFeatures;
                const iconClass = isIncluded ? 'feature-check' : 'feature-cross';
                const icon = isIncluded ? '✓' : '×';
                const itemClass = isIncluded ? 'feature-item' : 'feature-item unavailable';
                
                html += `
                    <li class="${itemClass}">
                        <div class="feature-icon ${iconClass}">${icon}</div>
                        <span class="feature-text">${option}</span>
                    </li>
                `;
            });

            return html;
        }

        function updatePricing() {
            const currency = document.getElementById('currency').value;
            const container = document.getElementById('pricingContainer');
            let html = '';

            plans.forEach((plan, index) => {
                const price = calculatePrice(plan.basePrice, currentDuration, currency);
                const formattedPrice = formatPrice(price, currency);
                const savings = getSavingsText(currentDuration);
                
                html += `
                    <div class="pricing-card">
                        <div class="plan-header">
                            <h3 class="plan-name">${plan.name}</h3>
                            <div class="plan-price">${formattedPrice}</div>
                            <div class="plan-period">${getDurationText(currentDuration)}</div>
                            ${savings ? `<div class="plan-savings">${savings}</div>` : ''}
                        </div>
                        <ul class="features-list">
                            ${generateFeaturesList(plan.includedFeatures)}
                        </ul>
                        <button class="checkout-btn">Choose ${plan.name}</button>
                    </div>
                `;
            });

            container.innerHTML = html;
        }

// Duration tab functionality
document.querySelectorAll('.duration-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        // Remove active class from all tabs
        document.querySelectorAll('.duration-tab').forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        this.classList.add('active');
        
        // Update current duration (force correct type)
        const value = this.getAttribute('data-duration');
        currentDuration = (value === 'lifetime') ? 'lifetime' : parseInt(value, 10);
        
        // Update pricing
        updatePricing();
    });
});


        // Initialize pricing on page load
        updatePricing();

        // Auto-update when currency changes
        document.getElementById('currency').addEventListener('change', updatePricing);
    