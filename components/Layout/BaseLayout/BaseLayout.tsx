import type {NextPage} from 'next';
import type {PropsWithChildren, ReactElement} from 'react';
import {Layout} from '../Layout';

export const BaseLayout: NextPage<PropsWithChildren> = (props) => {
    const {children} = props

    return <Layout>{children}</Layout>
}

export const getLayoutPage = (page: ReactElement) => {
    return <BaseLayout>{page}</BaseLayout>
}