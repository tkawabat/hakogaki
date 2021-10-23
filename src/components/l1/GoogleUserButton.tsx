import React from 'react'
import styled from 'styled-components'

import { Menu, MenuItem, Tooltip } from '@mui/material/'

import GoogleUtil from '../../lib/GoogleUtil'
import GAUtil from '../../lib/GAUtil'

interface Props {
    imageUrl: string
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
        GoogleUtil.signOut();
        handleClose()
    }

    return (
        <Root>
            <Tooltip title="ドライブに保存" arrow>
                <GoogleIconButton onClick={handleClick}>
                    <GoogleIcon src={props.imageUrl} />
                </GoogleIconButton>
            </Tooltip>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{ 'aria-labelledby': 'basic-button' }}
            >
                <MenuItem onClick={saveProject}>
                    プロジェクトとして保存
                </MenuItem>
                <MenuItem onClick={saveScenario}>作品として保存</MenuItem>
                <MenuItem onClick={logout}>ログアウト</MenuItem>
            </Menu>
        </Root>
    )
}

export default App
