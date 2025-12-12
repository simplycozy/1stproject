# 🎥 새 Git 계정 연동 완벽 가이드

## 📋 개요
기존 Git 글로벌 설정을 새로운 계정으로 변경하고, 로컬 프로젝트를 새 GitHub 저장소에 연결하는 완전한 튜토리얼입니다.

## 🎯 목표
- 기존 글로벌 Git 설정을 새 계정으로 변경
- 로컬 프로젝트를 새 GitHub 저장소에 연결
- SSH 인증을 통한 안전한 연결 구축

## 📋 사전 준비
- ✅ 새 GitHub 계정: `dddesigncontact`
- ✅ 새 이메일: `contact@dddesign.io`
- ✅ 새 GitHub 저장소: `https://github.com/dddesigncontact/1stproject`
- ✅ 로컬 프로젝트: 준비 완료

---

## 🔄 1단계: 프로젝트 Git 초기화

### 기존 Git 저장소 완전 삭제
기존의 모든 Git 기록을 삭제하여 깨끗한 상태로 시작합니다.

```bash
rm -rf .git
```

### Git 상태 확인 (삭제 확인)
삭제가 제대로 되었는지 확인합니다.

```bash
git status
```

**예상 결과:**
```
fatal: not a git repository (or any of the parent directories): .git
```

> ✅ **성공**: 이 오류 메시지가 나오는 것이 정상입니다.

---

## ⚙️ 2단계: 글로벌 Git 설정 변경

### 새 계정으로 글로벌 설정
시스템 전체의 Git 설정을 새 계정 정보로 변경합니다.

```bash
git config --global user.name "dddesigncontact"
git config --global user.email "contact@dddesign.io"
```

### 설정 확인
변경된 설정이 제대로 적용되었는지 확인합니다.

```bash
git config --global user.name
git config --global user.email
```

**예상 결과:**
```
dddesigncontact
contact@dddesign.io
```

---

## 🆕 3단계: 새로운 Git 저장소 생성

### Git 저장소 초기화
현재 디렉토리에 새로운 Git 저장소를 생성합니다.

```bash
git init
```

**예상 결과:**
```
Initialized empty Git repository in /Users/ddd/Desktop/final-practice-ordinary-design-starter/.git/
```

### 메인 브랜치로 설정
기본 브랜치를 `master`에서 `main`으로 변경합니다.

```bash
git branch -M main
```

---

## 📁 4단계: 파일 추가 및 커밋

### 모든 파일 스테이징
프로젝트의 모든 파일을 Git에 추가합니다.

```bash
git add .
```

### 새 계정으로 첫 커밋
새로운 계정 정보로 첫 번째 커밋을 생성합니다.

```bash
git commit -m "Initial commit with dddesigncontact account"
```

**예상 결과:**
```
[main (root-commit) a2345b9] Initial commit with dddesigncontact account
 231 files changed, 35974 insertions(+)
 create mode 100644 .gitignore
 create mode 100644 README.md
 ... (파일 목록)
```

> ✅ **성공**: 새 계정으로 커밋이 생성되었습니다.

---

## 🔗 5단계: 원격 저장소 연결

### GitHub 저장소 연결
로컬 저장소를 원격 GitHub 저장소와 연결합니다.

```bash
git remote add origin https://github.com/dddesigncontact/1stproject.git
```

### 연결 확인
원격 저장소가 제대로 연결되었는지 확인합니다.

```bash
git remote -v
```

**예상 결과:**
```
origin  https://github.com/dddesigncontact/1stproject.git (fetch)
origin  https://github.com/dddesigncontact/1stproject.git (push)
```

---

## 🔐 6단계: SSH 인증 설정

> **⚠️ 중요**: 이 단계는 SSH 호스트 키 충돌이 발생할 경우에만 필요합니다.

### SSH 호스트 키 문제 해결
기존에 저장된 GitHub 호스트 키와 현재 키가 다를 경우 발생하는 문제를 해결합니다.

```bash
ssh-keygen -R github.com
```

**예상 결과:**
```
# Host github.com found: line 3
/Users/ddd/.ssh/known_hosts updated.
Original contents retained as /Users/ddd/.ssh/known_hosts.old
```

### SSH 연결 테스트
GitHub와의 SSH 연결을 테스트합니다.

```bash
ssh -T git@github.com
```

