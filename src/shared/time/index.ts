import { getRemainingTime } from '$shared/time/lib'
import Time from '$shared/time/ui/Time.svelte'

export { Time, getRemainingTime }

export type { TimeUnit, TimeData } from '$shared/time/types'
export { TIME_UNIT } from '$shared/time/config'
