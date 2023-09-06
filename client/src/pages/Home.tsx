import { getProducts } from '@/api/productApi';
import { Icons } from '@/components/icons';
import { Nav } from '@/components/main-nav';
import ProductCard from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from 'types';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    const id = setTimeout(async () => {
      const res = await getProducts(0, 12, e.target.value);
      setPage(0);
      setProducts(res.product);
      setTotal(Math.ceil(res.total / 12));
    }, 1000);
    return () => {
      clearTimeout(id);
    };
  };
  const getProductsPaginated = async (inc: boolean) => {
    try {
      let delta = inc ? 1 : -1;
      const res = await getProducts(page + delta, 12, search);
      setProducts(res.product);
      setPage(page + delta);
      setTotal(Math.ceil(res.total / 12));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const getProd = async () => {
      const res = await getProducts(page, 12, search);
      // console.log(res);
      setTotal(Math.ceil(res.total / 12));
      setProducts(res.product);
      setPage(0);
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
      <div className='h-full bg-background text-foreground'>
        <Nav />

        {/* <div className=' text-foreground border-b-2  h-16 pt-5 overflow-x-hidden'>
       
      </div> */}
        <div className=' contianer w-full flex place-content-center mt-[15vh] mb-[15vh] text-foreground'>
          <Input
            type='text'
            className='w-[75vw] md:w-[50vw] text-center h-10 '
            placeholder='Search Products'
            onChange={(e) => handleSearch(e)}
          />
        </div>
        <div className='flex flex-grow justify-center '>
          <div className='grid grid-cols-1 place-content-center gap-14 mb-[15vh] md:grid-cols-4'>
            {/* <ProductCard /> */}
            {products.length !== 0 ? (
              products.map((product: Product) => (
                <Link key={product.p_id} to={`/product/${product.p_id}`}>
                  <ProductCard key={product.p_id} product={product} />
                </Link>
              ))
            ) : (
              <>
                <p className='text-foreground h-56 w-auto'>EMPTY</p>
              </>
            )}
          </div>
        </div>
        <div className='text-foreground flex place-content-center bg-background gap-6 pb-10'>
          <Button
            variant={'ghost'}
            size={'sm'}
            disabled={page <= 0}
            onClick={(e) => getProductsPaginated(false)}
          >
            <Icons.MoveLeft />
          </Button>
          <div>
            {page + 1} of {total}
          </div>
          <Button
            variant={'ghost'}
            size={'sm'}
            onClick={(e) => getProductsPaginated(true)}
            disabled={page + 1 >= total}
          >
            <Icons.MoveRight />
          </Button>
        </div>
      </div>
    </>
  );
};

export default Home;
