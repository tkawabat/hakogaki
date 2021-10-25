import React from 'react'
import styled from 'styled-components'

import { Menu, MenuItem, Tooltip } from '@mui/material/'

import { GoogleModel } from '../../store/GoogleSlice'

import GoogleUtil from '../../lib/GoogleUtil'
import GAUtil from '../../lib/GAUtil'

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

        GoogleUtil.driveList()

        // ScenarioUtil.getProgress(scenario).forEach((message: string) => {
        //     enqueueSnackbar(message, { variant: C.NotificationType.SUCCESS })
        // })
        // GAUtil.event(C.GaAction.SAVE, C.GaCategory.NONE, 'project')
    }
    const saveProject = () => {
        // const fileName = ScenarioUtil.getTitle(scenario) + '.json'
        // FileUtil.download(fileName, JSON.stringify(scenario))
        handleClose()

        // ScenarioUtil.getProgress(scenario).forEach((message: string) => {
        //     enqueueSnackbar(message, { variant: C.NotificationType.SUCCESS })
        // })
        // GAUtil.event(C.GaAction.SAVE, C.GaCategory.NONE, 'project')
    }
    const saveScenario = () => {
        // const fileName = ScenarioUtil.getTitle(scenario) + '.txt'
        // FileUtil.download(fileName, ScenarioUtil.getScenarioText(scenario))
        handleClose()

        // GAUtil.event(C.GaAction.SAVE, C.GaCategory.NONE, 'txt')
    }
    const logout = () => {
        GoogleUtil.logout();
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
                <MenuItem onClick={loadProject}>プロジェクトを読込</MenuItem>
                <MenuItem onClick={saveProject}>プロジェクトを保存</MenuItem>
                <MenuItem onClick={saveScenario}>作品として保存</MenuItem>
                <MenuItem onClick={logout}>ログアウト</MenuItem>
                <MenuItem onClick={() => { GoogleUtil.reloadToken() }}>reload</MenuItem>
                <MenuItem onClick={() => { GoogleUtil.login() }}>login</MenuItem>
            </Menu>
        </Root>
    )
}

export default App
