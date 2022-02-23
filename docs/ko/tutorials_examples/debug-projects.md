# SubQuery 프로젝트 디버깅 방법

## 비디오 가이드

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/6NlaO-YN2q4" frameborder="0" allowfullscreen="true"></iframe>
</figure>

## 소개

단계별 코드 실행, 중단점 설정, 변수 검사와 같은 SubQuery 프로젝트를 디버그하려면, Chrome 개발자 도구와 함께 Node.js 검사기를 사용해야 합니다.

## 노드 검사기

터미널 화면에서 다음 명령어를 실행합니다.

```shell
node --inspect-brk <path to subql-node> -f <path to subQuery project>
```

예시
```shell
node --inspect-brk /usr/local/bin/subql-node -f ~/Code/subQuery/projects/subql-helloworld/
ws://127.0.0.1:9229/56156753-c07d-4bbe-af2d-2c7ff4bcc5ad에서 수신하는 디버거
도움이 필요하면 https://nodejs.org/en/docs/inspector를 참조하세요.
```

## Chrome 개발도구

Chrome DevTools를 열고 소스 탭으로 이동합니다. 녹색 아이콘을 클릭하면 새 창이 열립니다.

![node inspect](/assets/img/node_inspect.png)

파일 시스템으로 이동하여 프로젝트 폴더를 작업 공간에 추가하십시오. 그런 다음 dist > mappings 폴더를 열고 디버그할 코드를 선택합니다. 이후 표준 디버깅 도구와 마찬가지로 코드를 단계별로 실행합니다.

![debugging projects](/assets/img/debugging_projects.png)
