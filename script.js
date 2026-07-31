// script.js
(function() {
    "use strict";

    let dati = {
        prodotti: [
            { 
                nome: "Uova Grandi", 
                prezzo: "€ 6.50", 
                desc: "6 uova extra large",
                icon: "🥚"
            },
            { 
                nome: "Uova Medie", 
                prezzo: "€ 5.20", 
                desc: "6 uova medie",
                icon: "🥚"
            },
            { 
                nome: "Uova Miste", 
                prezzo: "€ 7.00", 
                desc: "12 uova mix (6 grandi + 6 medie)",
                icon: "🥚"
            },
        ],
        offerta: {
            titolo: "🎉 Offerta Speciale!",
            prezzo: "€ 5.00",
            desc: "6 uova grandi + 6 medie a prezzo scontato!"
        },
        mappa: "IL_TUO_CODICE_GOOGLE_MAPS_QUI",
        foto: [
            { url: "immagini/foto01.jpg", caption: "Galline al pascolo" },
            { url: "immagini/foto02.jpg", caption: "Raccolta delle uova" },
            { url: "immagini/foto03.jpg", caption: "Le nostre galline felici" },
            { url: "immagini/foto04.jpg", caption: "Terreno a Brindisi" },
        ],
        video: [
            { url: "immagini/video.mp4", caption: "Le nostre galline nel pomeriggio" },
        ]
    };

    function renderProdotti() {
        const el = document.getElementById('listaProdotti');
        if (!el) return;
        el.innerHTML = '';
        dati.prodotti.forEach(p => {
            el.innerHTML += `
                <div class="card-prodotto">
                    <div class="card-icon">${p.icon || '🥚'}</div>
                    <h4>${p.nome}</h4>
                    <div class="prezzo">${p.prezzo}</div>
                    <div class="desc">${p.desc}</div>
                    <a href="https://wa.me/393331234567?text=Ciao%2C%20vorrei%20ordinare%20${encodeURIComponent(p.nome)}" 
                       target="_blank" class="btn-card-order">Ordina</a>
                </div>
            `;
        });
    }

    function renderOfferta() {
        const el = document.getElementById('offertaContainer');
        if (!el) return;
        const o = dati.offerta;
        el.innerHTML = `
            <div class="offerta-content">
                <div class="offerta-icon">⭐</div>
                <h4>${o.titolo}</h4>
                <div class="prezzo-offerta">${o.prezzo}</div>
                <div class="desc-offerta">${o.desc}</div>
                <a href="https://wa.me/393331234567?text=Ciao%2C%20vorrei%20approfittare%20dell'offerta%20speciale%21" 
                   target="_blank" class="btn-offerta">Approfitta ora</a>
            </div>
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
                <div class="media-item video-item">
                    <video controls preload="metadata">
                        <source src="${v.url}" type="video/mp4" />
                        Il tuo browser non supporta i video.
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

    document.addEventListener('DOMContentLoaded', function() {
        renderTutto();
    });

})();
