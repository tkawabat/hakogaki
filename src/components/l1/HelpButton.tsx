import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { IconButton, Tooltip, Menu, MenuItem, Link } from '@mui/material/'
import { Help } from '@mui/icons-material/'

import ScenarioSlice from '../../store/ScenarioSlice'

const Root = styled.div`
    display: flex;
    align-content: center;
    justify-content: center;
    width: 40px;
`

const App = () => {
    const dispatch = useDispatch()

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const deleteScenario = () => {
        if (confirm('シナリオを全削除します。よろしいですか？')) {
            dispatch(ScenarioSlice.actions.deleteScenario())
        }
        handleClose()
    }

    return (
        <Root>
            <Tooltip title="ヘルプ" arrow>
                <IconButton
                    aria-controls="basic-menu"
                    aria-haspopup="true"
                    aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <Help />
                </IconButton>
            </Tooltip>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{ 'aria-labelledby': 'basic-button' }}
            >
                <MenuItem onClick={deleteScenario}>
                    シナリオ初期化
                </MenuItem>

                <MenuItem>
                    <Link
                        href="/privacy"
                        color="inherit"
                        underline="none"
                        target="_blank"
                    >
                        プライバシーポリシー
                    </Link>
                </MenuItem>

                <MenuItem>
                    <Link
                        href="https://peing.net/ja/matchingrandom"
                        color="inherit"
                        underline="none"
                        target="_blank"
                    >
                        お問い合わせ
                    </Link>
                </MenuItem>

            </Menu>
        </Root>
    )
}

export default App
