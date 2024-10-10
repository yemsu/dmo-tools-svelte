export const CONFIRM = {
	FINAL_NICKNAME: {
		kr: '이 닉네임으로 회원 가입을 진행하시겠어요?',
		en: 'Would you like to proceed with this nickname for your account registration'
	},
	CHANGE_NICKNAME: (nickname: string) => ({
		kr: `"${nickname}"으로 닉네임을 변경하시겠어요?`,
		en: `Would you like to change your nickname to "${nickname}"?`
	}),
	ADD_MY_SEAL: (sealName: string, sealCount: number) => ({
		kr: `${sealName}씰 ${sealCount}개를 보유 씰에 추가하시겠어요?`,
		en: `Would you like to add ${sealCount} ${sealName} seals to your collection?`
	}),
	REMOVE_SEAL_PRICE: {
		kr: '설정한 가격을 제거하시겠어요? 제거 후에는 서버에 저장된 가격이 노출됩니다.',
		en: 'Do you want to remove the set price? After removal, the price stored on the server will be exposed.'
	},
	DELETE_SEAL: {
		kr: '해당 씰을 제거하시겠어요? 삭제된 데이터는 복구가 불가능 합니다.',
		en: 'Do you want to remove this seal? Deleted data cannot be recovered.'
	},
	CLEAR_GACHA_RESULT: {
		kr: '뽑기 결과를 초기화 하시겠습니까?',
		en: 'Are you sure you want to reset the gacha results?'
	},
	RESIGN: {
		kr: '정말 탈퇴하시겠어요?\n탈퇴 후엔 모든 데이터가 삭제되며 복구가 불가합니다.',
		en: 'Are you sure you want to delete your account? \nAll data will be erased and cannot be recovered.'
	}
}
