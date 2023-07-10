import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import React from 'react';
import ReportIcon from '@mui/icons-material/Report';
import ErrorIcon from '@mui/icons-material/Error';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

type Params = {
    content: string,
    title: string,
    type: string,
    buttonOk?: boolean,
    buttonYesNo?: boolean,
    handleClickYes?: () => void,
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,

}

const ShowDialog = ({content, title, type, buttonOk, buttonYesNo,handleClickYes, open, setOpen}: Params) => {
    // const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const handleClickYesLocal = () => {
        if(handleClickYes){
            handleClickYes();
        }
        handleClose();
    }
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                {title}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {type=='error' && (
                    <ReportIcon style={{color:'red'}}/>
                )}
                {type=='info' && (
                    <ErrorIcon style={{color:'#FF7008'}}/>
                )}
                <span className='mx-1'></span>
                {content}
                {buttonOk && (
                    <div className='d-flex mt-3'>
                        <div className='flex-grow-1'></div>
                        <button className='btn btn-orange ws-80' onClick={handleClose}>OK</button>
                    </div>
                )}
                {buttonYesNo && (
                    <div className='d-flex mt-3'>
                        <div className='flex-grow-1'></div>
                        <button className='btn btn-orange me-3 ws-80' onClick={handleClickYesLocal}>Yes</button>
                        <button className='btn btn-outline-orange ws-80' onClick={handleClose}>No</button>
                    </div>
                )}
            </Typography>
            </Box>
        </Modal>
    )
};

export default ShowDialog;