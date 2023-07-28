import { IsCancel } from '../types/dataInterface'

export default class Cancel {
  constructor(public message?: string) {}
}

export const isCancel: IsCancel = cancelInstance => cancelInstance instanceof Cancel
