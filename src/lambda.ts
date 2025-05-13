import { App, AwsLambdaReceiver } from '@slack/bolt';
import type { APIGatewayProxyEvent, Context, Callback } from 'aws-lambda';
import { createModeSelectionModal } from './views/modeSelectionModal';
import {
  generateRandomChars,
  generateRandomCharsWithBBQ,
  generateRandomCharsWithBBQ95,
} from './utils/randomGenerator';

const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const slackBotToken = process.env.SLACK_BOT_TOKEN;

if (!slackSigningSecret) {
  throw new Error('SLACK_SIGNING_SECRERT が設定されていません');
}

if (!slackBotToken) {
  throw new Error('SLACK_BOT_TOKEN が設定されていません');
}

// AwsLambdaReceiver の初期化
const awsLambdaReceiver = new AwsLambdaReceiver({
  signingSecret: slackSigningSecret,
});

// Boltアプリの初期化
const app = new App({
  token: slackBotToken,
  receiver: awsLambdaReceiver,
});

// スラッシュコマンドのハンドラ
app.command('/randombbq', async ({ command, ack, body, client }) => {
  try {
    await ack();
    await client.views.open({
      trigger_id: body.trigger_id,
      view: createModeSelectionModal(command.channel_id),
    });
  } catch (error) {
    console.error('スラッシュコマンドエラー:', error);
  }
});

// モーダル送信のハンドラ
app.view('mode_selection', async ({ ack, view, client }) => {
  try {
    await ack();
    const { channelId } = JSON.parse(view.private_metadata || '{}');
    const selectedMode = view.state.values.mode_selection.mode_selection_action.selected_option?.value;
    const randomChars =
      selectedMode === 'bbq_20x'
        ? generateRandomCharsWithBBQ()
        : selectedMode === 'bbq_95'
        ? generateRandomCharsWithBBQ95()
        : generateRandomChars();
    
    // BBQが出た場合のメッセージと画像
    if (randomChars === 'BBQ') {
      await client.chat.postMessage({
        channel: channelId,
        text: "ランダム英字生成結果: *BBQ*",
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: "ランダム英字生成結果: *BBQ*",
            },
          },
        ],
      });
      await client.chat.postMessage({
        channel: channelId,
        text: '肉食え肉！',
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: '肉食え肉！',
            },
          },
          {
            type: 'image',
            image_url: 'https://images.pexels.com/photos/533325/pexels-photo-533325.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            alt_text: 'BBQの画像'
          }
        ]
      });
    } else {
      await client.chat.postMessage({
        channel: channelId,
        text: `ランダム英字生成結果: *${randomChars}*`,
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `ランダム英字生成結果: *${randomChars}*`,
            },
          },
        ],
      });
    }
  } catch (error) {
    console.error('モーダル送信エラー:', error);
  }
});

// Lambdaハンドラー
export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback,
) => {
  const receiverHandler = await awsLambdaReceiver.start();
  return receiverHandler(event, context, callback);
};