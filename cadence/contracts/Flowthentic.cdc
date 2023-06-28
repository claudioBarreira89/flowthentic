pub contract Flowthentic {
  // Store a record of users who have been verified
  pub let verifiedUsers: {String: {String: String}}

  init() {
    self.verifiedUsers = {}
  }

  pub fun setUserData(userId: String, hashedData: String, encryptedImage: String) {
    self.verifiedUsers[userId] = {
      "hashedData": hashedData,
      "encryptedImage": encryptedImage
    }
  }

  pub fun getUserData(userId: String): {String: String}? {
    if let userData = self.verifiedUsers[userId] {
      return userData
    }
    return nil
  }
}