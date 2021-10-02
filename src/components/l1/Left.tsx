import React from 'react';
import styled from 'styled-components';


const Main = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-start;
    margin-left: 20px;
`;

interface Props {
}

const App: React.FC<Props> = ({ children }) => {
    return (
        <Main>
            {children}
        </Main>
    );
};

export default App;