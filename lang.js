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
// Bouton d'aide et FAQ KONEKTA
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    if (!document.getElementById("helpBtn")) {
      // 1. On crée le bouton flottant
      const helpBtn = document.createElement("button");
      helpBtn.id = "helpBtn";
      helpBtn.innerHTML = "💬 Aide";
      helpBtn.style.cssText = "position:fixed; bottom:80px; right:20px; background:#123c35; color:white; border:none; border-radius:30px; padding:12px 20px; font-size:14px; font-weight:bold; box-shadow:0 4px 12px rgba(0,0,0,0.3); z-index:9999; cursor:pointer;";
      document.body.appendChild(helpBtn);

      // 2. On crée la fenêtre des questions
      const helpMenu = document.createElement("div");
      helpMenu.id = "helpMenu";
      helpMenu.style.cssText = "display:none; position:fixed; bottom:140px; right:20px; width:280px; background:white; border-radius:16px; box-shadow:0 8px 24px rgba(0,0,0,0.2); z-index:9999; overflow:hidden; border:1px solid #e4e8e2;";
      helpMenu.innerHTML = `
        <div style="background:#123c35; color:white; padding:12px; font-weight:bold; font-size:14px;">❓ Comment pouvons-nous vous aider ?</div>
        <div style="padding:10px;">
          <button class="faq-btn" data-q="publier" style="display:block; width:100%; text-align:left; border:none; background:#f6f4ed; padding:10px; margin-bottom:8px; border-radius:8px; font-size:13px; cursor:pointer;">📝 Comment publier une annonce ?</button>
          <button class="faq-btn" data-q="contacter" style="display:block; width:100%; text-align:left; border:none; background:#f6f4ed; padding:10px; margin-bottom:8px; border-radius:8px; font-size:13px; cursor:pointer;">📞 Comment contacter un vendeur ?</button>
          <button class="faq-btn" data-q="paiement" style="display:block; width:100%; text-align:left; border:none; background:#f6f4ed; padding:10px; margin-bottom:8px; border-radius:8px; font-size:13px; cursor:pointer;">💳 Comment se passe le paiement ?</button>
        </div>
        <div id="faqAnswer" style="padding:12px; background:#e9f2ed; font-size:13px; color:#123c35; display:none;"></div>
      `;
      document.body.appendChild(helpMenu);

      // 3. On fait fonctionner le bouton (Ouvrir/Fermer)
      helpBtn.onclick = () => {
        helpMenu.style.display = helpMenu.style.display === "none" ? "block" : "none";
        document.getElementById("faqAnswer").style.display = "none"; // On cache la réponse précédente
      };

      // 4. On fait fonctionner les questions
      document.querySelectorAll(".faq-btn").forEach(btn => {
        btn.onclick = () => {
          const answerDiv = document.getElementById("faqAnswer");
          answerDiv.style.display = "block";
          if (btn.dataset.q === "publier") {
            answerDiv.innerHTML = "<strong>Pour publier :</strong><br>Appuyez sur le bouton <b>+ Publier</b> en bas. Remplissez le nom, le prix, et ajoutez une photo. C'est gratuit !";
          } else if (btn.dataset.q === "contacter") {
            answerDiv.innerHTML = "<strong>Pour contacter :</strong><br>Sur l'annonce qui vous intéresse, cliquez sur <b>Contacter le vendeur</b>. Vous serez redirigé vers WhatsApp.";
          } else if (btn.dataset.q === "paiement") {
            answerDiv.innerHTML = "<strong>Paiement :</strong><br>KONEKTA ne gère pas encore les paiements en ligne. Vous devez vous arranger directement avec le vendeur (MonCash, NatCash, ou en main propre).";
          }
        };
      });
    }
  }, 1500); // On attend 1,5 seconde que le site charge
});
