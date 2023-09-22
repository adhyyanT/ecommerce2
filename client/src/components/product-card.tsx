import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Product } from 'types';

interface ProductProps {
  product: Product;
}

const ProductCard = ({ product }: ProductProps) => {
  return (
    <Card className='w-80 overflow-hidden flex-col text-accent-foreground bg-muted'>
      <CardHeader className='flex-col items-center h-25' id='ea'>
        <CardTitle className=' rounded-md'>
          <img
            src={product.image}
            alt={product.title}
            className='object-contain  w-50 h-60  '
          />
        </CardTitle>
        {/* <CardDescription className='pt-2'>Hey</CardDescription> */}
      </CardHeader>
      <CardContent className='flex flex-col text-center overflow-hidden h-20 font-semibold'>
        {product.title}
      </CardContent>
      <CardDescription className='flex text-center h-10 flex-col items-center '>
        ${product.price}
      </CardDescription>
    </Card>
  );
};

export default ProductCard;
