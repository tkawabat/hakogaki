import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import { IconButton, Tooltip, Menu, MenuItem } from '@mui/material/'
import { Dehaze } from '@mui/icons-material/'

import ScenarioSlice, {
    AddParagraphUnderPayload,
    DeleteParagraphPayload,
    MoveDownParagraphPayload,
    MoveUpParagraphPayload,
} from '../../store/ScenarioSlice'
import ParagraphModel from '../../store/model/ParagraphModel'

import ScenarioUtil from '../../lib/ScenarioUtil'

type Props = {
    paragraphId: number
    paragraph: ParagraphModel
}

const Root = styled.div`
    display: flex;
    align-content: center;
    justify-content: center;
`

const App = (props: Props) => {
    const dispatch = useDispatch()

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(e.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const moveUp = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        const payload: MoveUpParagraphPayload = {
            paragraphId: props.paragraphId,
        }
        dispatch(ScenarioSlice.actions.moveUpParagraph(payload))
        handleClose()
    }
    const moveDown = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        const payload: MoveDownParagraphPayload = {
            paragraphId: props.paragraphId,
        }
        dispatch(ScenarioSlice.actions.moveDownParagraph(payload))
        handleClose()
    }
    const addParagraph = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        const payload: AddParagraphUnderPayload = {
            paragraphId: props.paragraphId,
        }
        dispatch(ScenarioSlice.actions.addParagraphUnder(payload))
        handleClose()
    }
    const deleteParagraph = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        const payload: DeleteParagraphPayload = {
            paragraphId: props.paragraphId,
        }
        if (
            ScenarioUtil.isParagraphEmpty(props.paragraph) ||
            confirm('段落を削除します。よろしいですか？')
        ) {
            dispatch(ScenarioSlice.actions.deleteParagraph(payload))
        }
    }

    return (
        <Root onClick={(e) => e.stopPropagation()}>
            <Tooltip title="段落ツール" arrow>
                <IconButton
                    aria-controls="basic-menu"
                    aria-haspopup="true"
                    aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <Dehaze />
                </IconButton>
            </Tooltip>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{ 'aria-labelledby': 'basic-button' }}
            >
                <MenuItem onClick={moveUp}>段落を一つ上に移動</MenuItem>
                <MenuItem onClick={moveDown}>段落を一つ下に移動</MenuItem>
                <MenuItem onClick={addParagraph}>下に段落を追加</MenuItem>
                <MenuItem onClick={deleteParagraph}>段落を削除</MenuItem>
            </Menu>
        </Root>
    )
}

export default App
