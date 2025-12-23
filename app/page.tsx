import SearchBar from '@/components/home/SearchBar';
import CurationSlider from '@/components/home/CurationSlider';
import FilterSection from '@/components/home/FilterSection';
import GuideButton from '@/components/home/GuideButton';
import StoreList from '@/components/home/StoreList';
import MapViewButton from '@/components/home/MapViewButton';
import storesData from '@/data/stores.json';
import type { Store } from '@/types/store';

export default function Home() {
  const stores: Store[] = storesData as Store[];

  return (
    <div className="flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white">
        <div className="px-4 py-3">
          <SearchBar />
        </div>
      </header>

      {/* Curation slider */}
      <CurationSlider />

      {/* Filter section - sticky below header */}
      <div className="sticky top-[72px] z-20 bg-white border-b border-gray-100 px-4">
        <FilterSection />
      </div>

      {/* Main content */}
      <div className="px-4">

        {/* Guide button */}
        <div className="py-3">
          <GuideButton />
        </div>

        {/* Store list */}
        <div className="py-4">
          <StoreList stores={stores} />
        </div>
      </div>

      {/* Map view button */}
      <MapViewButton />
    </div>
  );
}
