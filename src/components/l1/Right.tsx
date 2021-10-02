import { ReactNode, ReactNodeArray } from 'react';
import styled from 'styled-components';


const Main = styled.div`
    display: flex;
    flex: 1;
    align-content: center;
    justify-content: flex-end;
`;

interface Props {
    children?: ReactNode | ReactNodeArray 
}

export default function app(props: Props) {
    return (
        <Main className="right" {...props}>
            {props.children}
        </Main>
    );
};
