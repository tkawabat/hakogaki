import React from 'react';
import styled from 'styled-components';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material/';
import { ExpandMore } from '@mui/icons-material/';

import ParagraphModel from '../../store/model/ParagraphModel';

import ScenarioArea from '../l1/ScenarioArea';
import ScenarioAreaCount from '../l1/ScenarioAreaCount';
import MemoArea from '../l1/MemoArea';
import ParagraphHeader from '../l2/ParagraphHeader';
import TodoArea from '../l3/TodoArea';


const Root = styled(Accordion)`
    display: flex;
    flex-direction: column;
    width: 95%;
    justify-content: space-between;
    margin-top: 10px;
`;
const Header = styled(AccordionSummary)`
    width: 97%;
    
`;

const Detail = styled(AccordionDetails)`
    display: flex;
    width: 95%;
    justify-content: space-between;
    margin-top: 10px;
`;
const Main = styled.div`
    display: flex;
    flex-direction: column;
    width: 74%;
`;
const Sub = styled.div`
    display: flex;
    flex-direction: column;
    width: 24%;
`;

type Props = {
    paragraphId: number;
    paragraph: ParagraphModel;
}

const MemoParagraphHeader = React.memo(ParagraphHeader);
const MemoTodoArea = React.memo(TodoArea);
const MemoMemoArea = React.memo(MemoArea);

const App = (props: Props) => {
    
    return (
        <Root className="paragraph">
            <Header
                expandIcon={<ExpandMore />}
            >
                <MemoParagraphHeader
                    paragraphId={props.paragraphId}
                    paragraph={props.paragraph}
                />
            </Header>
            <Detail>
                <Main>
                    <ScenarioArea
                        paragraphId={props.paragraphId}
                        text={props.paragraph.text}
                    />
                    <ScenarioAreaCount text={props.paragraph.text} />
                </Main>
                <Sub>
                    <MemoTodoArea
                        paragraphId={props.paragraphId}
                        todoList={props.paragraph.todo}
                    />
                    <MemoMemoArea id={props.paragraphId} />
                </Sub>
            </Detail>
        </Root>
    );
};

export default App;
