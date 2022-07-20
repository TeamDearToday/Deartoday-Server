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

const pushAlarm = async (fcmTokens: string[]) => {
  try {
    const message = {
      data: {
        title: '김루희 똥방구',
        body: '어쩔티비 저쩔티미 우짤레미 저짤레미 눼눼눼눼 아무말도 못하쥬?',
        style: '테스트',
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
  pushAlarm
};

export default PushAlarmService;