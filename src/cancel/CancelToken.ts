import { Canceler, CancelExecutor, CancelTokenSource } from '../types/dataInterface'

import Cancel from './Cancel'

interface ResolvePromise {
  (reason?: Cancel): void
}

export default class CancelToken {
  public promise: Promise<Cancel>

  public reason?: Cancel

  public constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise

    this.promise = new Promise<Cancel>(resolve => {
      resolvePromise = resolve as ResolvePromise
    })

    executor(message => {
      if (this.reason) return

      this.reason = new Cancel(message)

      resolvePromise(this.reason)
    })
  }

  static source(): CancelTokenSource {
    let cancel!: Canceler

    const token = new CancelToken(executor => {
      cancel = executor
    })

    return {
      token,
      cancel
    }
  }

  throwIfRequested() {
    if (this.reason) throw this.reason
  }
}
