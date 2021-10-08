import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Checkbox, Tooltip } from '@mui/material/'

import ScenarioSlice, {
    ToggleParagraphCheckedPayload,
} from '../../store/ScenarioSlice'
import ParagraphModel from '../../store/model/ParagraphModel'

import Center from '../l1/Center'
import Left from '../l1/Left'
import Right from '../l1/Right'
import ParagraphTitle from '../l1/ParagraphTitle'
import ParagraphToolsButton from '../l1/ParagraphToolsButton'

type Props = {
    paragraphId: number
    paragraph: ParagraphModel
}

const Main = styled.div`
    display: flex;
    width: 100%;
`

const Title = styled(ParagraphTitle)`
    width: 70%;
`

export default function App(props: Props) {
    const dispatch = useDispatch()

    const toggle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation() // アコーディオンの開閉をしないようにする。

        const payload: ToggleParagraphCheckedPayload = {
            paragraphId: props.paragraphId,
        }
        dispatch(ScenarioSlice.actions.toggleParagraphChecked(payload))
    }

    return (
        <Main>
            <Left>
                <Title
                    paragraphId={props.paragraphId}
                    subTitle={props.paragraph.subTitle}
                />
            </Left>
            <Right>
                <Tooltip title="完了" arrow>
                    <Checkbox
                        checked={props.paragraph.checked}
                        onClick={toggle}
                    />
                </Tooltip>
                <ParagraphToolsButton
                    paragraphId={props.paragraphId}
                    paragraph={props.paragraph}
                />
            </Right>
        </Main>
    )
}
