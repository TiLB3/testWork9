import {Box, Modal} from "@mui/material";
import type {PropsWithChildren} from "react";

interface Props extends PropsWithChildren {
  toggleModal: () => void;
  isOpen: boolean;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const CustomModal: React.FC<Props> = ({toggleModal, children,isOpen}) => {
  return (
    <Modal
      open={isOpen}
      onClose={toggleModal}
    >
      <Box sx={style}>
        {children}
      </Box>
    </Modal>
  );
};

export default CustomModal;