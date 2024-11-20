import { getRemainingTime } from '$shared/time/lib'
import Time from '$shared/time/ui/Time.svelte'
import Timer from '$shared/time/ui/Timer.svelte'

export { Time, Timer, getRemainingTime }

export type { TimeUnit, TimeData } from '$shared/time/types'
export { TIME_UNIT } from '$shared/time/config'
