import React from 'react';
import { useDispatch } from "react-redux";
import styled from 'styled-components';
import { IconButton, Tooltip } from '@mui/material/';
import { Delete } from '@mui/icons-material/';

import ScenarioSlice from '../../store/ScenarioSlice';


const Main = styled(IconButton)`
    
`;

type Props = {

}

const App = (props: Props) => {
    const dispatch = useDispatch();

    const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (confirm('シナリオを全削除します。よろしいですか？')) {
            dispatch(ScenarioSlice.actions.deleteScenario());
        }
    }

    return (
        <Tooltip title="シナリオを削除" arrow>
            <IconButton
                size={'small'}
                onClick={onClick}
            >
                <Delete />
            </IconButton>
        </Tooltip>
    );
};

export default App;