/**
 * Programacion Orientada a Objetos - Roadmap Gamificado
 * CORHUILA - Ingenieria de Sistemas - III Semestre
 * Metodologia: Tradicional (Clase + Trabajo Autonomo)
 */

// ===== DATOS DEL CURSO =====
const COURSE_DATA = {
    name: "Programacion Orientada a Objetos",
    totalWeeks: 15,
    methodology: "tradicional",
    cortes: [
        { id: 1, name: "Primer Corte", weeks: [1, 2, 3, 4, 5], percentage: 30, fase: "Fundamentos POO y Python" },
        { id: 2, name: "Segundo Corte", weeks: [6, 7, 8, 9, 10], percentage: 30, fase: "Principios de Diseno y Modularidad" },
        { id: 3, name: "Tercer Corte", weeks: [11, 12, 13, 14, 15], percentage: 40, fase: "Aplicacion Practica de POO" }
    ],
    weeks: [
        {
            num: 1,
            title: "Introduccion a la POO",
            topic: "Entorno de trabajo en Python",
            type: "normal",
            content: {
                clase: "Presentacion del curso, entorno de desarrollo (IDLE, VSCode, Jupyter). Introduccion al paradigma orientado a objetos.",
                autonomo: "Foro: ¿Como transforma la POO la forma de programar?"
            },
            tags: ["Python", "IDLE", "VSCode", "Jupyter"],
            activity: "foro"
        },
        {
            num: 2,
            title: "Clases y Objetos",
            topic: "Creacion de clases y objetos en Python",
            type: "normal",
            content: {
                clase: "Creacion de clases y objetos, sintaxis basica, ejemplos practicos de modelado.",
                autonomo: "Ejercicios de definicion de clases y objetos"
            },
            tags: ["class", "object", "__init__"],
            activity: "taller"
        },
        {
            num: 3,
            title: "Atributos y Metodos",
            topic: "Encapsulamiento en Python",
            type: "normal",
            content: {
                clase: "Practica con atributos publicos, protegidos y privados. Metodos de instancia y de clase.",
                autonomo: "Taller: Diseno de clases con metodos y atributos bien encapsulados"
            },
            tags: ["Encapsulamiento", "Atributos", "Metodos"],
            activity: "taller"
        },
        {
            num: 4,
            title: "Constructores y Representacion",
            topic: "Metodos especiales en Python",
            type: "normal",
            content: {
                clase: "Uso de __init__, __str__, __repr__ en clases. Metodos magicos y su utilidad.",
                autonomo: "Quiz: Sintaxis de clases y constructores en Python"
            },
            tags: ["__init__", "__str__", "__repr__"],
            activity: "quiz"
        },
        {
            num: 5,
            title: "Evaluacion Corte 1",
            topic: "Parcial - Fundamentos de POO",
            type: "parcial",
            content: {
                clase: "Parcial Corte 1: Evaluacion de conceptos fundamentales de POO en Python.",
                autonomo: "Retroalimentacion y correccion del parcial"
            },
            tags: ["Parcial", "Evaluacion"],
            activity: "parcial"
        },
        {
            num: 6,
            title: "Herencia en Python",
            topic: "Herencia simple y uso de super()",
            type: "normal",
            content: {
                clase: "Herencia simple, uso de super(), extension de clases base.",
                autonomo: "Foro: ¿Que problemas resuelve la herencia?"
            },
            tags: ["Herencia", "super()", "extends"],
            activity: "foro"
        },
        {
            num: 7,
            title: "Polimorfismo",
            topic: "Polimorfismo dinamico en Python",
            type: "normal",
            content: {
                clase: "Ejercicios practicos de polimorfismo dinamico. Sobrescritura de metodos.",
                autonomo: "Desarrollo de funciones con comportamiento polimorfico"
            },
            tags: ["Polimorfismo", "Override", "Duck Typing"],
            activity: "taller"
        },
        {
            num: 8,
            title: "Clases Abstractas",
            topic: "Uso del modulo abc",
            type: "normal",
            content: {
                clase: "Clases abstractas con ABC. Metodos abstractos y su implementacion.",
                autonomo: "Taller: Modelar jerarquia con clases abstractas y concretas"
            },
            tags: ["ABC", "abstractmethod", "Interfaces"],
            activity: "taller"
        },
        {
            num: 9,
            title: "Composicion y Modularizacion",
            topic: "Relacion de objetos y diseno por componentes",
            type: "normal",
            content: {
                clase: "Relacion de objetos, composicion vs herencia. Diseno orientado a componentes.",
                autonomo: "Quiz: Diferencias entre herencia y composicion"
            },
            tags: ["Composicion", "Agregacion", "Modulos"],
            activity: "quiz"
        },
        {
            num: 10,
            title: "Evaluacion Corte 2",
            topic: "Parcial - Principios de Diseno",
            type: "parcial",
            content: {
                clase: "Parcial Corte 2: Herencia, polimorfismo, abstraccion y composicion.",
                autonomo: "Desarrollo del parcial y retroalimentacion"
            },
            tags: ["Parcial", "Evaluacion"],
            activity: "parcial"
        },
        {
            num: 11,
            title: "Manejo de Errores",
            topic: "Excepciones en Python",
            type: "normal",
            content: {
                clase: "Uso de try, except, raise, finally. Excepciones personalizadas.",
                autonomo: "Foro: ¿Por que es clave capturar excepciones correctamente?"
            },
            tags: ["try", "except", "raise", "finally"],
            activity: "foro"
        },
        {
            num: 12,
            title: "Colecciones y Estructuras",
            topic: "Estructuras de datos con POO",
            type: "normal",
            content: {
                clase: "Listas, diccionarios, conjuntos y tuplas en contexto de POO.",
                autonomo: "Implementar inventario basico usando diccionarios en clases"
            },
            tags: ["list", "dict", "set", "tuple"],
            activity: "taller"
        },
        {
            num: 13,
            title: "Archivos y Persistencia",
            topic: "Lectura y escritura de archivos con objetos",
            type: "normal",
            content: {
                clase: "Taller con archivos .txt y .csv. Serializacion de objetos.",
                autonomo: "Taller: Crear y guardar objetos en archivos de texto"
            },
            tags: ["open", "read", "write", "csv"],
            activity: "taller"
        },
        {
            num: 14,
            title: "Buenas Practicas",
            topic: "PEP8 y Refactorizacion",
            type: "normal",
            content: {
                clase: "Revision de codigo y uso de pylint, black, flake8. Principios SOLID basicos.",
                autonomo: "Quiz: Identificacion de errores comunes de estilo y refactorizacion"
            },
            tags: ["PEP8", "pylint", "black", "SOLID"],
            activity: "quiz"
        },
        {
            num: 15,
            title: "Evaluacion Corte 3",
            topic: "Parcial Final y Proyecto",
            type: "parcial",
            content: {
                clase: "Parcial Corte 3: Aplicacion practica de POO, manejo de archivos y buenas practicas.",
                autonomo: "Desarrollo del parcial y retroalimentacion final"
            },
            tags: ["Parcial", "Proyecto", "Evaluacion"],
            activity: "parcial"
        }
    ],
    badges: [
        { id: "starter", icon: "🚀", name: "Iniciador", desc: "Primer paso en POO", requirement: 1 },
        { id: "class-creator", icon: "📦", name: "Class Creator", desc: "Dominaste clases y objetos", requirement: 3 },
        { id: "encapsulator", icon: "🔐", name: "Encapsulator", desc: "Completaste encapsulamiento", requirement: 5 },
        { id: "inheritor", icon: "🧬", name: "Inheritor", desc: "Dominaste la herencia", requirement: 7 },
        { id: "polymorphic", icon: "🎭", name: "Polymorphic", desc: "Completaste polimorfismo", requirement: 10 },
        { id: "oop-master", icon: "🐍", name: "POO Master", desc: "¡Dominaste la POO!", requirement: 15 }
    ]
};

