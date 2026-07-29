// script.js – con link mappa
(function() {
    "use strict";

    let dati = {
        prodotti: [
            { nome: "Uova Grandi", prezzo: "€ 6.50", desc: "6 uova extra large" },
            { nome: "Uova Medie", prezzo: "€ 5.20", desc: "6 uova medie" },
            { nome: "Uova Miste", prezzo: "€ 7.00", desc: "12 uova mix" },
        ],
        offerta: {
            titolo: "🎉 Offerta Speciale!",
            prezzo: "€ 5.00",
            desc: "6 uova grandi + 6 medie scontate!"
        },
        mappa: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.456789012345!2d17.9365!3d40.6389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1338f0e0e0e0e0e0%3A0x0!2zNDDCsDM4JzIwLjAiTiAxN8KwNTYnMTUuMCJF!5e0!3m2!1sit!2sit!4v1234567890",
        foto: [
            { url: "https://picsum.photos/seed/gallina1/400/300", caption: "Galline al pascolo" },
            { url: "https://picsum.photos/seed/gallina2/400/300", caption: "Raccolta uova" },
        ],
        video: [
            { url: "https://www.w3schools.com/html/mov_bbb.mp4", caption: "Le galline nel pomeriggio" },
        ]
    };

    function caricaDati() {
        try {
            const stored = localStorage.getItem('uovaDati');
            if (stored) {
                const parsed = JSON.parse(stored);
                if (parsed) dati = parsed;
            }
        } catch (e) {}
    }

    function salvaDati() {
        try {
            localStorage.setItem('uovaDati', JSON.stringify(dati));
        } catch (e) {}
    }

    function renderProdotti() {
        const el = document.getElementById('listaProdotti');
        if (!el) return;
        el.innerHTML = '';
        dati.prodotti.forEach(p => {
            el.innerHTML += `
                <div class="card-prodotto">
                    <h4>${p.nome}</h4>
                    <div class="prezzo">${p.prezzo}</div>
                    <div class="desc">${p.desc}</div>
                </div>
            `;
        });
    }

    function renderOfferta() {
        const el = document.getElementById('offertaContainer');
        if (!el) return;
        const o = dati.offerta;
        el.innerHTML = `
            <h4>${o.titolo}</h4>
            <div class="prezzo-offerta">${o.prezzo}</div>
            <div class="desc-offerta">${o.desc}</div>
        `;
    }

    function renderMappa() {
        const iframe = document.getElementById('mappaIframe');
        if (iframe && dati.mappa) {
            iframe.src = dati.mappa;
        }
    }

    function renderFoto() {
        const el = document.getElementById('galleriaFoto');
        if (!el) return;
        el.innerHTML = '';
        dati.foto.forEach(f => {
            el.innerHTML += `
                <div class="media-item">
                    <img src="${f.url}" alt="${f.caption}" loading="lazy" />
                    <div class="caption">${f.caption}</div>
                </div>
            `;
        });
    }

    function renderVideo() {
        const el = document.getElementById('galleriaVideo');
        if (!el) return;
        el.innerHTML = '';
        dati.video.forEach(v => {
            el.innerHTML += `
                <div class="media-item">
                    <video controls preload="metadata">
                        <source src="${v.url}" type="video/mp4" />
                    </video>
                    <div class="caption">${v.caption}</div>
                </div>
            `;
        });
    }

    function renderTutto() {
        renderProdotti();
        renderOfferta();
        renderMappa();
        renderFoto();
        renderVideo();
    }

    function setupImageUpload() {
        const input = document.getElementById('uploadFoto');
        const preview = document.getElementById('uploadPreview');
        const textarea = document.getElementById('adminFoto');
        if (!input || !preview || !textarea) return;

        input.addEventListener('change', function() {
            const files = Array.from(this.files);
            const current = textarea.value ? textarea.value.split('\n').filter(l => l.trim()) : [];
            
            files.forEach(file => {
                if (!file.type.startsWith('image/')) return;
                const reader = new FileReader();
                reader.onload = function(e) {
                    const base64 = e.target.result;
                    const caption = prompt('Didascalia per questa foto:', file.name.split('.')[0]);
                    current.push(`${base64}||${caption || file.name}`);
                    textarea.value = current.join('\n');
                    
                    const img = document.createElement('img');
                    img.src = base64;
                    preview.appendChild(img);
                };
                reader.readAsDataURL(file);
            });
            this.value = '';
        });
    }

    function initAdmin() {
        const form = document.getElementById('adminForm');
        if (!form) return;

        const fProdotti = document.getElementById('adminProdotti');
        const fOffTitolo = document.getElementById('adminOffertaTitolo');
        const fOffPrezzo = document.getElementById('adminOffertaPrezzo');
        const fOffDesc = document.getElementById('adminOffertaDesc');
        const fMappa = document.getElementById('adminMappa');
        const fFoto = document.getElementById('adminFoto');
        const fVideo = document.getElementById('adminVideo');
        const msg = document.getElementById('adminMsg');

        function caricaForm() {
            if (fProdotti) fProdotti.value = dati.prodotti.map(p => `${p.nome}||${p.prezzo}||${p.desc}`).join('\n');
            if (fOffTitolo) fOffTitolo.value = dati.offerta.titolo;
            if (fOffPrezzo) fOffPrezzo.value = dati.offerta.prezzo;
            if (fOffDesc) fOffDesc.value = dati.offerta.desc;
            if (fMappa) fMappa.value = dati.mappa || '';
            if (fFoto) fFoto.value = dati.foto.map(f => `${f.url}||${f.caption}`).join('\n');
            if (fVideo) fVideo.value = dati.video.map(v => `${v.url}||${v.caption}`).join('\n');
        }

        caricaForm();
        setupImageUpload();

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            try {
                if (fProdotti) {
                    const lines = fProdotti.value.split('\n').filter(l => l.trim());
                    const nuovi = [];
                    lines.forEach(line => {
                        const parts = line.split('||').map(s => s.trim());
                        if (parts.length === 3) {
                            nuovi.push({ nome: parts[0], prezzo: parts[1], desc: parts[2] });
                        }
                    });
                    if (nuovi.length > 0) dati.prodotti = nuovi;
                }

                if (fOffTitolo) dati.offerta.titolo = fOffTitolo.value || "Offerta";
                if (fOffPrezzo) dati.offerta.prezzo = fOffPrezzo.value || "€ 0.00";
                if (fOffDesc) dati.offerta.desc = fOffDesc.value || "";

                if (fMappa) {
                    dati.mappa = fMappa.value.trim() || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.456789012345!2d17.9365!3d40.6389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1338f0e0e0e0e0e0%3A0x0!2zNDDCsDM4JzIwLjAiTiAxN8KwNTYnMTUuMCJF!5e0!3m2!1sit!2sit!4v1234567890";
                }

                if (fFoto) {
                    const lines = fFoto.value.split('\n').filter(l => l.trim());
                    const nuove = [];
                    lines.forEach(line => {
                        const parts = line.split('||').map(s => s.trim());
                        if (parts.length === 2) {
                            nuove.push({ url: parts[0], caption: parts[1] });
                        }
                    });
                    if (nuove.length > 0) dati.foto = nuove;
                }

                if (fVideo) {
                    const lines = fVideo.value.split('\n').filter(l => l.trim());
                    const nuovi = [];
                    lines.forEach(line => {
                        const parts = line.split('||').map(s => s.trim());
                        if (parts.length === 2) {
                            nuovi.push({ url: parts[0], caption: parts[1] });
                        }
                    });
                    if (nuovi.length > 0) dati.video = nuovi;
                }

                salvaDati();
                renderTutto();

                if (msg) {
                    msg.textContent = '✅ Salvato!';
                    msg.classList.add('visible');
                    setTimeout(() => msg.classList.remove('visible'), 3000);
                }

                caricaForm();

            } catch (err) {
                if (msg) {
                    msg.textContent = '❌ Errore: ' + err.message;
                    msg.classList.add('visible');
                }
            }
        });
    }

    document.addEventListener('DOMContentLoaded', function() {
        caricaDati();
        renderTutto();
        initAdmin();

        if (dati.prodotti.length === 0) {
            dati.prodotti = [
                { nome: "Uova Grandi", prezzo: "€ 6.50", desc: "6 uova extra large" },
                { nome: "Uova Medie", prezzo: "€ 5.20", desc: "6 uova medie" },
                { nome: "Uova Miste", prezzo: "€ 7.00", desc: "12 uova mix" },
            ];
            dati.offerta = {
                titolo: "🎉 Offerta Speciale!",
                prezzo: "€ 5.00",
                desc: "6 uova grandi + 6 medie scontate!"
            };
            dati.mappa = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.456789012345!2d17.9365!3d40.6389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1338f0e0e0e0e0e0%3A0x0!2zNDDCsDM4JzIwLjAiTiAxN8KwNTYnMTUuMCJF!5e0!3m2!1sit!2sit!4v1234567890";
            dati.foto = [
                { url: "https://picsum.photos/seed/gallina1/400/300", caption: "Galline al pascolo" },
                { url: "https://picsum.photos/seed/gallina2/400/300", caption: "Raccolta uova" },
            ];
            dati.video = [
                { url: "https://www.w3schools.com/html/mov_bbb.mp4", caption: "Le galline nel pomeriggio" },
            ];
            salvaDati();
            renderTutto();
        }
    });

})();