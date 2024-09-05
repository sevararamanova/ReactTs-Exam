import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { setResults, setStatus, setError } from '../../redux/slices/searchSlices';
import axios from 'axios';
import 'aos/dist/aos.css';
import AOS from 'aos';
import placeholder from '../../images/placeholder.webp'; // Placeholder image

const BASE_URL = import.meta.env.VITE_BASE_URL;

const SearchResultsPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const query = useSelector((state: RootState) => state.search.query);
  const brand = useSelector((state: RootState) => state.search.brand); // Brand filter
  const productType = useSelector((state: RootState) => state.search.productType); // Product type filter
  const results = useSelector((state: RootState) => state.search.results);
  const status = useSelector((state: RootState) => state.search.status);
  const error = useSelector((state: RootState) => state.search.error);

  useEffect(() => {
    if (query) {
      dispatch(setStatus('loading'));

      // Construct the query string based on available filters
      let url = `${BASE_URL}?search=${query}`;
      if (brand) {
        url += `&brand=${brand}`;
      }
      if (productType) {
        url += `&product_type=${productType}`;
      }

      axios.get(url)
        .then((response) => {
          const sortedResults = response.data
            .filter((item: any) => item.name.toLowerCase().includes(query.toLowerCase()))
            .concat(response.data.filter((item: any) => !item.name.toLowerCase().includes(query.toLowerCase())));

          dispatch(setResults(sortedResults));
          dispatch(setStatus('succeeded'));
        })
        .catch((err) => {
          dispatch(setError(err.message));
          dispatch(setStatus('failed'));
        });
    }
  }, [query, brand, productType, dispatch]);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-black text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Search Results</h1>
        </div>
      </header>
      <main className="container mx-auto py-6 px-4">
        <h1 className="text-2xl font-bold mb-4">Search Results for: {query}</h1>
        {status === 'loading' && <p className="text-center">Loading...</p>}
        {status === 'failed' && <p className="text-center text-red-500">Error: {error}</p>}
        {status === 'succeeded' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {results.length > 0 ? (
              results.map((result: any) => (
                <div
                  key={result.id}
                  className="relative border p-4 rounded shadow-lg bg-white"
                  data-aos="fade-up"
                >
                  <div className="w-full h-48 mb-4">
                    <img
                      src={result.image_link || placeholder}
                      alt={result.name}
                      className="w-full h-full object-cover rounded"
                      onError={(e) => (e.currentTarget.src = placeholder)}
                    />
                  </div>
                  <h2 className="text-lg font-semibold mb-2">{result.name}</h2>
                  <p className="text-gray-700">{result.brand}</p>
                  <p className="text-gray-700">
                    {result.price_sign || '$'}{result.price} {result.currency}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center col-span-full">No results found.</p>
            )}
          </div>
        )}
      </main>
      <footer className="bg-black text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} SR Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default SearchResultsPage;
