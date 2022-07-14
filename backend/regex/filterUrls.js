const filterUrlsRegex = new RegExp([
  "^(le festival|festival|festival 2022|lieux|lieu|infos et lieux|info|infos pratiques|a propos|infos|pratique|infos pratiques et contact|acces|nous trouver|",
  "comment venir|informations|information|infos|edition 2021|edition 2022|archives 2022|programme 2022|programme|le programme|programmation|billetterie)$"
].join(''), 'gi');

module.exports = filterUrlsRegex;

