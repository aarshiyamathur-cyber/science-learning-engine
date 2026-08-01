export interface PageHeaderProps {
  title: string;
  description: string;
}

/**
 * Shared page title + description block, used at the top of every
 * Command Centre page so heading typography stays consistent across pages.
 */
export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">{title}</h1>
      <p className="mt-2 max-w-2xl text-base text-slate-600">{description}</p>
    </div>
  );
}
