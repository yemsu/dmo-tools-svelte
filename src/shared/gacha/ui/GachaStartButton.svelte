<script lang="ts">
	import { _ } from 'svelte-i18n'
	import type { LangType } from '$shared/types'
	import { page } from '$app/stores'
	import {
		gachaStore,
		type GachaData,
		type GachaDataType,
		type GachaItemData
	} from '$entities/gacha'
	import { ALERT } from '$shared/config'
	import { GachaButton } from '$shared/gacha'
	import { error } from '@sveltejs/kit'
	import { createEventDispatcher } from 'svelte'

	export let currentGachaType: GachaDataType
	export let activeGacha: GachaData
	export let count: 1 | 10 | 11
	export let isRetry: boolean = false
	$: lang = $page.data.lang as LangType

	const PROBABILITY_MIN = 0.01
	const SETUP_ITEM_LENGTH = 100 / PROBABILITY_MIN
	let gachaItemIdList: GachaItemData['id'][] = []

	const dispatch = createEventDispatcher()

	const createRandomNumber = (gachaItemIdList: GachaItemData['id'][]) => {
		const randomNum = Math.floor(Math.random() * (SETUP_ITEM_LENGTH - 1))

		if (gachaItemIdList.includes(randomNum)) {
			getRandomNumber(gachaItemIdList)
		} else {
			return randomNum
		}
	}

	const shuffleArray = <T,>(array: T[]): T[] => {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			;[array[i], array[j]] = [array[j], array[i]]
		}
		return array
	}

	const getRandomNumber = (gachaItemIdList: GachaItemData['id'][]) => {
		return new Promise<number>((resolve) => {
			const randomNumber = createRandomNumber(gachaItemIdList)
			if (randomNumber) {
				resolve(randomNumber)
			}
		})
	}

	$: startGacha = async () => {
		gachaItemIdList = []
		const resultItemIdList: number[] = []
		if (!activeGacha.gachaItems) {
			alert(ALERT.NO_SELECTED_GACHA[lang])
			return
		}

		activeGacha.gachaItems.forEach(({ id, probability }) => {
			const needSetupCount = (probability * 1000) / (PROBABILITY_MIN * 1000)
			gachaItemIdList.push(...new Array(needSetupCount).fill(id))
		})
		gachaItemIdList = shuffleArray(gachaItemIdList)
		resultItemIdList.push(...gachaItemIdList.slice(0, count))
		// 희귀도 7 아이템 노출
		// resultItemIdList[0] = activeGacha.gachaItems[0].id
		const newGachaResults = resultItemIdList.map((resultId) => {
			const resultItem = activeGacha.gachaItems.find(
				({ id }) => resultId === id
			)
			if (!resultItem) {
				error(
					400,
					`ERROR: getGachaItem - id값이 ${resultId}인 item을 찾을 수 없습니다.`
				)
			}
			return resultItem
		})
		gachaStore.setResults(currentGachaType, newGachaResults)
		activeGacha &&
			gachaStore.addPlayedCount(
				currentGachaType,
				activeGacha.id,
				newGachaResults.length
			)
		dispatch('start')
	}
</script>

<GachaButton
	bg={isRetry ? 'retry' : `call-${count}`}
	on:click={() => startGacha()}
>
	{isRetry
		? $_('gacha.resummon')
		: `${count} ${count === 1 ? $_('gacha.time') : $_('gacha.times')} ${currentGachaType === 'DIGITAL_DRAW' ? $_('gacha.draw') : ''}`}
</GachaButton>
