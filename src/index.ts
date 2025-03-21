import AssistantV2 = require('ibm-watson/assistant/v2');
import { IamAuthenticator } from 'ibm-watson/auth';

const apikey = process.env.APIKEY || '';
const serviceUrl = process.env.SERVICE_URL || '';
const assistantId = process.env.ASSISTANT_ID || '';
const environmentId = process.env.ENVIRONMENT_ID || '';

const assistant = new AssistantV2({
  version: '2021-11-27',
  authenticator: new IamAuthenticator({
    apikey
  }),
  disableSslVerification: true,
  serviceUrl
});

const message = {
  input: {
    text: 'say a joke'
  }
};

const getSessionId = async (): Promise<string | null> => {
  try {
    const session = await assistant.createSession({
      assistantId
    });
    return session.result.session_id;
  } catch (error) {
    console.error('Error creating session:', error);
    return null;
  }
};

const sendMessage = async () => {
  const sessionId = (await getSessionId()) || '';
  try {
    const response = await assistant.message({
      assistantId,
      sessionId,
      input: message.input,
      environmentId
    });

    console.log(JSON.stringify(response.result, null, 2));
  } catch (error) {
    console.error(error);
  }
};

sendMessage();
