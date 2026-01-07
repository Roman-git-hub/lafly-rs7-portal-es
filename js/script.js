/* ---------- Language dictionary & apply function ---------- */
const LANG = {
    en: {
        title: "LaFly RS7 — Owner Portal",
        pdf_title: "Full Owner PDF",
        pdf_desc: "Open the merged owner dossier (PDF) with Revolut proof and photos.",
        insurance_title: "Insurance Policy",
        insurance_desc: "Official insurance (add when ready).",
        gallery_title: "Scooter Photos",
        gallery_desc: "Photos of the LaFly RS7 — exterior, deck, serial details.",
        specs_title: "Technical Specs",
        specs_desc: "Motors, battery, brakes, suspension, lights and weight.",

        specs_panel_title: "Technical Specifications — LaFly RS7",
        t_motors: "Motors:",
        t_motors_val: "Dual hub motors, 500W",
        t_load: "Maximum load:",
        t_load_val: "250 kg",
        t_battery: "Battery:",
        t_battery_val: "52V · 38Ah Li-Ion",
        t_controller: "Controller:",
        t_controller_val: "Dual 45A Sine Wave",
        t_brakes: "Brakes:",
        t_brakes_val: "Hydraulic disc (F+R)",
        t_suspension: "Suspension:",
        t_suspension_val: "Oil front + rear",
        t_speed: "Max speed:",
        t_speed_val: "~25 km/h",
        t_weight: "Weight:",
        t_weight_val: "~37 kg",
        t_lighting: "Lighting:",
        t_lighting_val: "Direction indicator + taillight. Full LED package"
    },

    es: {
        title: "LaFly RS7 — Portal del Propietario",
        pdf_title: "PDF Completo del Propietario",
        pdf_desc: "Abra el expediente completo del propietario (PDF) con comprobante Revolut y fotos.",
        insurance_title: "Póliza de Seguro",
        insurance_desc: "Seguro oficial (se añadirá cuando esté disponible).",
        gallery_title: "Fotos del Patinete",
        gallery_desc: "Fotos del LaFly RS7 — exterior, plataforma, número de serie.",
        specs_title: "Especificaciones Técnicas",
        specs_desc: "Motores, batería, frenos, suspensión, luces y peso.",

        specs_panel_title: "Especificaciones Técnicas — LaFly RS7",
        t_motors: "Motores:",
        t_motors_val: "Motores duales de buje, 500W",
        t_load: "Carga máxima:",
        t_load_val: "250 kg",
        t_battery: "Batería:",
        t_battery_val: "52V · 38Ah Li-Ion",
        t_controller: "Controlador:",
        t_controller_val: "Doble 45A Sine Wave",
        t_brakes: "Frenos:",
        t_brakes_val: "Disco hidráulico (Del + Tras)",
        t_suspension: "Suspensión:",
        t_suspension_val: "Aceite delantera + trasera",
        t_speed: "Velocidad máx:",
        t_speed_val: "~25 km/h",
        t_weight: "Peso:",
        t_weight_val: "~37 kg",
        t_lighting: "Iluminación:",
        t_lighting_val: "Intermitentes + luz trasera. Paquete LED completo"
    }
};

/* APPLY LANGUAGE TO CARDS AND HEADER */
function applyLanguage(lang) {
    const t = LANG[lang];
    // header
    document.querySelector("header .title").textContent = t.title;
    // cards
    const cards = [
        ["pdf", "pdf_title", "pdf_desc"],
        ["insurance", "insurance_title", "insurance_desc"],
        ["gallery", "gallery_title", "gallery_desc"],
        ["specs", "specs_title", "specs_desc"]
    ];

    cards.forEach(([key, titleKey, descKey]) => {
        const card = document.querySelector(`.card[data-key="${key}"]`);
        if (!card) return;
        card.querySelector(".card-title").textContent = t[titleKey];
        card.querySelector(".card-desc").textContent = t[descKey];
    });
}

/* ---------- UI handlers & DOM ready ---------- */
window.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach((c, i) => {
        setTimeout(() => c.classList.add('visible'), 80 * i);
        c.addEventListener('click', () => window.openPanel(c.dataset.key));
    });

    document.getElementById('btn-home').onclick = () => window.scrollToTop();
    document.getElementById('btn-pdf').onclick = () => window.openPanel('pdf');
    document.getElementById('btn-specs').onclick = () => window.openPanel('specs');

    const langSelect = document.getElementById('lang-switch');
    if (langSelect) {
        // set default language ON LOAD (only once)
        applyLanguage(langSelect.value || 'en');

        // when user changes language, apply selected language only
        langSelect.addEventListener('change', (e) => {
            const lang = e.target.value;
            applyLanguage(lang);

            // если панель уже открыта — переотрисовать её
            const panel = document.getElementById("panel");
            if (panel.style.display === "block") {
                const active = panel.getAttribute("data-active");
                if (active) {
                    window.openPanel(active); // заново открыть панель на новом языке
                }
            }
        });
    }
});

/* ---------- Scroll function ---------- */
window.scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

