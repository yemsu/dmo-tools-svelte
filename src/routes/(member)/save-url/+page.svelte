<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation'
	import {
		alarmMinute,
		crrServerType,
		GAME_SERVERS,
		type ServerType
	} from '$entities/raid'
	import {
		mySealCounts,
		mySealPrices,
		putMySealCount,
		putMySealPrice,
		queryStringToData,
		type MyPrice,
		type MySealCount,
		type MySealPrice
	} from '$entities/seals'
	import { user } from '$entities/user'
	import urlExampleSrc from '$lib/images/url-example.jpg'
	import { Button } from '$shared/button'
	import { META } from '$shared/config'
	import { checkMember } from '$shared/lib'
	import Section from '$shared/section/ui/Section.svelte'
	import { Title } from '$shared/text'
	import { toast } from '$shared/toast'
	import { onMount } from 'svelte'

	let textareaElement: HTMLTextAreaElement
	let userUrl: string | null = null

	type ParamsData = {
		seals: MySealCount[] | null
		prices: MySealPrice[] | null
		server: ServerType | null
		alarm: string | null
	}

	const saveSealCountData = (mySealCounts: MySealCount[]) => {
		return new Promise(async (resolve) => {
			mySealCounts.forEach(async (mySeal, i) => {
				await putMySealCount(mySeal)
				if (i === mySealCounts.length - 1) {
					resolve(true)
				}
			})
		})
	}

	const saveSealPriceData = (myPrices: MyPrice[]) => {
		return new Promise(async (resolve) => {
			myPrices.forEach(async ({ id, price }, i) => {
				await putMySealPrice({
					id,
					price
				})
				if (i === myPrices.length - 1) {
					resolve(true)
				}
			})
		})
	}

	const parseParams = (params: string): ParamsData => {
		const search = new URLSearchParams(params)
		const sealParams = search.get('seals')
		const priceParams = search.get('prices')
		const serverTypeParams = search.get('server')
		const alarmMinuteParams = search.get('alarm')
		return {
			seals: sealParams ? queryStringToData(sealParams, 'count') : null,
			prices: priceParams ? queryStringToData(priceParams, 'price') : null,
			server: serverTypeParams as ServerType | null,
			alarm: alarmMinuteParams
		}
	}

	const uploadData = async (paramsData: ParamsData) => {
		const { seals, prices, server, alarm } = paramsData
		seals && (await saveSealCountData(seals))
		prices && (await saveSealPriceData(prices))
		server && crrServerType.set(server as ServerType)
		alarm && alarmMinute.set(+alarm)
		await mySealCounts.load()
		await mySealPrices.load()
	}

	const onSubmit = async () => {
		if (!userUrl) {
			alert('url을 붙여넣어 주세요!')
			return
		}
		const [_, params, ...unexpectedUrl] = userUrl.split('?')
		if (!params) {
			alert(
				'데이터가 존재하지 않는 url 입니다. \n url을 다시 한번 확인해주세요.'
			)
			return
		}
		if (unexpectedUrl.length > 0 || params.includes(' ')) {
			alert(
				'url에 띄어쓰기나 다른 문자가 섞여있습니다. \n url을 다시 한번 확인해주세요.'
			)
			return
		}
		const paramsData = parseParams(params)
		const { seals, prices, server, alarm } = paramsData
		const sealText = `보유 씰: ${seals ? seals.length : 0}개`
		const priceText = `수정한 가격: ${prices ? prices.length : 0}개`
		const serverText = server ? `\n게임 서버: ${GAME_SERVERS[server]}` : ''
		const alarmText = alarm ? `\n알람 타이머: ${alarm}분 전` : ''
		const isConfirmed = confirm(
			`이 데이터를 저장하시겠습니까?\n\n${sealText}\n${priceText}${serverText}${alarmText}\n
(이미 서버에 저장된 데이터가 있는 경우 현재 데이터로 교체됩니다.)`
		)
		if (!isConfirmed) return
		await uploadData(paramsData)
		toast.on('데이터 저장이 완료되었습니다.')
		goto('/my')
	}

	onMount(() => {
		checkMember()
		setTimeout(() => {
			textareaElement.focus()
		}, 60)
	})

	$: !$user && !import.meta.env.SSR && goto('/')
</script>

<svelte:head>
	<title>{META.SAVE_URL.TITLE}</title>
	<meta name="description" content={META.SAVE_URL.DESC} />
</svelte:head>

<Section size="sm" class="gap-10">
	<Title class="text-center leading-[1.5]">
		가장 최근 url을 복사하여 텍스트 입력 영역에 넣어주세요.
	</Title>
	<figure>
		<img src={urlExampleSrc} alt="url 예시" />
		<figcaption class="mt-2 text-center text-xs leading-[1.3] text-gray-300">
			그동안 사이트를 사용하면서 쌓인 데이터가 url에 저장되어 있어요! <br />
			url 전체를 복사해서 붙여 넣어 주세요.
		</figcaption>
	</figure>
	<form
		on:submit|preventDefault={onSubmit}
		class="flex-col-center w-full gap-3"
	>
		<textarea
			bind:this={textareaElement}
			class="min-h-[15em] w-full text-xs font-extralight"
			bind:value={userUrl}
		/>
		<Button size="lg" class="bg-primary-30">데이터 저장하기</Button>
	</form>
</Section>