**인터랙션:**
```
The authenticity of host 'github.com (20.200.245.247)' can't be established.
ED25519 key fingerprint is SHA256:+DiY3wvvV6TuJJhbpZisF/zLDA0zPMSvHdkr4UvCOqU.
Are you sure you want to continue connecting (yes/no/[fingerprint])? 
```

> **yes** 입력

**성공 결과:**
```
Hi dddesigncontact! You've successfully authenticated, but GitHub does not provide shell access.
```

> ✅ **성공**: `dddesigncontact` 계정으로 인증되었습니다.

---

## 🔄 7단계: SSH URL로 변경

### 원격 저장소를 SSH URL로 변경
보다 안전한 SSH 프로토콜을 사용하도록 URL을 변경합니다.

```bash
git remote set-url origin git@github.com:dddesigncontact/1stproject.git
```

### 변경 확인
SSH URL로 제대로 변경되었는지 확인합니다.

```bash
git remote -v
```

**예상 결과:**
```
origin  git@github.com:dddesigncontact/1stproject.git (fetch)
origin  git@github.com:dddesigncontact/1stproject.git (push)
```

---

## 🚀 8단계: 최종 Push

### GitHub에 업로드
로컬 프로젝트를 GitHub 저장소에 업로드합니다.

```bash
git push -u origin main
```

**성공 결과:**
```
Enumerating objects: 277, done.
Counting objects: 100% (277/277), done.
Delta compression using up to 10 threads
Compressing objects: 100% (266/266), done.
Writing objects: 100% (277/277), 80.36 MiB | 4.76 MiB/s, done.
Total 277 (delta 12), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (12/12), done.
To github.com:dddesigncontact/1stproject.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

> 🎉 **완료**: 프로젝트가 성공적으로 업로드되었습니다!

---

## 🎯 최종 확인 사항

### ✅ 체크리스트
- [ ] 글로벌 Git 설정이 새 계정으로 변경됨
- [ ] 로컬 저장소가 새로 생성됨
- [ ] 새 계정으로 커밋이 생성됨
- [ ] SSH 인증이 성공적으로 완료됨
- [ ] 원격 저장소가 SSH로 연결됨
- [ ] GitHub에 프로젝트가 업로드됨

### 🔍 GitHub에서 최종 확인
1. **GitHub.com에서 저장소 접속**
2. **파일들이 업로드되었는지 확인**
3. **커밋 작성자가 `dddesigncontact`로 표시되는지 확인**

---

## 🚨 문제 해결 (Troubleshooting)

### 1. SSH 호스트 키 오류
```
@    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
```

**해결책:**
```bash
ssh-keygen -R github.com
ssh -T git@github.com
```

### 2. Repository not found 오류
```
remote: Repository not found.
```

**원인 및 해결책:**
- GitHub 저장소가 실제로 생성되었는지 확인
- 저장소가 Private인 경우 접근 권한 확인
- URL 오타 확인

### 3. 인증 실패
**대안 방법: Personal Access Token 사용**
```bash
git remote set-url origin https://github.com/dddesigncontact/1stproject.git
git push -u origin main
# Username: dddesigncontact
# Password: [Personal Access Token]
```

---

## 🎓 학습 포인트

### 이 가이드를 통해 학습할 수 있는 것들:
1. **Git 글로벌 설정 관리**
2. **프로젝트별 계정 분리 방법**
3. **SSH 키 인증 과정과 보안 메커니즘**
4. **원격 저장소 연결 및 관리**
5. **GitHub 계정 전환 프로세스**
6. **Git 보안 경고 대응 방법**

### 실무 활용도:
- 회사와 개인 프로젝트 계정 분리
- 팀 프로젝트에서의 계정 관리
- SSH 키 기반 보안 인증
- Git 저장소 마이그레이션

---

## 📚 참고 자료

### Git 공식 문서
- [Git 설정](https://git-scm.com/book/ko/v2/Git%EB%A7%9E%EC%B6%A4-Git-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0)
- [원격 저장소](https://git-scm.com/book/ko/v2/Git%EC%9D%98-%EA%B8%B0%EC%B4%88-%EB%A6%AC%EB%AA%A8%ED%8A%B8-%EC%A0%80%EC%9E%A5%EC%86%8C)

### GitHub 공식 문서
- [SSH 키 생성](https://docs.github.com/ko/authentication/connecting-to-github-with-ssh)
- [Personal Access Token](https://docs.github.com/ko/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

---

*이 가이드는 실제 프로젝트 연동 과정을 기반으로 작성되었습니다. 교육 목적으로 자유롭게 활용하세요.* 📖✨ 