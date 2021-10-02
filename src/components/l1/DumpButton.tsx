import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';
import { useSnackbar } from 'notistack';

import { IconButton, Tooltip, Menu, MenuItem } from '@mui/material/';
import { Save } from '@mui/icons-material/';

import { RootState } from '../../store/rootReducer';
import ScenarioModel from '../../store/model/ScenarioModel';

import * as C from '../../lib/Const';
import FileUtil from '../../lib/FileUtil';
import ScenarioUtil from '../../lib/ScenarioUtil';


const Root = styled.div`
    display: flex;
    align-content: center;
    justify-content: center;
`;

type Props = {
}

const App = (props: Props) => {
    const { enqueueSnackbar, } = useSnackbar();
    const scenario: ScenarioModel = useSelector((state: RootState) => 
        state.scenario);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const saveProject = () => {
        const fileName = ScenarioUtil.getTitle(scenario) + '.json';
        FileUtil.download(fileName, JSON.stringify(scenario));
        handleClose();

        ScenarioUtil.getProgress(scenario).forEach((message: string) => {
            enqueueSnackbar(message, { variant: C.NotificationType.SUCCESS });
        });
    };
    const saveScenario = () => {
        const fileName = ScenarioUtil.getTitle(scenario) + '.txt';
        FileUtil.download(fileName, ScenarioUtil.getScenarioText(scenario));
        handleClose();
    };

    return (
        <Root>
            <Tooltip title="ファイルに保存" arrow>
                <IconButton
                    aria-controls="basic-menu"
                    aria-haspopup="true"
                    aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <Save />
                </IconButton>
            </Tooltip>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{ 'aria-labelledby': 'basic-button', }}
            >
                <MenuItem onClick={saveProject}>プロジェクトとして保存</MenuItem>
                <MenuItem onClick={saveScenario}>作品として保存</MenuItem>
            </Menu>
        </Root>
    );
};

export default App;