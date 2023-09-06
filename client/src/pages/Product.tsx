import { getProductDetails } from '@/api/productApi';
import { putItemInCart } from '@/api/cartApi';
import { Icons } from '@/components/icons';
import { Nav } from '@/components/main-nav';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { SingleProductType } from 'types';

const Product = () => {
  const { productId } = useParams();
  const [productDetail, setProductDetail] = useState<SingleProductType>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    const res = await putItemInCart(parseInt(productId!));
    setIsLoading(false);
    if (!res.ok) {
      return toast({
        title: 'Something went wrong.',
        description: `Item was not added to your cart`,
        variant: 'destructive',
      });
    }

    return toast({
      title: `Item ${productDetail?.title} added to your cart`,
      description: 'To check out, go to your cart from top.',
      variant: 'default',
    });
  };
  useEffect(() => {
    const getProd = async () => {
      const res: SingleProductType = await getProductDetails(
        parseInt(productId!)
      );
      setProductDetail(res);
    };
    getProd();
    return () => {};
  }, []);

  if (!productDetail) return;
  return (
    <div className='min-h-screen flex flex-col bg-background text-foreground overflow-hidden'>
      <Nav />
      <div className=' grid grid-cols-1 flex-1 md:grid-cols-5 gap-4'>
        <div className='flex items-center justify-center h-full md:col-span-2 '>
          <img
            src={productDetail.image}
            alt='IMG'
            className='place-content-center h-96 w-96 px-6'
          />
        </div>
        <div className='flex flex-col text-left  justify-center  pl-6  h-full pr-4 gap-8 md:col-span-3'>
          <div className=' text-4xl font-semibold'>{productDetail.title}</div>

          <div className='items-center text-justify text-muted-foreground'>
            {productDetail.desc}
          </div>
          <div className='flex justify-center md:justify-start mb-16'>
            <Button size={'lg'} onClick={handleAddToCart}>
              {isLoading && (
                <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
              )}
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
