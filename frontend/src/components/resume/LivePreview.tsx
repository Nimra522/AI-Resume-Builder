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
