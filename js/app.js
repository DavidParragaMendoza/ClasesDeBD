/**
 * SQL DOCS - BASE DE DATOS 1
 * Script Principal de Interacción y Navegación
 */

document.addEventListener('DOMContentLoaded', () => {
  initClipboard();
  initScrollSpy();
  initSearch();
  initMobileMenu();
  initInsertSimulator();
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

/**
 * 5. Mini-Simulador Interactivo de INSERT (Módulo 2 - Javier Infante)
 */
function initInsertSimulator() {
  const container = document.getElementById('insertSimulatorContainer');
  if (!container) return;

  const initialData = [
    { id: 1, matricula: '2026-001', nombre: 'Javier', apellido: 'Infante', email: 'javier.infante@universidad.edu', id_carrera: 1, promedio: '9.45', activo: '1' },
    { id: 2, matricula: '2026-002', nombre: 'Carlos', apellido: 'Bernabe', email: 'carlos.bernabe@universidad.edu', id_carrera: 1, promedio: '8.90', activo: '1' },
    { id: 3, matricula: '2026-003', nombre: 'Deivy', apellido: 'Prudente', email: 'deivy.prudente@universidad.edu', id_carrera: 1, promedio: '9.15', activo: '1' }
  ];

  let students = JSON.parse(JSON.stringify(initialData));
  let nextId = 4;

  const candidatePool = [
    { nombre: 'David', apellido: 'Párraga', email: 'david.parraga@universidad.edu', promedio: '9.80' },
    { nombre: 'Elena', apellido: 'Morales', email: 'elena.morales@universidad.edu', promedio: '9.20' },
    { nombre: 'Mateo', apellido: 'Ríos', email: 'mateo.rios@universidad.edu', promedio: '8.75' },
    { nombre: 'Sofía', apellido: 'Alvarado', email: 'sofia.alvarado@universidad.edu', promedio: '9.60' },
    { nombre: 'Lucas', apellido: 'Mendoza', email: 'lucas.mendoza@universidad.edu', promedio: '8.40' }
  ];
  let poolIndex = 0;

  const queryDisplay = document.getElementById('simQueryDisplay');
  const feedbackDisplay = document.getElementById('simFeedback');
  const tableBody = document.getElementById('simTableBody');
  const rowCountBadge = document.getElementById('simRowCountBadge');

  const btnSingle = document.getElementById('simBtnSingle');
  const btnBulk = document.getElementById('simBtnBulk');
  const btnDuplicate = document.getElementById('simBtnDuplicate');
  const btnReset = document.getElementById('simBtnReset');

  function renderTable(newIds = []) {
    if (!tableBody) return;
    tableBody.innerHTML = '';

    students.forEach(st => {
      const tr = document.createElement('tr');
      if (newIds.includes(st.id)) {
        tr.classList.add('new-row-highlight');
      }

      tr.innerHTML = `
        <td><strong>#${st.id}</strong></td>
        <td><code>${st.matricula}</code></td>
        <td>${st.nombre} ${st.apellido}</td>
        <td><code>${st.email}</code></td>
        <td><span class="author-chip" style="padding: 1px 6px; font-size: 0.72rem;">ID: ${st.id_carrera}</span></td>
        <td><strong>${st.promedio}</strong></td>
        <td><span style="color: #059669; font-weight: 600;">TRUE</span></td>
      `;
      tableBody.appendChild(tr);
    });

    if (rowCountBadge) {
      rowCountBadge.textContent = `${students.length} filas`;
    }
  }

  // 1. Inserción Simple
  if (btnSingle) {
    btnSingle.addEventListener('click', () => {
      const candidate = candidatePool[poolIndex % candidatePool.length];
      poolIndex++;

      const newId = nextId++;
      const matricula = `2026-0${newId < 10 ? '0' + newId : newId}`;
      const newStudent = {
        id: newId,
        matricula: matricula,
        nombre: candidate.nombre,
        apellido: candidate.apellido,
        email: candidate.email,
        id_carrera: 1,
        promedio: candidate.promedio,
        activo: '1'
      };

      students.push(newStudent);
      renderTable([newId]);

      if (queryDisplay) {
        queryDisplay.innerHTML = `<span class="sql-kw">INSERT INTO</span> estudiantes (matricula, nombre, apellido, email, id_carrera, promedio)\n<span class="sql-kw">VALUES</span> (<span class="sql-str">'${matricula}'</span>, <span class="sql-str">'${candidate.nombre}'</span>, <span class="sql-str">'${candidate.apellido}'</span>, <span class="sql-str">'${candidate.email}'</span>, <span class="sql-num">1</span>, <span class="sql-num">${candidate.promedio}</span>);`;
      }

      if (feedbackDisplay) {
        feedbackDisplay.className = 'sim-feedback success';
        feedbackDisplay.innerHTML = `<span>✓</span> <strong>Query OK</strong>, 1 fila afectada. ID autoincremental generado: <strong>#${newId}</strong> (0.002 seg).`;
      }
    });
  }

  // 2. Inserción Masiva (Bulk Insert)
  if (btnBulk) {
    btnBulk.addEventListener('click', () => {
      const newIds = [];
      const bulkCandidates = [
        { nombre: 'Valeria', apellido: 'Guerrero', email: `valeria.${nextId}@universidad.edu`, prom: '9.30' },
        { nombre: 'Sebastián', apellido: 'Paredes', email: `sebastian.${nextId + 1}@universidad.edu`, prom: '8.85' },
        { nombre: 'Camila', apellido: 'Vargas', email: `camila.${nextId + 2}@universidad.edu`, prom: '9.50' }
      ];

      let sqlValues = [];
      bulkCandidates.forEach((c) => {
        const id = nextId++;
        newIds.push(id);
        const mat = `2026-0${id < 10 ? '0' + id : id}`;
        students.push({
          id: id,
          matricula: mat,
          nombre: c.nombre,
          apellido: c.apellido,
          email: c.email,
          id_carrera: 1,
          promedio: c.prom,
          activo: '1'
        });
        sqlValues.push(`  (<span class="sql-str">'${mat}'</span>, <span class="sql-str">'${c.nombre}'</span>, <span class="sql-str">'${c.apellido}'</span>, <span class="sql-str">'${c.email}'</span>, <span class="sql-num">1</span>, <span class="sql-num">${c.prom}</span>)`);
      });

      renderTable(newIds);

      if (queryDisplay) {
        queryDisplay.innerHTML = `<span class="sql-kw">INSERT INTO</span> estudiantes (matricula, nombre, apellido, email, id_carrera, promedio)\n<span class="sql-kw">VALUES</span>\n${sqlValues.join(',\n')};`;
      }

      if (feedbackDisplay) {
        feedbackDisplay.className = 'sim-feedback success';
        feedbackDisplay.innerHTML = `<span>✓</span> <strong>Query OK</strong>, 3 filas insertadas por lote en una sola ejecución. (Records: 3, Duplicates: 0, Warnings: 0).`;
      }
    });
  }

  // 3. Simular Error de Duplicado (Violación UNIQUE)
  if (btnDuplicate) {
    btnDuplicate.addEventListener('click', () => {
      if (queryDisplay) {
        queryDisplay.innerHTML = `<span class="sql-cmt">-- Intento de inserción con correo ya existente:</span>\n<span class="sql-kw">INSERT INTO</span> estudiantes (matricula, nombre, apellido, email, id_carrera)\n<span class="sql-kw">VALUES</span> (<span class="sql-str">'2026-999'</span>, <span class="sql-str">'Usuario'</span>, <span class="sql-str">'Duplicado'</span>, <span class="sql-str">'javier.infante@universidad.edu'</span>, <span class="sql-num">1</span>);`;
      }

      if (feedbackDisplay) {
        feedbackDisplay.className = 'sim-feedback error';
        feedbackDisplay.innerHTML = `<span>✖</span> <strong>ERROR 1062 (23000):</strong> Duplicate entry 'javier.infante@universidad.edu' for key 'estudiantes.email'. ¡Operación rechazada por el motor SQL!`;
      }
    });
  }

  // 4. Reset
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      students = JSON.parse(JSON.stringify(initialData));
      nextId = 4;
      poolIndex = 0;
      renderTable();

      if (queryDisplay) {
        queryDisplay.innerHTML = `<span class="sql-cmt">-- Estado inicial restaurado:</span>\n<span class="sql-kw">SELECT</span> * <span class="sql-kw">FROM</span> estudiantes;`;
      }

      if (feedbackDisplay) {
        feedbackDisplay.className = 'sim-feedback success';
        feedbackDisplay.innerHTML = `<span>ℹ</span> Tabla 'estudiantes' reiniciada al conjunto de datos base (3 registros).`;
      }
    });
  }

  // Render inicial
  renderTable();
}
