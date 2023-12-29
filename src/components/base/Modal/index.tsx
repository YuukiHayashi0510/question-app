import { Backdrop, Box, Fade, Modal } from '@mui/material'
import { ComponentPropsWithoutRef, ReactNode } from 'react'

type ModalType = ComponentPropsWithoutRef<typeof Modal>
type BoxType = ComponentPropsWithoutRef<typeof Box>

export type Props = {
  width?: number
  isOpen: ModalType['open']
  onClose?: ModalType['onClose']
  children?: ReactNode
}

function ModalTemplate(props: Props) {
  const style: BoxType['sx'] = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: props.width ?? 350,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 1.5,
    borderRadius: 4,
  }

  return (
    <Modal
      aria-describedby='transition-modal-description'
      aria-labelledby='transition-modal-title'
      closeAfterTransition
      onClose={props.onClose}
      open={props.isOpen}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
      slots={{ backdrop: Backdrop }}
    >
      <Fade in={props.isOpen}>
        <Box sx={style}>
          <div className='flex flex-col items-center'>{props.children}</div>
        </Box>
      </Fade>
    </Modal>
  )
}

export default ModalTemplate
