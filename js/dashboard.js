// Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true
        });
    }

    // Sidebar Toggle
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');

    const openSidebar = () => {
        if (window.innerWidth <= 991) {
            sidebar.classList.add('show');
            sidebar.classList.remove('collapsed');
        } else {
            sidebar.classList.toggle('collapsed', false);
        }
        mainContent.classList.add('expanded');
    };

    const closeSidebar = () => {
        if (window.innerWidth <= 991) {
            sidebar.classList.remove('show');
        } else {
            sidebar.classList.add('collapsed');
        }
        mainContent.classList.remove('expanded');
    };

    const toggleSidebar = () => {
        if (window.innerWidth <= 991) {
            if (sidebar.classList.contains('show')) {
                closeSidebar();
            } else {
                openSidebar();
            }
        } else {
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('expanded');
        }
    };

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function() {
            toggleSidebar();
        });
    }

    // Close sidebar on mobile when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 991) {
            if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                closeSidebar();
            }
        }
    });

    // Sidebar Navigation
    const navItems = document.querySelectorAll('.sidebar .nav-item[data-section]');
    const contentSections = document.querySelectorAll('.content-section');

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const sectionId = this.getAttribute('data-section');
            
            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Hide all sections
            contentSections.forEach(section => section.classList.remove('active'));
            
            // Show target section
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.add('active');
                
                // Scroll to top of content area
                const contentArea = document.querySelector('.content-area');
                if (contentArea) {
                    contentArea.scrollTop = 0;
                }

                // Close sidebar on mobile after selection
                if (window.innerWidth <= 991) {
                    closeSidebar();
                }
            }
        });
    });

    // Handle hash navigation on page load
    const hash = window.location.hash;
    if (hash) {
        const sectionId = hash.substring(1);
        const navItem = document.querySelector(`.nav-item[data-section="${sectionId}"]`);
        if (navItem) {
            navItem.click();
        }
    }

    // Update hash when section changes
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            history.pushState(null, null, `#${sectionId}`);
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                const searchTerm = this.value.toLowerCase();
                console.log('Searching for:', searchTerm);
                // Add your search logic here
            }, 300);
        });
    }

    // Notification button
    const notificationBtns = document.querySelectorAll('.topbar-btn');
    notificationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const badge = this.querySelector('.badge');
            if (badge) {
                badge.style.display = 'none';
            }
        });
    });

    // Task checkboxes
    const taskCheckboxes = document.querySelectorAll('.task-item .form-check-input');
    taskCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const label = this.nextElementSibling;
            if (this.checked) {
                label.style.textDecoration = 'line-through';
                label.style.opacity = '0.6';
            } else {
                label.style.textDecoration = 'none';
                label.style.opacity = '1';
            }
        });
    });

    // Progress bar animations
    const progressBars = document.querySelectorAll('.progress-bar');
    const animateProgressBars = () => {
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.transition = 'width 1s ease-in-out';
                bar.style.width = width;
            }, 100);
        });
    };

    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
                progressObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => {
        if (bar.closest('.content-section.active')) {
            progressObserver.observe(bar);
        }
    });

    // Chart placeholder animations
    const chartIcons = document.querySelectorAll('.chart-placeholder i');
    chartIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(10deg)';
            this.style.transition = 'all 0.3s ease';
        });
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // File upload simulation
    const uploadButtons = document.querySelectorAll('[onclick*="upload"]');
    uploadButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.getAttribute('onclick').includes('404.html')) {
                return;
            }
            e.preventDefault();
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.multiple = true;
            fileInput.addEventListener('change', function() {
                if (this.files.length > 0) {
                    showToast('Files uploaded successfully!', 'success');
                }
            });
            fileInput.click();
        });
    });

    // Download buttons
    const downloadButtons = document.querySelectorAll('[onclick*="download"], .btn:has(i.fa-download)');
    downloadButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (!this.getAttribute('onclick') || !this.getAttribute('onclick').includes('404.html')) {
                showToast('Download started...', 'info');
            }
        });
    });

    // Table row hover effect
    const tableRows = document.querySelectorAll('.table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.01)';
            this.style.transition = 'all 0.2s ease';
        });
        row.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Stat card animations
    const statCards = document.querySelectorAll('.stat-card');
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.5s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    statCards.forEach(card => statObserver.observe(card));

    // Real-time clock (optional)
    const updateClock = () => {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        const clockElement = document.querySelector('.current-time');
        if (clockElement) {
            clockElement.textContent = timeString;
        }
    };
    
    setInterval(updateClock, 1000);
    updateClock();

    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
                showToast('Please fill in all required fields', 'warning');
            }
            form.classList.add('was-validated');
        });
    });

    // Auto-save functionality (simulation)
    let autoSaveTimeout;
    const autoSaveInputs = document.querySelectorAll('input, textarea, select');
    autoSaveInputs.forEach(input => {
        input.addEventListener('input', function() {
            clearTimeout(autoSaveTimeout);
            autoSaveTimeout = setTimeout(() => {
                console.log('Auto-saving...', this.name, this.value);
                // Add your auto-save logic here
            }, 2000);
        });
    });

    // Responsive table wrapper
    const tables = document.querySelectorAll('.table');
    tables.forEach(table => {
        if (!table.closest('.table-responsive')) {
            const wrapper = document.createElement('div');
            wrapper.className = 'table-responsive';
            table.parentNode.insertBefore(wrapper, table);
            wrapper.appendChild(table);
        }
    });

    // User profile dropdown (if implemented)
    const userProfile = document.querySelector('.user-profile');
    if (userProfile) {
        userProfile.addEventListener('click', function() {
            // Toggle profile dropdown menu
            console.log('User profile clicked');
        });
    }

    console.log('Dashboard initialized successfully');
});

// Utility function for toast notifications
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `alert alert-${type} dashboard-toast`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'} me-2"></i>
        ${message}
    `;
    toast.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        animation: slideInRight 0.5s ease;
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);