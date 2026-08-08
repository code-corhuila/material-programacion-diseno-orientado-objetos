/* =====================================================================
   OVA CORHUILA · base interaction (generic, template)
   Reading bar · scroll-spy nav · scroll-to-top · code tabs ·
   self-check quiz (data-correct / data-exp) · checklist persistence.
   Vanilla JS · no dependencies · SCORM-safe (self-contained).
   ===================================================================== */
document.addEventListener('DOMContentLoaded', () => {

    const bar = document.getElementById('readingBar');
    if (bar) window.addEventListener('scroll', () => {
        const h = document.documentElement;
        bar.style.width = Math.min(100, (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100) + '%';
    });

    const navLinks = Array.from(document.querySelectorAll('.main-nav a'));
    const sections = navLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
    if (sections.length) {
        const spy = () => {
            const y = window.scrollY + 140;
            let cur = sections[0];
            sections.forEach(s => { if (s.offsetTop <= y) cur = s; });
            navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + (cur ? cur.id : '')));
        };
        window.addEventListener('scroll', spy); spy();
    }

    const topBtn = document.getElementById('scrollTopBtn');
    if (topBtn) {
        window.addEventListener('scroll', () => { topBtn.style.display = window.scrollY > 320 ? 'block' : 'none'; });
        topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.tab, t = btn.closest('.tabs');
            t.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            t.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            const panel = document.getElementById(id);
            if (panel) panel.classList.add('active');
        });
    });

    const quiz = document.getElementById('quiz');
    if (quiz) {
        const questions = Array.from(quiz.querySelectorAll('.q'));
        let answered = 0, correct = 0;
        const answeredEl = document.getElementById('quizAnswered');
        const showResult = () => {
            const res = document.getElementById('quizResult');
            if (!res) return;
            const sc = document.getElementById('quizScore');
            if (sc) sc.textContent = correct + '/' + questions.length;
            const msg = document.getElementById('quizMsg');
            if (msg) {
                if (correct === questions.length) msg.textContent = '¡Excelente! Dominas el tema.';
                else if (correct >= questions.length / 2) msg.textContent = 'Bien. Repasa los puntos marcados en rojo.';
                else msg.textContent = 'Repasa el contenido y vuelve a intentarlo.';
            }
            res.classList.add('show');
            res.scrollIntoView({ behavior: 'smooth', block: 'center' });
        };
        questions.forEach(q => {
            const opts = Array.from(q.querySelectorAll('.opt'));
            const ci = parseInt(q.dataset.correct, 10);
            const fb = q.querySelector('.feedback');
            const exp = q.dataset.exp || '';
            opts.forEach((opt, oi) => {
                opt.addEventListener('click', () => {
                    if (q.dataset.done) return;
                    q.dataset.done = '1'; answered++;
                    if (answeredEl) answeredEl.textContent = answered;
                    opts.forEach(o => o.disabled = true);
                    if (opts[ci]) opts[ci].classList.add('correct');
                    if (oi === ci) {
                        correct++;
                        opt.insertAdjacentHTML('beforeend', '<span class="mark">✓</span>');
                        if (fb) { fb.className = 'feedback ok show'; fb.textContent = '¡Correcto! ' + exp; }
                    } else {
                        opt.classList.add('wrong');
                        opt.insertAdjacentHTML('beforeend', '<span class="mark">✕</span>');
                        if (opts[ci]) opts[ci].insertAdjacentHTML('beforeend', '<span class="mark">✓</span>');
                        if (fb) { fb.className = 'feedback no show'; fb.textContent = 'Revisa: ' + exp; }
                    }
                    if (answered === questions.length) showResult();
                });
            });
        });
    }

    document.querySelectorAll('.checklist input[type=checkbox]').forEach((b, i) => {
        const k = 'ova_chk_' + location.pathname + '_' + i;
        try { b.checked = localStorage.getItem(k) === '1'; } catch (e) {}
        b.addEventListener('change', () => { try { localStorage.setItem(k, b.checked ? '1' : '0'); } catch (e) {} });
    });
});
