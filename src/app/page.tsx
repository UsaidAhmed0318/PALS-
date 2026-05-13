import HeroSlider from '@/components/Heroslider/HeroSlider';
import CategorySection from '@/components/home/CategorySection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import PromoSection from '@/components/home/PromoSection';
import Newsletter from '@/components/home/Newsletter';

export const metadata = {
  title: 'EoriCart — Sab Sasta Hai | Best Online Grocery Store Pakistan',
  description:
    'Shop groceries, household essentials and daily items at the best prices. Fast delivery across Pakistan. Cash on delivery available.',
  openGraph: {
    title: 'EoriCart — Sab Sasta Hai',
    description:
      'Pakistan\'s trusted online grocery store. Best prices, fast delivery.',
    url: '/',
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <CategorySection />
      <FeaturedProducts
        title="Featured Products"
        subtitle="Handpicked for You"
        limit={8}
        bg="white"
      />
      <PromoSection />
      <FeaturedProducts
        title="New Arrivals"
        subtitle="Just Added"
        orderBy="creation desc"
        limit={8}
        bg="light"
      />
      <Newsletter />
    </>
  );
}
