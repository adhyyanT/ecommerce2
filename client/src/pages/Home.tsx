import { getProducts } from '@/api/productApi';
import { CustomeSkeleton } from '@/components/CustomeSkeleton';
import { Footer } from '@/components/footer';

import { Icons } from '@/components/icons';
import { Nav } from '@/components/main-nav';
import ProductCard from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Product } from 'types';

const categories = [
  'Electronics',
  "Men's Clothing",
  "Women's Clothing",
  'Jewelery',
];
const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string[]>([]);

  const handleFilter = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    let _filter = filter;
    if (filter?.indexOf(e.currentTarget.id) !== -1) {
      _filter = filter?.filter((f) => f !== e.currentTarget.id);
    } else {
      _filter = filter;
      _filter.push(e.currentTarget.id);
    }
    setFilter(_filter);
    const res = await getProducts(0, 12, search, _filter);
    setProducts(res.product);
    setTotal(Math.ceil(res.total / 12));
    setPage(0);
  };
  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setLoading(true);
    const id = setTimeout(async () => {
      const res = await getProducts(0, 12, e.target.value, filter);
      if (res.errorCode === 401) navigate('/');
      setPage(0);
      setProducts(res.product);
      setTotal(Math.ceil(res.total / 12));
    }, 1000);
    setLoading(false);
    return () => {
      clearTimeout(id);
    };
  };
  const getProductsPaginated = async (inc: boolean) => {
    setLoading(true);
    try {
      let delta = inc ? 1 : -1;
      const res = await getProducts(page + delta, 12, search, filter);
      if (res.errorCode === 401) navigate('/');
      setProducts(res.product);
      setPage(page + delta);
      setTotal(Math.ceil(res.total / 12));
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    const getProd = async () => {
      setLoading(true);
      const res = await getProducts(page, 12, search, filter);
      if (res.errorCode === 401) navigate('/');
      setTotal(Math.ceil(res.total / 12));
      setProducts(res.product);
      setPage(0);
      setLoading(false);
    };
    const id = setTimeout(() => {
      getProd();
    }, 0);
    return () => {
      clearTimeout(id);
    };
  }, []);

  return (
    <>
      <div className='min-h-screen bg-background text-foreground'>
        <Nav />
        <div className=' md:grid  md:grid-cols-10'>
          <div className='hidden md:flex md:col-span-2 md:justify-center md:pt-[20vh] md:border-r-4'>
            <ul className='text-4xl'>
              <div className='pb-24'>Category</div>
              {categories.map((c, index) => (
                <li className='pb-4' key={index}>
                  <input id={c.toLowerCase()} type='checkbox' hidden />
                  <Checkbox
                    id={c.toLowerCase()}
                    value={c}
                    onClick={(e) => handleFilter(e)}
                  />

                  <label
                    htmlFor={c}
                    className='m-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  >
                    {c}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className='md:col-span-8'>
            <div className=' contianer w-full flex place-content-center mt-[15vh] mb-[15vh] text-foreground'>
              <Input
                type='text'
                className='w-[75vw] md:w-[50vw] text-center h-10 '
                placeholder='Search Products'
                onChange={(e) => handleSearch(e)}
              />
            </div>
            <div className='flex flex-grow justify-center '>
              {products.length === 0 ? (
                <div className='flex flex-col h-[33vh] font-semibold text-xl gap-6 text-center'>
                  {loading ? (
                    <div className='gap-20 grid grid-cols-1 md:flex '>
                      <CustomeSkeleton />
                      <CustomeSkeleton />
                      <CustomeSkeleton />
                    </div>
                  ) : (
                    <>
                      <div className='flex place-content-center '>
                        <Icons.warning color='orange' size={40} />
                      </div>
                      We currently do not offer what you are looking for...
                    </>
                  )}
                </div>
              ) : (
                <div className='grid grid-cols-1 place-content-center gap-14 mb-[15vh] md:grid-cols-3'>
                  {products.map((product: Product) => (
                    <Link key={product.p_id} to={`/product/${product.p_id}`}>
                      <ProductCard key={product.p_id} product={product} />
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <div
              className={`text-foreground place-content-center bg-background gap-6 pb-10 ${
                loading ? 'hidden' : 'flex'
              }`}
            >
              <Button
                variant={'ghost'}
                size={'sm'}
                disabled={page <= 0}
                onClick={() => getProductsPaginated(false)}
              >
                <Icons.MoveLeft />
              </Button>
              <div>
                {page + 1} of {total}
              </div>
              <Button
                variant={'ghost'}
                size={'sm'}
                onClick={() => getProductsPaginated(true)}
                disabled={page + 1 >= total}
              >
                <Icons.MoveRight />
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
