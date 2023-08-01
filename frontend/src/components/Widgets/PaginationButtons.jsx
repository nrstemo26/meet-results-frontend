import React from 'react';

const PaginationButtons = ({ currentPage, totalPages, setCurrentPage, fetchUsers }) => {
  const renderLinkButton = (pageNumber) => (
    <button
      key={pageNumber}
      onClick={() => setCurrentPage(pageNumber)}
      disabled={currentPage === pageNumber}
      className={`px-1 sm:px-3 py-1 text-sm rounded-md mx-1 ${currentPage === pageNumber ? 'bg-primary-950 text-white' : 'bg-white text-primary-950 hover:bg-primary-50'}`}
    >
      {pageNumber}
    </button>
  );

  const renderEllipsis = (key) => <span key={key}>...</span>;

  const buttons = [];

  // Previous button
  buttons.push(
    <button
      key="prev"
      onClick={() => setCurrentPage(currentPage - 1)}
      disabled={currentPage === 1}
      className="px-1 sm:px-3 py-1 text-sm rounded-md mx-1 bg-white text-primary-950 hover:bg-primary-50"
    >
      Previous
    </button>
  );

  // First page
  if (currentPage > 1) {
    buttons.push(renderLinkButton(1));
  }

  const maxVisiblePages = 3; // Show up to 3 pages before and after the current page

  // Pages before current page
  let startPage = Math.max(2, currentPage - maxVisiblePages);
  if (currentPage - 1 > maxVisiblePages) {
    buttons.push(renderEllipsis('start'));
  }
  for (let i = startPage; i < currentPage; i++) {
    buttons.push(renderLinkButton(i));
  }

  // Current page
  buttons.push(<span key="current" className="px-1 sm:px-3 py-1 text-sm rounded-md mx-1 bg-primary-950 text-white">{currentPage}</span>);

  // Pages after current page
  let endPage = Math.min(totalPages - 1, currentPage + maxVisiblePages);
  for (let i = currentPage + 1; i <= endPage; i++) {
    buttons.push(renderLinkButton(i));
  }

  if (totalPages - currentPage > maxVisiblePages) {
    buttons.push(renderEllipsis('end'));
  }

  // Last page
  if (totalPages > 1 && totalPages - currentPage > maxVisiblePages) {
    buttons.push(renderLinkButton(totalPages));
  }

  // Next button
  buttons.push(
    <button
      key="next"
      onClick={() => setCurrentPage(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="px-1 sm:px-3 py-1 text-sm rounded-md mx-1 bg-white text-primary-950 hover:bg-primary-50"
    >
      Next
    </button>
  );

  return <div className="pagination flex flex-wrap items-center justify-center mt-4">{buttons}</div>;
};

export default PaginationButtons;
