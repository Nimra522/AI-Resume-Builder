
// List of template files that use photoUrl
const templateFiles = [
  'WarmProfessionalTemplate.tsx',
  'VerticalElegantTemplate.tsx',
  'ThreePanelBlackTimelineTemplate.tsx',
  'StudentProfileBannerTemplate.tsx',
  'SingleColumnNavyCorporateTemplate.tsx',
  'SingleColumnBlackPanelTemplate.tsx',
  'SidebarGrayProfileTemplate.tsx',
  'SerifExecutiveTemplate.tsx',
  'RoyalExecutiveTemplate.tsx',
  'RoundedPortfolioTemplate.tsx',
  'RetroContourTemplate.tsx',
  'PremiumSidebarTimelineTemplate.tsx',
  'PremiumExecutiveMinimalTemplate.tsx',
  'PillRotatedTimelineTemplate.tsx',
  'NavySidebarRoundedPhotoTemplate.tsx',
  'OrangeAccentTimelineTemplate.tsx',
  'OverlappingPortfolioTemplate.tsx',
  'NavyProfileTimelineTemplate.tsx',
  'NavyHorizonTemplate.tsx',
  'MonochromeFrameTemplate.tsx',
  'ModernTimelineTemplate.tsx',
  'ModernistEditorialTemplate.tsx',
  'ModernPurpleTemplate.tsx',
  'ModernProfessionalTimelinePhotoTemplate.tsx',
  'ModernMinimalATSTemplate.tsx',
  'ModernCorporatePhotoTemplate.tsx',
  'ModernEditorialTimelineTemplate.tsx',
  'ModernBlueGeometricTemplate.tsx',
  'MinimalistFullWidthTemplate.tsx',
  'MinimalistMagazineTemplate.tsx',
  'MaisonEliteTemplate.tsx',
  'MinimalBlackPhotoTemplate.tsx',
  'LuxuryEditorialTemplate.tsx',
  'LegacyCEOTemplate.tsx',
  'GreyBoxedHeadingsTemplate.tsx',
  'HeritageCorporateTemplate.tsx',
  'GreenHeroExecutiveTemplate.tsx',
  'FreshGraduateModernTemplate.tsx',
  'GraphicDesignerPortfolioTemplate.tsx',
  'GraphicDesignerSplitHeaderTemplate.tsx',
  'FluidCapsuleTemplate.tsx',
  'ForestGreenTemplate.tsx',
  'ExecutiveVogueTemplate.tsx',
  'ExecutivePrestigeTemplate.tsx',
  'ExecutiveBlueTemplate.tsx',
  'ExecutiveHorizonTemplate.tsx',
  'EmpireExecutiveTemplate.tsx',
  'EditorialLuxeTemplate.tsx',
  'EditorialThinTemplate.tsx',
  'DarkSidebarPortfolioTemplate.tsx',
  'DarkSidebarTimelineTemplate.tsx',
  'DecorativeCirclesTemplate.tsx',
  'CreativeProfessionalTemplate.tsx',
  'ClassicBWTemplate.tsx',
  'BrownElegantTemplate.tsx',
  'BrownAccentDecorativeTemplate.tsx',
  'BlueSidebarDotIndicatorsTemplate.tsx',
  'AnaishaTemplate.tsx',
  'BlackHeaderMinimalTemplate.tsx',
  'Template2.tsx',
  'Template1.tsx',
  'RoyalExecutiveTemplate2.tsx',
];

// Convert filename to template id
function filenameToId(filename) {
  // Remove "Template.tsx" or just ".tsx"
  let base = filename.replace('Template.tsx', '').replace('.tsx', '');
  // Convert PascalCase to kebab-case
  return base
    .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2')
    .toLowerCase();
}

// Generate list of template ids
const templateIds = templateFiles.map(filenameToId);

console.log('Template IDs to regenerate:');
console.log(JSON.stringify(templateIds, null, 2));
