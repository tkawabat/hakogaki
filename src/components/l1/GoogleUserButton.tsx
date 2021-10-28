import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { useSnackbar } from 'notistack'
import moment from 'moment'

import { Menu, MenuItem, Tooltip } from '@mui/material/'

import { RootState } from '../../store/rootReducer'
import ScenarioSlice, { LoadPayload } from '../../store/ScenarioSlice'
import ModalSlice from 'src/store/ModalSlice'
import DriveListSlice from 'src/store/DriveListSlice'
import ScenarioModel from '../../store/model/ScenarioModel'
import { GoogleModel } from '../../store/GoogleSlice'
import DriveListItemModel from 'src/store/model/DriveListItemModel'

import GoogleDriveApiDao from '../../dao/GoogleDriveApiDao'

import * as C from '../../lib/Const'
import GAUtil from '../../lib/GAUtil'
import ScenarioUtil from 'src/lib/ScenarioUtil'

interface Props {
    googleModel: GoogleModel
}

const Root = styled.div`
    display: flex;
    align-content: center;
    justify-content: center;
    width: 40px;
`

const GoogleIconButton = styled.button`
    display: flex;
    align-self: center;
    justify-self: center;
    position: relative;
    width: 24px;
    height: 24px;
    overflow: hidden;
    border-radius: 50%;
    border: 0px;
    cursor: pointer;
`

const GoogleIcon = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    height:100%;
`

const App = (props: Props) => {
    const { enqueueSnackbar } = useSnackbar()
    const dispatch = useDispatch()
    const scenario: ScenarioModel = useSelector(
        (state: RootState) => state.scenario
    )

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const loadProject = () => {
        GoogleDriveApiDao.getList()?.then((res) => {
            const items: DriveListItemModel[] = res!.map((r) => {
                const items: DriveListItemModel = {
                    fileId: r.id!,
                    title: r.name!,
                    updatedAt: moment(r.modifiedTime)
                }
                return items
            })
            const payload = {
                items: items
            }
            dispatch(DriveListSlice.actions.set(payload))
            dispatch(ModalSlice.actions.setDriveList({ open: true}))
        })

        handleClose()
    }
    const saveProject = () => {
        ScenarioUtil.saveProject2Drive(scenario)
        
        ScenarioUtil.getProgress(scenario).forEach((message: string) => {
            enqueueSnackbar(message, { variant: C.NotificationType.SUCCESS })
        })
        GAUtil.event(C.GaAction.SAVE, C.GaCategory.NONE, 'google')
        handleClose()
    }
    const saveScenario = () => {
        ScenarioUtil.dump2Drive(scenario)

        GAUtil.event(C.GaAction.DUMP, C.GaCategory.NONE, 'google')
        handleClose()
    }
    const logout = () => {
        GoogleDriveApiDao.logout();
        handleClose()
    }

    return (
        <Root>
            <Tooltip title="Google Drive 保存/読込" arrow>
                <GoogleIconButton onClick={handleClick}>
                    <GoogleIcon src={props.googleModel.imageUrl} />
                </GoogleIconButton>
            </Tooltip>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{ 'aria-labelledby': 'basic-button' }}
            >
                <MenuItem onClick={loadProject}>ドライブから読込</MenuItem>
                <MenuItem onClick={saveProject}>ドライブに保存</MenuItem>
                <MenuItem onClick={saveScenario}>ドライブに作品を出力</MenuItem>
                <MenuItem onClick={logout}>ログアウト</MenuItem>
            </Menu>
        </Root>
    )
}

export default App
