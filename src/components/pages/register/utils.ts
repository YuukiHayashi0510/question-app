import { Pages, PageType } from '~/types/pages/page'
import { Role } from '~/types/pages/user/const'

/**
 * 役割から遷移すべきページのPATHを取得する
 * @param {Role} role 役割
 * @returns {string} 役割から遷移すべきページのPATH
 */
export function getPathByRole(role: Role): Pages['url'] {
  switch (role) {
    case Role.Admin:
      return PageType.Admin.Top.url
    case Role.Mentor:
      return PageType.Mentor.Overview.url
    default:
      return PageType.Standard.Question.url
  }
}
