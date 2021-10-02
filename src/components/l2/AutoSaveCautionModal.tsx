import * as React from 'react';
import styled from 'styled-components';

import { Box, Button, Typography, Modal } from '@mui/material';

import * as C from '../../lib/Const';
import StorageUtil from '../../lib/StorageUtil';


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const StyledBox = styled(Box)`
    display: flex;
    flex-direction: column;
    font-size: 14px;
`;

const StyledButton = styled(Button)`
    display: flex;
    align-self: flex-end;
    width: 120px;
`;

const Message = styled.div`
    margin-top: 10px;
    margin-bottom: 10px;
`;

interface Props {
}

export interface AutoSaveCautionModalHandler {
    open(): void;
}

const App = React.forwardRef<AutoSaveCautionModalHandler>((props: Props, ref) => {
    const [open, setOpen] = React.useState(false);

    const neverOpen = () => {
        StorageUtil.save(C.StorageKeyAutoSaveCationModal, '1');
        setOpen(false);
    }

    React.useImperativeHandle(ref, () => ({
        open() {
            if (StorageUtil.load(C.StorageKeyAutoSaveCationModal) == '1') {
                return;
            }
            setOpen(true);
        }
    }));

    return (
        <div>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <StyledBox sx={style}>
                    <Typography variant="h6" component="h4">
                        注意
                    </Typography>
                    <Message>{''
                        + 'シナリオは定期的にファイルに保存することをオススメします。'
                        + 'ブラウザに自動保存されたデータは予期せぬタイミングで消えることがあります。'
                    }
                    </Message>
                    
                    <StyledButton
                        variant="text"
                        size="small"
                        onClick={neverOpen}
                    >
                        次から表示しない
                    </StyledButton>
                </StyledBox>
            </Modal>
        </div>
    );
});

export default App;