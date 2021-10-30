import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { useSnackbar } from 'notistack'

import { IconButton, Tooltip, Menu, MenuItem, ButtonUnstyled } from '@mui/material/'
import { Description } from '@mui/icons-material/'

import { RootState } from '../../store/rootReducer'
import ScenarioSlice, { LoadPayload } from '../../store/ScenarioSlice'
import ScenarioModel from '../../store/model/ScenarioModel'

import * as C from '../../lib/Const'
import FileUtil from '../../lib/FileUtil'
import ScenarioUtil from '../../lib/ScenarioUtil'
import GAUtil from '../../lib/GAUtil'

type Props = {}

const Root = styled.div`
    display: flex;
    align-content: center;
    justify-content: center;
`

const LoadItem = styled(ButtonUnstyled)`
    cursor: pointer;
`

const App = (props: Props) => {
    const { enqueueSnackbar } = useSnackbar()
    const dispatch = useDispatch()
    const scenario: ScenarioModel = useSelector((state: RootState) => state.scenario)

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(e.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const loadProject = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return
        const json = await e.target.files[0].text()

        ScenarioUtil.loadProject(json)

        e.target.value = '' // 空にすることで次のonchangeが発火するようにする
        handleClose()
    }
    const saveProject = () => {
        const fileName = ScenarioUtil.getTitle(scenario) + '.json'
        FileUtil.download(fileName, JSON.stringify(scenario))

        ScenarioUtil.getProgress(scenario).forEach((message: string) => {
            enqueueSnackbar(message, { variant: C.NotificationType.SUCCESS })
        })

        GAUtil.event(C.GaAction.SAVE, C.GaCategory.NONE, 'project')
        handleClose()
    }
    const saveScenario = () => {
        const fileName = ScenarioUtil.getTitle(scenario) + '.txt'
        FileUtil.download(fileName, ScenarioUtil.getScenarioText(scenario))

        GAUtil.event(C.GaAction.DUMP, C.GaCategory.NONE, 'file')
        handleClose()
    }

    return (
        <Root>
            <Tooltip title="ファイル保存/読込" arrow>
                <IconButton
                    aria-controls="basic-menu"
                    aria-haspopup="true"
                    aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <Description />
                </IconButton>
            </Tooltip>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{ 'aria-labelledby': 'basic-button' }}
            >
                <MenuItem>
                    <LoadItem component="label">
                        <input type="file" hidden accept=".json" onChange={loadProject} />
                        ファイルから読込
                    </LoadItem>
                </MenuItem>
                <MenuItem onClick={saveProject}>ファイルに保存</MenuItem>
                <MenuItem onClick={saveScenario}>ファイルに作品を出力</MenuItem>
            </Menu>
        </Root>
    )
}

export default App
