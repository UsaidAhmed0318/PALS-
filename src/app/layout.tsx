import '../styles/base.css';
import '../styles/theme.css';

import { QueryProvider } from '@/components/providers/QueryProvider';
import { SessionProvider } from '@/components/providers/SessionProvider';
import { CartProvider } from '@/components/cart/CartContext';
import CartDrawer from '@/components/cart/CartDrawer';
import Header from '@/components/Header/Header';
import Footer from '@/components/footer/Footer';

export const metadata = {
  metadataBase: new URL(
    process.env.NEXTAUTH_URL || 'https://eoricart.com',
  ),
  title: {
    default: 'EoriCart — Sab Sasta Hai | Best Online Grocery Store Pakistan',
    template: '%s | EoriCart',
  },
  description:
    'Shop groceries, household essentials and daily items at the best prices. Fast delivery across Pakistan. Cash on delivery available.',
  keywords: [
    'online grocery Pakistan',
    'grocery delivery Pakistan',
    'sasta grocery',
    'EoriCart',
    'household essentials',
    'daily groceries online',
  ],
  authors: [{ name: 'EoriCart' }],
  creator: 'EoriCart',
  openGraph: {
    type: 'website',
    locale: 'en_PK',
    siteName: 'EoriCart',
    title: 'EoriCart — Sab Sasta Hai',
    description:
      'Pakistan\'s trusted online grocery store. Shop essentials at the best prices with fast delivery.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EoriCart — Sab Sasta Hai',
    description:
      'Pakistan\'s trusted online grocery store. Best prices, fast delivery.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <SessionProvider>
            <CartProvider>
              <Header />
              <main>{children}</main>
              <Footer />
              <CartDrawer />
            </CartProvider>
          </SessionProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
