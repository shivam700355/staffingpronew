import React from 'react';
import {
  Laptop,
  DollarSign,
  Heart,
  TrendingUp,
  Users,
  Headphones,
  Settings,
  BookOpen,
  Truck,
  PenTool
} from 'lucide-react';
import { CATEGORIES } from '../data';
import { jobCategory } from '../api';

interface CategoryGridProps {
  onSelectCategory: (categoryName: string) => void;
}

export default function CategoryGrid({ onSelectCategory }: CategoryGridProps) {

  const [categories, setCategories] = React.useState(CATEGORIES);
  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await jobCategory();
        
        const dataArray = Array.isArray(response?.data) ? response.data : [];

        const categoriesWithCounts = CATEGORIES.map((cat) => {
          const catName = cat.name.toLowerCase();

          const matchedItem = dataArray.find((item: any) => {
            if (!item) return false;
            const itemName = String(item.name || '').toLowerCase();
            const itemSlug = String(item.slug || '').toLowerCase();

            if (itemName && itemName === catName) return true;
            if (itemSlug && itemSlug === catName.replace(/\s+/g, '-')) return true;
            if (itemName && catName.includes(itemName)) return true;
            if (itemName && itemName.includes(catName)) return true;
            if (itemSlug && catName.includes(itemSlug.replace(/-/g, ' '))) return true;
            if (itemName && itemName.includes(catName.replace(/ui\/ux\s*/g, ''))) return true;
            return false;
          });

          const count = Number(matchedItem?.job_count ?? matchedItem?.count ?? 0) || 0;
          return { ...cat, jobsCount: count };
        });

        setCategories(categoriesWithCounts);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Map identifier to Lucide component
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'laptop':
      case 'laptop-outline':
        return Laptop;
      case 'dollar':
      case 'dollar-sign':
        return DollarSign;
      case 'heart':
        return Heart;
      case 'trending-up':
        return TrendingUp;
      case 'users':
        return Users;
      case 'headphones':
      case 'headphone':
        return Headphones;
      case 'settings':
      case 'gear':
        return Settings;
      case 'book':
      case 'book-open':
        return BookOpen;
      case 'truck':
        return Truck;
      case 'pen-tool':
      case 'pen':
        return PenTool;
      default:
        return Laptop;
    }
  };

  return (
    <section className="py-16 bg-sp-bg" id="browse-by-categories-panel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title details */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-sp-navy tracking-tight mb-3">
            Browse by Category
          </h2>
          <p className="text-base text-gray-500 font-medium">
            Choose a sector of interest to view specific job openings and experience criteria instantly.
          </p>
        </div>

        {/* 5-column, 10-card responsive grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {categories.map((cat) => {
            const Icon = getCategoryIcon(cat.iconName);
            
            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.name)}
                className="bg-white border border-gray-100 rounded-xl p-5.5 flex flex-col items-center text-center cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:bg-sp-navy group hover:shadow-md"
                id={`cat-card-${cat.id}`}
              >
                {/* Accent icon background circle */}
                <div className="h-12 w-12 rounded-lg bg-sp-green-light text-sp-green flex items-center justify-center mb-4 transition-colors group-hover:bg-sp-green group-hover:text-white">
                  <Icon className="h-6 w-6 font-semibold" />
                </div>

                <h3 className="text-sm sm:text-base font-bold text-sp-navy group-hover:text-white transition-colors mb-1 line-clamp-1">
                  {cat.name}
                </h3>
                
                <p className="text-xs text-gray-400 font-bold group-hover:text-gray-300 transition-colors">
                  {cat.jobsCount} Open Jobs
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
