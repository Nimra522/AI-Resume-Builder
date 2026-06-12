import React from 'react';
import { LucideIcon } from 'lucide-react';

export type CardVariant = 'section' | 'info' | 'content' | 'settings';

interface CardProps {
  /** Card title */
  title: string;
  /** Optional subtitle (settings variant) */
  subtitle?: string;
  /** Main text content (section, info, content variants) */
  description?: string;
  /** Extra emphasized line (info variant only) */
  detail?: string;
  /** Optional icon */
  icon?: LucideIcon;
  /** Custom content - when provided, renders as container (settings variant) */
  children?: React.ReactNode;
  /** Footer section (settings variant) */
  footer?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Animation delay for section variant */
  delay?: string;
  /** Danger styling (red border, red header) */
  danger?: boolean;
  /** Layout variant */
  variant?: CardVariant;
}

/**
 * Unified Card component replacing SectionCard, InfoCard, PolicyCard, SettingsCard.
 *
 * Usage:
 * - SectionCard: <Card variant="section" title="..." description="..." icon={...} delay="0.1s" />
 * - InfoCard:    <Card variant="info" title="..." description="..." detail="..." icon={...} />
 * - PolicyCard:  <Card variant="content" title="..." description="..." icon={...} />
 * - SettingsCard: <Card variant="settings" title="..." subtitle="..." footer={...} danger>...</Card>
 */
export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  description,
  detail,
  icon: Icon,
  children,
  footer,
  className = '',
  delay = '0s',
  danger = false,
  variant = 'content',
}) => {
  const iconBoxClass = variant === 'section'
    ? 'w-12 h-12 bg-indigo-50 text-primary rounded-xl flex items-center justify-center'
    : 'p-2.5 bg-indigo-50 text-primary rounded-lg shrink-0';
  const iconSize = variant === 'section' ? 24 : 22;

  // Settings variant: container with header, body, optional footer
  if (variant === 'settings') {
    return (
      <div
        className={`bg-white rounded-xl shadow-sm border overflow-hidden h-fit ${
          danger ? 'border-red-100' : 'border-gray-200'
        } ${className}`}
      >
        <div
          className={`p-6 border-b ${
            danger ? 'border-red-50 bg-red-50/30' : 'border-gray-100'
          }`}
        >
          <h3
            className={`text-lg font-bold ${
              danger ? 'text-red-700' : 'text-text-main'
            }`}
          >
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm text-text-muted mt-1">{subtitle}</p>
          )}
        </div>
        <div className="p-6 space-y-6">{children}</div>
        {footer && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
            {footer}
          </div>
        )}
      </div>
    );
  }

  // Section variant: stacked layout with animation
  if (variant === 'section') {
    return (
      <div
        className={`bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 flex flex-col items-start h-full animate-fade-in-up ${className}`}
        style={{ animationDelay: delay }}
      >
        {Icon && (
          <div className={`${iconBoxClass} mb-6`}>
            <Icon size={iconSize} />
          </div>
        )}
        <h3 className="text-xl font-bold text-text-main mb-3">{title}</h3>
        <p className="text-text-muted leading-relaxed">{description}</p>
      </div>
    );
  }

  // Info variant: row layout with description + detail
  if (variant === 'info') {
    return (
      <div
        className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 ${className}`}
      >
        {Icon && (
          <div className={iconBoxClass}>
            <Icon size={iconSize} />
          </div>
        )}
        <div>
          <h3 className="font-bold text-text-main text-lg mb-1">{title}</h3>
          <p className="text-sm text-text-muted mb-2">{description}</p>
          <p className="font-medium text-text-main">{detail}</p>
        </div>
      </div>
    );
  }

  // Content variant (default): row layout, PolicyCard style
  return (
    <div
      className={`bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}
    >
      <div className="flex items-start gap-4">
        {Icon && (
          <div className={iconBoxClass}>
            <Icon size={iconSize} />
          </div>
        )}
        <div>
          <h3 className="font-bold text-text-main text-lg mb-2">{title}</h3>
          <p className="text-sm text-text-muted leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
