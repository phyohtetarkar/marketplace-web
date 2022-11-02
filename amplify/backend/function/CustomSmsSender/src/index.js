const b64 = require("base64-js");
const encryptionSdk = require("@aws-crypto/client-node");

//Configure the encryption SDK client with the KMS key from the environment variables.

const { encrypt, decrypt } = encryptionSdk.buildClient(
  encryptionSdk.CommitmentPolicy.REQUIRE_ENCRYPT_ALLOW_DECRYPT
);
const generatorKeyId = process.env.KEY_ALIAS;
const keyIds = [process.env.KEY_ID];
const keyring = new encryptionSdk.KmsKeyringNode({ generatorKeyId, keyIds });

exports.handler = async (event) => {
  //Decrypt the secret code using encryption SDK.

  let plainTextCode;
  if (event.request.code) {
    const { plaintext, messageHeader } = await decrypt(
      keyring,
      b64.toByteArray(event.request.code)
    );
    plainTextCode = plaintext;
  }

  //PlainTextCode now has the decrypted secret.

  if (event.triggerSource == "CustomSMSSender_SignUp") {
    //Send sms to end-user using custom or 3rd party provider.
  } else if (event.triggerSource == "CustomSMSSender_ResendCode") {
  } else if (event.triggerSource == "CustomSMSSender_ForgotPassword") {
  } else if (event.triggerSource == "CustomSMSSender_UpdateUserAttribute") {
  } else if (event.triggerSource == "CustomSMSSender_VerifyUserAttribute") {
  } else if (event.triggerSource == "CustomSMSSender_AdminCreateUser") {
  } else if (
    event.triggerSource == "CustomSMSSender_AccountTakeOverNotification"
  ) {
  }

  return;
};