// ===== ESTADO DE LA APLICACION =====
const STORAGE_KEY = 'poo_roadmap_progress';

let state = {
    completedWeeks: [],
    unlockedBadges: []
};

// ===== INICIALIZACION =====
document.addEventListener('DOMContentLoaded', () => {
    loadState();
    renderRoadmap();
    renderBadges();
    updateProgress();
    setupEventListeners();
    setupScrollEffects();
});

// ===== PERSISTENCIA =====
function loadState() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        state = JSON.parse(saved);
    }
}

function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// ===== RENDERIZADO DEL ROADMAP =====
function renderRoadmap() {
    const container = document.getElementById('roadmapContainer');
    if (!container) return;

    container.innerHTML = '';

    COURSE_DATA.cortes.forEach(corte => {
        const corteSection = document.createElement('div');
        corteSection.className = 'corte-section';
        corteSection.dataset.corte = corte.id;

        const completedInCorte = corte.weeks.filter(w => state.completedWeeks.includes(w)).length;
        const progressPercentage = Math.round((completedInCorte / corte.weeks.length) * 100);

        corteSection.innerHTML = `
            <div class="corte-header">
                <span class="corte-badge corte-badge--${corte.id}">Corte ${corte.id}</span>
                <div class="corte-info">
                    <h3>${corte.fase}</h3>
                    <span>${corte.percentage}% del curso · Semanas ${corte.weeks[0]}-${corte.weeks[corte.weeks.length - 1]}</span>
                </div>
                <div class="corte-progress">
                    <span class="corte-progress__value">${progressPercentage}%</span>
                    <span class="corte-progress__label">completado</span>
                </div>
            </div>
            <div class="weeks-grid"></div>
        `;

        const weeksGrid = corteSection.querySelector('.weeks-grid');

        corte.weeks.forEach(weekNum => {
            const weekData = COURSE_DATA.weeks.find(w => w.num === weekNum);
            if (weekData) {
                weeksGrid.appendChild(createWeekCard(weekData));
            }
        });

        container.appendChild(corteSection);
    });
}

