/**
 * ランダムな3文字の英字を生成する
 * @returns 生成された3文字の英字
 */
export const generateRandomChars = (): string => {
  const chars: string[] = [];
  for (let i = 0; i < 3; i++) {
    // A-Zのランダムな文字を生成
    const charCode = 65 + Math.floor(Math.random() * 26);
    chars.push(String.fromCharCode(charCode));
  }
  return chars.join('');
};

/**
 * BBQ確率20倍モードでランダムな3文字の英字を生成する
 * @returns 生成された3文字の英字
 */
export const generateRandomCharsWithBBQ = (): string => {
  // BBQの通常出現確率: (1/26)^3 = 1/17576
  // 20倍モードでの目標確率: 20/17576 ≈ 1/878.8
  const BBQ_PROBABILITY = 20 / 17576;
  
  // ランダムな値を生成
  const randomValue = Math.random();
  
  // BBQ確率に基づいて判定
  if (randomValue < BBQ_PROBABILITY) {
    return 'BBQ';
  }
  
  // 通常のランダム生成
  return generateRandomChars();
};

/**
 * BBQ確率95%モードでランダムな3文字の英字を生成する
 * @returns 生成された3文字の英字
 */
export const generateRandomCharsWithBBQ95 = (): string => {
  const BBQ_PROBABILITY = 0.95;

  // ランダムな値を生成
  const randomValue = Math.random();

  // BBQ確率に基づいて判定
  if (randomValue < BBQ_PROBABILITY) {
    return 'BBQ';
  }

  // 通常のランダム生成
  return generateRandomChars();
};