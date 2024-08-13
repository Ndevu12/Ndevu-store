import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setCategoryObj, setCurrentCategory } from '../../redux/reducers/categoryReducer';
import { Category } from '../Products/ProductCard/ClientProductCard';

interface CategoriesMenu {
  setShowMenu?: React.Dispatch<React.SetStateAction<any>>;
}

const CategoriesMenu = ({ setShowMenu }: CategoriesMenu) => {
  const { categories, currentCategory } = useSelector((state: RootState) => state.category);
  const sortedCategoriesArray = Object.entries(categories).sort(([, a], [, b]) => b - a);
  const [isMobile] = useState(window.innerWidth < 700);
  const [displayedCategories, setDisplayedCategories] = useState<JSX.Element[]>([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const categoryArray = sortedCategoriesArray.slice(0, 7).map(([category]) => {
      const style = currentCategory.toLowerCase() === category.toLowerCase() ? 'border-b-2' : 'hover:border-b-2';

      return (
        <a
          onClick={(event) => categoryHandler(event)}
          href="#products"
          title={category}
          key={category}
          className={`${style} border-orange cursor-pointer`}
        >
          {category.length > 10 && !isMobile ? category.slice(0, 10).trim() + '...' : category}{' '}
        </a>
      );
    });

    setDisplayedCategories(categoryArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories, currentCategory]);

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCategories = async () => {
    await axios
      .get(`${import.meta.env.VITE_APP_API_URL}/product/categories`)
      .then((response) => {
        const resCategories: { [name: string]: number } = {};
        response.data.categories.forEach((category: Category) => {
          const name = category.name.charAt(0).toUpperCase() + category.name.slice(1);
          resCategories[name] = category.products.length;
        });

        const updatedCategories = { ...categories, ...resCategories };
        dispatch(setCategoryObj(updatedCategories));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const categoryHandler = (event: any) => {
    if ((event.target as HTMLParagraphElement).title === 'Shop') {
      dispatch(setCurrentCategory(''));
    } else {
      dispatch(setCurrentCategory((event.target as HTMLParagraphElement).title));
    }
    if (setShowMenu) {
      setShowMenu(false);
    }
  };
  return (
    <nav className="flex flex-col gap-5 xmd:gap-8 md:gap-10 lg:gap-12 xmd:flex xmd:flex-row items-center justify-between xmd:justify-center h-16 text-neutral-600 text-sm xmd:w-[100%]">
      <p
        onClick={(event) => categoryHandler(event)}
        className={`${!currentCategory ? 'border-b-2' : 'hover:border-b-2'} border-orange hover:cursor-pointer`}
      >
        Shop
      </p>
      {displayedCategories}
    </nav>
  );
};

export default CategoriesMenu;
