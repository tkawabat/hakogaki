import React from 'react'
import styled from 'styled-components'
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material/'
import { ExpandMore } from '@mui/icons-material'

import ParagraphModel from '../../store/model/ParagraphModel'

import ScenarioArea from '../l1/ScenarioArea'
import ScenarioAreaCount from '../l1/ScenarioAreaCount'
import ParagraphHeader from '../l2/ParagraphHeader'

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
    flex-direction: column;
    align-self: center;
    justify-self: center;
    justify-content: space-between;
    width: 100% - 10px;
    margin: 0;
    padding: 5px;
`

const MemoParagraphHeader = React.memo(ParagraphHeader)

const App = (props: Props) => {
    const checked = props.paragraph.checked
    // 一番上だけ開ける
    const isOpen = props.paragraphId == 0 && !checked
    const [expanded, setExpanded] = React.useState<boolean>(isOpen)

    return (
        <Root
            expanded={expanded}
            disableGutters={true}
            className="paragraph"
            sx={checked ? { background: '#dddddd' } : {}}
        >
            <Header expandIcon={<ExpandMore />} onClick={() => setExpanded(!expanded)}>
                <MemoParagraphHeader paragraphId={props.paragraphId} paragraph={props.paragraph} />
            </Header>
            <Detail>
                <ScenarioArea paragraphId={props.paragraphId} text={props.paragraph.text} />
                <ScenarioAreaCount text={props.paragraph.text} />
            </Detail>
        </Root>
    )
}

export default App
