import { ThreadsSetting } from 'app/models/threads_setting'
import {
  Attributes,
  Includeable,
} from 'sequelize'

export namespace ThreadSettingRepository {
  const relations: Includeable[] = ['role']

  export function GetListThreadSetting(
    props: Parameters<typeof ThreadsSetting.findAll>[0],
  ) {
    return ThreadsSetting.findAll({
      ...props,
      include: relations,
    })
  }

  export function UpdateThreadSetting(
    id: number,
    payload: { [key in keyof Attributes<ThreadsSetting>]?: Attributes<ThreadsSetting>[key] },
  ) {
    return ThreadsSetting.update(payload, { where: { id }, returning: true })
  }
}
