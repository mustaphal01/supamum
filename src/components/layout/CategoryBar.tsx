export default function CategoryBar() {
    const categories = [
      'Baby Products',
      'Beauty',
      'Fashion',
      'Household',
      'Electronics'
    ];
  
    return (
      <div className="scrollbar-hide overflow-x-auto whitespace-nowrap bg-gray-100 px-4 py-2">
        {categories.map((category) => (
          <button
            key={category}
            className="mr-2 rounded-full bg-white px-4 py-1 text-sm font-medium text-gray-700 shadow-sm hover:bg-purple-50"
          >
            {category}
          </button>
        ))}
      </div>
    );
  }
  