function createWeekCard(week) {
    const isCompleted = state.completedWeeks.includes(week.num);
    const card = document.createElement('div');

    let cardClasses = 'week-card';
    if (isCompleted) cardClasses += ' week-card--completed';
    if (week.type === 'parcial') cardClasses += ' week-card--parcial';
    if (week.type === 'cierre') cardClasses += ' week-card--cierre';

    card.className = cardClasses;
    card.dataset.week = week.num;
    card.dataset.type = week.type;

    const checkIcon = isCompleted ? '✓' : '';

    card.innerHTML = `
        <div class="week-card__header">
            <div class="week-card__number">${week.type === 'parcial' ? '⭐' : week.num}</div>
            <div class="week-card__title">
                <h4>${week.title}</h4>
                <span>${week.topic}</span>
            </div>
            <div class="week-card__check">${checkIcon}</div>
        </div>
        <div class="week-card__body">
            <div class="week-card__content">
                <div class="content-item content-item--clase">
                    <span class="content-item__label">👨‍🏫 Clase</span>
                    <p class="content-item__text">${week.content.clase}</p>
                </div>
                <div class="content-item content-item--autonomo">
                    <span class="content-item__label">📝 Trabajo Autonomo</span>
                    <p class="content-item__text">${week.content.autonomo}</p>
                </div>
            </div>
            <div class="week-card__tags">
                ${week.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
            </div>
        </div>
    `;

    card.addEventListener('click', () => toggleWeekCompletion(week.num));

    return card;
}

// ===== LOGICA DE PROGRESO =====
function toggleWeekCompletion(weekNum) {
    const index = state.completedWeeks.indexOf(weekNum);

    if (index === -1) {
        state.completedWeeks.push(weekNum);
        state.completedWeeks.sort((a, b) => a - b);
    } else {
        state.completedWeeks.splice(index, 1);
    }

    saveState();
    checkBadges();
    renderRoadmap();
    renderBadges();
    updateProgress();
}

function updateProgress() {
    const completed = state.completedWeeks.length;
    const total = COURSE_DATA.totalWeeks;
    const percentage = Math.round((completed / total) * 100);

    // Actualizar stats del hero
    const statWeeks = document.getElementById('statWeeks');
    const statBadges = document.getElementById('statBadges');
    const statProgress = document.getElementById('statProgress');

    if (statWeeks) statWeeks.textContent = completed;
    if (statBadges) statBadges.textContent = state.unlockedBadges.length;
    if (statProgress) statProgress.textContent = `${percentage}%`;

    // Actualizar barra de progreso
    const progressValue = document.getElementById('progressValue');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');

    if (progressValue) progressValue.textContent = `${percentage}%`;
    if (progressFill) progressFill.style.width = `${percentage}%`;
    if (progressText) progressText.textContent = `${completed} de ${total} semanas completadas`;
}

