# Web Optimization Notes

이번 최적화는 기존 디자인, UI 구조, 냉장고 Hero 인터랙션, 프로젝트 모달 동작을 유지하는 것을 우선으로 적용했습니다.

## 적용 내용

- 프로젝트 미리보기 이미지에 width/height를 명시해 레이아웃 시프트(CLS) 방지
- 프로젝트 이미지를 lazy loading + async decoding 처리
- Projects / Contact 영역에 content-visibility 적용해 초기 렌더 비용 절감
- Hero 냉장고의 반복 box-shadow 애니메이션을 opacity 기반으로 변경해 페인트 비용 감소
- 냉장고 인터랙션 타이머를 정리하고 전환 중 중복 클릭 방지
- 컴포넌트 언마운트 시 타이머 cleanup 처리
- 모달 열림 시 body scroll lock / ESC 닫기 / 닫기 버튼 focus / 종료 후 기존 focus 복귀
- 모달 backdrop 동작을 click 기반으로 변경해 터치 디바이스 대응 강화
- modal overscroll 제어 및 iOS 관성 스크롤 대응
- keyboard focus-visible 스타일 추가
- 모바일 탭 highlight 제거 및 touch-action 보강
- prefers-reduced-motion 기존 지원 유지
- viewport/themeColor 메타데이터 추가
- 불필요한 tsconfig.tsbuildinfo 제거

## 검증 참고

현재 실행 환경에서는 npm install이 네트워크/실행 시간 제한으로 완료되지 않아 `next build`까지 실행하지 못했습니다. 배포 전 로컬에서 아래 명령으로 최종 확인해 주세요.

```bash
npm install
npm run build
```
