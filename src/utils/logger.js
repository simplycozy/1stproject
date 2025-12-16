/**
 * 개발 환경 전용 로거 유틸리티
 * 프로덕션 빌드에서는 로그가 출력되지 않음
 */

const isDev = process.env.NODE_ENV === 'development';

/**
 * 개발 환경에서만 console.log 출력
 * @param  {...any} args - 로그 인자들
 */
export const devLog = (...args) => {
  if (isDev) {
    console.log(...args);
  }
};

/**
 * 개발 환경에서만 console.warn 출력
 * @param  {...any} args - 경고 인자들
 */
export const devWarn = (...args) => {
  if (isDev) {
    console.warn(...args);
  }
};

/**
 * 개발 환경에서만 console.error 출력
 * @param  {...any} args - 에러 인자들
 */
export const devError = (...args) => {
  if (isDev) {
    console.error(...args);
  }
};

/**
 * 개발 환경에서만 그룹 로그 출력
 * @param {string} label - 그룹 라벨
 * @param {Function} callback - 그룹 내 실행할 로그 함수
 */
export const devGroup = (label, callback) => {
  if (isDev) {
    console.group(label);
    callback();
    console.groupEnd();
  }
};
