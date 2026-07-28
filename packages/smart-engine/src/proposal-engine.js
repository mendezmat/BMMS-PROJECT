const templates = [
  { id: 'modern', name: 'Modern', layout: 'banner', imageShare: 0.42 },
  { id: 'tv', name: 'TV', layout: 'sidebar', imageShare: 0.36 },
  { id: 'glass', name: 'Glass', layout: 'overlay', imageShare: 1 }
];

export function createCompositionProposals(analysis = {}) {
  const palette = analysis.palette?.length ? analysis.palette : ['#111827', '#ffffff', '#6b7280'];
  return templates.map((template, index) => ({
    ...template,
    palette,
    recommended: index === 0,
    rationale: template.id === 'modern'
      ? 'Equilibrio entre imagen, título e información.'
      : template.id === 'tv'
        ? 'Lectura rápida con jerarquía broadcast.'
        : 'Conserva el flyer como fondo con panel legible.'
  }));
}
