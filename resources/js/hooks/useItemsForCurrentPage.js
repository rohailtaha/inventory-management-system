import { useSelector } from 'react-redux';

export default function useItemsForCurrentPage(items) {
  const pagination = useSelector(state => state.pagination);

  const itemsForCurrentPage = () =>
    items.slice(
      initialItemIndexForCurrentPage(),
      initialItemIndexForCurrentPage() + pagination.itemsPerPage
    );

  const initialItemIndexForCurrentPage = () =>
    (pagination.currentPage - 1) * pagination.itemsPerPage;

  return itemsForCurrentPage();
}
