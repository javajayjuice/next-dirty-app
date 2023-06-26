import { Props } from 'next/script';
import React, { ComponentType, useEffect } from 'react'
import { useRouter } from 'next/router';
import { token } from '../constants';

function VerifyToken<P extends Props>(WrappedComponent: ComponentType<P>
): ComponentType<P> {
    return function WithoutTokenRedirectWrapper(props: P) {
      const router = useRouter();
      const { push, replace } = router;

        useEffect(() => {
          const decoded = verifyToken(token())
          if (!decoded) {
            push('/')
          }
        }, [])
        
        return <WrappedComponent {...props} />;
    };
}

export default VerifyToken;