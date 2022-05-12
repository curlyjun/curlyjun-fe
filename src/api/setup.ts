// 이 파일은 수정하지 마세요.

import { setupWorker } from 'msw';
import { setupServer } from 'msw/node';

import { handlers } from './handlers';

const setupMSW = () => {
  if (typeof window === 'undefined') {
    const server = setupServer(...handlers);
    server.listen();
    return;
  }

  const worker = setupWorker(...handlers);
  worker.start();
};

export default setupMSW;
