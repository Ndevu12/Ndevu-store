import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`px-3 py-1 ${i === currentPage ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="flex justify-center items-center gap-2">
      <button onClick={handlePrevious} disabled={currentPage === 1}>
        &lt;
      </button>
      {renderPageNumbers()}
      <button onClick={handleNext} disabled={currentPage === totalPages}>
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
