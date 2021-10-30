import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { Box, List, Modal, Typography } from '@mui/material'

import * as C from '../../lib/Const'

import ModalSlice from 'src/store/ModalSlice'
import { RootState } from 'src/store/rootReducer'

import DriveListItem from '../l1/DriveListItem'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    padding: '10px',
    maxWidth: '600px',
    minWidth: '300px',
    
}

const StyledBox = styled(Box)`
    display: flex;
    flex-direction: column;
    font-size: 14px;
`

const StyledList = styled(List)`
    margin-top: 10px;
    margin-left: 5px;
`

const App = () => {
    const dispatch = useDispatch()
    const isOpen = useSelector((state: RootState) => state.modal.driveList)
    const items = useSelector((state: RootState) => state.driveList.items)

    const close = () => {
        const payload = {
            open: false
        }
        dispatch(ModalSlice.actions.setDriveList(payload))
    }

    const ListItems = items.map((v, i) => {
        return (
            <DriveListItem model={v} key={i}/>
        )
    })

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
                        プロジェクトリスト
                    </Typography>
                    <StyledList>
                        {ListItems}
                    </StyledList>
                </StyledBox>
            </Modal>
        </div>
    )
}

export default App
