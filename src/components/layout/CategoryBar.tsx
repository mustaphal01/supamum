'use client';

import { useState, useEffect } from 'react';
import { getCategories } from '../../lib/db';

export default function CategoryBar({ onCategorySelect }: { onCategorySelect: (category: string) => void }) {
  const [categories, setCategories] = useState<{ id: string, name: string }[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
    };
    fetchCategories();
  }, []);

  return (
    <div className="scrollbar-hide overflow-x-auto whitespace-nowrap bg-gray-100 px-4 py-2">
      <button
        onClick={() => onCategorySelect('')}
        className="mr-2 rounded-full bg-white px-4 py-1 text-sm font-medium text-gray-700 shadow-sm hover:bg-purple-50"
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategorySelect(category.name)}
          className="mr-2 rounded-full bg-white px-4 py-1 text-sm font-medium text-gray-700 shadow-sm hover:bg-purple-50"
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}