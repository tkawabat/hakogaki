import React from 'react'
import styled from 'styled-components'
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material/'

import ParagraphModel from '../../store/model/ParagraphModel'

import MemoArea from '../l1/MemoArea'
import ParagraphHeader from '../l2/ParagraphHeader'
import TodoArea from '../l2/TodoArea'

type Props = {
    paragraphId: number
    paragraph: ParagraphModel
}

const Root = styled(Accordion)`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
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
    width: 54%;
`
const Sub = styled.div`
    display: flex;
    flex-direction: column;
    width: 44%;
`

const MemoParagraphHeader = React.memo(ParagraphHeader)
const MemoTodoArea = React.memo(TodoArea)
const MemoMemoArea = React.memo(MemoArea)

const App = (props: Props) => {
    const checked = props.paragraph.checked

    return (
        <Root
            expanded={true}
            disableGutters={true}
            className="paragraph"
            sx={checked ? { background: '#dddddd' } : {}}
        >
            <Header>
                <MemoParagraphHeader
                    paragraphId={props.paragraphId}
                    paragraph={props.paragraph}
                />
            </Header>
            <Detail>
                <Main>
                    <MemoMemoArea id={props.paragraphId} />
                </Main>
                <Sub>
                    <MemoTodoArea
                        paragraphId={props.paragraphId}
                        todoList={props.paragraph.todo}
                    />
                </Sub>
            </Detail>
        </Root>
    )
}

export default App
