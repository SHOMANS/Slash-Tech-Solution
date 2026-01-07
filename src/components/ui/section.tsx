import * as React from "react"
import { cn } from "@/lib/utils"

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  containerClassName?: string
}

export function Section({
  className,
  containerClassName,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "relative py-20 lg:py-32",
        className
      )}
      {...props}
    >
      <div className={cn("container mx-auto px-4 sm:px-6 lg:px-8", containerClassName)}>
        {children}
      </div>
    </section>
  )
}

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle?: string
  description?: string
}

export function SectionHeader({
  title,
  subtitle,
  description,
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={cn("text-center mb-16", className)}
      {...props}
    >
      {subtitle && (
        <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
          {subtitle}
        </p>
      )}
      <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          {description}
        </p>
      )}
    </div>
  )
}
