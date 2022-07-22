import Agenda from 'agenda';
import admin from 'firebase-admin';
import serviceAccount from '../../../firebase-adminsdk.json';
import config from '../../config';

// firebase setting
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

// agenda setting
const agenda = new Agenda({
  db: { address: config.mongoURI, collection: "agendaJobs" }
})

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

    agenda.define('pushAlarm', async () => {
      admin
        .messaging()
        .sendMulticast(message)
        .then(function (res) {
          console.log('Successfully sent message: : ', res);
        })
        .catch(function (err) {
          console.log('Error Sending message!!! : ', err);
        });
      //await job.remove();
    });
    
    // 3초 후 구하기
    const now = new Date();
    now.setSeconds(now.getSeconds() + 10);
    
    // 스케줄
    const job = agenda.schedule(now, "pushAlarm", null);
    (await job).save();
    agenda.start();
    //(await job).remove();

    // admin
    //   .messaging()
    //   .sendMulticast(message)
    //   .then(function (res) {
    //     console.log('Successfully sent message: : ', res);
    //   })
    //   .catch(function (err) {
    //     console.log('Error Sending message!!! : ', err);
    //   });
    // agenda.schedule("after 10 seconds", "pushAlarm", null);
    // agenda.start();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const PushAlarmService = {
  pushAlarm,
};

export default PushAlarmService;
