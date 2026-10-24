/**
 * SQL DOCS - BASE DE DATOS 1
 * Script Principal de Interacción y Navegación
 */

document.addEventListener('DOMContentLoaded', () => {
  initClipboard();
  initScrollSpy();
  initSearch();
  initMobileMenu();
});

/**
 * 1. Funcionalidad de Copiar Código al Portapapeles
 */
function initClipboard() {
  const copyButtons = document.querySelectorAll('.copy-btn');

  copyButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const codeBlock = button.closest('.code-block');
      if (!codeBlock) return;

      const codeElement = codeBlock.querySelector('code');
      if (!codeElement) return;

      const codeText = codeElement.innerText;

      try {
        await navigator.clipboard.writeText(codeText);
        
        // Feedback visual
        const originalText = button.innerHTML;
        button.classList.add('copied');
        button.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          ¡Copiado!
        `;

        setTimeout(() => {
          button.classList.remove('copied');
          button.innerHTML = originalText;
        }, 2000);
      } catch (err) {
        console.error('Error al copiar al portapapeles:', err);
      }
    });
  });
}

/**
 * 2. Scroll Spy para la Tabla de Contenidos ("En esta página")
 */
function initScrollSpy() {
  const headings = Array.from(document.querySelectorAll('.content-area h2[id], .content-area h3[id]'));
  const tocLinks = document.querySelectorAll('.toc-link');

  if (!headings.length || !tocLinks.length) return;

  function updateActiveLink() {
    const scrollY = window.scrollY;
    let currentId = '';

    headings.forEach(heading => {
      const top = heading.offsetTop - 120;
      if (scrollY >= top) {
        currentId = heading.getAttribute('id');
      }
    });

    tocLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${currentId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
}

/**
 * 3. Buscador Instantáneo en la Documentación
 */
function initSearch() {
  const searchInput = document.getElementById('docSearchInput');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    const searchableSections = document.querySelectorAll('.doc-section');

    if (!query) {
      searchableSections.forEach(section => {
        section.style.display = '';
      });
      return;
    }

    searchableSections.forEach(section => {
      const text = section.innerText.toLowerCase();
      if (text.includes(query)) {
        section.style.display = '';
      } else {
        section.style.display = 'none';
      }
    });
  });
}

/**
 * 4. Control del Menú Móvil Lateral
 */
function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.querySelector('.sidebar');

  if (!menuToggle || !sidebar) return;

  menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });

  // Cerrar al hacer clic en un enlace de navegación
  const navLinks = sidebar.querySelectorAll('.sidebar-nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 860) {
        sidebar.classList.remove('open');
      }
    });
  });
}
