import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { Home, SearchResults, RestaurantDetail, Categories, Favorites } from '@/pages';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/restaurant/:placeId" element={<RestaurantDetail />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/map" element={<SearchResults />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
