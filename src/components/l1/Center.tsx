import { ReactNode, ReactNodeArray } from 'react';
import styled from 'styled-components';


const Main = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
`;

interface Props {
    children?: ReactNode | ReactNodeArray 
}

export default function app(props: Props) {
    return (
        <Main className="center" {...props}>
            {props.children}
        </Main>
    );
};
