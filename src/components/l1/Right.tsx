import React from 'react';
import styled from 'styled-components';


const Main = styled.div`
    display: flex;
    flex: 1;
    align-content: center;
    justify-content: flex-end;
    margin-right: 20px;
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