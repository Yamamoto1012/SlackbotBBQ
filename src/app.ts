import { App } from '@slack/bolt';
import { config } from 'dotenv';
import { createModeSelectionModal } from './views/modeSelectionModal';
import { generateRandomChars, generateRandomCharsWithBBQ } from './utils/randomGenerator';

// 環境変数の読み込み
config();

// Slackアプリの初期化
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN
});

// スラッシュコマンドのハンドラ
app.command('/randombbq', async ({ command, ack, body, client }) => {
  try {
    // コマンドの受信を確認
    await ack();

    // モーダルを開く
    await client.views.open({
      trigger_id: body.trigger_id,
      view: createModeSelectionModal(command.channel_id)
    });
  } catch (error) {
    console.error('Error handling slash command:', error);
  }
});

// モーダル送信のハンドラ
app.view('mode_selection', async ({ ack, body, view, client }) => {
  try {
    // モーダルの送信を確認
    await ack();

    // メタデータからチャンネルIDを取得
    const { channelId } = JSON.parse(view.private_metadata || '{}');

    // 選択されたモードを取得
    const selectedMode = view.state.values.mode_selection.mode_selection_action.selected_option?.value;

    // モードに応じてランダム文字を生成
    const randomChars = selectedMode === 'bbq_20x'
      ? generateRandomCharsWithBBQ()
      : generateRandomChars();

    // 結果をチャンネルに投稿
    await client.chat.postMessage({
      channel: channelId,
      text: `ランダム英字生成結果: *${randomChars}*`,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `ランダム英字生成結果: *${randomChars}*`
          }
        }
      ]
    });
  } catch (error) {
    console.error('Error handling modal submission:', error);
  }
});

// アプリの起動
(async () => {
  await app.start();
  console.log('アプリが起動しました');
})();