import { Props } from 'next/script';
import React, { ComponentType, useEffect } from 'react'
import { useRouter } from 'next/router';
import { useUser } from '../providers/user';
import { myTokenDetails } from '../utils/auth';
import { message } from 'antd';

function WithToken<P extends Props>(WrappedComponent: ComponentType<P>
): ComponentType<P> {
    return function WithoutTokenRedirectWrapper(props: P) {
        const router = useRouter();
        const { push, replace } = router;
        const { userLoggedIn, currentInformation, isUserLoggedIn, user } = useUser()

        useEffect(() => {
            const validToken = myTokenDetails()
            
            if (!validToken) {
                message.error('You are not logged in')
                replace('/authentication/login')
            }
        }, [userLoggedIn, currentInformation, isUserLoggedIn, user]);

        return <WrappedComponent {...props} />;
    };
}

export default WithToken;