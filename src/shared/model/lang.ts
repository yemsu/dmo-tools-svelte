import { page } from '$app/stores'
import type { LangType } from '$shared/types'
import { derived } from 'svelte/store'

export const lang = derived(page, ($page) => $page.data.lang as LangType)
