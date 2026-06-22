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
const VibrantVioletTemplate = lazy(() => import('../templates/VibrantVioletTemplate'));
const EmeraldExecutiveTemplate = lazy(() => import('../templates/EmeraldExecutiveTemplate'));
const CoralCreativeGridTemplate = lazy(() => import('../templates/CoralCreativeGridTemplate'));
const IndigoTimelineProTemplate = lazy(() => import('../templates/IndigoTimelineProTemplate'));
const SunsetSidebarTemplate = lazy(() => import('../templates/SunsetSidebarTemplate'));
const NavyGoldTemplate = lazy(() => import('../templates/NavyGoldTemplate'));
const RoseBlushTemplate = lazy(() => import('../templates/RoseBlushTemplate'));
const SlateAmberTemplate = lazy(() => import('../templates/SlateAmberTemplate'));
const ForestLimeTemplate = lazy(() => import('../templates/ForestLimeTemplate'));
const TealCyanTemplate = lazy(() => import('../templates/TealCyanTemplate'));
const NavyGoldExecutiveTemplate = lazy(() => import('../templates/NavyGoldExecutiveTemplate'));
const DeepTealEmeraldTemplate = lazy(() => import('../templates/DeepTealEmeraldTemplate'));
const BurgundyBlushEleganceTemplate = lazy(() => import('../templates/BurgundyBlushEleganceTemplate'));
const SlateBlueSilverTemplate = lazy(() => import('../templates/SlateBlueSilverTemplate'));
const CharcoalAmberProTemplate = lazy(() => import('../templates/CharcoalAmberProTemplate'));
const AuroraGlowTemplate = lazy(() => import('../templates/AuroraGlowTemplate'));
const SapphireEleganceTemplate = lazy(() => import('../templates/SapphireEleganceTemplate'));
const ForestCanopyTemplate = lazy(() => import('../templates/ForestCanopyTemplate'));
const CrimsonSummitTemplate = lazy(() => import('../templates/CrimsonSummitTemplate'));
const OceanicCalmTemplate = lazy(() => import('../templates/OceanicCalmTemplate'));
const RoyalIndigoEleganceTemplate = lazy(() => import('../templates/RoyalIndigoEleganceTemplate'));
const VerdantSageTemplate = lazy(() => import('../templates/VerdantSageTemplate'));
const CrimsonRoseVelvetTemplate = lazy(() => import('../templates/CrimsonRoseVelvetTemplate'));
const SlateSilverPrecisionTemplate = lazy(() => import('../templates/SlateSilverPrecisionTemplate'));
const CharcoalAmberNoirTemplate = lazy(() => import('../templates/CharcoalAmberNoirTemplate'));
const ClassicNavyExecutiveTemplate = lazy(() => import('../templates/ClassicNavyExecutiveTemplate'));
const CharcoalCorporateTemplate = lazy(() => import('../templates/CharcoalCorporateTemplate'));
const NeonCreativeTemplate = lazy(() => import('../templates/NeonCreativeTemplate'));
const ArtDecoEleganceTemplate = lazy(() => import('../templates/ArtDecoEleganceTemplate'));
const MonoCleanTemplate = lazy(() => import('../templates/MonoCleanTemplate'));
const AiryLightTemplate = lazy(() => import('../templates/AiryLightTemplate'));
const TechModernTemplate = lazy(() => import('../templates/TechModernTemplate'));
const GlassEffectTemplate = lazy(() => import('../templates/GlassEffectTemplate'));
const SunsetRetroTemplate = lazy(() => import('../templates/SunsetRetroTemplate'));
const CoralFreshTemplate = lazy(() => import('../templates/CoralFreshTemplate'));
const SlateExecutiveProTemplate = lazy(() => import('../templates/SlateExecutiveProTemplate'));
const GeometricCreativeEdgeTemplate = lazy(() => import('../templates/GeometricCreativeEdgeTemplate'));
const CleanMonoMinimalTemplate = lazy(() => import('../templates/CleanMonoMinimalTemplate'));
const SoftCyanMinimalTemplate = lazy(() => import('../templates/SoftCyanMinimalTemplate'));
const TechStartupModernTemplate = lazy(() => import('../templates/TechStartupModernTemplate'));
const ModernGreenTechTemplate = lazy(() => import('../templates/ModernGreenTechTemplate'));
const ElegantCoralTemplate = lazy(() => import('../templates/ElegantCoralTemplate'));
const WarmPeachElegantTemplate = lazy(() => import('../templates/WarmPeachElegantTemplate'));

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
  'vibrant-violet': VibrantVioletTemplate,
  'emerald-executive': EmeraldExecutiveTemplate,
  'coral-creative-grid': CoralCreativeGridTemplate,
  'indigo-timeline-pro': IndigoTimelineProTemplate,
  'sunset-sidebar': SunsetSidebarTemplate,
  'navy-gold': NavyGoldTemplate,
  'rose-blush': RoseBlushTemplate,
  'slate-amber': SlateAmberTemplate,
  'forest-lime': ForestLimeTemplate,
  'teal-cyan': TealCyanTemplate,
  'navy-gold-executive': NavyGoldExecutiveTemplate,
  'deep-teal-emerald': DeepTealEmeraldTemplate,
  'burgundy-blush-elegance': BurgundyBlushEleganceTemplate,
  'slate-blue-silver': SlateBlueSilverTemplate,
  'charcoal-amber-pro': CharcoalAmberProTemplate,
  'aurora-glow': AuroraGlowTemplate,
  'sapphire-elegance': SapphireEleganceTemplate,
  'forest-canopy': ForestCanopyTemplate,
  'crimson-summit': CrimsonSummitTemplate,
  'oceanic-calm': OceanicCalmTemplate,
  'royal-indigo-elegance': RoyalIndigoEleganceTemplate,
  'verdant-sage': VerdantSageTemplate,
  'crimson-rose-velvet': CrimsonRoseVelvetTemplate,
  'slate-silver-precision': SlateSilverPrecisionTemplate,
  'charcoal-amber-noir': CharcoalAmberNoirTemplate,
  'classic-navy-executive': ClassicNavyExecutiveTemplate,
  'charcoal-corporate': CharcoalCorporateTemplate,
  'neon-creative': NeonCreativeTemplate,
  'art-deco-elegance': ArtDecoEleganceTemplate,
  'mono-clean': MonoCleanTemplate,
  'airy-light': AiryLightTemplate,
  'tech-modern': TechModernTemplate,
  'glass-effect': GlassEffectTemplate,
  'sunset-retro': SunsetRetroTemplate,
  'coral-fresh': CoralFreshTemplate,
  'slate-executive-pro': SlateExecutiveProTemplate,
  'geometric-creative-edge': GeometricCreativeEdgeTemplate,
  'clean-mono-minimal': CleanMonoMinimalTemplate,
  'soft-cyan-minimal': SoftCyanMinimalTemplate,
  'tech-startup-modern': TechStartupModernTemplate,
  'modern-green-tech': ModernGreenTechTemplate,
  'elegant-coral': ElegantCoralTemplate,
  'warm-peach-elegant': WarmPeachElegantTemplate,
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
