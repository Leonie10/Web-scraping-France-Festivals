const seasonRegex = new RegExp([
    "\\b(janvier|fevrier|mars|avril|mai|juin|juillet|aout|septembre|octobre|novembre|decembre)\\b",
    "|\\b(automne|printemps|ete|hiver)\\b",
].join(''), 'gi');



module.exports = seasonRegex;