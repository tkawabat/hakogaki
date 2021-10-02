import React from 'react';
import styled from 'styled-components';


const Main = styled.div`
        
`;

type Props = {
    text: string;
}

const App = (props: Props) => {
    return (
        <Main>
            {props.text.length}
        </Main>
    );
};

export default App;
