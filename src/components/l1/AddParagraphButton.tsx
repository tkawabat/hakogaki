import React from 'react';
import { useDispatch, } from "react-redux";
import styled from 'styled-components';
import { IconButton, Tooltip, } from '@mui/material/';
import { Add } from '@mui/icons-material/';

import ScenarioSlice from '../../store/ScenarioSlice';


const Main = styled(IconButton)`
    
`;

type Props = {

}

const App = (props: Props) => {
    const dispatch = useDispatch();

    return (
        <Tooltip title="段落を追加" arrow>
            <Main onClick={() => dispatch(ScenarioSlice.actions.addParagraph())}>
                <Add />
            </Main>
        </Tooltip>
    );
};

export default App;