const addressRegex = new RegExp([
    "\\b[0-9]{0,4}[.,;!?/'’\"-]?\\s?(ruelle|rue|carrer|boulevard|route|avenue|carrefour|chemin|chaussee",
    "|allee|impasse|tour|cite|corniche|ile|prieure|collegiale|college|terrasse|place|cour|domaine|descente|ecart|esplanade",
    "|etang|abbaye|jardin|passage|parc|lycee|chapelle|parvis|bassin|hameau|lac|riviere|chateau|eglise|plein-air|en plein air|en plein",
    "|ecole|salle|champ|halle|galerie|palais|maison|espace|club|chapiteau|casino|camping|kiosque|amphitheatre|cabaret",
    "|theatre|cafe|bar|stade|restaurant|acces|divers endroits|endroit|endroits|foyer|IUT|institut|bar|moulin|universite|pole|scene|bibliotheque|gymnase|librairie|peniche",
    "|cinema|magasin|boutique|parking|berges|piscine|auditorium|mairie|canal|batiment|cathedrale",
    "|dans le coeur|dans le centre|centre|en plein coeur|au coeur|au bord de|au pied de|situe a",
    "|rendez-vous|adresse|aura lieu|a lieu|lieu|se deroulera|rendez vous au|se deroule|se tiendra)",
    "[sx]?\\b",
].join(''), 'gi');
 
 
module.exports = addressRegex;

