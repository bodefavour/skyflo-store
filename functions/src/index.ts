import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export const setAdminClaim = functions.https.onCall(
  async (request: functions.https.CallableRequest<{uid: string}>) => {
    if (!request.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "Not authenticated"
      );
    }

    const adminConfig = await admin.firestore().doc("adminConfig/setup").get();
    const allowedEmails: string[] = adminConfig.data()?.adminEmails || [];

    const userEmail = request.auth.token.email;
    if (!userEmail || !allowedEmails.includes(userEmail)) {
      throw new functions.https.HttpsError(
        "permission-denied",
        "Not authorized"
      );
    }

    try {
      await admin.auth().setCustomUserClaims(request.data.uid, {admin: true});
      return {success: true};
    } catch (error) {
      throw new functions.https.HttpsError("internal", "Error setting claim");
    }
  }
);
