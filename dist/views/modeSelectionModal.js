"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createModeSelectionModal = void 0;
/**
 * モード選択モーダルの定義を生成する
 * @param channelId コマンドが実行されたチャンネルID
 * @returns モーダルの定義
 */
const createModeSelectionModal = (channelId) => {
    return {
        type: 'modal',
        callback_id: 'mode_selection',
        title: {
            type: 'plain_text',
            text: '🎰 ランダム英字生成 🎰',
            emoji: true
        },
        submit: {
            type: 'plain_text',
            text: '🎲 生成開始 🎲',
            emoji: true
        },
        close: {
            type: 'plain_text',
            text: 'キャンセル',
            emoji: true
        },
        blocks: [
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: '🎯 *ランダム英字生成機へようこそ！*\n\nモードを選択して、運試しをしましょう！'
                }
            },
            {
                type: 'divider'
            },
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: '🎲 *通常モード*\n> 完全ランダム！\n> 出現確率: 均等'
                }
            },
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: '🔥 *BBQ確率20倍モード*\n> BBQが出る確率が20倍！\n> 出現確率: BBQ 1/878.8'
                }
            },
            {
                type: 'divider'
            },
            {
                type: 'input',
                block_id: 'mode_selection',
                element: {
                    type: 'radio_buttons',
                    action_id: 'mode_selection_action',
                    options: [
                        {
                            text: {
                                type: 'plain_text',
                                text: '🎲 通常モード',
                                emoji: true
                            },
                            value: 'normal'
                        },
                        {
                            text: {
                                type: 'plain_text',
                                text: '🔥 BBQ確率20倍モード',
                                emoji: true
                            },
                            value: 'bbq_20x'
                        }
                    ]
                },
                label: {
                    type: 'plain_text',
                    text: 'モードを選択',
                    emoji: true
                }
            },
            {
                type: 'context',
                elements: [
                    {
                        type: 'mrkdwn',
                        text: '🎰 *運試しの時間です！* モードを選んで生成ボタンを押してください！'
                    }
                ]
            }
        ],
        // チャンネルIDをメタデータとして保存
        private_metadata: JSON.stringify({ channelId })
    };
};
exports.createModeSelectionModal = createModeSelectionModal;
