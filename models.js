exports = module.exports = function(db, mongoose) {

  var userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
    email: String,
    roles: {
      admin: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
      account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' }    },
    isActive: Boolean,
    timeCreated: { type: Date, default: Date.now },
    resetPasswordToken: String
  });

  db.model('User', userSchema);
};
