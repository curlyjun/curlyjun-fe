import * as Styled from './SkeletonProductList.style';

const SkeletonProductList = () => {
  return (
    <Styled.Container>
      {Array.from(Array(10).keys()).map((i) => (
        <Styled.SkeletonProduct key={`skel-${i}`}>
          <div className='img' />
          <div className='name' />
          <div className='price' />
        </Styled.SkeletonProduct>
      ))}
    </Styled.Container>
  );
};

export default SkeletonProductList;
