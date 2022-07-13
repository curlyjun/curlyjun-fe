import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 400px;
  margin-left: -20px;
`;

export const SkeletonProduct = styled.div`
  width: 180px;
  margin-left: 20px;
  margin-top: 20px;

  .img {
    width: 100%;
    height: 180px;
    background-color: #efefef;
  }

  .name {
    margin-top: 8px;
    width: 80%;
    height: 16px;
    background-color: #efefef;
  }

  .price {
    margin-top: 4px;
    width: 50%;
    height: 16px;
    background-color: #efefef;
  }
`;
