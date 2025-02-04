import type {NextPage} from 'next';
import type {PropsWithChildren} from 'react';
import {Header} from '../Header/Header';
import styled from 'styled-components';

export const Layout: NextPage<PropsWithChildren> = (props) => {
    const {children} = props

    return (
        <Container>
            <Header/>
            <div>{children}</div>
        </Container>
    )
    //children будет являться наши страницы
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
`