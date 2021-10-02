import React from 'react';
import { useDispatch, } from "react-redux";
import styled from 'styled-components';
import { TextField } from '@mui/material/';

import ScenarioSlice, { ChangeSubTitlePayload } from '../../store/ScenarioSlice';


type Props = {
    paragraphId: number;
    subTitle: string;
}

const Area = styled(TextField)`
`;

const App = (props: Props) => {
    const dispatch = useDispatch();

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const payload: ChangeSubTitlePayload = {
            paragraphId: props.paragraphId,
            subTitle: e.target.value
        }
        dispatch(ScenarioSlice.actions.changeSubTitle(payload));
    }

    const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation(); // アコーディオンの開閉をしないようにする。
    }

    return (
        <Area
            variant='standard'
            placeholder='段落のタイトル'
            onChange={onChange}
            onClick={onClick}
            value={props.subTitle}
        />
    );
};

export default App;