import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { ListItem } from '@mui/material'

import ScenarioUtil from '../../lib/ScenarioUtil'

import ModalSlice from '../../store/ModalSlice'
import DriveListItemModel from '../../store/model/DriveListItemModel'

interface Props {
    model: DriveListItemModel
}

const Item = styled(ListItem)`
    display: flex;
    flex-direction: column;
    padding: 5px;
    cursor: pointer;
    border-bottom: 1px solid #757575;
`

const Title = styled.div`
    align-self: flex-start;
    font-size: 14px;
`

const Sub = styled.div`
    display: flex;
    flex-direction: row;
    align-self: flex-end;
`

const Id = styled.div`
    font-size: 8px;
    color: #757575;
`

const Time = styled.div`
    margin-left: 5px;
    font-size: 8px;
    color: #757575;
`

const App = (props: Props) => {
    const dispatch = useDispatch()

    const onClick = () => {
        ScenarioUtil.loadProjectFromDrive(props.model.fileId)
        const payload = {
            open: false,
        }
        dispatch(ModalSlice.actions.setDriveList(payload))
    }

    const time = '最終更新: ' + props.model.updatedAt.format('M/D H:m')

    return (
        <Item onClick={onClick}>
            <Title>{props.model.title}</Title>
            <Sub>
                <Id>{props.model.fileId.substr(0, 6)}</Id>
                <Time>{time}</Time>
            </Sub>
        </Item>
    )
}

export default App