/* ---------- Panel opener (as before) ---------- */
window.openPanel = function (type) {
    const lang = document.getElementById("lang-switch").value;
    const pdfFile = lang === "es" ? "pdf/RS7_OwnerInfo_ES.pdf" : "pdf/RS7_OwnerInfo_EN.pdf";
    const t = LANG[lang];

    const panel = document.getElementById("panel");
    let html = "";

    if (type === "pdf") {
        html = `
            <h2 style="color:var(--eu-yellow);margin-top:0">${t.pdf_title}</h2>
            <iframe class="pdf-viewer" src="${pdfFile}"></iframe>
        `;
    }

    if (type === "insurance") {
        html = `
            <h2 style="color:var(--eu-yellow);margin-top:0">${t.insurance_title}</h2>
            <p class="card-desc">${t.insurance_desc}</p>
        `;
    }

    if (type === "gallery") {
        html = `
            <h2 style="color:var(--eu-yellow);margin-top:0">${t.gallery_title}</h2>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:10px;">
                <img src="images/patinete.png" style="width:100%;border-radius:8px;" />
                <img src="images/patinete.png" style="width:100%;border-radius:8px;" />
                <img src="images/patinete.png" style="width:100%;border-radius:8px;" />
            </div>
        `;
    }

    if (type === "specs") {
        html = `
        <h2 style="color:var(--eu-yellow);margin-top:0">${t.specs_panel_title}</h2>
        <table style="width:100%;margin-top:10px;color:#cfe0ff">
            <tr><td>${t.t_motors}</td><td>${t.t_motors_val}</td></tr>
            <tr><td>${t.t_load}</td><td>${t.t_load_val}</td></tr>
            <tr><td>${t.t_battery}</td><td>${t.t_battery_val}</td></tr>
            <tr><td>${t.t_controller}</td><td>${t.t_controller_val}</td></tr>
            <tr><td>${t.t_brakes}</td><td>${t.t_brakes_val}</td></tr>
            <tr><td>${t.t_suspension}</td><td>${t.t_suspension_val}</td></tr>
            <tr><td>${t.t_speed}</td><td>${t.t_speed_val}</td></tr>
            <tr><td>${t.t_weight}</td><td>${t.t_weight_val}</td></tr>
            <tr><td>${t.t_lighting}</td><td>${t.t_lighting_val}</td></tr>
        </table>`;
    }

    panel.innerHTML = html;
    panel.style.display = "block";
    panel.setAttribute("data-active", type); // сохраняем активную панель
    setTimeout(() => panel.scrollIntoView({ behavior: "smooth" }), 50);
};

/* ---------- Improved secureMode with safe interval handling ---------- */
let _secureIntervalId = null;
function secureMode(enable = true) {
    const body = document.body;

    if (enable) {
        body.classList.add("secure-on");
        body.style.userSelect = "none";
        body.style.webkitUserSelect = "none";

        document.addEventListener("contextmenu", _blockContext);
        document.addEventListener("dragstart", _blockDrag);
        document.addEventListener("keydown", _blockKeys);

        // try to clear clipboard less often (every 2s) to avoid permission spam
        if (!_secureIntervalId) {
            try {
                _secureIntervalId = setInterval(() => {
                    // navigator.clipboard might be blocked without user gesture -> catch
                    navigator.clipboard && navigator.clipboard.writeText && navigator.clipboard.writeText("");
                }, 2000);
            } catch (e) {
                // ignore
            }
        }

        createAntiScreenshotOverlay();
    } else {
        body.classList.remove("secure-on");
        body.style.userSelect = "auto";

        document.removeEventListener("contextmenu", _blockContext);
        document.removeEventListener("dragstart", _blockDrag);
        document.removeEventListener("keydown", _blockKeys);

        if (_secureIntervalId) {
            clearInterval(_secureIntervalId);
            _secureIntervalId = null;
        }

        const overlay = document.getElementById("antiScreenshotLayer");
        if (overlay) overlay.remove();
    }
}

function _blockContext(e) { e.preventDefault(); }
function _blockDrag(e) { e.preventDefault(); }
function _blockKeys(e) {
    if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["I", "C", "J"].includes(e.key.toUpperCase())) ||
        (e.ctrlKey && e.key.toLowerCase() === "u")
    ) {
        e.preventDefault();
        e.stopPropagation();
        console.warn("DevTools Blocked");
    }
    if (e.key === "PrintScreen") {
        try { navigator.clipboard && navigator.clipboard.writeText && navigator.clipboard.writeText(""); } catch (e) { }
        alert("Screenshots are blocked for security reasons.");
        e.preventDefault();
        e.stopPropagation();
    }
}

function createAntiScreenshotOverlay() {
    if (document.getElementById("antiScreenshotLayer")) return;
    let overlay = document.createElement("div");
    overlay.id = "antiScreenshotLayer";
    Object.assign(overlay.style, {
        position: "fixed",
        inset: "0",
        pointerEvents: "none",
        zIndex: "999999",
        backdropFilter: "brightness(1.00) contrast(1.00)",
        background: "rgba(255,255,255,0.015) repeating-linear-gradient(45deg, rgba(255,255,255,0.04), rgba(255,255,255,0.04) 2px, transparent 2px, transparent 4px)"
    });
    document.body.appendChild(overlay);
}

/* start in secure mode? you can switch to false while testing */

secureMode(true);