// ===== SISTEMA DE BADGES =====
function checkBadges() {
    const completed = state.completedWeeks.length;
    let newBadge = null;

    COURSE_DATA.badges.forEach(badge => {
        if (completed >= badge.requirement && !state.unlockedBadges.includes(badge.id)) {
            state.unlockedBadges.push(badge.id);
            newBadge = badge;
        }
    });

    if (newBadge) {
        saveState();
        showBadgeModal(newBadge);
    }
}

function renderBadges() {
    const container = document.getElementById('badgesContainer');
    if (!container) return;

    container.innerHTML = '';

    COURSE_DATA.badges.forEach(badge => {
        const isUnlocked = state.unlockedBadges.includes(badge.id);
        const badgeCard = document.createElement('div');
        badgeCard.className = `badge-card ${isUnlocked ? 'badge-card--unlocked' : 'badge-card--locked'}`;

        badgeCard.innerHTML = `
            <div class="badge-card__icon">${isUnlocked ? badge.icon : '🔒'}</div>
            <h4 class="badge-card__title">${badge.name}</h4>
            <p class="badge-card__desc">${badge.desc}</p>
            <span class="badge-card__status">
                ${isUnlocked ? '✓ Desbloqueado' : `Completa ${badge.requirement} semanas`}
            </span>
        `;

        container.appendChild(badgeCard);
    });
}

function showBadgeModal(badge) {
    const modal = document.getElementById('badgeModal');
    const icon = document.getElementById('badgeModalIcon');
    const title = document.getElementById('badgeModalTitle');
    const desc = document.getElementById('badgeModalDesc');

    if (modal && icon && title && desc) {
        icon.textContent = badge.icon;
        title.textContent = `¡${badge.name} Desbloqueado!`;
        desc.textContent = badge.desc;
        modal.classList.add('open');
    }
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Filtros
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterWeeks(btn.dataset.filter);
        });
    });

    // Modal de reinicio
    const btnReset = document.getElementById('btnReset');
    const resetModal = document.getElementById('resetModal');
    const modalCancel = document.getElementById('modalCancel');
    const modalConfirm = document.getElementById('modalConfirm');

    if (btnReset && resetModal) {
        btnReset.addEventListener('click', () => resetModal.classList.add('open'));
    }

    if (modalCancel && resetModal) {
        modalCancel.addEventListener('click', () => resetModal.classList.remove('open'));
    }

    if (modalConfirm) {
        modalConfirm.addEventListener('click', () => {
            state = { completedWeeks: [], unlockedBadges: [] };
            saveState();
            renderRoadmap();
            renderBadges();
            updateProgress();
            resetModal.classList.remove('open');
        });
    }

    // Modal de badge
    const badgeModalClose = document.getElementById('badgeModalClose');
    const badgeModal = document.getElementById('badgeModal');

    if (badgeModalClose && badgeModal) {
        badgeModalClose.addEventListener('click', () => badgeModal.classList.remove('open'));
    }

    // Cerrar modales al hacer clic fuera
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('open');
            }
        });
    });
}

function filterWeeks(filter) {
    const weekCards = document.querySelectorAll('.week-card');
    const corteSections = document.querySelectorAll('.corte-section');

    weekCards.forEach(card => {
        let show = true;

        switch (filter) {
            case 'parcial':
                show = card.dataset.type === 'parcial';
                break;
            case 'pending':
                show = !card.classList.contains('week-card--completed');
                break;
            case 'completed':
                show = card.classList.contains('week-card--completed');
                break;
            default:
                show = true;
        }

        card.style.display = show ? '' : 'none';
    });

    // Ocultar secciones de corte vacías
    corteSections.forEach(section => {
        const visibleCards = section.querySelectorAll('.week-card:not([style*="display: none"])');
        section.style.display = visibleCards.length > 0 ? '' : 'none';
    });
}

// ===== EFECTOS DE SCROLL =====
function setupScrollEffects() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Navegación activa
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.header__nav a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}
