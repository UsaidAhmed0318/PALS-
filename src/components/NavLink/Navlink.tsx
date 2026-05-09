// NavLink.tsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navlink.module.css';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  props?: any; // Additional props if needed
}

export default function NavLink({
  href,
  children,
  className,
  props,
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = decodeURIComponent(pathname) === decodeURIComponent(href);

  return (
    <Link
      {...props}
      href={href}
      className={`${className} ${isActive ? styles.active : ''}`}>
      {children}
    </Link>
  );
}
