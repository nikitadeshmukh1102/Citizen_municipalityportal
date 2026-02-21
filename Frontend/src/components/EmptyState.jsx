const EmptyState = ({ message }) => {
  return (
    <div className="text-center py-10 text-gray-500">
      {message || 'No records found'}
    </div>
  );
};

export default EmptyState;
