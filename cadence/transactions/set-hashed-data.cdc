import "Flowthentic"

transaction(userId: String, hashedData: String) {
  prepare(acct: AuthAccount) {
    log(userId)
    log(hashedData)
    Flowthentic.setHashedData(userId: userId, hashedData: hashedData)
  }
}