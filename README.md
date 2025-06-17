# Jane's Drawing Kit

React와 TypeScript, Vite, 그리고 vanilla-extract를 기반으로 한 웹 드로잉 툴입니다. 펜, 브러시, 지우개 등 다양한 도구를 제공하며, 직관적인 옵션 선택 UI와 Undo/Redo 기능을 지원합니다.

## 주요 기능

- **펜/브러시/지우개 도구**: 다양한 스타일로 그림을 그릴 수 있습니다.
- **색상 및 선 두께 선택**: 각 도구별로 색상과 두께를 조절할 수 있습니다.
- **Undo/Redo**: 작업 내역을 쉽게 되돌리거나 복구할 수 있습니다.
- **커스텀 스타일**: vanilla-extract를 활용해 type-safety하게 CSS를 작성할 수 있습니다.

## 프로젝트 구조

```
├── public/                # 정적 파일 및 에셋
├── src/
│   ├── components/        # UI 컴포넌트 (Canvas, ToolBar, ActionBar 등)
│   ├── constants/         # 도구/액션 설정 상수
│   ├── hooks/             # 커스텀 훅 (useDrawing, useHistory 등)
│   ├── libs/              # 각 도구의 구현 클래스 및 공통 추상 클래스
│   ├── types/             # 타입 정의
│   ├── utils/             # 유틸리티 함수
│   └── App.tsx
├── ...
```

## 설치 및 실행

```sh
# 의존성 설치
yarn install

# 개발 서버 실행
yarn run dev

# 빌드
yarn run build

# 빌드 결과 미리보기
yarn run preview

# 코드 린트
yarn run lint
```

## 사용 기술

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [vanilla-extract](https://vanilla-extract.style/)
- [clsx](https://github.com/lukeed/clsx)
- [zod](https://zod.dev/) (옵션 스키마 검증에만 사용)
- [react-icons](https://react-icons.github.io/react-icons/)

## 커스텀 도구 추가

새로운 도구를 추가하려면 `toolBase.ts`에서 추상 클래스를 상속받아 구현하고, `App.tsx`에서 등록하면 됩니다.

## 핵심 설계 원칙

- **도구 추상화 아키텍처**  
  모든 도구는 `ToolBase` 추상 클래스를 상속하며, 공통 인터페이스(`render`, `onPointerDown` 등)를 구현합니다.  
  `useDrawing` 훅은 도구 구현에 독립적이며, 새로운 도구 추가 시 별도 수정 없이 확장 가능한 것을 목표로 설계하였습니다.

- **성능 최적화**  
  드로잉 시 점 간 거리가 2px 미만이면 점 생성을 생략하여 메모리 사용량과 렌더링 비용을 줄입니다.  
  `vanilla-extract`(정적 CSS 추출)와 `clsx`(조건부 클래스 조합)로 CSS 성능 최적화를 시도했습니다.

- **컴포넌트 재사용성**  
  `ColorPicker`, `LineWidthPicker` 옵션 컴포넌트는 `optionKey` props로 다양한 도구 옵션에 대응하며, 새로운 도구 추가 시 별도 수정 없이 재사용할 수 있습니다.
