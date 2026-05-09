'use client';

import {
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  MagnifyingGlassIcon,
  UserIcon,
  ShoppingCartIcon,
  PhoneIcon,
  XMarkIcon,
  Bars3Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import { useSession } from '@/components/providers/SessionProvider';
import { useCategories } from '@/lib/hooks/useCategories';
import { useCart } from '@/components/cart/CartContext';
import { useSearchProducts } from '@/lib/hooks/useSearchProducts';
import logoImg from '@/assets/Eori Cart/eoricart-logo.png';
import styles from './Header.module.css';

const ERPNEXT_URL = process.env.NEXT_PUBLIC_ERPNEXT_URL || '';

function buildImg(path?: string | null) {
  if (!path) return null;
  return path.startsWith('http') ? path : `${ERPNEXT_URL}${path}`;
}

/* ─── Search dropdown ─────────────────────────────── */
function SearchDropdown({
  query,
  onSelect,
}: {
  query: string;
  onSelect: () => void;
}) {
  const { data: results, isLoading } = useSearchProducts(query);
  const router = useRouter();

  if (query.trim().length < 2) return null;

  const handleClick = (itemCode: string) => {
    router.push(`/products/${encodeURIComponent(itemCode)}`);
    onSelect();
  };

  const handleViewAll = () => {
    router.push(`/products?search=${encodeURIComponent(query.trim())}`);
    onSelect();
  };

  return (
    <div className={styles.dropdown}>
      {isLoading ? (
        <div className={styles.dropdownLoading}>
          <span className={styles.dropdownSpinner} />
          Searching...
        </div>
      ) : results && results.length > 0 ? (
        <>
          <ul className={styles.dropdownList}>
            {results.map((item) => {
              const imgUrl = buildImg(item.image);
              return (
                <li key={item.item_code}>
                  <button
                    className={styles.dropdownItem}
                    onClick={() => handleClick(item.item_code)}
                    type="button"
                  >
                    <div className={styles.dropdownThumb}>
                      {imgUrl ? (
                        <Image
                          src={imgUrl}
                          alt={item.item_name}
                          fill
                          sizes="40px"
                          style={{ objectFit: 'contain' }}
                        />
                      ) : (
                        <MagnifyingGlassIcon className={styles.dropdownThumbIcon} />
                      )}
                    </div>
                    <div className={styles.dropdownInfo}>
                      <span className={styles.dropdownName}>{item.item_name}</span>
                      {item.item_group && (
                        <span className={styles.dropdownCat}>{item.item_group}</span>
                      )}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
          <button className={styles.dropdownViewAll} onClick={handleViewAll} type="button">
            <MagnifyingGlassIcon className={styles.dropdownViewAllIcon} />
            View all results for &quot;{query}&quot;
          </button>
        </>
      ) : (
        <div className={styles.dropdownEmpty}>
          No products found for &quot;{query}&quot;
        </div>
      )}
    </div>
  );
}

/* ─── Main Header ─────────────────────────────────── */
export default function Header() {
  const { user, isLoggedIn } = useSession();
  const { count, toggleCart } = useCart();
  const { data: catData } = useCategories();
  const categories = catData?.data || [];
  const pathname = usePathname();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState('');

  const scrollRef = useRef<HTMLDivElement>(null);
  const searchWrapRef = useRef<HTMLDivElement>(null);

  /* debounce search */
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(t);
  }, [searchQuery]);

  /* close dropdown on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchWrapRef.current && !searchWrapRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const scrollCats = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -240 : 240, behavior: 'smooth' });
  };

  const closeMobile = () => setMobileOpen(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowDropdown(false);
    }
  };

  const closeDropdown = useCallback(() => {
    setShowDropdown(false);
    setSearchQuery('');
  }, []);

  return (
    <>
      <header className={styles.header}>
        {/* Promo strip */}
        <div className={styles.topBar}>
          Free Delivery on Orders Above Rs. 2,000 &nbsp;·&nbsp; Cash on
          Delivery &nbsp;·&nbsp; 100% Authentic Products
        </div>

        {/* Main row — 3-column grid for true centering */}
        <div className={styles.mainRow}>
          {/* Left: hamburger + logo */}
          <div className={styles.logoSection}>
            <button
              className={styles.hamburger}
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Bars3Icon className={styles.hamburgerIcon} />
            </button>

            <Link href="/" className={styles.logoLink}>
              <Image
                src={logoImg}
                alt="EoriCart"
                className={styles.logoImage}
                priority
              />
            </Link>
          </div>

          {/* Center: search bar */}
          <div className={styles.searchSection} ref={searchWrapRef}>
            <form className={styles.searchForm} onSubmit={handleSearch}>
              <MagnifyingGlassIcon className={styles.searchPrefixIcon} />
              <input
                type="search"
                className={styles.searchInput}
                placeholder="Search products, brands, categories..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowDropdown(e.target.value.trim().length >= 2);
                }}
                onFocus={() => {
                  if (searchQuery.trim().length >= 2) setShowDropdown(true);
                }}
                aria-label="Search products"
                autoComplete="off"
              />
              {searchQuery && (
                <button
                  type="button"
                  className={styles.searchClear}
                  onClick={() => { setSearchQuery(''); setShowDropdown(false); }}
                  aria-label="Clear search"
                >
                  <XMarkIcon className={styles.searchClearIcon} />
                </button>
              )}
              <button type="submit" className={styles.searchBtn} aria-label="Search">
                Search
              </button>
            </form>

            {showDropdown && (
              <SearchDropdown
                query={debouncedQuery}
                onSelect={closeDropdown}
              />
            )}
          </div>

          {/* Right: actions */}
          <div className={styles.actionsSection}>
            {isLoggedIn ? (
              <Link href="/dashboard/profile" className={styles.actionBtn}>
                <UserIcon className={styles.actionIcon} />
                <span className={styles.actionLabel}>
                  {user?.fullName?.split(' ')[0] || 'Account'}
                </span>
              </Link>
            ) : (
              <Link href="/auth" className={styles.actionBtn}>
                <UserIcon className={styles.actionIcon} />
                <span className={styles.actionLabel}>Login</span>
              </Link>
            )}

            <Link href="/contact" className={`${styles.actionBtn} ${styles.hideOnMobile}`}>
              <PhoneIcon className={styles.actionIcon} />
              <span className={styles.actionLabel}>Contact</span>
            </Link>

            <button
              className={styles.actionBtn}
              onClick={toggleCart}
              aria-label={`Cart (${count} items)`}
            >
              <ShoppingCartIcon className={styles.actionIcon} />
              <span className={styles.actionLabel}>Cart</span>
              {count > 0 && (
                <span className={styles.cartBadge}>
                  {count > 99 ? '99+' : count}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Category scroll bar */}
        <nav className={styles.catBar} aria-label="Product categories">
          <div className={styles.catBarInner}>
            <button
              className={styles.catArrow}
              onClick={() => scrollCats('left')}
              aria-label="Scroll left"
            >
              <ChevronLeftIcon className={styles.catArrowIcon} />
            </button>

            <div className={styles.catScroll} ref={scrollRef}>
              <ul className={styles.catList}>
                <li>
                  <Link
                    href="/products"
                    className={`${styles.catLink} ${pathname === '/products' ? styles.catLinkActive : ''}`}
                  >
                    All Products
                  </Link>
                </li>
                {(categories as any[]).map((cat) => (
                  <li key={cat.name}>
                    <Link
                      href={`/products?category=${encodeURIComponent(cat.name)}`}
                      className={styles.catLink}
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <button
              className={styles.catArrow}
              onClick={() => scrollCats('right')}
              aria-label="Scroll right"
            >
              <ChevronRightIcon className={styles.catArrowIcon} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay */}
      <div
        className={`${styles.mobileOverlay} ${mobileOpen ? styles.mobileOverlayOpen : ''}`}
        onClick={closeMobile}
        aria-hidden="true"
      />

      {/* Mobile drawer */}
      <div
        className={`${styles.mobileDrawer} ${mobileOpen ? styles.mobileDrawerOpen : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className={styles.drawerTop}>
          <Image src={logoImg} alt="EoriCart" height={36} style={{ width: 'auto' }} />
          <button
            className={styles.drawerClose}
            onClick={closeMobile}
            aria-label="Close menu"
          >
            <XMarkIcon className={styles.drawerCloseIcon} />
          </button>
        </div>

        <form
          className={styles.drawerSearch}
          onSubmit={(e) => { handleSearch(e); closeMobile(); }}
        >
          <MagnifyingGlassIcon className={styles.drawerSearchIcon} />
          <input
            type="search"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        <nav className={styles.drawerNav}>
          <Link href="/" className={styles.drawerLink} onClick={closeMobile}>Home</Link>
          <Link href="/products" className={styles.drawerLink} onClick={closeMobile}>All Products</Link>
          <Link href="/contact" className={styles.drawerLink} onClick={closeMobile}>Contact Us</Link>

          {isLoggedIn ? (
            <>
              <Link href="/dashboard/profile" className={styles.drawerLink} onClick={closeMobile}>My Account</Link>
              <Link href="/dashboard/orders" className={styles.drawerLink} onClick={closeMobile}>My Orders</Link>
            </>
          ) : (
            <Link href="/auth" className={styles.drawerLink} onClick={closeMobile}>Login / Register</Link>
          )}

          {(categories as any[]).length > 0 && (
            <>
              <div className={styles.drawerDivider} />
              <p className={styles.drawerSectionTitle}>Categories</p>
              {(categories as any[]).map((cat) => (
                <Link
                  key={cat.name}
                  href={`/products?category=${encodeURIComponent(cat.name)}`}
                  className={styles.drawerCatLink}
                  onClick={closeMobile}
                >
                  {cat.name}
                </Link>
              ))}
            </>
          )}
        </nav>
      </div>
    </>
  );
}
