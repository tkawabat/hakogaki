import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';
import { useSnackbar } from 'notistack';

import { IconButton, Tooltip, Menu, MenuItem, Link } from '@mui/material/';
import { Help } from '@mui/icons-material/';



const Root = styled.div`
    display: flex;
    align-content: center;
    justify-content: center;
`;

type Props = {
}

const App = (props: Props) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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
                MenuListProps={{ 'aria-labelledby': 'basic-button', }}
            >

                <Link
                    href='https://peing.net/ja/matchingrandom'
                    color='inherit'
                    underline="none"
                >
                    <MenuItem>お問い合わせ</MenuItem>
                </Link>
            </Menu>
        </Root>
    );
};

export default App;