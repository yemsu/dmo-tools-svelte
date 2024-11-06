export type FormSchema = {
	kr: string
	en: string
	check: (value: string) => boolean | Promise<boolean>
}
