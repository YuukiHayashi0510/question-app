import { t } from 'i18next'
import type { GridColDef } from '@mui/x-data-grid'
import { Profile } from '.'

export enum Role {
  Student = '受講生',
  Mentor = 'メンター',
  Admin = '管理者',
}

// 拠点
export enum Area {
  Online = 'オンライン',
  Fukuoka = '福岡',
  Tokyo = '東京',
  Kansai = '関西',
}

export const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'name', headerName: t('User.name') as string, width: 150 },
  {
    field: 'role',
    headerName: t('User.role') as string,
  },
]

export const initUserForm = {
  name: '',
  mail: '',
  password: '',
  role: Role.Student,
  area: Area.Online,
}

export const initProfile: Profile = {
  mail: '',
  id: '',
  name: '',
  area: Area.Online,
  role: Role.Student,
}

export const AllRole = Object.values(Role)
export const AllArea = Object.values(Area)
