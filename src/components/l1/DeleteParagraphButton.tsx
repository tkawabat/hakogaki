import React from 'react';
import { useDispatch, } from "react-redux";
import styled from 'styled-components';
import { IconButton, Tooltip } from '@mui/material/';
import { Delete } from '@mui/icons-material/';

import ScenarioSlice, { DeleteParagraphPayload, } from '../../store/ScenarioSlice';
import ParagraphModel from '../../store/model/ParagraphModel';

import ScenarioUtil from '../../lib/ScenarioUtil';


const Main = styled(IconButton)`
    
`;

type Props = {
    paragraphId: number;
    paragraph: ParagraphModel;
}

const App = (props: Props) => {
    const dispatch = useDispatch();

    const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const payload: DeleteParagraphPayload = {
            paragraphId: props.paragraphId
        }
        if (ScenarioUtil.isParagraphEmpty(props.paragraph)
            || confirm('段落を削除します。よろしいですか？')) {
            dispatch(ScenarioSlice.actions.deleteParagraph(payload));
        }

        e.stopPropagation(); // アコーディオンの開閉をしないようにする。
    }

    return (
        <Tooltip title="段落を削除" arrow>
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
