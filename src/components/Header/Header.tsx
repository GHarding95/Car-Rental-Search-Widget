import { memo } from 'react'

interface HeaderProps {
  title: string
  subtitle: string
}

export const Header = memo(({ title, subtitle }: HeaderProps) => {
  return (
    <header className="widget-header" role="banner">
      <h1 className="main-title">{title}</h1>
      <p className="subtitle" role="doc-subtitle">{subtitle}</p>
    </header>
  )
})
