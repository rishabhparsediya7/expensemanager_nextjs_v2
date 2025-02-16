const Loader: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent"></div>
    </div>
  );
};

export default Loader;
