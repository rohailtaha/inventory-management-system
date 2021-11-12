import PreviousPageButton from './navigation-buttons/PreviousPageButton';
import NextPageButton from './navigation-buttons/NextPageButton';
import Page from './Page';

export default function PagesList({ currentPage, totalPages }) {
  const endPagesNotReached = () => currentPage + 2 <= totalPages;

  const getPageNumbers = () => {
    const pageNumbers = [];

    if (endPagesNotReached()) {
      for (
        let pageNumber = currentPage;
        pageNumber <= currentPage + 2;
        pageNumber++
      ) {
        pageNumbers.push(pageNumber);
      }
    } else {
      for (
        let pageNumber = totalPages - 2;
        pageNumber <= totalPages;
        pageNumber++
      ) {
        if (pageNumber > 0) pageNumbers.push(pageNumber);
      }
    }
    return pageNumbers;
  };

  const disablePreviousPageButton = () => currentPage === 1;

  const disableNextPageButton = () => currentPage === totalPages;

  return (
    <ul className='pages__list d-flex justify-content-center ps-0'>
      <PreviousPageButton
        disabled={disablePreviousPageButton()}
        currentPage={currentPage}
      />
      {getPageNumbers().map(pageNumber => (
        <Page
          key={pageNumber}
          pageNumber={pageNumber}
          active={pageNumber === currentPage}
        />
      ))}
      <NextPageButton
        disabled={disableNextPageButton()}
        currentPage={currentPage}
      />
    </ul>
  );
}
