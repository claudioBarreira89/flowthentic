import "Flowthentic"

transaction(userId: String, hashedData: String, encryptedImage: String) {
  prepare(acct: AuthAccount) {
    Flowthentic.setUserData(userId: userId, hashedData: hashedData, encryptedImage: encryptedImage)
  }
}