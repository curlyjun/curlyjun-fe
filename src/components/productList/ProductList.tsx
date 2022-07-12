import { ProductItem } from '@/components/productItem';
import { Product } from '@/types/product';

import * as Styled from './ProductList.style';

interface ProductListProps {
  products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <Styled.Container>
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </Styled.Container>
  );
};

export default ProductList;
