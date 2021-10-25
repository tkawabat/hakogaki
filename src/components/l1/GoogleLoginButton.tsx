import React from 'react'
import styled from 'styled-components'

import { IconButton, Tooltip } from '@mui/material/'
import { Google } from '@mui/icons-material/'

import GoogleApiUtil from '../../lib/GoogleApiUtil'


const Root = styled.div`
    display: flex;
    align-content: center;
    justify-content: center;
`

const App = () => {

    const onClick = () => {
        GoogleApiUtil.login()
    }

    return (
        <Root>
            <Tooltip title="Google Driveを使う" arrow>
                <IconButton onClick={onClick}>
                    <Google />
                </IconButton>
            </Tooltip>
        </Root>
    )
}

export default App
