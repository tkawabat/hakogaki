import React from 'react'
import styled from 'styled-components'
import { Accordion, AccordionSummary, AccordionDetails, } from '@mui/material/'
import { ExpandMore } from '@mui/icons-material'

import ParagraphModel from '../../store/model/ParagraphModel'

import ScenarioArea from '../l1/ScenarioArea'
import ScenarioAreaCount from '../l1/ScenarioAreaCount'
import MemoArea from '../l1/MemoArea'
import ParagraphHeader from '../l2/ParagraphHeader'
import TodoArea from '../l3/TodoArea'


type Props = {
    paragraphId: number
    paragraph: ParagraphModel
}

const Root = styled(Accordion)`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 95%;
    margin-top: 5px;
`

const Header = styled(AccordionSummary)`
    display: flex;
    align-self: center;
    justify-self: center; 
    height: 55px;
    width: 100%;
    margin: 0;
`

const Detail = styled(AccordionDetails)`
    display: flex;
    align-self: center;
    justify-self: center; 
    justify-content: space-between;
    width: 95%;
    margin: 0;
`
const Main = styled.div`
    display: flex;
    flex-direction: column;
    width: 74%;
`
const Sub = styled.div`
    display: flex;
    flex-direction: column;
    width: 24%;
`

const MemoParagraphHeader = React.memo(ParagraphHeader)
const MemoTodoArea = React.memo(TodoArea)
const MemoMemoArea = React.memo(MemoArea)

const App = (props: Props) => {
    const [expanded, setExpanded] = React.useState<boolean>(false);

    const checked = props.paragraph.checked

    return (
        <Root
            expanded={expanded}
            disableGutters={true}
            className="paragraph"
            sx={checked ? { background: '#dddddd' } : {}}
        >
            <Header
                expandIcon={<ExpandMore />}
                onClick={() => setExpanded(!expanded)}
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
    )
}

export default App
