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
const TechTemplate = lazy(() => import('../templates/TechTemplate'));
const StartupTemplate = lazy(() => import('../templates/StartupTemplate'));
const AcademicTemplate = lazy(() => import('../templates/AcademicTemplate'));
const ElegantTemplate = lazy(() => import('../templates/ElegantTemplate'));
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

const TEMPLATE_MAP: Record<string, React.LazyExoticComponent<React.ComponentType<{ data: ResumeData }>>> = {
  modern: ModernTemplate,
  professional: ProfessionalTemplate,
  minimalist: MinimalistTemplate,
  executive: ExecutiveTemplate,
  creative: CreativeTemplate,
  compact: CompactTemplate,
  tech: TechTemplate,
  startup: StartupTemplate,
  academic: AcademicTemplate,
  elegant: ElegantTemplate,
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
};

const LoadingFallback: React.FC = () => (
  <div className="w-full h-full min-h-[1000px] bg-white flex items-center justify-center">
    <div className="animate-pulse text-text-muted text-sm">Loading template...</div>
  </div>
);

export const LivePreview: React.FC<LivePreviewProps> = ({ data, templateId }) => {
  const TemplateComponent = TEMPLATE_MAP[templateId] || ElegantTemplate;

  return (
    <Suspense fallback={<LoadingFallback />}>
      <TemplateComponent data={data} />
    </Suspense>
  );
};
