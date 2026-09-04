# Project media guide

프로젝트별 화면 형태는 `app/page.tsx`의 `mediaKind`와 `media` 데이터만으로 결정됩니다.

- `responsive`: Flowmark — desktop + mobile 동시 노출
- `mobile`: BAP.P / USAGI — 모바일 화면 중심
- `web`: Folder Tree — 데스크톱 브라우저 화면 중심
- `desktop-app`: File Bowling — Windows 앱 창 중심

## 실제 스크린샷 교체

현재 `public/projects/`의 SVG는 자리 확인용 샘플입니다. 같은 파일명으로 실제 PNG/WebP를 넣거나 `media` 경로만 변경하면 레이아웃 코드는 수정할 필요가 없습니다.

권장 원본 비율:

- 모바일: 9:19~9:20 세로 스크린샷
- 웹: 16:9~16:10 데스크톱 스크린샷
- 데스크톱 앱: 16:9 전후 앱 전체 창 캡처
- Flowmark: desktop 1장 + mobile 1장

모든 프레임은 카드/모달/모바일 반응형에서 같은 `ProjectMedia` 컴포넌트를 재사용합니다.


## 실제 스크린샷 적용 (2026-09-03)

- Flowmark desktop: `/public/projects/flowmark.jpg`
- Flowmark mobile: `/public/projects/flowmark-mobile.png`
- BAP.P mobile: `/public/projects/bap-mobile.jpg`
- USAGI mobile: `/public/projects/usagi-mobile.jpg`
- Folder Tree desktop: `/public/projects/folder-tree.jpg`
- File Bowling은 실제 데스크톱 스크린샷이 들어오기 전까지 기존 placeholder를 유지합니다.

각 실제 캡처의 원본 종횡비를 프레임에 반영해 `object-fit: cover` 상태에서도 주요 UI가 잘리지 않도록 구성했습니다.
