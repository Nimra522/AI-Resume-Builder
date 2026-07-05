import React, { Suspense, lazy } from 'react';
import { ResumeData } from '../../types';

interface LivePreviewProps {
  data: ResumeData;
  templateId: string;
}

// Lazy load each template component (wrapped with React.memo in their files)
const ModernTemplate = lazy(() => import('../templates/ModernTemplate'));
const ProfessionalTemplate = lazy(() => import('../templates/ProfessionalTemplate'));
const MinimalistTemplate = lazy(() => import('../templates/MinimalistTemplate'));
const ExecutiveTemplate = lazy(() => import('../templates/ExecutiveTemplate'));
const CreativeTemplate = lazy(() => import('../templates/CreativeTemplate'));
const CompactTemplate = lazy(() => import('../templates/CompactTemplate'));
const StartupTemplate = lazy(() => import('../templates/StartupTemplate'));
const AcademicTemplate = lazy(() => import('../templates/AcademicTemplate'));
const FreshGraduateModernTemplate = lazy(() => import('../templates/FreshGraduateModernTemplate'));
const ModernTimelineTemplate = lazy(() => import('../templates/ModernTimelineTemplate'));
const WarmProfessionalTemplate = lazy(() => import('../templates/WarmProfessionalTemplate'));
const RetroContourTemplate = lazy(() => import('../templates/RetroContourTemplate'));
const ExecutiveBlueTemplate = lazy(() => import('../templates/ExecutiveBlueTemplate'));
const MonochromeFrameTemplate = lazy(() => import('../templates/MonochromeFrameTemplate'));
const FluidCapsuleTemplate = lazy(() => import('../templates/FluidCapsuleTemplate'));
const BrownElegantTemplate = lazy(() => import('../templates/BrownElegantTemplate'));
const MinimalistFullWidthTemplate = lazy(() => import('../templates/MinimalistFullWidthTemplate'));
const MinimalistMagazineTemplate = lazy(() => import('../templates/MinimalistMagazineTemplate'));
const ForestGreenTemplate = lazy(() => import('../templates/ForestGreenTemplate'));
const VerticalElegantTemplate = lazy(() => import('../templates/VerticalElegantTemplate'));
const RoyalExecutiveTemplate = lazy(() => import('../templates/RoyalExecutiveTemplate'));
const NavyHorizonTemplate = lazy(() => import('../templates/NavyHorizonTemplate'));
const ModernBlueGeometricTemplate = lazy(() => import('../templates/ModernBlueGeometricTemplate'));
const MaisonEliteTemplate = lazy(() => import('../templates/MaisonEliteTemplate'));
const LornaTemplate = lazy(() => import('../templates/LornaTemplate'));
const LegacyCEOTemplate = lazy(() => import('../templates/LegacyCEOTemplate'));
const HeritageCorporateTemplate = lazy(() => import('../templates/HeritageCorporateTemplate'));
const GraphicDesignerPortfolioTemplate = lazy(() => import('../templates/GraphicDesignerPortfolioTemplate'));
const ExecutiveVogueTemplate = lazy(() => import('../templates/ExecutiveVogueTemplate'));
const ExecutivePrestigeTemplate = lazy(() => import('../templates/ExecutivePrestigeTemplate'));
const ExecutiveHorizonTemplate = lazy(() => import('../templates/ExecutiveHorizonTemplate'));
const EmpireExecutiveTemplate = lazy(() => import('../templates/EmpireExecutiveTemplate'));
const EditorialLuxeTemplate = lazy(() => import('../templates/EditorialLuxeTemplate'));
const AnaishaTemplate = lazy(() => import('../templates/AnaishaTemplate'));
const DarkRedExecutiveTemplate = lazy(() => import('../templates/DarkRedExecutiveTemplate'));
const ModernPurpleTemplate = lazy(() => import('../templates/ModernPurpleTemplate'));
const CreativeProfessionalTemplate = lazy(() => import('../templates/CreativeProfessionalTemplate'));
const LuxuryExecutiveTemplate = lazy(() => import('../templates/LuxuryExecutiveTemplate'));
const ElegantMonochromeTemplate = lazy(() => import('../templates/ElegantMonochromeTemplate'));
const ModernProfessionalTemplate = lazy(() => import('../templates/ModernProfessionalTemplate'));
const ExecutiveMinimalTemplate = lazy(() => import('../templates/ExecutiveMinimalTemplate'));
const IsabelTemplate = lazy(() => import('../templates/IsabelTemplate'));
const CorporateBandTemplate = lazy(() => import('../templates/CorporateBandTemplate'));
const ElegantTemplate = lazy(() => import('../templates/ElegantTemplate'));
const PlatinumBoardTemplate = lazy(() => import('../templates/PlatinumBoardTemplate'));
const ChairmanSignatureTemplate = lazy(() => import('../templates/ChairmanSignatureTemplate'));
const BoardroomEliteTemplate = lazy(() => import('../templates/BoardroomEliteTemplate'));
const TechTemplate = lazy(() => import('../templates/TechTemplate'));
const ExecutiveBlueTemplate2 = lazy(() => import('../templates/ExecutiveBlueTemplate2'));
const RoyalExecutiveTemplate2 = lazy(() => import('../templates/RoyalExecutiveTemplate2'));
const Template1 = lazy(() => import('../templates/Template1'));
const Template2 = lazy(() => import('../templates/Template2'));
const SingleColumnProfessionalTemplate = lazy(() => import('../templates/SingleColumnProfessionalTemplate'));
const EditorialExecutiveTemplate = lazy(() => import('../templates/EditorialExecutiveTemplate'));
const MinimalGridTemplate = lazy(() => import('../templates/MinimalGridTemplate'));
const ModernMinimalTimelineTemplate = lazy(() => import('../templates/ModernMinimalTimelineTemplate'));
const ModernCorporatePhotoTemplate = lazy(() => import('../templates/ModernCorporatePhotoTemplate'));
const ModernProfessionalTimelinePhotoTemplate = lazy(() => import('../templates/ModernProfessionalTimelinePhotoTemplate'));
const LuxuryEditorialTemplate = lazy(() => import('../templates/LuxuryEditorialTemplate'));
const PremiumExecutiveMinimalTemplate = lazy(() => import('../templates/PremiumExecutiveMinimalTemplate'));
const ModernEditorialTimelineTemplate = lazy(() => import('../templates/ModernEditorialTimelineTemplate'));
const ModernMinimalATSTemplate = lazy(() => import('../templates/ModernMinimalATSTemplate'));
const ModernistEditorialTemplate = lazy(() => import('../templates/ModernistEditorialTemplate'));
const PremiumSidebarTimelineTemplate = lazy(() => import('../templates/PremiumSidebarTimelineTemplate'));
const ClassicBWTemplate = lazy(() => import('../templates/ClassicBWTemplate'));
const OverlappingPortfolioTemplate = lazy(() => import('../templates/OverlappingPortfolioTemplate'));
const DecorativeCirclesTemplate = lazy(() => import('../templates/DecorativeCirclesTemplate'));
const SingleColumnNavyCorporateTemplate = lazy(() => import('../templates/SingleColumnNavyCorporateTemplate'));
const RoundedPortfolioTemplate = lazy(() => import('../templates/RoundedPortfolioTemplate'));
const BlackHeaderMinimalTemplate = lazy(() => import('../templates/BlackHeaderMinimalTemplate'));
const EditorialThinTemplate = lazy(() => import('../templates/EditorialThinTemplate'));
const StudentProfileBannerTemplate = lazy(() => import('../templates/StudentProfileBannerTemplate'));
const SerifExecutiveTemplate = lazy(() => import('../templates/SerifExecutiveTemplate'));
const SidebarGrayProfileTemplate = lazy(() => import('../templates/SidebarGrayProfileTemplate'));
const BrownAccentDecorativeTemplate = lazy(() => import('../templates/BrownAccentDecorativeTemplate'));
const DarkSidebarPortfolioTemplate = lazy(() => import('../templates/DarkSidebarPortfolioTemplate'));
const DarkSidebarTimelineTemplate = lazy(() => import('../templates/DarkSidebarTimelineTemplate'));
const PillRotatedTimelineTemplate = lazy(() => import('../templates/PillRotatedTimelineTemplate'));
const DarkHeaderPillsTemplate = lazy(() => import('../templates/DarkHeaderPillsTemplate'));
const WarmCreamSectionalTemplate = lazy(() => import('../templates/WarmCreamSectionalTemplate'));
const LavenderAccentRepeatingTemplate = lazy(() => import('../templates/LavenderAccentRepeatingTemplate'));
const BlueHeaderThreeColumnTemplate = lazy(() => import('../templates/BlueHeaderThreeColumnTemplate'));
const GreyBoxedHeadingsTemplate = lazy(() => import('../templates/GreyBoxedHeadingsTemplate'));
const LightSidebarSectionsTemplate = lazy(() => import('../templates/LightSidebarSectionsTemplate'));
const BlueFramedTimelineTemplate = lazy(() => import('../templates/BlueFramedTimelineTemplate'));
const NavyProfileTimelineTemplate = lazy(() => import('../templates/NavyProfileTimelineTemplate'));
const NavySidebarRoundedPhotoTemplate = lazy(() => import('../templates/NavySidebarRoundedPhotoTemplate'));
const BlueSidebarDotIndicatorsTemplate = lazy(() => import('../templates/BlueSidebarDotIndicatorsTemplate'));
const CorporateCleanTemplate = lazy(() => import('../templates/CorporateCleanTemplate'));
const CorporateTimelineTemplate = lazy(() => import('../templates/CorporateTimelineTemplate'));
const HalftoneTimelineTemplate = lazy(() => import('../templates/HalftoneTimelineTemplate'));
const RoyalBlueTimelineTemplate = lazy(() => import('../templates/RoyalBlueTimelineTemplate'));
const EngineerPortfolioTemplate = lazy(() => import('../templates/EngineerPortfolioTemplate'));
const ExecutiveBlueBannerTemplate = lazy(() => import('../templates/ExecutiveBlueBannerTemplate'));
const MinimalBlackPhotoTemplate = lazy(() => import('../templates/MinimalBlackPhotoTemplate'));
const SingleColumnBlackPanelTemplate = lazy(() => import('../templates/SingleColumnBlackPanelTemplate'));
const OrangeAccentTimelineTemplate = lazy(() => import('../templates/OrangeAccentTimelineTemplate'));
const GreenHeroExecutiveTemplate = lazy(() => import('../templates/GreenHeroExecutiveTemplate'));
const GreenGeoCorporateTemplate = lazy(() => import('../templates/GreenGeoCorporateTemplate'));
const TealBlockHeaderTemplate = lazy(() => import('../templates/TealBlockHeaderTemplate'));
const GraphicDesignerSplitHeaderTemplate = lazy(() => import('../templates/GraphicDesignerSplitHeaderTemplate'));
const MinimalCorporateBlueBannerTemplate = lazy(() => import('../templates/MinimalCorporateBlueBannerTemplate'));
const YellowHeaderMinimalTemplate = lazy(() => import('../templates/YellowHeaderMinimalTemplate'));
const ThreePanelBlackTimelineTemplate = lazy(() => import('../templates/ThreePanelBlackTimelineTemplate'));

