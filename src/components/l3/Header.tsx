import React from 'react';
import styled from 'styled-components';

import * as C from '../../lib/Const';

import Center from '../l1/Center';
import Left from '../l1/Left';
import Right from '../l1/Right';
import DeleteScenarioButton from '../l1/DeleteScenarioButton';
import JsonImportButton from '../l1/JsonImportButton';
import DumpButton from '../l1/DumpButton';
import HelpButton from '../l1/HelpButton';
import ScenarioTitle from '../l1/ScenarioTitle';


const Root = styled.div`
    display: flex;
    width: 100%;
    height: 50px;
    background-color: #D7E6EF;
    margin-bottom: 10px;
`;

const ToolTitle = styled.span`
    font-family: "Helvetica Neue", "Helvetica", "Hiragino Sans", "Hiragino Kaku Gothic ProN", "Arial", "Yu Gothic", "Meiryo", sans-serif;
    font-size: 20px;
    font-weight: bold;
`

type Props = {
    title: string;
}

const App = (props: Props) => {
    
    return (
        <Root className="header">
            <Left>
                <ToolTitle>{C.AppNameShort}</ToolTitle>
            </Left>
            <Center>
                <ScenarioTitle title={props.title} />
            </Center>
            <Right>
                <DeleteScenarioButton />
                <JsonImportButton />
                <DumpButton /> 
                <HelpButton />
            </Right>
        </Root>
    );
};

export default App;