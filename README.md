# we-ar-assignment

위에이알 프론트엔드 직무 지원자 이치행의 과제 수행 내용입니다.

<br />

----

<br />

## # 목차

## # 프로젝트 구조

```
📦we-ar-assignment
 ┣ 📂dist
 ┃ ┣ 📜bundle.js
 ┃ ┗ 📜index.html
 ┣ 📂public
 ┃ ┗ 📜index.html
 ┣ 📂src
 ┃ ┣ 📂elements
 ┃ ┃ ┣ 📜ball.ts
 ┃ ┃ ┗ 📜canvas.ts
 ┃ ┣ 📂logic
 ┃ ┃ ┗ 📜random.ts
 ┃ ┣ 📂style
 ┃ ┃ ┗ 📜index.css
 ┃ ┣ 📂types
 ┃ ┃ ┗ 📜global.d.ts
 ┃ ┣ 📂utils
 ┃ ┃ ┣ 📜capsuledConditions.ts
 ┃ ┃ ┗ 📜functions.ts
 ┃ ┗ 📜index.ts
 ┣ 📜.env
 ┣ 📜.eslintrc.json
 ┣ 📜.gitignore
 ┣ 📜.prettierrc
 ┣ 📜README.md
 ┣ 📜package.json
 ┣ 📜tsconfig.json
 ┣ 📜webpack.config.js
 ┗ 📜yarn.lock
```

[목차](#목차)

## # 상세 화면

![assignment](https://user-images.githubusercontent.com/20578093/188335154-98b543ec-ab88-4588-b26d-af4e4aea6449.gif)

[목차](#목차)

## # 목표 및 구현사항

- 캔버스 사이즈는 가로 1000, 세로 500 고정입니다.
  - Canvas 클래스의 static 프로퍼티로 너비, 높이를 설정해 가로 1000, 세로 500 고정 크기를 구현했습니다. ([참조: Canvas 2 ~ 3](https://github.com/godcl1623/we-ar-assignment/blob/master/src/elements/canvas.ts))

<br />

- 스테이지에 10 ~ 20개의 공이 랜덤한 위치에 생성됩니다.
  - 랜덤한 값을 얻을 수 있는 Random 객체의 `getNumberBetween` 메소드를 사용해 10 ~ 20의 숫자 중 공의 개수를 결정합니다. ([참조: Random 9 ~ 13](https://github.com/godcl1623/we-ar-assignment/blob/master/src/logic/random.ts))
  - 기본 생성 위치는 Random 객체의 `getBallData` 메소드를 사용해 구현합니다. (참조: Random 17 ~ 18, 5 ~ 7)
    - 좌표에 따라 공이 캔버스의 경계를 넘어 가려지는 일이 발생할 수 있으므로, Ball 객체에서 입력된 X 및 Y좌표, 반지름을 계산해 캔버스 내부에서 공이 생성되도록 보정하는 메소드를 구현했습니다. ([참조: Ball 54 ~ 66](https://github.com/godcl1623/we-ar-assignment/blob/master/src/elements/ball.ts))

<br />

- 0 ~ 360 사이의 랜덤한 각도로 공이 날아갑니다. (참조: Ball 46 ~ 50, 85 ~ 88)
  - 기본적인 공의 이동은 `최초 X 혹은 Y좌표 + (X 혹은 Y로의 속도 * 방향)`으로 구할 수 있습니다. 방향은 양수일 때 오른쪽, 음수일 때 왼쪽입니다.
  - 랜덤한 각도는 `Math.random() * (Math.PI * 2)`로 설정했습니다. 캔버스 컨텍스트의 `arc()` 메소드, 각도에 대한 방향을 구하는 `Math.cos()` 등의 메소드는 라디안 값을 사용하기 때문입니다.
  - 각도에 대한 방향은 X좌표의 경우 각도에 `Math.cos()`를 적용, Y좌표의 경우 각도에 `Math.sin()`을 적용합니다.
  - 공의 이동 값에 각도에 대한 방향을 곱하면 각도에 대한 이동 좌표를 구할 수 있습니다.

<br />

- 10 ~ 20px 사이의 랜덤한 반지름을 가집니다. (Random: 16, 9 ~ 13)
  - Random 객체의 `getNumberBetween` 메소드를 사용해 각 공마다의 반지름을 구했습니다.

<br />

- 200 ~ 400px/s 사이의 랜덤한 속도를 가집니다.
  - Random 객체의 `getNumberBetween` 메소드를 사용해 기본적으로 200px에서 400px씩 움직이도록 만들었습니다. (Random: 19)
  - 여기서 설정한 속도를 모든 환경에 일정하게 유지해야 하는데, 여기에 사용된 개념이 `delta time`입니다.
    - JavaScript는 주 모니터의 화면 주사율에 따라 애니메이션으로 재생되는 요소들의 속도가 달라지는 것으로 보입니다.
    - `window.performance.now()`와 `requestAnimationFrmae`이 반환하는 `timestamp`를 사용해 변화량을 계산하고, 밀리초 단위를 초 단위로 나타내기 위해 변화량에 1000을 나눠 `delta time`을 계산합니다. ([index: 19 ~ 24](https://github.com/godcl1623/we-ar-assignment/blob/master/src/index.ts))
    - 공의 이동좌표에 `delta time`을 곱하면 주 모니터의 주사율이 변화해도 일정한 속도로 공이 이동하도록 만들 수 있습니다. (Ball: 79 ~ 88)

<br />

- 벽과 부딪힐경우 반사각으로 튕겨져 나갑니다. [하단 참조] (Ball: 90 ~ 113)
- 공과 공이 부딪힐경우 반사각으로 튕겨져 나갑니다. (Ball: 139 ~ 154)
  - 공과 벽 공통적으로 반사각으로 튕겨져 나가는 기능은 기존 이동좌표의 방향을 반대로 바꾸는 것입니다. (Ball: 100 ~ 101)
  - 공과 공의 충돌의 경우 전체 공 리스트에 대해 루프를 적용, 공 중심끼리의 거리와 반지름 간의 거리를 비교해 중심 간 거리가 작은 경우에 방향을 반대로 변경했습니다. (Ball: 139 ~ 154)
  - 공과 벽의 충돌의 경우 고려할 사항이 좀 더 많은데, 벽이 사방에 있는 만큼 공 중심의 X 혹은 Y좌표가 캔버스의 상하좌우 끝을 벗어나는 경우 캔버스 내부를 벗어나지 않도록 보정하는 작업이 필요하기 때문입니다. (Ball: 90 ~ 113)

[목차](#목차)

## 프로젝트 실행 방법

- 프로젝트 클론

    ```bash
    # 현재 디렉터리에 클론하는 경우
    $ git clone https://github.com/godcl1623/we-ar-assignment.git .

    # 하위 디렉터리에 클론하는 경우
    $ git clone https://github.com/godcl1623/we-ar-assignment.git ./godcl1623-we-ar-assignment
    ```

- 프로젝트 실행

    ```bash
    # 필요 패키지 설치
    $ yarn
    
    # develop 서버 실행
    $ yarn start
    ```

[목차](#목차)
