import admin from 'firebase-admin';
import serviceAccount from '../../../firebase-adminsdk.json';

const firebaseKeys = {
  type: serviceAccount.type,
  projectId: serviceAccount.project_id,
  privateKeyId: serviceAccount.private_key_id,
  privateKey: serviceAccount.private_key,
  clientEmail: serviceAccount.client_email,
  clientId: serviceAccount.client_id,
  authUri: serviceAccount.auth_uri,
  tokenUri: serviceAccount.token_uri,
  authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
  clientC509CertUrl: serviceAccount.client_x509_cert_url,
};

admin.initializeApp({
  credential: admin.credential.cert(firebaseKeys),
});

const pushAlarm = async (fcmTokens: string[], lastMessage: string) => {
  try {
    const message = {
      android: {
        notification: {
          title: '미래의 나에게서 메시지가 도착했어요!',
          body: lastMessage,
        },
      },
      apns: {
        payload: {
          aps: {
            contentAvailable: true,
            alert: {
              title: '미래의 나에게서 메시지가 도착했어요!',
              body: lastMessage,
            },
          },
        },
      },
      tokens: fcmTokens,
    };

    admin
      .messaging()
      .sendMulticast(message)
      .then(function (res) {
        console.log('Successfully sent message: : ', res);
      })
      .catch(function (err) {
        console.log('Error Sending message!!! : ', err);
      });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const PushAlarmService = {
  pushAlarm,
};

export default PushAlarmService;
