import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useTranslation } from 'react-i18next'
import AdminModal, {
  CustomProps as ModalProps,
} from '~/components/pages/admin/user/AdminModal'
import RoleGuard from '~/guards/RoleGuard'
import { Role } from '~/types/pages/user/const'
import type { GridColDef } from '@mui/x-data-grid'
import type { UserContext } from '~/types/pages/admin'

export type Props = {
  userList: UserContext
  columns: GridColDef[]
  modalProps: ModalProps
  onStateChange: (value: string[]) => void
  onClickEdit: () => void
  onClickDelete: () => void
}

function Layout(props: Props) {
  const [t] = useTranslation()

  return (
    <RoleGuard role={Role.Admin}>
      <div className='mx-auto flex w-3/5 flex-col'>
        {props.userList.length > 0 ? (
          <div className='flex gap-10'>
            <DataGrid
              autoHeight
              checkboxSelection
              columns={props.columns}
              onStateChange={(e) => props.onStateChange(e.rowSelection)}
              rows={props.userList}
            />
            <div className='flex flex-col gap-4'>
              <Button onClick={props.onClickEdit} variant='outlined'>
                <span className='flex items-center justify-center gap-1'>
                  <EditOutlinedIcon fontSize='small' />
                  {t('User.edit')}
                </span>
              </Button>
              <Button
                color='error'
                onClick={props.onClickDelete}
                variant='outlined'
              >
                <span className='flex items-center justify-center gap-1'>
                  <DeleteOutlineOutlinedIcon fontSize='small' />
                  {t('User.delete')}
                </span>
              </Button>
            </div>
          </div>
        ) : (
          <p>ユーザが取得できませんでした</p>
        )}
        <AdminModal {...props.modalProps} />
      </div>
    </RoleGuard>
  )
}

export default Layout
