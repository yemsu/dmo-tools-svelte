# DMO tools

![Pasted image 20250108161948](https://github.com/user-attachments/assets/c637232a-37b8-40d3-a67d-c6fc9eb9a023)

![image](https://github.com/user-attachments/assets/f56e8487-aa05-40c6-8695-0f5404d61a9e)
  
- 2.2만명의 유저가 이용하고 있는 디지몬 마스터즈 도구 모음 사이트
- 씰 효율 계산기, 레이드 타이머, 뽑기 시뮬레이터 제공

&nbsp;

## 사용 기술

 <p>
  <img src="https://img.shields.io/badge/Svelte-FF3E00?style=flat-square&logo=Svelte&logoColor=white" alt="Svelte"/>
  <img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white" alt="Typescript"/>
  <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat-square&logo=Tailwind CSS&logoColor=white" alt="Tailwind CSS"/>
 </p>

- svelte: `^4.2.7`
- typescript: `^5.0.0`
- tailwindcss: `^3.4.4`

&nbsp;

## 씰 효율 계산기

목표 스탯까지 도달할 수 있는 가장 저렴한 씰 조합을 계산해주는 씰 계산기
  
![Pasted image 20250108162229](https://github.com/user-attachments/assets/cb9956cb-6027-4320-9054-cc88a181c268)

- 씰의 기본 정보를 확인할 수 있는 툴팁 노출
- 가격 설정/해제 기능
- 게임 내 씰을 구매 시 '씰 등록 완료' 버튼 클릭으로 보유 씰에 바로 추가 가능

![Pasted image 20250108163216](https://github.com/user-attachments/assets/25a15803-96b1-4d30-9167-891cef07f43a)

- 캐릭터 추가/제거 기능으로 여러 캐릭터의 씰 효율 계산 가능

&nbsp;

## 레이드 타이머

인게임에서 레이드 시간을 확인하기 위해서는 해당 지역으로 이동해서 확인해야하는 불편함이 있어 만들게 된 레이드 타이머
  
![Pasted image 20250108163402](https://github.com/user-attachments/assets/7fc82c50-2fca-48de-9284-737f5715effc)

### 주요 기능

1. 실시간 레이드 정보 동기화
	- SSE를 활용한 실시간 이벤트 구독 시스템 구현
	- 생성(created), 투표(voted), 삭제(removed) 등 다양한 이벤트 핸들링
	- 연결 끊김 감지 및 자동 재연결 로직 구현

2. 알림 시스템
	- Web Notification API를 활용한 브라우저 알림 구현
	- 사용자 지정 알람 시간 설정 기능
	- 음성 알림 옵션 제공
	- 채널별 자동 시간 만료 처리

### 사용자 경험 최적화

- 연결 끊긴 경우 연결 상태 표시 및 재연결 버튼 제공
- 알림 시간/소리, 레이드별 알림 ON/OFF, 상단고정 여부 옵션 제공
  
    ![Pasted image 20250108162608](https://github.com/user-attachments/assets/832be63d-9279-4c12-846a-f03df402f34b)
- 로컬 스토리지를 활용한 사용자 설정 저장
- `visibilityState` `hidden` 상태가 지속될 경우 `SSE` 연결이 해제됨 -> 상태 체크하여 브라우저 활성화 `visible`로 변경 됐을 때 `SSE`연결이 끊겨 있다면 재연결 시도

### 참여 유도

- 하나의 레이드 채널에 여러 제보가 있는 경우, 좋아요 수가 더 많은 제보가 기준
- 이런 경우 유저의 참여가 필요한데, 참여가 저조하여 아래와 같이 투표 유도를 위한 안내 문구를 추가
  
![Pasted image 20250108162526](https://github.com/user-attachments/assets/632825c1-60e1-4cb6-9dea-adf22864184e)

&nbsp;

## 뽑기 시뮬레이터

- 운을 미리 시험해볼 수 있는 뽑기 시뮬레이터

![Pasted image 20250108163015](https://github.com/user-attachments/assets/f7c97f7b-8ae2-46ef-91d2-a43089f6824b)


- 뽑기 실행 시 노출되는 영상
- 결과 아이템의 희귀도가 낮을수록 영상이 오래 재생되고 디지바이스 색이 화려해진다. 인게임과 동일하게 구현하였다.

![Pasted image 20250108163054](https://github.com/user-attachments/assets/3c0e30dd-8c53-4e37-a101-a0a51f360f26)


- 뽑기 결과들은 가방에서 한꺼번에 확인할 수 있다.

![Pasted image 20250108163144](https://github.com/user-attachments/assets/a404e5ea-f034-4b0a-9422-4ffe33b98637)

&nbsp;

## 영문 사이트

- 해외 게이머들을 위해 i18n을 이용하여 영문 사이트도 작업하였다.
  
![Pasted image 20250108163900](https://github.com/user-attachments/assets/466792ca-61d0-46e9-8fcb-8d5ccc7d1772)
