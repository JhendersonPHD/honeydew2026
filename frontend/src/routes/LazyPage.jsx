import React, { Suspense } from 'react';
import PageTransition from '../components/PageTransition';

const LazyPage = ({ Component }) => {
  return (
    <PageTransition>
      <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
        <Component />
      </Suspense>
    </PageTransition>
  );
};

export default LazyPage;