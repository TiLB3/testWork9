import {Box, Modal} from "@mui/material";
import type {PropsWithChildren} from "react";
import {useAppSelector} from "../../../app/store/hooks.ts";
import {getStateModal} from "../../../app/features/cartSlice.ts";

interface Props extends PropsWithChildren {
  toggleModal: () => void;
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

const CustomModal: React.FC<Props> = ({toggleModal, children}) => {
  const isShowingModal = useAppSelector(getStateModal);

  return (
    <Modal
      open={isShowingModal}
      onClose={toggleModal}
    >
      <Box sx={style}>
        {children}
      </Box>
    </Modal>
  );
};

export default CustomModal;