const TEMPLATE_MAP: Record<string, React.LazyExoticComponent<React.ComponentType<{ data: ResumeData }>>> = {
  modern: ModernTemplate,
  professional: ProfessionalTemplate,
  minimalist: MinimalistTemplate,
  executive: ExecutiveTemplate,
  creative: CreativeTemplate,
  compact: CompactTemplate,
  startup: StartupTemplate,
  academic: AcademicTemplate,
  'fresh-graduate-modern': FreshGraduateModernTemplate,
  'modern-timeline': ModernTimelineTemplate,
  'warm-professional': WarmProfessionalTemplate,
  'retro-contour': RetroContourTemplate,
  'executive-blue': ExecutiveBlueTemplate,
  'monochrome-frame': MonochromeFrameTemplate,
  'fluid-capsule': FluidCapsuleTemplate,
  'brown-elegant': BrownElegantTemplate,
  'minimalist-full-width': MinimalistFullWidthTemplate,
  'minimalist-magazine': MinimalistMagazineTemplate,
  'forest-green': ForestGreenTemplate,
  'vertical-elegant': VerticalElegantTemplate,
  'royal-executive': RoyalExecutiveTemplate,
  'navy-horizon': NavyHorizonTemplate,
  'modern-blue-geometric': ModernBlueGeometricTemplate,
  'maison-elite': MaisonEliteTemplate,
  'lorna': LornaTemplate,
  'legacy-ceo': LegacyCEOTemplate,
  'heritage-corporate': HeritageCorporateTemplate,
  'graphic-designer-portfolio': GraphicDesignerPortfolioTemplate,
  'executive-vogue': ExecutiveVogueTemplate,
  'executive-prestige': ExecutivePrestigeTemplate,
  'executive-horizon': ExecutiveHorizonTemplate,
  'empire-executive': EmpireExecutiveTemplate,
  'editorial-luxe': EditorialLuxeTemplate,
  'anaisha': AnaishaTemplate,
  'dark-red-executive': DarkRedExecutiveTemplate,
  'modern-purple': ModernPurpleTemplate,
  'creative-professional': CreativeProfessionalTemplate,
  'luxury-executive': LuxuryExecutiveTemplate,
  'elegant-monochrome': ElegantMonochromeTemplate,
  'modern-professional': ModernProfessionalTemplate,
  'executive-minimal': ExecutiveMinimalTemplate,
  'isabel': IsabelTemplate,
  'corporate-band': CorporateBandTemplate,
  'elegant': ElegantTemplate,
  'platinum-board': PlatinumBoardTemplate,
  'chairman-signature': ChairmanSignatureTemplate,
  'boardroom-elite': BoardroomEliteTemplate,
  'tech': TechTemplate,
  'executive-blue-2': ExecutiveBlueTemplate2,
  'royal-executive-2': RoyalExecutiveTemplate2,
  'template-1': Template1,
  'template-2': Template2,
  'single-column-professional': SingleColumnProfessionalTemplate,
  'editorial-executive': EditorialExecutiveTemplate,
  'minimal-grid': MinimalGridTemplate,
  'modern-minimal-timeline': ModernMinimalTimelineTemplate,
  'modern-corporate-photo': ModernCorporatePhotoTemplate,
  'modern-professional-timeline-photo': ModernProfessionalTimelinePhotoTemplate,
  'luxury-editorial': LuxuryEditorialTemplate,
  'premium-executive-minimal': PremiumExecutiveMinimalTemplate,
  'modern-editorial-timeline': ModernEditorialTimelineTemplate,
  'modern-minimal-ats': ModernMinimalATSTemplate,
  'modernist-editorial': ModernistEditorialTemplate,
  'premium-sidebar-timeline': PremiumSidebarTimelineTemplate,
  'classic-bw': ClassicBWTemplate,
  'overlapping-portfolio': OverlappingPortfolioTemplate,
  'decorative-circles': DecorativeCirclesTemplate,
  'single-column-navy-corporate': SingleColumnNavyCorporateTemplate,
  'rounded-portfolio': RoundedPortfolioTemplate,
  'black-header-minimal': BlackHeaderMinimalTemplate,
  'editorial-thin': EditorialThinTemplate,
  'student-profile-banner': StudentProfileBannerTemplate,
  'serif-executive': SerifExecutiveTemplate,
  'sidebar-gray-profile': SidebarGrayProfileTemplate,
  'brown-accent-decorative': BrownAccentDecorativeTemplate,
  'dark-sidebar-portfolio': DarkSidebarPortfolioTemplate,
  'dark-sidebar-timeline': DarkSidebarTimelineTemplate,
  'pill-rotated-timeline': PillRotatedTimelineTemplate,
  'dark-header-pills': DarkHeaderPillsTemplate,
  'warm-cream-sectional': WarmCreamSectionalTemplate,
  'lavender-accent-repeating': LavenderAccentRepeatingTemplate,
  'blue-header-three-column': BlueHeaderThreeColumnTemplate,
  'grey-boxed-headings': GreyBoxedHeadingsTemplate,
  'light-sidebar-sections': LightSidebarSectionsTemplate,
  'blue-framed-timeline': BlueFramedTimelineTemplate,
  'navy-profile-timeline': NavyProfileTimelineTemplate,
  'navy-sidebar-rounded-photo': NavySidebarRoundedPhotoTemplate,
  'blue-sidebar-dot-indicators': BlueSidebarDotIndicatorsTemplate,
  'corporate-clean': CorporateCleanTemplate,
  'corporate-timeline': CorporateTimelineTemplate,
  'halftone-timeline': HalftoneTimelineTemplate,
  'royal-blue-timeline': RoyalBlueTimelineTemplate,
  'engineer-portfolio': EngineerPortfolioTemplate,
  'executive-blue-banner': ExecutiveBlueBannerTemplate,
  'minimal-black-photo': MinimalBlackPhotoTemplate,
  'single-column-black-panel': SingleColumnBlackPanelTemplate,
  'orange-accent-timeline': OrangeAccentTimelineTemplate,
  'green-hero-executive': GreenHeroExecutiveTemplate,
  'green-geo-corporate': GreenGeoCorporateTemplate,
  'teal-block-header': TealBlockHeaderTemplate,
  'graphic-designer-split-header': GraphicDesignerSplitHeaderTemplate,
  'minimal-corporate-blue-banner': MinimalCorporateBlueBannerTemplate,
  'yellow-header-minimal': YellowHeaderMinimalTemplate,
  'three-panel-black-timeline': ThreePanelBlackTimelineTemplate,
};

const LoadingFallback: React.FC = () => (
  <div className="w-full h-full min-h-[1000px] bg-white flex items-center justify-center">
    <div className="animate-pulse text-text-muted text-sm">Loading template...</div>
  </div>
);

export const LivePreview: React.FC<LivePreviewProps> = ({ data, templateId }) => {
  const TemplateComponent = TEMPLATE_MAP[templateId] || ModernTemplate;

  return (
    <Suspense fallback={<LoadingFallback />}>
      <TemplateComponent data={data} />
    </Suspense>
  );
};
