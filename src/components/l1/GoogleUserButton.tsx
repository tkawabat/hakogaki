import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { useSnackbar } from 'notistack'

import { Menu, MenuItem, Tooltip } from '@mui/material/'

import { RootState } from '../../store/rootReducer'
import ScenarioSlice, { LoadPayload } from '../../store/ScenarioSlice'
import ScenarioModel from '../../store/model/ScenarioModel'
import { GoogleModel } from '../../store/GoogleSlice'

import * as C from '../../lib/Const'
import GoogleDriveApiDao from '../../dao/GoogleDriveApiDao'
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
        // const fileName = ScenarioUtil.getTitle(scenario) + '.json'
        // FileUtil.download(fileName, JSON.stringify(scenario))
        handleClose()

        ScenarioUtil.loadProjectFromDrive(scenario.config.googleDriveFileId)
        // GoogleDriveApiDao.getList()

        // ScenarioUtil.getProgress(scenario).forEach((message: string) => {
            // enqueueSnackbar(message, { variant: C.NotificationType.SUCCESS })
        // })
        // GAUtil.event(C.GaAction.SAVE, C.GaCategory.NONE, 'project')
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
        const fileName = ScenarioUtil.getTitle(scenario) + '.txt'
        GoogleDriveApiDao.createFile(fileName)
        // FileUtil.download(fileName, ScenarioUtil.getScenarioText(scenario))
        handleClose()

        // GAUtil.event(C.GaAction.SAVE, C.GaCategory.NONE, 'txt')
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
