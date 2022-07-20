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
      android: {
        data: {
          title: '김루희 똥방구',
          body: '어쩔티비 저쩔티미 우짤레미 저짤레미 눼눼눼눼 아무말도 못하쥬?',
        },
      },
      apns: {
        payload: {
          aps: {
            contentAvailable: true,
            alert: {
              title: '김루희 똥방구',
              body: '어쩔티비 저쩔티미 우짤레미 저짤레미 눼눼눼눼 아무말도 못하쥬?',
            },
          },
        },
      },
      //tokens: fcmTokens,
      token: 'fCg8r5Q8kkZSo8wbrdsgut:APA91bFwEGVfvvIDKV5622SxbiRUbc5bPq0FnQmUFGjghXYQszKC6FTI2lUEHbdDgiGv0GazEWquuSyLydEBI-dqWm_V3fBkZ38HIb_YLht2DGFfwy07b-oxz3oLT9lPHRNaD3wvaj8-',
    };

    admin
      .messaging()
      //.sendMulticast(message)
      .send(message)
      .then(function (res) {
        console.log('Successfully sent message: : ', res);
      })
      .catch(function (err) {
        console.log('Error Sending message!!! : ', err);
      });
    return 'hello';
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const PushAlarmService = {
  pushAlarm,
};

export default PushAlarmService;
