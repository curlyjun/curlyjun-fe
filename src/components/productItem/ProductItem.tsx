import Link from 'next/link';

import { Product } from '@/types/product';

import * as Styled from './ProductItem.style';

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product: { id, name, thumbnail, price } }: ProductItemProps) => {
  return (
    <Link href={`/products/${id}`}>
      <Styled.Container>
        <Styled.Thumbnail src={thumbnail ? thumbnail : '/defaultThumbnail.jpg'} />
        <Styled.Name>{name}</Styled.Name>
        <Styled.Price>{price.toLocaleString('ko-KR')}원</Styled.Price>
      </Styled.Container>
    </Link>
  );
};

export default ProductItem;