import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { BottomNavigation, BottomNavigationAction } from '@mui/material/'

import React from 'react'

type Props = {
}

const Main = styled(BottomNavigation)`
    position: fixed;
    z-index: 1;
    left: 0;
    bottom: 0;
    background-color: #d3d3d3;

    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
`

export default function App(props: Props) {
    const [value, setValue] = React.useState(0);

    const dispatch = useDispatch()

    return (
        <Main
            showLabels
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
        >
            <BottomNavigationAction label="本文" />
            <BottomNavigationAction label="段落メモ" />
            <BottomNavigationAction label="全体メモ" />
            <BottomNavigationAction label="メニュー" />
        </Main>
    )
}
