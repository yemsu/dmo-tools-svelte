import { NICKNAME_SCHEMA, CHARACTER_SCHEMA } from './config/schema'
import type { FormSchema } from './types/schema'
import Input from './ui/Input.svelte'
import ToggleFormWrap from './ui/ToggleFormWrap.svelte'
import ValidationText from './ui/ValidationText.svelte'

export {
	Input,
	ToggleFormWrap,
	ValidationText,
	NICKNAME_SCHEMA,
	CHARACTER_SCHEMA,
	type FormSchema
}
