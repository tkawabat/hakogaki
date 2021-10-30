import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { Box, Button, Typography, Modal } from '@mui/material'

import * as C from '../../lib/Const'
import StorageUtil from '../../lib/StorageUtil'
import ModalSlice from 'src/store/ModalSlice'
import { RootState } from 'src/store/rootReducer'

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
}

const StyledBox = styled(Box)`
    display: flex;
    flex-direction: column;
    font-size: 14px;
`

const StyledButton = styled(Button)`
    display: flex;
    align-self: flex-end;
    width: 120px;
`

const Message = styled.div`
    margin-top: 10px;
    margin-bottom: 10px;
`

const App = () => {
    const dispatch = useDispatch()
    const state = useSelector((state: RootState) => state.modal.autoSaveCation)

    const close = () => {
        const payload = {
            open: false
        }
        dispatch(ModalSlice.actions.setAutoSaveCation(payload))
    }
    const neverOpen = () => {
        StorageUtil.save(C.StorageKeyAutoSaveCationModal, '1')
        close()
    }

    const isOpen = state &&
        StorageUtil.load(C.StorageKeyAutoSaveCationModal) != '1'

    return (
        <div>
            <Modal
                open={isOpen}
                onClose={close}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <StyledBox sx={style}>
                    <Typography variant="h6" component="h4">
                        注意
                    </Typography>
                    <Message>
                        {'' +
                            'シナリオは定期的にファイルに保存することをオススメします。' +
                            'ブラウザに自動保存されたデータは予期せぬタイミングで消えることがあります。'}
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
    )
}

export default App
