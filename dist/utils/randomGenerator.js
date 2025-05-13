"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomCharsWithBBQ = exports.generateRandomChars = void 0;
/**
 * ランダムな3文字の英字を生成する
 * @returns 生成された3文字の英字
 */
const generateRandomChars = () => {
    const chars = [];
    for (let i = 0; i < 3; i++) {
        // A-Zのランダムな文字を生成
        const charCode = 65 + Math.floor(Math.random() * 26);
        chars.push(String.fromCharCode(charCode));
    }
    return chars.join('');
};
exports.generateRandomChars = generateRandomChars;
/**
 * BBQ確率20倍モードでランダムな3文字の英字を生成する
 * @returns 生成された3文字の英字
 */
const generateRandomCharsWithBBQ = () => {
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
    return (0, exports.generateRandomChars)();
};
exports.generateRandomCharsWithBBQ = generateRandomCharsWithBBQ;
