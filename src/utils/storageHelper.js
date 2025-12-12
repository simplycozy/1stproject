/**
 * 안전한 Storage 접근 헬퍼 유틸리티
 * 
 * Storage 접근이 차단된 환경(시크릿 모드, 쿠키 차단 등)에서도
 * 에러 없이 동작하도록 try-catch로 감싼 헬퍼 함수들
 */

// Storage 사용 가능 여부 캐시
let _sessionStorageAvailable = null;
let _localStorageAvailable = null;

// Storage 접근을 완전히 안전하게 래핑하는 헬퍼
const safeStorageOperation = (operation) => {
  try {
    return operation();
  } catch (e) {
    // 모든 종류의 Storage 에러를 조용히 처리
    // Promise rejection으로 전파되지 않도록 동기적으로 처리
    return null;
  }
};

/**
 * sessionStorage 사용 가능 여부 확인 (캐시됨)
 */
const checkSessionStorageAvailable = () => {
  if (_sessionStorageAvailable !== null) {
    return _sessionStorageAvailable;
  }
  
  // 완전히 안전한 체크 - 에러가 Promise로 전파되지 않도록
  const result = safeStorageOperation(() => {
    if (typeof window === 'undefined' || typeof sessionStorage === 'undefined') {
      return false;
    }
    
    // Storage 접근 시도
    const test = '__storage_test__';
    sessionStorage.setItem(test, test);
    sessionStorage.removeItem(test);
    return true;
  });
  
  _sessionStorageAvailable = result === true;
  return _sessionStorageAvailable;
};

/**
 * localStorage 사용 가능 여부 확인 (캐시됨)
 */
const checkLocalStorageAvailable = () => {
  if (_localStorageAvailable !== null) {
    return _localStorageAvailable;
  }
  
  // 완전히 안전한 체크 - 에러가 Promise로 전파되지 않도록
  const result = safeStorageOperation(() => {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return false;
    }
    
    // Storage 접근 시도
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  });
  
  _localStorageAvailable = result === true;
  return _localStorageAvailable;
};

/**
 * sessionStorage 안전 접근 헬퍼
 */
export const safeSessionStorage = {
  /**
   * sessionStorage에서 값 가져오기
   * @param {string} key - 저장된 키
   * @returns {string|null} 저장된 값 또는 null
   */
  getItem: (key) => {
    if (!checkSessionStorageAvailable()) {
      return null;
    }
    return safeStorageOperation(() => {
      const result = sessionStorage.getItem(key);
      return result;
    }) || null;
  },

  /**
   * sessionStorage에 값 저장하기
   * @param {string} key - 저장할 키
   * @param {string} value - 저장할 값
   * @returns {boolean} 저장 성공 여부
   */
  setItem: (key, value) => {
    if (!checkSessionStorageAvailable()) {
      return false;
    }
    const result = safeStorageOperation(() => {
      sessionStorage.setItem(key, value);
      return true;
    });
    if (result === null) {
      _sessionStorageAvailable = false; // 캐시 업데이트
    }
    return result === true;
  },

  /**
   * sessionStorage에서 값 삭제하기
   * @param {string} key - 삭제할 키
   * @returns {boolean} 삭제 성공 여부
   */
  removeItem: (key) => {
    if (!checkSessionStorageAvailable()) {
      return false;
    }
    const result = safeStorageOperation(() => {
      sessionStorage.removeItem(key);
      return true;
    });
    if (result === null) {
      _sessionStorageAvailable = false; // 캐시 업데이트
    }
    return result === true;
  },

  /**
   * sessionStorage 전체 비우기
   * @returns {boolean} 비우기 성공 여부
   */
  clear: () => {
    if (!checkSessionStorageAvailable()) {
      return false;
    }
    const result = safeStorageOperation(() => {
      sessionStorage.clear();
      return true;
    });
    if (result === null) {
      _sessionStorageAvailable = false; // 캐시 업데이트
    }
    return result === true;
  },
};

/**
 * localStorage 안전 접근 헬퍼
 */
export const safeLocalStorage = {
  /**
   * localStorage에서 값 가져오기
   * @param {string} key - 저장된 키
   * @returns {string|null} 저장된 값 또는 null
   */
  getItem: (key) => {
    if (!checkLocalStorageAvailable()) {
      return null;
    }
    return safeStorageOperation(() => {
      return localStorage.getItem(key);
    }) || null;
  },

  /**
   * localStorage에 값 저장하기
   * @param {string} key - 저장할 키
   * @param {string} value - 저장할 값
   * @returns {boolean} 저장 성공 여부
   */
  setItem: (key, value) => {
    if (!checkLocalStorageAvailable()) {
      return false;
    }
    const result = safeStorageOperation(() => {
      localStorage.setItem(key, value);
      return true;
    });
    if (result === null) {
      _localStorageAvailable = false; // 캐시 업데이트
    }
    return result === true;
  },

  /**
   * localStorage에서 값 삭제하기
   * @param {string} key - 삭제할 키
   * @returns {boolean} 삭제 성공 여부
   */
  removeItem: (key) => {
    if (!checkLocalStorageAvailable()) {
      return false;
    }
    const result = safeStorageOperation(() => {
      localStorage.removeItem(key);
      return true;
    });
    if (result === null) {
      _localStorageAvailable = false; // 캐시 업데이트
    }
    return result === true;
  },

  /**
   * localStorage 전체 비우기
   * @returns {boolean} 비우기 성공 여부
   */
  clear: () => {
    if (!checkLocalStorageAvailable()) {
      return false;
    }
    const result = safeStorageOperation(() => {
      localStorage.clear();
      return true;
    });
    if (result === null) {
      _localStorageAvailable = false; // 캐시 업데이트
    }
    return result === true;
  },
};

/**
 * Storage 사용 가능 여부 확인
 * @returns {boolean} Storage 사용 가능 여부
 */
export const isStorageAvailable = () => {
  return checkSessionStorageAvailable();
};

