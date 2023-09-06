import { getProducts } from '@/api/productApi';
import { Nav } from '@/components/main-nav';
import ProductCard from '@/components/product-card';
import './Home.css';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
const Home = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const getProd = async () => {
      const res = await getProducts(page, 12);
      // console.log(res);
      setTotal(res.count);
      setProducts(res.product);
    };
    getProd();
  }, []);
  return (
    <>
      <div className='sticky text-foreground border-b-2  h-16 pt-5 overflow-x-hidden'>
        <Nav />
      </div>
      <div className=' contianer w-full flex place-content-center mt-[15vh] mb-[15vh] text-foreground'>
        <Input
          type='text'
          className='w-[75vw] md:w-[50vw] text-center h-10'
          placeholder='Search Products'
        />
      </div>
      <div className='flex flex-grow justify-center '>
        <div className='grid grid-cols-1 place-content-center gap-14 mb-[15vh] md:grid-cols-4'>
          {/* <ProductCard /> */}
          {products &&
            products.map((product, idx) => (
              <ProductCard key={idx} product={product} />
            ))}
        </div>
      </div>
    </>
  );
};

export default Home;
