import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import SearchCard from '../components/Products/ProductCard/SearchCard';
import Pagination from '../components/Pagination';
import { RootState, AppDispatch } from '../redux/store';
import { searchProducts } from '../redux/actions/searchAction';
import { Product as DisplayProduct } from '../components/Products/ProductCard/SearchCard';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResultPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const query = useQuery();
  const searchTerm = query.get('query') || '';

  const dispatch = useDispatch<AppDispatch>();
  const { loading, products, error } = useSelector((state: RootState) => state.search);

  useEffect(() => {
    if (searchTerm) {
      dispatch(
        searchProducts({
          name: searchTerm,
          sortBy: 'name',
          sortOrder: 'ASC',
          page: currentPage,
          limit: itemsPerPage
        })
      );
    }
  }, [dispatch, searchTerm, currentPage, itemsPerPage]);

  const transformedProducts: DisplayProduct[] = (Array.isArray(products?.data) ? products.data : []).map((product) => {
    return {
      id: product.id,
      name: product.name,
      price: parseInt(product.newPrice, 10),
      owner: product.vendor ? `${product.vendor.firstName} ${product.vendor.lastName}` : 'Unknown',
      image: product.images && product.images.length > 0 ? product.images[0] : ''
    };
  });

  return (
    <div className="text-baseBlack">
      <div className="w-full flex flex-col items-center justify-center gap-y-8 py-12 px-4 md:px-12">
        <div className="flex flex-col justify-center items-center">
          <h1 className="flex  text-xl text-grey2 font-medium">Search Results for &quot;{searchTerm}&quot;</h1>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <div className="w-full flex gap-y-10 justify-center flex-wrap gap-x-5 px-6 xmd:px-0">
          {transformedProducts.length > 0 ? (
            <SearchCard productList={transformedProducts} />
          ) : (
            <p>No products found.</p>
          )}
        </div>
        {(products?.pagination?.totalPages || 1) > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={products?.pagination.totalPages || 1}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>
    </div>
  );
};

export default SearchResultPage;
