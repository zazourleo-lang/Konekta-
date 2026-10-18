// Fichier de traduction KONEKTA
const traductions = {
  fr: {
    accueil: "Accueil",
    favoris: "Favoris",
    publier: "Publier",
    moi: "Moi",
    decouvrir: "À découvrir",
    prixAffiches: "Prix affichés en :",
    gourdes: "G · Gourdes",
    dollars: "$ · Dollars",
    chercher: "Chercher",
    placeholder: "Ex. téléphone, chaussures…",
    contacter: "Contacter le vendeur",
    signaler: "Signaler cette annonce",
    verifie: "✔ Vendeur vérifié",
    titreHero: "Ce que tu cherches, près ou loin.",
    sousTitreHero: "Découvre des produits proposés par des vendeurs en Haïti.",
    badge: "🇭🇹 Le marché haïtien"
  },
  en: {
    accueil: "Home",
    favoris: "Favorites",
    publier: "Publish",
    moi: "Me",
    decouvrir: "Discover",
    prixAffiches: "Prices in:",
    gourdes: "G · Gourdes",
    dollars: "$ · Dollars",
    chercher: "Search",
    placeholder: "Ex. phone, shoes…",
    contacter: "Contact seller",
    signaler: "Report this listing",
    verifie: "✔ Verified seller",
    titreHero: "What you're looking for, near or far.",
    sousTitreHero: "Discover products offered by sellers in Haiti.",
    badge: "🇭🇹 Haiti's marketplace"
  }
};

let langueActuelle = localStorage.getItem("klang") || "fr";

function changerLangue(langue) {
  langueActuelle = langue;
  localStorage.setItem("klang", langue);
  document.documentElement.lang = langue;
  
  // On traduit les textes simples
  const elements = {
    ".badge": traductions[langue].badge,
    ".hero h1": traductions[langue].titreHero,
    ".hero p": traductions[langue].sousTitreHero,
    "#search": traductions[langue].placeholder, // placeholder
    "#searchBtn": traductions[langue].chercher,
    ".cur span": traductions[langue].prixAffiches,
    "[data-disp='HTG']": traductions[langue].gourdes,
    "[data-disp='USD']": traductions[langue].dollars,
    "#sectionTitle": traductions[langue].decouvrir
  };

  for (let selecteur in elements) {
    const el = document.querySelector(selecteur);
    if (el) {
      if (selecteur === "#search") {
        el.placeholder = elements[selecteur];
      } else {
        el.textContent = elements[selecteur];
      }
    }
  }

  // Traduction des boutons de navigation
  document.querySelectorAll(".navbtn[data-view='home'] span:last-child").forEach(el => el.textContent = traductions[langue].accueil);
  document.querySelectorAll(".navbtn[data-view='favorites'] span:last-child").forEach(el => el.textContent = traductions[langue].favoris);
  document.querySelector("#addBtn span:last-child").textContent = traductions[langue].publier;
  document.querySelectorAll(".navbtn[data-view='me'] span:last-child").forEach(el => el.textContent = traductions[langue].moi);

  // Traduction des boutons de la carte
  document.querySelectorAll("[data-contact]").forEach(el => el.textContent = traductions[langue].contacter);
  document.querySelectorAll("[data-rep]").forEach(el => el.textContent = traductions[langue].signaler);
  document.querySelectorAll(".vbadge").forEach(el => el.textContent = traductions[langue].verifie);
}
document.getElementById("langBtn").onclick = () => { changerLangue(langueActuelle === "fr" ? "en" : "fr"); 
// Affichage des signalements pour l'admin
setTimeout(() => {
  if (typeof loadStats === "function") {
    const originalLoadStats = loadStats;
    window.loadStats = async function() {
      await originalLoadStats();
      const statsBox = document.getElementById("stats");
      if (statsBox && !statsBox.hidden) {
        // On ajoute la liste des signalements en bas de la carte
        const { data } = await sb.from("reports").select("*").order("created_at", { ascending: false });
        if (data && data.length > 0) {
          let html = "<div style='margin-top:10px; border-top:1px solid #ccc; padding-top:10px'><b>🚩 Détails des signalements :</b><br>";
          data.forEach(r => {
            html += "• Annonce #" + r.listing_id + " : " + r.reason + "<br>";
          });
          html += "</div>";
          statsBox.innerHTML += html;
        }
      }
    };
  }
}, 1000);
// Création du menu déroulant pour les langues
setTimeout(() => {
  if (!document.getElementById("langMenu")) {
    const menuHtml = `
      <div class="lang-menu" id="langMenu" style="display:none; position:absolute; right:10px; top:60px; background:white; border-radius:10px; box-shadow:0 4px 12px rgba(0,0,0,0.2); z-index:1000; overflow:hidden; min-width:140px;">
        <button onclick="changerLangue('fr')" style="display:block; width:100%; border:0; padding:12px; text-align:left; font-size:14px; background:none;">🇫🇷 Français</button>
        <button onclick="changerLangue('en')" style="display:block; width:100%; border:0; padding:12px; text-align:left; font-size:14px; background:none;">🇬🇧 English</button>
      </div>`;
    document.body.insertAdjacentHTML('beforeend', menuHtml);
    
    // Gérer le clic sur le bouton planète
    document.addEventListener('click', (e) => {
      if (e.target.closest('#langBtn')) {
        const menu = document.getElementById('langMenu');
        menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
      } else {
        const menu = document.getElementById('langMenu');
        if (menu) menu.style.display = 'none';
      }
    });
  }
}, 1000);
// Remplacement propre du bouton 🌐 par le menu déroulant
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const vieuxBouton = document.getElementById("langBtn");
    if (vieuxBouton) {
      // On remplace le bouton simple par notre nouveau menu complet
      vieuxBouton.outerHTML = `
        <div class="lang-wrap" style="position:relative; margin-left:auto;">
          <button class="lang-btn" id="langBtn" style="border:1px solid #ffffff40;background:transparent;color:#fff;border-radius:20px;padding:6px 12px;font-size:12px;font-weight:700;cursor:pointer;">🌐</button>
          <div class="lang-menu" id="langMenu" style="display:none; position:absolute; right:0; top:110%; background:#fff; border-radius:12px; box-shadow:0 8px 24px rgba(0,0,0,0.2); overflow:hidden; min-width:130px; z-index:20;">
            <button onclick="changerLangue('fr')" style="display:block; width:100%; text-align:left; border:0; background:#fff; color:#172521; padding:10px 14px; font-size:13px; font-weight:600;">🇫🇷 Français</button>
            <button onclick="changerLangue('en')" style="display:block; width:100%; text-align:left; border:0; background:#fff; color:#172521; padding:10px 14px; font-size:13px; font-weight:600;">🇬🇧 English</button>
          </div>
        </div>`;
      
      // On dit au nouveau bouton d'ouvrir le menu au clic
      document.getElementById("langBtn").onclick = (e) => {
        e.stopPropagation();
        const menu = document.getElementById("langMenu");
        menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
      };
      
      // On ferme le menu si on clique ailleurs
      document.addEventListener('click', () => {
        const menu = document.getElementById("langMenu");
        if (menu) menu.style.display = 'none';
      });
    }
  }, 1000); // On attend 1 seconde que la page charge
});
