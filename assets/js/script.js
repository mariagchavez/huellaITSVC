// Control del sidebar en móviles
        document.addEventListener('DOMContentLoaded', function() {
            const toggler = document.querySelector('.sidebar-toggler');
            const sidebar = document.querySelector('.sidebar');
            
            toggler.addEventListener('click', function() {
                sidebar.classList.toggle('active');
            });
            
            // Cerrar sidebar al hacer clic fuera (opcional)
            document.addEventListener('click', function(e) {
                if (window.innerWidth <= 768 && 
                    !sidebar.contains(e.target) && 
                    e.target !== toggler) {
                    sidebar.classList.remove('active');
                }
            });
        });