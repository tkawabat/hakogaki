import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { BottomNavigation, BottomNavigationAction, Checkbox, Tooltip } from '@mui/material/'

import React from 'react'

type Props = {
}

const Main = styled.div`
    display: fixed;

    align-items: center;

    bottom: 0px;
    width: 100%;
`

export default function App(props: Props) {
    const [value, setValue] = React.useState(0);

    const dispatch = useDispatch()

    return (
        <Main>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                <BottomNavigationAction label="本文" />
                <BottomNavigationAction label="段落メモ" />
                <BottomNavigationAction label="全体メモ" />
            </BottomNavigation>
        </Main>
    )
}
