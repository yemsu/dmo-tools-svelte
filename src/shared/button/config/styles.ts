export const buttonShapeStyles = {
	full: 'rounded-full',
	md: 'rounded-md',
	sm: 'rounded-sm'
}

const iconCommonStyle = 'flex-center flex-center aspect-square leading-[0]'
export const buttonSizeStyles = {
	text: 'flex-inline-center',
	icon: `${iconCommonStyle} land:h-[30px] h-[25px]`,
	'icon-sm': `${iconCommonStyle} land:w-[16px] land:h-[16px] w-[16] h-[16]`,
	'icon-md': `${iconCommonStyle} land:w-[38px] land:h-[38px] w-[30px] h-[30px]`,
	'icon-lg': `${iconCommonStyle} w-input-h h-input-h`,
	xs: 'flex-center px-2 py-1 text-sub-lg h-input-h-xs',
	sm: 'flex-center px-2 py-1 text-body-sm h-input-h-sm',
	md: 'flex-center min-w-[3.5em] px-2 py-1 text-body-sm md:text-body-md land:h-[35px] h-[30px]',
	'md-lg':
		'flex-center min-w-[3.5em] h-[30px] px-2 text-body-sm md:text-body-md',
	lg: 'flex-center px-[1em] pt-[0.6em] pb-[0.4em] text-body-sm md:text-body-md min-w-[5em] h-input-h'
}
export const buttonVariants = {
	point: 'point-neon',
	blue: 'bg-blue-6 text-white',
	gray: 'bg-gray-5',
	ghost: 'hover:bg-gray-3',
	'ghost-danger': 'text-red hover:bg-gray-3',
	background: 'bg-background',
	danger: 'bg-red text-white',
	warning: 'bg-warning',
	outline: 'border border-gray-5',
	'outline-danger': 'border border-red text-red font-bold',
	link: 'hover:underline hover:underline-offset-2'
}
