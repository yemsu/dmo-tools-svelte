import type { UserData } from '$entities/user'

declare namespace App {
	interface Locals {
		session: UserData | null
	}
}
