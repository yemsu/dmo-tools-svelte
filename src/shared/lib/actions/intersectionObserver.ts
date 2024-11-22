interface IntersectionOptions {
	target: Element | string
	rootMargin?: string
	threshold?: number | number[]
	onIntersect?: (isIntersecting: boolean) => void
}

export function intersectionObserver(
	node: HTMLElement,
	options: IntersectionOptions
) {
	let observer: IntersectionObserver
	let targetElement: Element | null = null

	const setupObserver = () => {
		if (observer) {
			observer.disconnect()
		}

		if (typeof options.target === 'string') {
			targetElement = document.querySelector(options.target)
		} else {
			targetElement = options.target
		}

		if (!targetElement) return

		observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					options.onIntersect?.(entry.isIntersecting)
				})
			},
			{
				root: null,
				rootMargin: options.rootMargin || '20px 0px 0px 0px',
				threshold: options.threshold || 0
			}
		)

		observer.observe(targetElement)
	}

	setupObserver()

	return {
		update(newOptions: IntersectionOptions) {
			options = newOptions
			setupObserver()
		},
		destroy() {
			if (observer) {
				observer.disconnect()
			}
		}
	}
}
