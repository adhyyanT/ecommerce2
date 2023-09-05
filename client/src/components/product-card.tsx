import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const ProductCard = () => {
  return (
    <Card className='w-80 overflow-hidden flex-col '>
      <CardHeader className='flex-col items-center'>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent className='flex-col items-center'>
        <p>Card Content</p>
      </CardContent>
      <CardFooter className='flex-col items-center'>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
