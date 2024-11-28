class CustomError extends Error {

    constructor(message, statusCode) {
        super(message); // `Error` sınıfının `message` özelliğini çağırır
        this.statusCode = statusCode; // Özel bir durum kodu özelliği ekler
      }
}

module.exports = CustomError;
